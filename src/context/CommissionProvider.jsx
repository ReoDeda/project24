import React, { createContext, useState, useEffect } from "react";

// Создаём контекст
export const CommissionContext = createContext();

// Начальные данные (если localStorage пуст)
const initialData = [
  {
    platform: "OZON",
    commission: "19%",
    logistics: [
      { label: "1л", value: "76 ₽" },
      { label: "Доп", value: "12 ₽" }
    ],
    lastMile: "5.5%",
    district: "0 ₽",
    acquiring: "1.5%",
    processing: "30 ₽",
    tax: "7%",
    additional: "1%",
    packaging: "30 ₽"
  },
  {
    platform: "Yandex",
    commission: "18%",
    logistics: "4.5%",
    lastMile: "0 ₽",
    district: "10 ₽",
    acquiring: "1.3%",
    processing: "30 ₽",
    tax: "7%",
    additional: "1%",
    packaging: "30 ₽"
  },
  {
    platform: "WB",
    commission: "18.5%",
    logistics: [
      { label: "1л", value: "50.75 ₽" },
      { label: "Доп", value: "12.33 ₽" }
    ],
    lastMile: "0 ₽",
    district: "0 ₽",
    acquiring: "0%",
    processing: "30 ₽",
    tax: "7%",
    additional: "1%",
    packaging: "30 ₽"
  }
];

export const CommissionProvider = ({ children }) => {
  const [commissionData, setCommissionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем данные из localStorage или берём начальные
  useEffect(() => {
    const storedData = localStorage.getItem("commissionData");
    if (storedData) {
      setCommissionData(JSON.parse(storedData));
    } else {
      setCommissionData(initialData); // Загружаем дефолтные данные
      localStorage.setItem("commissionData", JSON.stringify(initialData)); // Сохраняем в хранилище
    }
    setIsLoading(false);
  }, []);

  // Автоматическое сохранение в localStorage
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