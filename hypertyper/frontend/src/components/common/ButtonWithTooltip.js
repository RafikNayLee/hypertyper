import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useMediaQuery } from "../../hooks";
const ButtonWithTooltip = ({
  children,
  tooltipText,
  tooltipPlacement,
  onClick,
  ...rest
}) => {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  return (
    <OverlayTrigger
      placement={tooltipPlacement}
      overlay={
        <Tooltip id={`button-tooltip-${tooltipText}`}>{tooltipText}</Tooltip>
      }
    >
      <Button onClick={onClick} {...rest} size={isDesktop ? "lg" : "sm"}>
        {children}
      </Button>
    </OverlayTrigger>
  );
};

ButtonWithTooltip.defaultProps = {
  tooltipPlacement: "right",
};
export default ButtonWithTooltip;
