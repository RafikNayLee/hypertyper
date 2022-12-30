import React from "react";
import { useTheme } from "../../hooks";
import Avatar from "./Avatar";
import Card from "react-bootstrap/Card";

const AvatarCard = ({ children }) => {
  const theme = useTheme();
  return (
    <Card
      style={{
        zIndex: "2",
        opacity: "1",
        borderRadius: 20,
        width: "80%",
        boxShadow: theme.mixins.cardShadow,
        paddingTop: 20,
        margin: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          textAlign: "center",
          top: -10,
          width: 100,
          height: 100,
          left: "50%",
          borderRadius: "50%",
          padding: "5px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Avatar />
      </div>

      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default AvatarCard;
