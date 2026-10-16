export interface NavItem {
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Resume", path: "/resume" },
  { label: "Tools", path: "/tools" },
  { label: "Contact", path: "/contact" },
];

export const toolTabs: NavItem[] = [
  { label: "PDF", path: "/tools/pdf" },
  { label: "Image", path: "/tools/image" },
];
