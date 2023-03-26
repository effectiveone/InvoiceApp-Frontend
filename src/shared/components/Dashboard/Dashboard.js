import React from "react";
import { TotalYearsChart } from "./TotalYearsChart";
import { MontlyChart } from "./MontlyChart";
import { useStatisticContext } from "../../Context/useStatisticContext";
import { t } from "i18next";

export const Dashboard = () => {
  const { years } = useStatisticContext();
  if (!years) return "Loading...";
  return (
    <>
      {years?.length !== 0 && (
        <>
          <TotalYearsChart />
          <MontlyChart />
        </>
      )}
      {years?.length === 0 && `${t("noStatisticDate")}`}
    </>
  );
};
