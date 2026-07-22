import {Box, Typography} from "@mui/material";
import FlipCard from "./FlipCard.tsx";

interface BackendFlipCardProps {
  backendSkills: string[];
}

export default function BackendFlipCard({
  backendSkills,
}: BackendFlipCardProps) {
  return (
    <FlipCard
      front={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography align="center" variant="h4">
            Backend
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
          }}
        >
          {backendSkills.map((skill) => (
            <Typography key={skill} variant="body1">
              • {skill}
            </Typography>
          ))}
        </Box>
      }
    />
  )
}