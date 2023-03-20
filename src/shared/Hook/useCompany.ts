import { useState, useEffect } from "react";
import {
  getCompanyData,
  addCompanyData,
} from "../../Store/actions/mycompanyActions";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "./useUser";

interface CompanyData {
  nip: string;
  regon: string;
  street: string;
  city: string;
  zipCode: string;
  companyName: string;
  legalForm: string;
}

interface CompanyState {
  companyData: CompanyData;
}

interface RootState {
  myCompany: CompanyState;
}

export const useCompany = () => {
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const companyData = useSelector<RootState, CompanyData>(
    (state) => state.myCompany.companyData
  );

  const [updatedCompanyData, setCompanyData] = useState<CompanyData>(companyData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
      ...updatedCompanyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(addCompanyData(updatedCompanyData, currentUser));
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getCompanyData(currentUser));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (Object.keys(updatedCompanyData).length === 0) {
      setCompanyData(companyData);
    }
  }, [dispatch, addCompanyData, companyData]);

  return {
    updatedCompanyData,
    setCompanyData,
    companyData,
    handleChange,
    handleSubmit,
  };
};
