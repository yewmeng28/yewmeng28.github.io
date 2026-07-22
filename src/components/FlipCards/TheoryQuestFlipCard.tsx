import {Box, Button, Typography} from "@mui/material";
import FlipCard from "./FlipCard.tsx";

export default function TheoryQuestFlipCard() {
  return (
    <FlipCard
      front={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 3,
            p: 2,
          }}
        >
          <Typography align="center" variant="h4">
            Theory Quest
          </Typography>
          <Typography align="center" variant="body1">
            Personal project to help my piano students with their theory practice, built on React
          </Typography>
        </Box>
      }
      back={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 3,
            p: 2,
          }}
        >
          <Typography align="center">
            Check out my first ever frontend application, click to try it out!
          </Typography>
          <Button
            variant="contained"
            href="https://yewmeng28.github.io/theory-quest/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play Theory Quest
          </Button>
        </Box>
      }
    />
  )
}