export interface Env {
  RESEND_API_KEY: string;
}

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    
    if (ip !== 'unknown') {
      const limitData = rateLimitMap.get(ip);
      if (limitData) {
        if (now - limitData.timestamp < RATE_LIMIT_WINDOW) {
          if (limitData.count >= MAX_REQUESTS) {
            return new Response(JSON.stringify({ success: false, message: "Too many requests. Please try again later." }), { status: 429 });
          }
          limitData.count++;
        } else {
          rateLimitMap.set(ip, { count: 1, timestamp: now });
        }
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    }
    const data = await context.request.json() as {
      name: string;
      email: string;
      subject: string;
      message: string;
      botcheck?: string;
    };

    // Honeypot spam protection
    if (data.botcheck) {
      return new Response(JSON.stringify({ success: true, message: "Message sent successfully!" }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Input Validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(JSON.stringify({ success: false, message: "Missing required fields." }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ success: false, message: "Invalid email address." }), { status: 400 });
    }

    // Sanitize lengths
    const safeName = data.name.slice(0, 100);
    const safeEmail = data.email.slice(0, 100);
    const safeSubject = data.subject.slice(0, 150);
    const safeMessage = data.message.slice(0, 3000);
    
    // Add Timestamp
    const timestamp = new Date().toISOString();

    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 1px solid #eaeaea; padding-bottom: 20px; margin-bottom: 20px; }
          .title { font-size: 24px; font-weight: 600; color: #111; margin: 0; }
          .subtitle { font-size: 14px; color: #666; margin-top: 5px; }
          .content-box { background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px; white-space: pre-wrap; }
          .meta-item { margin-bottom: 10px; font-size: 14px; }
          .label { font-weight: 600; color: #555; width: 100px; display: inline-block; }
          .footer { font-size: 12px; color: #999; border-top: 1px solid #eaeaea; padding-top: 20px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">New Portfolio Contact</h1>
          <p class="subtitle">Via ${safeSubject}</p>
        </div>
        
        <div class="meta-item"><span class="label">Name:</span> ${safeName}</div>
        <div class="meta-item"><span class="label">Email:</span> ${safeEmail}</div>
        <div class="meta-item"><span class="label">Subject:</span> ${safeSubject}</div>
        
        <h3 style="margin-top: 30px; font-size: 16px;">Message:</h3>
        <div class="content-box">${safeMessage}</div>
        
        <div class="footer">
          <div class="meta-item"><span class="label">Timestamp:</span> ${timestamp}</div>
        </div>
      </body>
      </html>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['prabhavkrishna17@gmail.com'],
        subject: `[Portfolio] ${safeSubject}`,
        html: htmlEmail,
        reply_to: safeEmail
      })
    });

    if (resendRes.ok) {
      return new Response(JSON.stringify({ success: true, message: "Message sent successfully!" }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const errText = await resendRes.text();
      console.error("Resend API Error:", errText);
      return new Response(JSON.stringify({ success: false, message: "Failed to send message via email provider." }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error("Function Error:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal server error." }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
