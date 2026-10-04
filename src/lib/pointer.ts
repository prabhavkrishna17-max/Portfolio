import { motionValue } from "framer-motion";

export const globalMouseX = motionValue(0);
export const globalMouseY = motionValue(0);

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    globalMouseX.set(e.clientX);
    globalMouseY.set(e.clientY);
  }, { passive: true });
}
