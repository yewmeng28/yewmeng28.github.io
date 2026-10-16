import { Alert, Button } from "@mui/material";
import { formatBytes } from "../../utils/formatBytes.ts";

interface CompressionResultProps {
  originalSize: number;
  compressedSize: number;
  url: string;
  fileName: string;
}

export default function CompressionResult({
  originalSize,
  compressedSize,
  url,
  fileName,
}: CompressionResultProps) {
  const saved = 1 - compressedSize / originalSize;

  return (
    <Alert
      severity={saved > 0 ? "success" : "warning"}
      action={
        <Button
          color="inherit"
          size="small"
          component="a"
          href={url}
          download={fileName}
        >
          Download
        </Button>
      }
    >
      {formatBytes(originalSize)} → {formatBytes(compressedSize)}
      {saved > 0
        ? ` (${Math.round(saved * 100)}% smaller)`
        : ". The result is not smaller than the original, so keep the original or try a higher compression level."}
    </Alert>
  );
}
