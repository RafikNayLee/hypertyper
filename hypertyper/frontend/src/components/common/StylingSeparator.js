import React from "react";
import { useTheme } from "../../hooks";

const StylingSeparator = ({ height, ...props }) => {
  const theme = useTheme();
  return (
    <hr
      {...props}
      style={{
        background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        width: "15%",
        height,
        margin: "0px 0px",
        padding: "0px 0px",
      }}
    />
  );
};

StylingSeparator.defaultProps = {
  height: "5px",
};
export default StylingSeparator;
