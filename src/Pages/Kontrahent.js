import Layout from "../shared/components/layout/layout";
import React from "react";
import { KontrahentProvider } from "../shared/context/useKontrahentContext";
import KontrahentContent from "../shared/components/Kontrahent/KontrahentContent";

const Kontrahent = () => {
  return (
    <KontrahentProvider>
      <KontrahentContent />
    </KontrahentProvider>
  );
};

export default Layout(Kontrahent);
