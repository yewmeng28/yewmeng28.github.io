import {Box, Button, Typography} from "@mui/material";
import FlipCard from "./FlipCard.tsx";

export default function InheritanceFlipCard() {
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
            Inheritance
          </Typography>
          <Typography align="center" variant="body1">
            Open-world puzzle solving VR game built on Unreal Engine 4
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
            My first larger scale game group project with NUS coursemates, click to find out more!
          </Typography>
          <Button
            variant="contained"
            href="https://uvents.nus.edu.sg/event/22nd-steps/module/CS3247/project/1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inheritance
          </Button>
        </Box>
      }
    />
  )
}