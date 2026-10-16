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
import PdfComparison from "./PdfComparison.tsx";
import {
  COMPRESSION_PRESETS,
  compressPdf,
  type CompressionLevel,
} from "../../utils/compressPdf.ts";
import { formatBytes } from "../../utils/formatBytes.ts";

interface Result {
  blob: Blob;
  url: string;
  name: string;
}

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [progress, setProgress] = useState<[number, number] | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Release the object URL when it is replaced or the page unmounts.
  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  const busy = progress !== null;

  const handleFile = (selected: File | undefined) => {
    setResult(null);
    setError("");
    if (selected && selected.type !== "application/pdf") {
      setFile(null);
      setError("Please choose a PDF file.");
      return;
    }
    setFile(selected ?? null);
  };

  const handleCompress = async () => {
    if (!file || busy) return;
    setResult(null);
    setError("");
    setProgress([0, 1]);

    try {
      const blob = await compressPdf(file, level, (done, total) =>
        setProgress([done, total])
      );
      setResult({
        blob,
        url: URL.createObjectURL(blob),
        name: file.name.replace(/\.pdf$/i, "") + "_compressed.pdf",
      });
    } catch (e) {
      console.error(e);
      setError(
        "Could not compress this PDF. It may be encrypted or corrupted."
      );
    } finally {
      setProgress(null);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography color="text.secondary">
        Shrink a PDF right in your browser. Your file never leaves your
        device. Pages are converted to images, so text in the compressed copy
        can't be selected or searched.
      </Typography>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
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
        {file ? "Choose a different PDF" : "Choose PDF"}
      </Button>

      {file && (
        <Typography>
          {file.name} ({formatBytes(file.size)})
        </Typography>
      )}

      <TextField
        select
        sx={{ maxWidth: 700 }}
        label="Compression level"
        value={level}
        disabled={busy}
        onChange={(e) => setLevel(e.target.value as CompressionLevel)}
      >
        {Object.entries(COMPRESSION_PRESETS).map(([key, { label }]) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        size="large"
        disabled={!file || busy}
        onClick={handleCompress}
        sx={{ alignSelf: "flex-start", minWidth: 180, bgcolor: "primary.dark" }}
      >
        {busy ? "Compressing..." : "Compress"}
      </Button>

      {progress && (
        <Box>
          <LinearProgress
            variant="determinate"
            value={(progress[0] / progress[1]) * 100}
          />
          <Typography variant="caption" color="text.secondary">
            Page {progress[0]} of {progress[1]}
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
        <PdfComparison original={file} compressed={result.blob} />
      )}
    </Box>
  );
}
