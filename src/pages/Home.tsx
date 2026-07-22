import { Box, Card, CardContent } from "@mui/material";
import Header from "../components/Header.tsx";
import Introduction from "../components/Introduction.tsx";
import Greeting from "../components/Greeting.tsx";
import TechStack from "../components/TechStack.tsx";

export default function Home() {

  return (
    <>
      <Header/>
      {/*TODO: refactor the components, keep Home simple.*/}
      <Box
        sx={{
          minHeight: "200vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          bgcolor: "transparent",
          color: "text.primary",
          gap: 5,
          pt: 5,
        }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 4,
            p: 2,
            bgcolor: "transparent",
          }}
        >
          <CardContent>
            <Greeting/>
            <Introduction/>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "100%",
            borderRadius: 4,
            p: 2,
            bgcolor: "transparent",
          }}
        >
          <CardContent>
            <TechStack/>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}