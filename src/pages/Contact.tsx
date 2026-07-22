import { Box, Typography } from "@mui/material";
import Header from "../components/Header.tsx";
import FlipCard from "../components/FlipCards/FlipCard.tsx";

export default function Contact() {

  return (
    <>
      <Header/>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          pt: 5,
          bgcolor: "transparent",
          color: "text.primary",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
        >
          Contact Me!
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 3,
            p: 2,
          }}
        >
          <FlipCard
            front={
              <Typography variant="h5">
                Mobile Phone
              </Typography>
            }
            back={
              <Typography variant="h5">
                +65 90019218
              </Typography>
            }
          />
          <FlipCard
            front={
              <Typography variant="h5">
                Email
              </Typography>
            }
            back={
              <Typography variant="h5">
                yewmengchai@gmail.com
              </Typography>
            }
          />
        </Box>
      </Box>
    </>
  );
}