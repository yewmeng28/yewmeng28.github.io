import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import CompressionResult from "./CompressionResult.tsx";
import {
  ConversionCanceledError,
  VIDEO_PRESETS,
  isVideoCompressionSupported,
  startVideoCompression,
  type VideoCompression,
  type VideoCompressionLevel,
} from "../../utils/compressVideo.ts";
import { formatBytes } from "../../utils/formatBytes.ts";

const MAX_HEIGHTS = [
  { label: "Original size", value: 0 },
  { label: "Up to 1080p", value: 1080 },
  { label: "Up to 720p", value: 720 },
  { label: "Up to 480p", value: 480 },
];

// Output is built in memory, so very large inputs can crash the tab.
const LARGE_FILE_BYTES = 500 * 1024 * 1024;

interface Result {
  blob: Blob;
  url: string;
  name: string;
}

function VideoPane({ title, url, size }: { title: string; url: string; size: number }) {
  return (
    <Box sx={{ width: 420, maxWidth: "100%" }}>
      <Typography align="center" gutterBottom>
        {title} · {formatBytes(size)}
      </Typography>
      <Box
        component="video"
        src={url}
        controls
        sx={{ display: "block", width: "100%", maxHeight: 360, bgcolor: "common.black" }}
      />
    </Box>
  );
}

export default function VideoCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [level, setLevel] = useState<VideoCompressionLevel>("medium");
  const [maxHeight, setMaxHeight] = useState(720);
  const [progress, setProgress] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<VideoCompression | null>(null);

  const busy = progress !== null;

  useEffect(() => () => URL.revokeObjectURL(originalUrl), [originalUrl]);
  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);
  // Stop an in-flight conversion if the user leaves the page.
  useEffect(() => () => void jobRef.current?.cancel(), []);

  const handleFile = (selected: File | undefined) => {
    setResult(null);
    setError("");
    if (!selected) return;
    if (!selected.type.startsWith("video/")) {
      setFile(null);
      setOriginalUrl("");
      setError("Please choose a video file.");
      return;
    }
    setFile(selected);
    setOriginalUrl(URL.createObjectURL(selected));
  };

  const handleCompress = async () => {
    if (!file || busy) return;
    setResult(null);
    setError("");
    setProgress(0);

    try {
      const job = await startVideoCompression(file, level, maxHeight, setProgress);
      jobRef.current = job;
      const blob = await job.result;
      setResult({
        blob,
        url: URL.createObjectURL(blob),
        name: file.name.replace(/\.[^.]+$/, "") + "_compressed.mp4",
      });
    } catch (e) {
      if (!(e instanceof ConversionCanceledError)) {
        console.error(e);
        setError(
          e instanceof Error ? e.message : "Could not compress this video."
        );
      }
    } finally {
      jobRef.current = null;
      setProgress(null);
    }
  };

  if (!isVideoCompressionSupported) {
    return (
      <Alert severity="warning">
        Your browser doesn't support the WebCodecs API needed for video
        compression. Try a recent version of Chrome, Edge or Safari.
      </Alert>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography color="text.secondary">
        Shrink a video right in your browser using your device's video encoder.
        Your file never leaves your device. The result is an MP4. Long or
        high-resolution videos take a while and use a lot of memory, so keep
        this tab open and in the foreground.
      </Typography>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <Button
        variant="outlined"
        size="large"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        sx={{ alignSelf: "flex-start" }}
      >
        {file ? "Choose a different video" : "Choose video"}
      </Button>

      {file && (
        <Typography>
          {file.name} ({formatBytes(file.size)})
        </Typography>
      )}

      {file && file.size > LARGE_FILE_BYTES && (
        <Alert severity="warning">
          This file is over 500 MB. Compressing it may be very slow or run out
          of memory.
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 700 }}>
        <TextField
          select
          label="Compression level"
          value={level}
          disabled={busy}
          onChange={(e) => setLevel(e.target.value as VideoCompressionLevel)}
        >
          {Object.entries(VIDEO_PRESETS).map(([key, { label }]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Maximum resolution"
          value={maxHeight}
          disabled={busy}
          onChange={(e) => setMaxHeight(Number(e.target.value))}
        >
          {MAX_HEIGHTS.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          disabled={!file || busy}
          onClick={handleCompress}
          sx={{ minWidth: 180, bgcolor: "primary.dark" }}
        >
          {busy ? "Compressing..." : "Compress"}
        </Button>
        {busy && (
          <Button size="large" onClick={() => void jobRef.current?.cancel()}>
            Cancel
          </Button>
        )}
      </Box>

      {progress !== null && (
        <Box>
          <LinearProgress variant="determinate" value={progress * 100} />
          <Typography variant="caption" color="text.secondary">
            {Math.round(progress * 100)}%
          </Typography>
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {file && result && (
        <CompressionResult
          originalSize={file.size}
          compressedSize={result.blob.size}
          url={result.url}
          fileName={result.name}
        />
      )}

      {file && result && (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
          <VideoPane title="Before" url={originalUrl} size={file.size} />
          <VideoPane title="After" url={result.url} size={result.blob.size} />
        </Box>
      )}
    </Box>
  );
}
