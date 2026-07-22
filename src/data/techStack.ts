export type Category =
  | "Frontend"
  | "Backend"
  | "Languages"
  | "Cloud"
  | "Testing"
  | "DevOps";

export interface TechSkill {
  name: string;
  category: Category;
  level: "Beginner" | "Intermediate" | "Advanced";
  years: number;
  color: string;
}

export const techStack: TechSkill[] = [
  // Languages
  { name: "Java", category: "Languages", level: "Advanced", years: 5, color: "#871cb2" },
  { name: "Python", category: "Languages", level: "Advanced", years: 4, color: "#871cb2" },
  { name: "TypeScript", category: "Languages", level: "Intermediate", years: 2, color: "#871cb2" },
  { name: "C++", category: "Languages", level: "Beginner", years: 1, color: "#871cb2" },
  { name: "C#", category: "Languages", level: "Beginner", years: 1, color: "#871cb2" },

  // Backend
  { name: "Spring Boot", category: "Backend", level: "Advanced", years: 2, color: "#C71A36" },
  { name: "Oracle SQL", category: "Backend", level: "Intermediate", years: 2, color: "#C71A36" },
  { name: "Maven", category: "Backend", level: "Intermediate", years: 2, color: "#C71A36" },
  { name: "REST APIs", category: "Backend", level: "Intermediate", years: 2, color: "#C71A36" },

  // Frontend
  { name: "React", category: "Frontend", level: "Advanced", years: 2, color: "#3178C6" },
  { name: "Zafire", category: "Frontend", level: "Advanced", years: 2, color: "#3178C6" },
  { name: "Material UI", category: "Frontend", level: "Advanced", years: 2, color: "#3178C6" },

  // Cloud
  { name: "AWS", category: "Cloud", level: "Intermediate", years: 1, color: "#ff8000" },
  { name: "Docker", category: "Cloud", level: "Intermediate", years: 1, color: "#ff8000" },
  { name: "Kubernetes", category: "Cloud", level: "Intermediate", years: 1.5, color: "#ff8000" },
  { name: "Octopus", category: "Cloud", level: "Intermediate", years: 1.5, color: "#ff8000" },

  // Testing
  { name: "JUnit", category: "Testing", level: "Advanced", years: 2, color: "#2EAD33" },
  { name: "Vitest", category: "Testing", level: "Intermediate", years: 1, color: "#2EAD33" },
  { name: "Playwright", category: "Testing", level: "Intermediate", years: 1, color: "#2EAD33" },

  // DevOps
  { name: "Git", category: "DevOps", level: "Advanced", years: 4, color: "#F05032" },
];