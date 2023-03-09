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

  const [updatedCompanyData, setCompanyData] = useState({});

  const handleChange = (event) => {
    setCompanyData({
      ...updatedCompanyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(addCompanyData(updatedCompanyData, currentUser));
  };

  useEffect(() => {
    dispatch(getCompanyData(currentUser));
  }, [dispatch, currentUser]);

  useEffect(() => {
    setCompanyData(companyData);
  }, [companyData]);

  return {
    updatedCompanyData,
    setCompanyData,
    companyData,
    handleChange,
    handleSubmit,
  };
};
