import ContrahentModal from "./ContrahentModal";
import ContrahentTable from "./ContrahentTable";
import { useKontrahentContext } from "../../context/useKontrahentContext";
import { Button, Box } from "@material-ui/core";

const KontrahentContent = () => {
  const { handleModal } = useKontrahentContext();

  return (
    <>
      <Box>
        <Button variant="contained" color="primary" onClick={handleModal}>
          Add Kontrahent
        </Button>
        <ContrahentModal />
        <ContrahentTable />
      </Box>
    </>
  );
};

export default KontrahentContent;
