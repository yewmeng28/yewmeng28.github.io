export interface NavItem {
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Resume", path: "/resume" },
  { label: "PDF Compressor", path: "/pdf-compressor" },
  { label: "Contact", path: "/contact" },
];
