import {Box, Button, Typography} from "@mui/material";
import FlipCard from "./FlipCard.tsx";

export default function MageFlipCard() {
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
            Miss April's Gig Economy
          </Typography>
          <Typography align="center" variant="body1">
            3D rogue-like game built on Unity and C++
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
            My second larger scale game group project with NUS coursemates, click to find out more!
          </Typography>
          <Button
            variant="contained"
            href="https://uvents.nus.edu.sg/event/23rd-steps/module/CS4350/project/2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Miss April's Gig Economy
          </Button>
        </Box>
      }
    />
  )
}