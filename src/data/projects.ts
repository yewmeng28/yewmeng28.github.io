export interface Project {
  title: string;
  summary: string;
  description: string;
  linkLabel: string;
  href: string;
}

export const projects: Project[] = [
  {
    title: "Theory Quest",
    summary:
      "Personal project to help my piano students with their theory practice, built on React",
    description:
      "Check out my first ever frontend application, click to try it out!",
    linkLabel: "Play Theory Quest",
    href: "https://yewmeng28.github.io/theory-quest/",
  },
  {
    title: "Miss April's Gig Economy",
    summary: "3D rogue-like game built on Unity and C++",
    description:
      "My second larger scale game group project with NUS coursemates, click to find out more!",
    linkLabel: "Miss April's Gig Economy",
    href: "https://uvents.nus.edu.sg/event/23rd-steps/module/CS4350/project/2",
  },
  {
    title: "Inheritance",
    summary: "Open-world puzzle solving VR game built on Unreal Engine 4",
    description:
      "My first larger scale game group project with NUS coursemates, click to find out more!",
    linkLabel: "Inheritance",
    href: "https://uvents.nus.edu.sg/event/22nd-steps/module/CS3247/project/1",
  },
];
