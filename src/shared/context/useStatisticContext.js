import { createContext, useContext } from "react";
import { useStatistic } from "../Hook/useStatistic";

const StatisticContext = createContext();

export const useStatisticContext = () => useContext(StatisticContext);

export const StatisticProvider = ({ children }) => {
  const Statistic = useStatistic();

  return (
    <StatisticContext.Provider value={Statistic}>
      {children}
    </StatisticContext.Provider>
  );
};

export default StatisticProvider;
