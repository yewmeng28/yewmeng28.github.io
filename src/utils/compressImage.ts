export type ImageFormat = "image/jpeg" | "image/webp" | "image/png";

export const IMAGE_FORMATS: Record<ImageFormat, { label: string; ext: string }> = {
  "image/jpeg": { label: "JPEG", ext: "jpg" },
  "image/webp": { label: "WebP (smaller)", ext: "webp" },
  "image/png": { label: "PNG (lossless, keeps transparency)", ext: "png" },
};

export interface ImageOptions {
  format: ImageFormat;
  /** 0-1. Ignored for PNG, which is lossless. */
  quality: number;
  /** Longest side in pixels; 0 keeps the original size. */
  maxDimension: number;
}

/**
 * Re-encodes an image in the browser using a canvas. Animated images keep only
 * their first frame.
 */
export async function compressImage(
  file: File,
  { format, quality, maxDimension }: ImageOptions
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  try {
    const scale = maxDimension
      ? Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
      : 1;

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not supported in this browser.");

    // JPEG has no alpha channel; paint white so transparency isn't black.
    if (format === "image/jpeg") {
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, format, quality)
    );

    // Browsers silently fall back to PNG for formats they can't encode.
    if (!blob || blob.type !== format) {
      throw new Error(`This browser can't encode ${IMAGE_FORMATS[format].label}.`);
    }
    return blob;
  } finally {
    bitmap.close();
  }
}
