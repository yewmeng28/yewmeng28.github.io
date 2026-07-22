import { useState, type ReactNode } from "react";
import { Box, Card, CardActionArea } from "@mui/material";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  width?: number | string;
  height?: number | string;
  flipOnHover?: boolean;
}

export default function FlipCard({
  front,
  back,
  width = 320,
  height = 220,
  flipOnHover = false,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      sx={{
        perspective: "1000px",
        width,
        height,
      }}
      onMouseEnter={() => flipOnHover && setFlipped(true)}
      onMouseLeave={() => flipOnHover && setFlipped(false)}
    >
      <Box
        onClick={() => !flipOnHover && setFlipped(!flipped)}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 700ms cubic-bezier(.175,.885,.32,1.275)",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "pointer",
        }}
      >
        {/* Front */}
        <Card
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",

            bgcolor: "primary.dark",
            color: "primary.contrastText",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 6,
          }}
        >
          <CardActionArea
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {front}
          </CardActionArea>
        </Card>

        {/* Back */}
        <Card
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            display: "flex",

            bgcolor: "grey.800",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 6,
          }}
        >
          <CardActionArea
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {back}
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}