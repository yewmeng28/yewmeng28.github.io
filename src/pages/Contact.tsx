import { Box } from "@mui/material";
import Header from "../components/Header.tsx";
import ContactForm from "../components/ContactForm.tsx";

export default function Contact() {

  return (
    <>
      <Header/>
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