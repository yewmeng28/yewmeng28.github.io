import { PDFDocument } from "pdf-lib";
import { pdfjs } from "../lib/pdfjs.ts";

export type CompressionLevel = "low" | "medium" | "high";

// "high" compression = smallest file, lowest visual quality.
export const COMPRESSION_PRESETS: Record<
  CompressionLevel,
  { label: string; dpi: number; jpegQuality: number }
> = {
  low: { label: "Light (best quality)", dpi: 150, jpegQuality: 0.8 },
  medium: { label: "Balanced", dpi: 110, jpegQuality: 0.65 },
  high: { label: "Maximum (smallest file)", dpi: 72, jpegQuality: 0.5 },
};

const PDF_POINTS_PER_INCH = 72;

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Uint8Array>((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) return reject(new Error("Failed to encode page image."));
        resolve(new Uint8Array(await blob.arrayBuffer()));
      },
      "image/jpeg",
      quality
    );
  });
}

/**
 * Compresses a PDF entirely in the browser by rasterising every page to a JPEG
 * and rebuilding the document. Nothing is uploaded. Text becomes part of the
 * image, so it is no longer selectable/searchable in the output.
 */
export async function compressPdf(
  file: File,
  level: CompressionLevel,
  onProgress?: (done: number, total: number) => void
): Promise<Blob> {
  const { dpi, jpegQuality } = COMPRESSION_PRESETS[level];
  const scale = dpi / PDF_POINTS_PER_INCH;

  // pdf.js transfers the buffer to its worker, so hand it a copy.
  const source = new Uint8Array(await file.arrayBuffer());
  const input = await pdfjs.getDocument({ data: source }).promise;
  const output = await PDFDocument.create();

  try {
    for (let i = 1; i <= input.numPages; i++) {
      const page = await input.getPage(i);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is not supported in this browser.");

      // JPEG has no alpha channel; paint white so transparency isn't black.
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      await page.render({ canvas, canvasContext: context, viewport }).promise;

      const image = await output.embedJpg(await canvasToJpeg(canvas, jpegQuality));

      // Keep the original physical page size.
      const [width, height] = [viewport.width / scale, viewport.height / scale];
      output.addPage([width, height]).drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });

      page.cleanup();
      canvas.width = canvas.height = 0;
      onProgress?.(i, input.numPages);
    }
  } finally {
    await input.destroy();
  }

  const bytes = await output.save();
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}
