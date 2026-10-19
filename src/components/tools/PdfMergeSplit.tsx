import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  extractPages,
  getPageCount,
  mergePdfs,
  parsePageRanges,
} from "../../utils/pdfMergeSplit.ts";
import { formatBytes } from "../../utils/formatBytes.ts";

type Mode = "merge" | "split";
type SplitOutput = "separate" | "single";

interface Output {
  url: string;
  name: string;
  size: number;
}

interface MergeItem {
  id: number;
  file: File;
  pages: number;
}

const baseName = (file: File) => file.name.replace(/\.pdf$/i, "");

function toOutput(blob: Blob, name: string): Output {
  return { url: URL.createObjectURL(blob), name, size: blob.size };
}

export default function PdfMergeSplit() {
  const [mode, setMode] = useState<Mode>("merge");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Merge state
  const [items, setItems] = useState<MergeItem[]>([]);
  const nextId = useRef(0);
  const mergeInputRef = useRef<HTMLInputElement>(null);

  // Split state
  const [source, setSource] = useState<{ file: File; pages: number } | null>(
    null
  );
  const [ranges, setRanges] = useState("");
  const [splitOutput, setSplitOutput] = useState<SplitOutput>("separate");
  const splitInputRef = useRef<HTMLInputElement>(null);

  // Release object URLs when they are replaced or the page unmounts.
  useEffect(() => {
    return () => outputs.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [outputs]);

  const reset = () => {
    setOutputs([]);
    setError("");
  };

  const handleModeChange = (_: unknown, next: Mode | null) => {
    if (!next) return;
    reset();
    setMode(next);
  };

  const addMergeFiles = async (selected: FileList | null) => {
    reset();
    if (!selected?.length) return;

    const added: MergeItem[] = [];
    const rejected: string[] = [];
    for (const file of Array.from(selected)) {
      try {
        if (file.type !== "application/pdf") throw new Error("not a PDF");
        added.push({
          id: nextId.current++,
          file,
          pages: await getPageCount(file),
        });
      } catch {
        rejected.push(file.name);
      }
    }
    setItems((current) => [...current, ...added]);
    if (rejected.length) {
      setError(
        `Skipped ${rejected.join(", ")}. Only unencrypted, valid PDFs can be used.`
      );
    }
  };

  const moveItem = (index: number, offset: -1 | 1) => {
    reset();
    setItems((current) => {
      const next = [...current];
      [next[index], next[index + offset]] = [next[index + offset], next[index]];
      return next;
    });
  };

  const removeItem = (id: number) => {
    reset();
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const handleMerge = async () => {
    if (items.length < 2 || busy) return;
    reset();
    setBusy(true);
    try {
      const blob = await mergePdfs(items.map((item) => item.file));
      setOutputs([toOutput(blob, "merged.pdf")]);
    } catch (e) {
      console.error(e);
      setError("Could not merge these PDFs. One may be corrupted.");
    } finally {
      setBusy(false);
    }
  };

  const handleSplitFile = async (selected: File | undefined) => {
    reset();
    setSource(null);
    if (!selected) return;
    try {
      if (selected.type !== "application/pdf") throw new Error("not a PDF");
      setSource({ file: selected, pages: await getPageCount(selected) });
    } catch {
      setError("Please choose a valid, unencrypted PDF file.");
    }
  };

  const handleSplit = async () => {
    if (!source || busy) return;
    reset();

    let groups: number[][];
    try {
      groups = parsePageRanges(ranges, source.pages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid page range.");
      return;
    }

    setBusy(true);
    try {
      const name = baseName(source.file);
      if (splitOutput === "single") {
        const blob = await extractPages(source.file, groups.flat());
        setOutputs([toOutput(blob, `${name}_extracted.pdf`)]);
      } else {
        const results: Output[] = [];
        for (const [index, pages] of groups.entries()) {
          const blob = await extractPages(source.file, pages);
          results.push(toOutput(blob, `${name}_part${index + 1}.pdf`));
        }
        setOutputs(results);
      }
    } catch (e) {
      console.error(e);
      setError("Could not split this PDF. It may be corrupted.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography color="text.secondary">
        Combine several PDFs into one, or pull pages out of a PDF. Everything
        happens in your browser and your files never leave your device.
        Password-protected PDFs aren't supported.
      </Typography>

      <ToggleButtonGroup
        exclusive
        value={mode}
        onChange={handleModeChange}
        disabled={busy}
        sx={{ alignSelf: "flex-start" }}
      >
        <ToggleButton value="merge">Merge</ToggleButton>
        <ToggleButton value="split">Split</ToggleButton>
      </ToggleButtonGroup>

      {mode === "merge" ? (
        <>
          <input
            ref={mergeInputRef}
            type="file"
            accept="application/pdf"
            multiple
            hidden
            onChange={(e) => {
              addMergeFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Button
            variant="outlined"
            size="large"
            disabled={busy}
            onClick={() => mergeInputRef.current?.click()}
            sx={{ alignSelf: "flex-start" }}
          >
            {items.length ? "Add more PDFs" : "Choose PDFs"}
          </Button>

          {items.length > 0 && (
            <List dense sx={{ border: 1, borderColor: "divider" }}>
              {items.map((item, index) => (
                <ListItem
                  key={item.id}
                  divider={index < items.length - 1}
                  secondaryAction={
                    <>
                      <IconButton
                        aria-label={`Move ${item.file.name} up`}
                        disabled={busy || index === 0}
                        onClick={() => moveItem(index, -1)}
                      >
                        <ArrowUpwardIcon />
                      </IconButton>
                      <IconButton
                        aria-label={`Move ${item.file.name} down`}
                        disabled={busy || index === items.length - 1}
                        onClick={() => moveItem(index, 1)}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                      <IconButton
                        aria-label={`Remove ${item.file.name}`}
                        disabled={busy}
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={`${index + 1}. ${item.file.name}`}
                    secondary={`${item.pages} ${item.pages === 1 ? "page" : "pages"} · ${formatBytes(item.file.size)}`}
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Button
            variant="contained"
            size="large"
            disabled={items.length < 2 || busy}
            onClick={handleMerge}
            sx={{ alignSelf: "flex-start", minWidth: 180, bgcolor: "primary.dark" }}
          >
            {busy ? "Merging..." : "Merge"}
          </Button>
        </>
      ) : (
        <>
          <input
            ref={splitInputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => {
              handleSplitFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <Button
            variant="outlined"
            size="large"
            disabled={busy}
            onClick={() => splitInputRef.current?.click()}
            sx={{ alignSelf: "flex-start" }}
          >
            {source ? "Choose a different PDF" : "Choose PDF"}
          </Button>

          {source && (
            <Typography>
              {source.file.name} ({source.pages}{" "}
              {source.pages === 1 ? "page" : "pages"},{" "}
              {formatBytes(source.file.size)})
            </Typography>
          )}

          <TextField
            sx={{ maxWidth: 700 }}
            label="Pages"
            placeholder="e.g. 1-3, 5, 8-"
            helperText='Comma-separated pages or ranges. "8-" means page 8 to the end.'
            value={ranges}
            disabled={!source || busy}
            onChange={(e) => setRanges(e.target.value)}
          />

          <TextField
            select
            sx={{ maxWidth: 700 }}
            label="Output"
            value={splitOutput}
            disabled={!source || busy}
            onChange={(e) => setSplitOutput(e.target.value as SplitOutput)}
          >
            <MenuItem value="separate">One PDF per range</MenuItem>
            <MenuItem value="single">All selected pages in one PDF</MenuItem>
          </TextField>

          <Button
            variant="contained"
            size="large"
            disabled={!source || busy}
            onClick={handleSplit}
            sx={{ alignSelf: "flex-start", minWidth: 180, bgcolor: "primary.dark" }}
          >
            {busy ? "Splitting..." : "Split"}
          </Button>
        </>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {outputs.map(({ url, name, size }) => (
        <Alert
          key={url}
          severity="success"
          action={
            <Button
              color="inherit"
              size="small"
              component="a"
              href={url}
              download={name}
            >
              Download
            </Button>
          }
        >
          {name} ({formatBytes(size)})
        </Alert>
      ))}
    </Box>
  );
}
