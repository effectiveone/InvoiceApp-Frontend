import {
  addContractorData,
  getContractorData,
  updateContractorData,
  deleteContractor,
} from "../../Store/actions/kontrahenciActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { useModal } from "./useModal";
import useSubmitButton from "./useSubmitButton";

interface CompanyData {
  nip: string;
  regon: string;
  street: string;
  city: string;
  zipCode: string;
  companyName: string;
  legalForm: string;
  userEmail: string | undefined;
}

export interface KontrahentProps {
  button: JSX.Element;
  setButtonText: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleModal: () => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  updatedCompanyData: CompanyData;
  kontrahent: CompanyData[] | undefined;
  handleSubmit: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useKontrahent = (): KontrahentProps => {
  const { open, handleOpen, handleClose } = useModal();
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const kontrahent = useSelector(
    (state: any) => state.kontrahenci?.contractorData
  );
  const [buttonText, setButtonText] = useState<string>();

  const [updatedCompanyData, setCompanyData] = useState<CompanyData>({
    nip: "",
    regon: "",
    street: "",
    city: "",
    zipCode: "",
    companyName: "",
    legalForm: "",
    userEmail: currentUser?.email,
  });

  useEffect(() => {
    if (!kontrahent?.length && currentUser) {
      dispatch(getContractorData(currentUser));
    }
  }, [dispatch, kontrahent, currentUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
      ...updatedCompanyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(addContractorData(updatedCompanyData, currentUser));
    handleClose();
  };

  const [paramsId, setParamsId] = useState<string>();
  const handleSubmitEdit = () => {
    dispatch(updateContractorData(updatedCompanyData, paramsId, currentUser));
    handleClose();
  };

  const handleModal = () => {
    setButtonText("Zapisz");
    handleOpen();
    setCompanyData({
      nip: "",
      regon: "",
      street: "",
      city: "",
      zipCode: "",
      companyName: "",
      legalForm: "",
      userEmail: currentUser?.email,
    });
  };

  const handleEdit = (id: string) => {
    handleOpen();
    setParamsId(id);
    const thisKontrahent = kontrahent?.find((konta) => konta._id === id);
    setCompanyData({
      nip: thisKontrahent?.nip || "",
      regon: thisKontrahent?.regon || "",
      street: thisKontrahent?.street || "",
      city: thisKontrahent?.city || "",
      zipCode: thisKontrahent?.zipCode || "",
      companyName: thisKontrahent?.companyName || "",
      legalForm: thisKontrahent?.legalForm || "",
      userEmail: currentUser?.email,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteContractor(id, currentUser));
  };

  const button = useSubmitButton(handleSubmit, handleSubmitEdit, buttonText);

  useEffect(() => {
    if (currentUser) {
      dispatch(getContractorData(currentUser));
    }
  }, [
    deleteContractor,
    updateContractorData,
    addContractorData,
    currentUser,
    dispatch,
  ]);

  return {
    button,
    setButtonText,
    handleModal,
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
