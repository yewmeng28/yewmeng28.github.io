import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Document, Page } from "react-pdf";

import "../../lib/pdfjs.ts";
import { formatBytes } from "../../utils/formatBytes.ts";

interface PdfComparisonProps {
  original: File;
  compressed: Blob;
}

export default function PdfComparison({
  original,
  compressed,
}: PdfComparisonProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const panes = [
    { title: "Before", file: original as File | Blob, size: original.size },
    { title: "After", file: compressed as File | Blob, size: compressed.size },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <IconButton
          aria-label="Previous page"
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((p) => p - 1)}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Typography>
          Page {pageNumber} of {numPages || "…"}
        </Typography>
        <IconButton
          aria-label="Next page"
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber((p) => p + 1)}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {panes.map(({ title, file, size }, index) => (
          <Box key={title} sx={{ width: 380, maxWidth: "100%" }}>
            <Typography align="center" gutterBottom>
              {title} · {formatBytes(size)}
            </Typography>
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
                bgcolor: "common.white",
              }}
            >
              <Document
                file={file}
                loading={<Typography sx={{ p: 4, color: "grey.700" }}>Loading…</Typography>}
                // The original and compressed copies have the same page count.
                onLoadSuccess={
                  index === 0 ? ({ numPages }) => setNumPages(numPages) : undefined
                }
              >
                <Page
                  pageNumber={pageNumber}
                  width={380}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
