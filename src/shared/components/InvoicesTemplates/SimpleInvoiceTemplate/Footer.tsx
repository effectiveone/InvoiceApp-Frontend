import React from "react";
import { Box } from "@material-ui/core";
import { liczbySlownie } from "liczbyslowniepopolsku";

import { useInvoiceContext } from "../../../Context/useInvoiceContext";
export default function Footer() {
  const { totalGrossValue } = useInvoiceContext();
  return <Box>{liczbySlownie(totalGrossValue)}</Box>;
}
