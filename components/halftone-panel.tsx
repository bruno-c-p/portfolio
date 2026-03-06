"use client";

import { Dithering } from "@paper-design/shaders-react";

export default function HalftonePanel({ speed = 0.4 }: { speed?: number }) {
  return (
    <Dithering
      colorBack="#000000"
      colorFront="#6366f1"
      shape="warp"
      type="4x4"
      size={2.5}
      speed={speed}
      scale={1.4}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
