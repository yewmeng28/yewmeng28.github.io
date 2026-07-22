import {Box, Typography} from "@mui/material";
import TypingText from "./TypingText.tsx";

export default function Introduction() {

  const words = [
    "Software Engineer",
    "Full Stack Developer",
    "Passionate Musician",
    "React Developer",
    "Piano Teacher",
    "Casual Gamer",
    "Spring Boot Developer",
    "Quick Learner",
    "Nature Lover"
  ];

  return (
    <Box sx={{ p: '20px', pt: '0px' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          p: '20px',
          pt: '0px',
          fontSize: {
            xs: "1rem",
            md: "2rem",
          },
        }}
      >
        I'm a <TypingText words={words} />
      </Typography>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontSize: {
            xs: "0.9rem",
            md: "1.2rem",
          },
        }}
      >
        Hello! I am Chai Yew Meng, a passionate software engineer with a love for coding and problem-solving.
        <br/>
        I enjoy creating innovative solutions and exploring new technologies.
        <br/>
        When I'm not coding, you can find me playing various instruments, hanging out with my friends or keeping a healthy lifestyle.
        <br/><br/>
        Feel free to use the header buttons to navigate the website, or scroll down to explore more!
      </Typography>
    </Box>
  )
}