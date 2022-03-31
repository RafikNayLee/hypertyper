import React from "react";
import clsx from "clsx";

const getKeyClassName = ({ hand, finger }) => {
  return `${hand === "right" ? "r" : "l"}-${finger}`;
};
const Key = ({
  text,
  id,
  x,
  y,
  rx,
  width,
  height,
  highlight,
  hand,
  finger,
}) => {
  return (
    <g id={id}>
      <rect
        className={clsx(getKeyClassName({ hand, finger }), {
          highlight: highlight,
          shadow: true,
        })}
        width={width}
        height={height}
        x={x}
        y={y}
        rx={rx}
      />
      <text
        className="buttonKeyText"
        x={x}
        y={y}
        width={width}
        height={height}
        transform="translate(10 20)"
      >
        {text}
      </text>
    </g>
  );
};

Key.defaultProps = {
  width: "84",
  height: "75",
  rx: "14.82",
};

export default Key;
