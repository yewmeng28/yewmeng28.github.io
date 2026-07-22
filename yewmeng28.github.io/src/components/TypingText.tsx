import { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface TypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  startDelay?: number;
}

export default function TypingText({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1000,
  startDelay = 1000,
}: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout: number;

    if (!isDeleting) {
      if (displayText === currentWord) {
        timeout = window.setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      } else {
        timeout = window.setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, typingSpeed);
      }
    } else {
      if (displayText === "") {
        timeout = window.setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, startDelay);
      } else {
        timeout = window.setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    startDelay,
  ]);

  return (
    <Box
      component="span"
      sx={{
        color: "primary.light",
        fontWeight: 300,
      }}
    >
      {displayText}
      <Box
        key={displayText}
        component="span"
        sx={{
          display: "inline-block",
          animation: "blink 1s steps(1) infinite",
          "@keyframes blink": {
            "0%, 49%": {
              opacity: 1,
            },
            "50%, 100%": {
              opacity: 0,
            },
          },
        }}
      >
        |
      </Box>
    </Box>
  );
}