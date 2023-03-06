import { useState, useEffect } from "react";
import {
  getCompanyData,
  addCompanyData,
} from "../../store/actions/mycompanyActions";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "./useUser";

export const useCompany = () => {
  const { currentUser } = useUser();

  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.myCompany.companyData);

  const [updatedCompanyDate, setCompanyData] = useState({
    nip: "",
    regon: "",
    street: "",
    city: "",
    zipCode: "",
    companyName: "",
    legalForm: "",
    userEmail: currentUser?.mail,
  });

  const handleChange = (event) => {
    setCompanyData({
      ...updatedCompanyDate,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (!companyData?.length) {
      dispatch(getCompanyData(currentUser));
      setCompanyData(companyData);
    }
  }, [dispatch, companyData, currentUser]);

  const handleSubmit = () => {
    dispatch(addCompanyData(updatedCompanyDate, currentUser));
  };

  return {
    updatedCompanyDate,
    setCompanyData,
    companyData,
    handleChange,
    handleSubmit,
  };
};
