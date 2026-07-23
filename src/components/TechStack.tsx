import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { techStack, type TechSkill } from "../data/techStack";
import { generateFloatingLayout } from "../utils/generateFloatingLayout";

import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import CategoryIcon from "@mui/icons-material/Category";
import TimelineIcon from "@mui/icons-material/Timeline";

type ViewMode = "floating" | "category" | "timeline";

export default function TechStack() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [viewMode, setViewMode] = useState<ViewMode>("floating");

  const shuffledTechStack = useMemo(() => {
    return [...techStack].sort(() => Math.random() - 0.5);
  }, []);

  // Generate one random layout for this page load
  const floatingSkills = useMemo(() => {
    const layout = generateFloatingLayout(techStack.length);

    return shuffledTechStack.map((skill, index) => ({
      ...skill,
      ...layout[index],
    }));
  }, [shuffledTechStack]);

  // Group skills by category
  const groupedSkills = useMemo(() => {
    return techStack.reduce(
      (acc, skill) => {
        acc[skill.category] ??= [];
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<string, typeof techStack>
    );
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        mt: 6,
        width: "100%",
      }}
    >
      <Typography variant="h4">
        Tech Stack
      </Typography>

      <ToggleButtonGroup
        exclusive
        value={viewMode}
        onChange={(_, value: ViewMode | null) => {
          if (value) setViewMode(value);
        }}
      >
        <ToggleButton value="floating">
          <BubbleChartIcon sx={{ pr: 0.5 }}/>
            Floating
        </ToggleButton>

        <ToggleButton value="category">
          <CategoryIcon sx={{ pr: 0.5 }}/>
            Categories
        </ToggleButton>

        <ToggleButton value="timeline">
          <TimelineIcon sx={{ pr: 0.5 }}/>
            Timeline
        </ToggleButton>

      </ToggleButtonGroup>

      {viewMode === "floating" && (
        <FloatingView skills={floatingSkills} isMobile={isMobile}/>
      )}
      {viewMode === "category" && (
        <CategoryView groupedSkills={groupedSkills} />
      )}
      {viewMode === "timeline" && (
        <TimelineView />
      )}
    </Box>
  );
}

interface FloatingSkill extends TechSkill {
  x: number;
  y: number;
  duration: number;
  delay: number;
  distance: number;
  rotation: number;
}

function FloatingView({
  skills,
  isMobile,
}: {
  skills: FloatingSkill[];
  isMobile: boolean;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 1000,
        height: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography sx={{ alignContent: "center" }}>
        Hover or long tap to see more details!
      </Typography>
      {skills.map((skill) => (
        <Box
          key={skill.name}
          sx={{
            position: "absolute",
            left: `${skill.x}%`,
            top: `${skill.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              animation: `float ${skill.duration}s ease-in-out infinite`,
              animationDelay: `${skill.delay}s`,

              "@keyframes float": {
                "0%,100%": {
                  transform: "translate(0px, 0px)",
                },
                "50%": {
                  transform: `translate(3px, -${skill.distance}px)`,
                },
              },
            }}
          >
            <Tooltip
              arrow
              title={
                <>
                  <Typography variant="subtitle2">{skill.name}</Typography>
                  <Typography variant="body2">{skill.level}</Typography>
                  <Typography variant="body2">{skill.years} years</Typography>
                </>
              }
            >
              <Chip
                size={isMobile ? "small" : "medium"}
                label={skill.name}
                sx={{
                  bgcolor: skill.color,
                  color: "white",

                  transform: `rotate(${skill.rotation}deg)`,

                  transition: "transform .25s ease, box-shadow .25s ease",

                  "&:hover": {
                    transform: `scale(1.15) rotate(${skill.rotation}deg)`,
                    boxShadow: `0 0 24px ${skill.color}99`,
                  },
                }}
              />
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function CategoryView({
  groupedSkills,
}: {
  groupedSkills: Record<string, typeof techStack>;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <Box key={category}>
          <Typography
            variant="h5"
            gutterBottom
          >
            {category}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            {skills.map((skill) => (
              <Chip
                key={skill.name}
                label={`${skill.name} • ${skill.level}`}
                sx={{
                  bgcolor: skill.color,
                  color: "white",
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function TimelineView({
}: {
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
      >
        Not yet implemented. A page for feature updates will be available soon, check back again in a while!
      </Typography>
    </Box>
  );
}