import React, { createContext, useState, useEffect } from "react";
import { FaBox, FaYandex, FaShoppingBag } from "react-icons/fa";

export const CommissionContext = createContext();

export const CommissionProvider = ({ children }) => {
  const [commissionData, setCommissionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Флаг загрузки

  useEffect(() => {
    const storedData = localStorage.getItem("commissionData");
    if (storedData) {
      setCommissionData(JSON.parse(storedData));
    } else {
      setCommissionData([
        {
          platform: "OZON",
          icon: <FaBox className="text-blue-500 text-lg" />,
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
          icon: <FaYandex className="text-yellow-500 text-lg" />,
          commission: "18%",
          logistics: [{ label: "Стандарт", value: "4.5%" }],
          lastMile: "0 ₽",
          district: "Тарифная сетка", // Кнопка вместо 10 ₽
          acquiring: "1.3%",
          processing: "30 ₽",
          tax: "7%",
          additional: "1%",
          packaging: "30 ₽"
        },
        {
          platform: "WB",
          icon: <FaShoppingBag className="text-purple-500 text-lg" />,
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
      ]);
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
