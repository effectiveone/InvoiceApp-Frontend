import {
  addContractorData,
  getContractorData,
  updateContractorData,
} from "../../store/actions/kontrahenciActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { useModal } from "./useModal";
export const useKontrahent = () => {
  const { open, handleOpen, handleClose } = useModal();
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const kontrahent = useSelector((state) => state.kontrahenci?.contractorData);

  const [updatedCompanyData, setCompanyData] = useState({
    nip: "",
    regon: "",
    street: "",
    city: "",
    zipCode: "",
    companyName: "",
    legalForm: "",
    userEmail: currentUser?.mail,
  });
  useEffect(() => {
    if (!kontrahent?.length) {
      dispatch(getContractorData(currentUser));
    }
  }, [dispatch, kontrahent, currentUser]);

  const handleChange = (event) => {
    setCompanyData({
      ...updatedCompanyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(addContractorData(updatedCompanyData, currentUser));
    handleClose();
  };

  const handleEdit = (id) => {
    handleOpen();

    const thisKontrahent = kontrahent.find((konta) => konta._id === id);
    setCompanyData({
      nip: thisKontrahent.nip,
      regon: thisKontrahent.regon,
      street: thisKontrahent.street,
      city: thisKontrahent.city,
      zipCode: thisKontrahent.zipCode,
      companyName: thisKontrahent.companyName,
      legalForm: thisKontrahent.legalForm,
      userEmail: currentUser?.mail,
    });
    console.log("thisKontrahent", thisKontrahent);
  };

  const handleDelete = (id) => {
    // funkcja obsługująca przycisk Usuń
    console.log(`Delete button clicked for contractor with id: ${id}`);
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleEdit,
    handleDelete,
    updatedCompanyData,
    kontrahent,
    handleSubmit,
    handleChange,
  };
};
