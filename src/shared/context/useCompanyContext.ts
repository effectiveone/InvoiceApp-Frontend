import { createContext, useContext, ReactElement } from "react";
import { useCompany } from "../Hook/useCompany";

interface ICompanyContext {
  updatedCompanyData: Record<string, string | undefined>;
  setCompanyData: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
  companyData: Record<string, string | undefined>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

export const CompanyContext = createContext<ICompanyContext | null>(null);

export const useCompanyContext = (): ICompanyContext => {
  const context = useContext<ICompanyContext | null>(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};

export const CompanyProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const Company = useCompany();

  return (
    <CompanyContext.Provider value={Company}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
