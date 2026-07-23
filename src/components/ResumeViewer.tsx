import { useEffect, useRef, useState } from "react";
import {Box, Button, Card, CardContent} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function ResumeViewer() {
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(900);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(entry.contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        maxWidth: 900,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          m: 3,
        }}
      >
        <Button
          variant="contained"
          component="a"
          href="/resume.pdf"
          download="Chai_Yew_Meng_Resume.pdf"
        >
          Download Resume
        </Button>
      </Box>

      <Card
      sx={{ bgcolor: 'transparent'}}>
        <CardContent>
          <Document
            file="/resume.pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from({ length: numPages }, (_, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
                width={pageWidth * 0.9}
              />
            ))}
          </Document>
        </CardContent>
      </Card>
    </Box>
  );
}