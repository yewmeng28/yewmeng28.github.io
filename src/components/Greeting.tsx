import { Box } from "@mui/material";
import FadingText from "./FadingText.tsx";

export default function Greeting() {

  const hellos = [
    "Hello",
    "こんにちは",
    "你好",
    "नमस्ते",
    "Χαίρετε",
    "Olá",
    "مرحبًا",
    "안녕하세요",
    "ഹലോ",
    "Привет",
    "سلام",
    "Ciao",
    "העלא",
    "Hej",
    "هيلو",
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
        interval={1500}
        fadeDuration={700}
        variant="h3"
      />
    </Box>
  )
}