import {
  addContractorData,
  getContractorData,
} from "../../store/actions/kontrahenciActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";

export const useKontrahent = (handleClose) => {
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
    // funkcja obsługująca przycisk Edytuj
    console.log(`Edit button clicked for contractor with id: ${id}`);
  };

  const handleDelete = (id) => {
    // funkcja obsługująca przycisk Usuń
    console.log(`Delete button clicked for contractor with id: ${id}`);
  };

  return {
    handleEdit,
    handleDelete,
    updatedCompanyData,
    kontrahent,
    handleSubmit,
    handleChange,
  };
};