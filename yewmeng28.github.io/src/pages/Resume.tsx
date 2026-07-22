import Header from "../components/Header.tsx";
import { Box, Typography } from "@mui/material";

export default function Resume() {
  return (
    <>
      <Header />

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          mt: 4,
          px: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          My Resume
        </Typography>
        <Typography variant="h6" gutterBottom>
          Last updated: 21/07/2026
        </Typography>

        <iframe
          src="/resume.pdf"
          width="100%"
          height="900px"
          style={{
            border: "none",
            borderRadius: 12,
          }}
          title="Resume"
        />
      </Box>
    </>
  );
}