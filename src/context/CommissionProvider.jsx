import React, { createContext, useState, useEffect } from "react";

// Создаём контекст
export const CommissionContext = createContext();

export const CommissionProvider = ({ children }) => {
  const [commissionData, setCommissionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Флаг загрузки

  useEffect(() => {
    const storedData = localStorage.getItem("commissionData");
    if (storedData) {
      setCommissionData(JSON.parse(storedData));
    }
    setIsLoading(false); // Данные загружены
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("commissionData", JSON.stringify(commissionData));
    }
  }, [commissionData, isLoading]);

  const updateCommissionData = (newData) => {
    setCommissionData(newData);
  };

  return (
    <CommissionContext.Provider value={{ commissionData, updateCommissionData, isLoading }}>
      {children}
    </CommissionContext.Provider>
  );
};