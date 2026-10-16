import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";

// The PDF viewer is only loaded when this page is visited.
const Resume = lazy(() => import("./pages/Resume.tsx"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
