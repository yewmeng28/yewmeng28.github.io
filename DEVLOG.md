# Development Log

## 2026-07-22

### Initial Launch
- Pages:
  - Home - Introduction and tech stack with multiple view modes
  - Projects - More information on past projects, both individual and group
  - Resume - Display and download updated resume
  - Contact - Provide phone and email
- Dark and light view modes
- Styling of the background
- Desktop and mobile support

## 2026-07-23

### Resume
- Added react-pdf resume viewer
- Implemented ResizeObserver to make pages responsive
- Added Download Resume button

### Contact
- Added Material UI contact form
- Integrated EmailJS
- Added validation
- Added loading and success states

## 2026-10-16

### Cleanup
- Replaced three duplicated project flip cards with data-driven `ProjectFlipCard` (`src/data/projects.ts`)
- Shared `Layout` (header + background) and nav config (`src/config/navigation.ts`)
- Removed unused assets and `BackendFlipCard`; untracked `.idea` and `.vite`
- Lazy-loaded Resume and PDF pages (main bundle 1.5 MB -> 450 KB)

### PDF Compressor
- New `/pdf-compressor` tab, runs fully in the browser (pdf.js + pdf-lib)

---

## Next

- Add development log page in UI
- Improve homepage navigation on mobile and desktop