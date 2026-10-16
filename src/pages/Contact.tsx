import { Box } from "@mui/material";
import ContactForm from "../components/ContactForm.tsx";

export default function Contact() {

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          bgcolor: "transparent",
          color: "text.primary",
        }}
      >
        <ContactForm/>
      </Box>
    </>
  );
}