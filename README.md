# yewmeng28.github.io
Portfolio website and home to personal projects!

## Pages

- **Home** – introduction and tech stack
- **Projects** – personal and group projects
- **Resume** – view and download my resume
- **Tools** – free utilities that run entirely in your browser (files are never uploaded):
  - **PDF compressor** – pages are rasterised to JPEG and the PDF is rebuilt (`pdf.js` + `pdf-lib`). Text in the output is not selectable.
  - **Image compressor** – re-encode JPEG, PNG or WebP with adjustable quality and max size, with a before/after preview.
  - **Video compressor** – re-encode to MP4 using the browser's WebCodecs encoder (`mediabunny`), with resolution and quality options. Needs a recent Chrome, Edge or Safari.
- **Contact** – contact form sent via EmailJS

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
npm run preview   # serve the production build locally
```

Requires a `.env` with `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY` for the contact form.
