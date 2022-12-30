const theme = {
  palette: {
    primary: {
      light: "#bbddf9",
      main: "#3084b1",
      dark: "#214094",
    },
    secondary: {
      light: "#E0A9A5",
      main: "#e75b52",
      dark: "#E33328",
    },
    white: "white",
    gray: {
      light: "#E9E9E9",
      main: "#f8f9fa",
      dark: "#D4D4D4",
    },
  },
  mixins: {
    hintKeyHeight: 25,
    cardShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    positionAbsoluteCenter: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
};

const useTheme = () => {
  return theme;
};

export default useTheme;
