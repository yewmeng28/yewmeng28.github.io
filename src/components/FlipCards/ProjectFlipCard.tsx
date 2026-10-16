import { Box, Button, Typography } from "@mui/material";
import FlipCard from "./FlipCard.tsx";
import type { Project } from "../../data/projects.ts";

const faceSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  mt: 3,
  p: 2,
} as const;

export default function ProjectFlipCard({ project }: { project: Project }) {
  return (
    <FlipCard
      front={
        <Box sx={faceSx}>
          <Typography align="center" variant="h4">
            {project.title}
          </Typography>
          <Typography align="center" variant="body1">
            {project.summary}
          </Typography>
        </Box>
      }
      back={
        <Box sx={faceSx}>
          <Typography align="center">{project.description}</Typography>
          <Button
            variant="contained"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.linkLabel}
          </Button>
        </Box>
      }
    />
  );
}
