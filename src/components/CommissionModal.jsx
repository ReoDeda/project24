import React, { useState, useCallback, useEffect, useContext, useMemo } from "react";
import { CommissionContext } from "../context/CommissionProvider";
import { FaTimes, FaPercentage, FaChevronLeft, FaChevronRight, FaBox, FaYandex, FaShoppingBag } from "react-icons/fa";

// Стили для платформ
const platformStyles = {
  OZON: { header: "from-blue-100 to-blue-50", border: "border-blue-200", icon: "text-blue-500", hover: "hover:border-blue-300" },
  Yandex: { header: "from-yellow-100 to-yellow-50", border: "border-yellow-200", icon: "text-yellow-500", hover: "hover:border-yellow-300" },
  WB: { header: "from-purple-100 to-purple-50", border: "border-purple-200", icon: "text-purple-500", hover: "hover:border-purple-300" }
};

// Компонент модального окна комиссии
export default function CommissionModal({ onClose }) {
  const { commissionData, updateCommissionData, isLoading } = useContext(CommissionContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isLoading && commissionData.length > 0) {
      setData(commissionData);
    }
  }, [commissionData, isLoading]);

  if (isLoading) {
    return <div className="text-center p-4">Загрузка...</div>;
  }

  const handleValueChange = useCallback((platformIndex, field, value) => {
    const newData = [...data];

    if (field === "logistics" && Array.isArray(newData[platformIndex].logistics)) {
      if (typeof value === "object") {
        const logisticsIndex = newData[platformIndex].logistics.findIndex((item) => item.label === value.label);
        if (logisticsIndex !== -1) {
          newData[platformIndex].logistics[logisticsIndex].value = value.value;
        }
      }
    } else {
      newData[platformIndex][field] = value;
    }

    setData(newData);
  }, [data]);

  const handleSave = () => {
    updateCommissionData(data);
    onClose();
  };

  const nextPlatform = () => {
    setData((prev) => [...prev.slice(1), prev[0]]);
  };

  const prevPlatform = () => {
    setData((prev) => [...prev.slice(-1), ...prev.slice(0, -1)]);
  };

  const totalCommission = useMemo(() => {
    return data.map(platform => parseFloat(platform.commission.replace('%', ''))).reduce((a, b) => a + b, 0).toFixed(1);
  }, [data]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaPercentage className="text-2xl text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Комиссии платформ</h2>
            <p className="text-sm text-gray-600">Средняя комиссия: {totalCommission}%</p>
          </div>
          <button onClick={onClose} className="btn-secondary">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Переключение платформ (мобильная версия) */}
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-2">
            <button onClick={prevPlatform} className="p-2 text-gray-600 hover:text-gray-800">
              <FaChevronLeft />
            </button>
            <div className="flex gap-2">
              {data.map((platform, index) => (
                <button key={index} onClick={() => setData((prev) => [...prev.slice(index), ...prev.slice(0, index)])} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${index === 0 ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                  {platform.platform}
                </button>
              ))}
            </div>
            <button onClick={nextPlatform} className="p-2 text-gray-600 hover:text-gray-800">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Карточки платформ */}
        <div className="p-4">
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {data.map((row, index) => (
              <div key={index} className={`card animate-fade-in border-2 ${platformStyles[row.platform].border} ${platformStyles[row.platform].hover}`}>
                <div className={`bg-gradient-to-r ${platformStyles[row.platform].header} px-6 py-4 border-b ${platformStyles[row.platform].border}`}>
                  <div className="flex items-center gap-3">
                    <row.icon className={`text-2xl ${platformStyles[row.platform].icon}`} />
                    <h3 className="text-lg font-bold text-gray-800">{row.platform}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {Object.keys(row).map((key) => (
                    key !== "platform" && key !== "icon" && key !== "color" && (
                      <div key={key} className="flex items-center text-sm group">
                        <span className="text-gray-600 w-32">{key}</span>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={row[key]}
                            onChange={(e) => handleValueChange(index, key, e.target.value)}
                            className="border px-3 py-2 rounded-md w-full"
                          />
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 flex justify-end">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}