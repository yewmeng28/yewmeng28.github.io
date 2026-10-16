import { Box, Typography } from "@mui/material";
import ProjectFlipCard from "../components/FlipCards/ProjectFlipCard.tsx";
import { projects } from "../data/projects.ts";

export default function Projects() {
  return (
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
      <Typography variant="h3" align="center" gutterBottom>
        Personal and Group Projects
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 3,
          p: 2,
        }}
      >
        {projects.map((project) => (
          <ProjectFlipCard key={project.title} project={project} />
        ))}
      </Box>
    </Box>
  );
}
