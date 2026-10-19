import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";
import Tools from "./pages/Tools.tsx";

// Heavy PDF libraries are only loaded when these pages are visited.
const Resume = lazy(() => import("./pages/Resume.tsx"));
const PdfCompressor = lazy(() => import("./components/tools/PdfCompressor.tsx"));
const PdfMergeSplit = lazy(() => import("./components/tools/PdfMergeSplit.tsx"));
const ImageCompressor = lazy(() => import("./components/tools/ImageCompressor.tsx"));
const VideoCompressor = lazy(() => import("./components/tools/VideoCompressor.tsx"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/tools" element={<Tools />}>
            <Route index element={<Navigate to="pdf" replace />} />
            <Route path="pdf" element={<PdfCompressor />} />
            <Route path="pdf-merge-split" element={<PdfMergeSplit />} />
            <Route path="image" element={<ImageCompressor />} />
            <Route path="video" element={<VideoCompressor />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
