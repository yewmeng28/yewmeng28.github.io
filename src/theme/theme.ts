import { createTheme } from "@mui/material/styles";

const transition = "background-color 300ms ease, color 300ms ease, border-color 300ms ease, box-shadow 300ms ease";

export const lightTheme = createTheme({
  transitions: {
    duration: {
      standard: 300,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#008cff",
      dark: "#107182",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Kameron", "Geomini", "Merriweather", sans-serif',

    h1: {
      fontFamily: "Geomini",
      fontWeight: 700,
    },

    h2: {
      fontFamily: "Geomini",
      fontWeight: 700,
    },

    h3: {
      fontFamily: "Merriweather",
      fontWeight: 700,
    },

    h4: {
      fontFamily: "Merriweather",
      fontWeight: 100,
    },

    h5: {
      fontFamily: "Geomini",
      fontWeight: 100,
    },

    h6: {
      fontFamily: "Geomini",
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  transitions: {
    duration: {
      standard: 300,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(192 131 208)",
      light: "rgb(226 114 91)",
      dark: "#74429f",
      contrastText: "#ffffff",
    },
    background: {
      default: "#16171d",
      paper: "#1d2028",
    },
  },
  typography: {
    fontFamily: '"Inter", "Kameron", "Geomini", "Merriweather", sans-serif',

    h1: {
      fontFamily: "Geomini",
      fontWeight: 700,
    },

    h2: {
      fontFamily: "Geomini",
      fontWeight: 700,
    },

    h3: {
      fontFamily: "Merriweather",
      fontWeight: 700,
    },

    h4: {
      fontFamily: "Merriweather",
      fontWeight: 100,
    },

    h5: {
      fontFamily: "Geomini",
      fontWeight: 100,
    },

    h6: {
      fontFamily: "Geomini",
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition,
        },
      },
    },
  },
});