import Layout from "../shared/components/layout/layout";
import React from "react";
import { Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { legalForms } from "../shared/utils/forms";
import {
  useKontrahentContext,
  KontrahentProvider,
} from "../shared/context/useKontrahentContext";
import { useModal } from "../shared/hook/useModal";
import ContrahentModal from "../shared/components/Kontrahent/ContrahentModal";
import ContrahentGrid from "../shared/components/Kontrahent/ContrahentGrid";

const Kontrahent = () => {
  return (
    <KontrahentProvider>
      <MyComponent />
    </KontrahentProvider>
  );
};
const MyComponent = () => {
  const { handleOpen, kontrahent, setButtonText } = useKontrahentContext();

  const handleModal = () => {
    setButtonText("Zapisz");
    handleOpen();
  };

  return (
    <>
      <Box>
        <Button variant="contained" color="primary" onClick={handleModal}>
          Add Kontrahent
        </Button>
        <ContrahentModal />
        {kontrahent?.map((contractor) => (
          <ContrahentGrid {...contractor} />
        ))}
      </Box>
    </>
  );
};

export default Layout(Kontrahent);
