// src/types/cropperjs.d.ts
declare module 'cropperjs' {
  export interface CropperOptions {
    // common options that are missing from the distributed types
    viewMode?: number;
    aspectRatio?: number | NaN;
    autoCropArea?: number;
    zoomable?: boolean;
    scalable?: boolean;
    movable?: boolean;
    // you can add others you need
    [key: string]: any;
  }

  const Cropper: {
    new (element: HTMLElement | HTMLImageElement, options?: CropperOptions): any;
    (element: HTMLElement | HTMLImageElement, options?: CropperOptions): any;
  };

  export default Cropper;
}
