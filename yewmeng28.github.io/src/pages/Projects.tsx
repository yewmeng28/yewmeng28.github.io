import { Box, Typography } from "@mui/material";
import Header from "../components/Header.tsx";
import TheoryQuestFlipCard from "../components/FlipCards/TheoryQuestFlipCard.tsx";
import MageFlipCard from "../components/FlipCards/MageFlipCard.tsx";
import InheritanceFlipCard from "../components/FlipCards/InheritanceFlipCard.tsx";

export default function Projects() {

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
          pt: 5,
          bgcolor: "transparent",
          color: "text.primary",
        }}
      >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
            >
              Personal and Group Projects
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mt: 3,
                p: 2,
              }}
            >
              <TheoryQuestFlipCard />
              <MageFlipCard/>
              <InheritanceFlipCard/>
            </Box>
      </Box>
    </>
  );
}