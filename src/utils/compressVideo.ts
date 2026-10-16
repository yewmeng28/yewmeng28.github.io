import {
  ALL_FORMATS,
  BlobSource,
  BufferTarget,
  Conversion,
  ConversionCanceledError,
  Input,
  Mp4OutputFormat,
  Output,
  QUALITY_HIGH,
  QUALITY_LOW,
  QUALITY_MEDIUM,
  type Quality,
} from "mediabunny";

export type VideoCompressionLevel = "low" | "medium" | "high";

// "high" compression = smallest file, lowest visual quality.
export const VIDEO_PRESETS: Record<
  VideoCompressionLevel,
  { label: string; quality: Quality }
> = {
  low: { label: "Light (best quality)", quality: QUALITY_HIGH },
  medium: { label: "Balanced", quality: QUALITY_MEDIUM },
  high: { label: "Maximum (smallest file)", quality: QUALITY_LOW },
};

export { ConversionCanceledError };

/** Whether this browser exposes the WebCodecs API the compressor relies on. */
export const isVideoCompressionSupported =
  typeof VideoEncoder !== "undefined" && typeof VideoDecoder !== "undefined";

export interface VideoCompression {
  /** Resolves with the compressed MP4. Rejects with ConversionCanceledError if cancelled. */
  result: Promise<Blob>;
  cancel: () => Promise<void>;
}

/**
 * Re-encodes a video in the browser with WebCodecs (hardware accelerated where
 * available) and writes an MP4. The whole output is held in memory.
 *
 * @param maxHeight Downscale to at most this height in pixels; 0 keeps the original.
 */
export async function startVideoCompression(
  file: File,
  level: VideoCompressionLevel,
  maxHeight: number,
  onProgress?: (progress: number) => void
): Promise<VideoCompression> {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
  });
  const output = new Output({
    format: new Mp4OutputFormat(),
    target: new BufferTarget(),
  });

  const conversion = await Conversion.init({
    input,
    output,
    video: (track) => ({
      // Never upscale; width follows the height to keep the aspect ratio.
      height: maxHeight ? Math.min(maxHeight, track.displayHeight) : undefined,
      quality: VIDEO_PRESETS[level].quality,
      forceTranscode: true,
    }),
    audio: { quality: VIDEO_PRESETS[level].quality, forceTranscode: true },
  });

  if (!conversion.isValid) {
    const reasons = [...new Set(conversion.discardedTracks.map((t) => t.reason))];
    throw new Error(
      `This video can't be compressed in this browser (${reasons.join(", ") || "unsupported format"}).`
    );
  }

  conversion.onProgress = onProgress;

  return {
    cancel: () => conversion.cancel(),
    result: conversion.execute().then(() => {
      const buffer = output.target.buffer;
      if (!buffer) throw new Error("The compressed video was empty.");
      return new Blob([buffer], { type: "video/mp4" });
    }),
  };
}
