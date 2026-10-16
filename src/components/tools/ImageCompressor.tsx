import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

import CompressionResult from "./CompressionResult.tsx";
import {
  IMAGE_FORMATS,
  compressImage,
  type ImageFormat,
} from "../../utils/compressImage.ts";
import { formatBytes } from "../../utils/formatBytes.ts";

const MAX_DIMENSIONS = [
  { label: "Original size", value: 0 },
  { label: "Up to 3840 px (4K)", value: 3840 },
  { label: "Up to 1920 px (Full HD)", value: 1920 },
  { label: "Up to 1280 px", value: 1280 },
  { label: "Up to 800 px", value: 800 },
];

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface Result {
  blob: Blob;
  url: string;
  name: string;
}

function ImagePane({ title, url, size }: { title: string; url: string; size: number }) {
  return (
    <Box sx={{ width: 380, maxWidth: "100%" }}>
      <Typography align="center" gutterBottom>
        {title} · {formatBytes(size)}
      </Typography>
      <Box
        component="img"
        src={url}
        alt={`${title} preview`}
        sx={{
          display: "block",
          width: "100%",
          maxHeight: 400,
          objectFit: "contain",
          border: 1,
          borderColor: "divider",
          // Checkerboard-ish neutral ground so transparency is visible.
          bgcolor: "grey.300",
        }}
      />
    </Box>
  );
}

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [format, setFormat] = useState<ImageFormat>("image/webp");
  const [quality, setQuality] = useState(0.7);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Release object URLs when they are replaced or the page unmounts.
  useEffect(() => () => URL.revokeObjectURL(originalUrl), [originalUrl]);
  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  const handleFile = (selected: File | undefined) => {
    setResult(null);
    setError("");
    if (!selected) return;
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setFile(null);
      setOriginalUrl("");
      setError("Please choose a JPEG, PNG or WebP image.");
      return;
    }
    setFile(selected);
    setOriginalUrl(URL.createObjectURL(selected));
  };

  const handleCompress = async () => {
    if (!file || busy) return;
    setResult(null);
    setError("");
    setBusy(true);

    try {
      const blob = await compressImage(file, { format, quality, maxDimension });
      setResult({
        blob,
        url: URL.createObjectURL(blob),
        name:
          file.name.replace(/\.[^.]+$/, "") +
          `_compressed.${IMAGE_FORMATS[format].ext}`,
      });
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Could not compress this image."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography color="text.secondary">
        Shrink a JPEG, PNG or WebP right in your browser. Your file never leaves
        your device. Animated images keep only their first frame.
      </Typography>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
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
        {file ? "Choose a different image" : "Choose image"}
      </Button>

      {file && (
        <Typography>
          {file.name} ({formatBytes(file.size)})
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 700 }}>
        <TextField
          select
          label="Format"
          value={format}
          disabled={busy}
          onChange={(e) => setFormat(e.target.value as ImageFormat)}
        >
          {Object.entries(IMAGE_FORMATS).map(([key, { label }]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Maximum size"
          value={maxDimension}
          disabled={busy}
          onChange={(e) => setMaxDimension(Number(e.target.value))}
        >
          {MAX_DIMENSIONS.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <Box>
          <Typography gutterBottom color={format === "image/png" ? "text.disabled" : "text.primary"}>
            Quality: {Math.round(quality * 100)}%
            {format === "image/png" && " (not used for PNG)"}
          </Typography>
          <Slider
            value={quality}
            min={0.1}
            max={1}
            step={0.05}
            disabled={busy || format === "image/png"}
            onChange={(_, value) => setQuality(value)}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        disabled={!file || busy}
        onClick={handleCompress}
        sx={{ alignSelf: "flex-start", minWidth: 180, bgcolor: "primary.dark" }}
      >
        {busy ? "Compressing..." : "Compress"}
      </Button>

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
          <ImagePane title="Before" url={originalUrl} size={file.size} />
          <ImagePane title="After" url={result.url} size={result.blob.size} />
        </Box>
      )}
    </Box>
  );
}
