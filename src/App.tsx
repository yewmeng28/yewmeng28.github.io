import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact.tsx";
import HexBackground from "./components/HexBackground.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <HexBackground/>

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/resume"
          element={<Resume />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Routes>
    </BrowserRouter>
  );
}