import { PDFDocument } from "pdf-lib";

function toBlob(bytes: Uint8Array) {
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}

async function loadPdf(file: File) {
  return PDFDocument.load(await file.arrayBuffer());
}

/** Number of pages in a PDF. Throws if it is encrypted or corrupted. */
export async function getPageCount(file: File): Promise<number> {
  return (await loadPdf(file)).getPageCount();
}

/**
 * Parses a page selection such as "1-3, 5, 8-" into groups of zero-based page
 * indices, one group per comma-separated part. Pages are 1-based in the input;
 * "8-" means page 8 through the last page. Throws an Error with a
 * user-facing message when the input is invalid.
 */
export function parsePageRanges(input: string, totalPages: number): number[][] {
  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) throw new Error("Enter at least one page or range.");

  return parts.map((part) => {
    const match = /^(\d+)(?:\s*-\s*(\d*))?$/.exec(part);
    if (!match) throw new Error(`"${part}" is not a valid page or range.`);

    const start = Number(match[1]);
    const isRange = match[2] !== undefined;
    const end = !isRange ? start : match[2] === "" ? totalPages : Number(match[2]);

    if (start < 1 || end > totalPages) {
      throw new Error(`"${part}" is outside the document (1-${totalPages}).`);
    }
    if (start > end) throw new Error(`"${part}" is a backwards range.`);

    return Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i);
  });
}

/** Concatenates the given PDFs, in order, into a single PDF. */
export async function mergePdfs(
  files: File[],
  onProgress?: (done: number, total: number) => void
): Promise<Blob> {
  const output = await PDFDocument.create();

  for (const [index, file] of files.entries()) {
    const source = await loadPdf(file);
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach((page) => output.addPage(page));
    onProgress?.(index + 1, files.length);
  }

  return toBlob(await output.save());
}

/** Builds one PDF from the given zero-based page indices of the source file. */
export async function extractPages(
  file: File,
  pageIndices: number[]
): Promise<Blob> {
  const source = await loadPdf(file);
  const output = await PDFDocument.create();
  const pages = await output.copyPages(source, pageIndices);
  pages.forEach((page) => output.addPage(page));
  return toBlob(await output.save());
}
