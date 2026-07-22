import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";

interface FadingTextProps {
  texts: string[];
  interval?: number;      // How long the text stays visible
  fadeDuration?: number;  // Fade in/out duration (ms)
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2";
}

export default function FadingText({
                                     texts,
                                     interval = 2000,
                                     fadeDuration = 800,
                                     variant = "h4",
                                   }: FadingTextProps) {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (texts.length <= 1) return;

    let cancelled = false;

    async function cycle() {
      while (!cancelled) {
        // Fade in
        await controls.start({
          opacity: 1,
          transition: {
            duration: fadeDuration / 1000,
            ease: "easeInOut",
          },
        });

        // Stay visible
        await new Promise((r) => setTimeout(r, interval));

        // Fade out
        await controls.start({
          opacity: 0,
          transition: {
            duration: fadeDuration / 1000,
            ease: "easeInOut",
          },
        });

        if (cancelled) break;

        setIndex((i) => (i + 1) % texts.length);
      }
    }

    controls.set({ opacity: 0 });
    cycle();

    return () => {
      cancelled = true;
    };
  }, [texts.length, interval, fadeDuration, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography
        variant={variant}
        align="center"
        sx={{
          fontWeight: 500,
          color: "primary.light",
          minHeight: {
            xs: "3.5rem",
            md: "2.5rem",
          },
          px: 2,
        }}
      >
        {texts[index]}
      </Typography>
    </motion.div>
  );
}