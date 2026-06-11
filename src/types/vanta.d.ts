declare module "vanta/dist/vanta.rings.min" {
  interface VantaEffect {
    destroy: () => void;
    resize?: () => void;
  }

  interface VantaRingsOptions {
    el: HTMLElement;
    THREE: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
    color?: number;
  }

  const RINGS: (options: VantaRingsOptions) => VantaEffect;
  export default RINGS;
}

declare module "vanta/dist/vanta.net.min" {
  interface VantaEffect {
    destroy: () => void;
    resize?: () => void;
  }

  interface VantaNetOptions {
    el: HTMLElement;
    THREE: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
    color?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
  }

  const NET: (options: VantaNetOptions) => VantaEffect;
  export default NET;
}
