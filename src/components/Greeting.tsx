import { Box } from "@mui/material";
import FadingText from "./FadingText.tsx";

export default function Greeting() {

  const hellos = [
    "Welcome",
    "こんにちは",
    "你好",
    "Χαίρετε",
    "Hej",
    "مرحبًا",
    "안녕하세요",
    "Привет",
    "Ciao",
    "Olá",
    "Guten Tag",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        pb: 3,
      }}
    >
      <FadingText
        texts={hellos}
        interval={2500}
        fadeDuration={1000}
        variant="h3"
      />
    </Box>
  )
}