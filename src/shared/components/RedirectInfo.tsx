import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

interface RedirectInfoProps {
  text: string;
  redirectText: string;
  additionalStyles?: Record<string, unknown>;
  redirectHandler: () => void;
}

const RedirectText = styled("span")({
  color: "#00AFF4",
  fontWeight: 500,
  cursor: "pointer",
});

const RedirectInfo = ({
  text,
  redirectText,
  additionalStyles,
  redirectHandler,
}: RedirectInfoProps): ReactElement => {
  return (
    <Typography
      sx={{ color: "#72767d" }}
      style={additionalStyles ?? {}}
      variant="subtitle2"
    >
      {text}
      <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
    </Typography>
  );
};

export default RedirectInfo;
