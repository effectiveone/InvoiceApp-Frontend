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
import ContrahentTable from "../shared/components/Kontrahent/ContrahentTable";

const Kontrahent = () => {
  return (
    <KontrahentProvider>
      <MyComponent />
    </KontrahentProvider>
  );
};
const MyComponent = () => {
  const { handleOpen, kontrahent, setButtonText, handleModal } =
    useKontrahentContext();

  return (
    <>
      <Box>
        <Button variant="contained" color="primary" onClick={handleModal}>
          Add Kontrahent
        </Button>
        <ContrahentModal />
        {/* {Array.isArray(kontrahent) &&
          kontrahent.length > 0 &&
          kontrahent?.map((contractor) => <ContrahentGrid {...contractor} />)} */}
        <ContrahentTable />
      </Box>
    </>
  );
};

export default Layout(Kontrahent);
