"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09, // smooth but responsive
        smoothWheel: true,
        // smooth-scroll for in-page anchors (#recursos…); the sticky-header offset
        // comes from `scroll-margin-top` on the sections (see globals.css)
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
