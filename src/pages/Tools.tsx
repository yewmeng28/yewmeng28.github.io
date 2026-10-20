import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { toolTabs } from "../config/navigation.ts";

export default function Tools() {
  const { pathname } = useLocation();
  // Match whole path segments so "/tools/pdf" doesn't claim "/tools/pdf-merge-split".
  const current = toolTabs.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`)
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        pt: 5,
        pb: 8,
        color: "text.primary",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        <Typography variant="h3" gutterBottom>
          Tools
        </Typography>

        <Tabs
          value={current?.path ?? false}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{ mb: 4, borderBottom: 1, borderColor: "divider" }}
        >
          {toolTabs.map(({ label, path }) => (
            <Tab
              key={path}
              label={label}
              value={path}
              component={Link}
              to={path}
            />
          ))}
        </Tabs>

        {/* Tool code (PDF/video libraries) loads only when its tab is opened. */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}
