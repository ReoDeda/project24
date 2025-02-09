import React, { useState, useContext, useEffect } from "react";
import { FaTimes, FaPercentage, FaBox, FaYandex, FaShoppingBag } from "react-icons/fa";
import { CommissionContext } from "../context/CommissionProvider.jsx";

const platformIcons = {
  OZON: FaBox,
  Yandex: FaYandex,
  WB: FaShoppingBag,
};

const platformStyles = {
  OZON: { header: "from-blue-100 to-blue-50", border: "border-blue-200", icon: "text-blue-500", hover: "hover:border-blue-300" },
  Yandex: { header: "from-yellow-100 to-yellow-50", border: "border-yellow-200", icon: "text-yellow-500", hover: "hover:border-yellow-300" },
  WB: { header: "from-purple-100 to-purple-50", border: "border-purple-200", icon: "text-purple-500", hover: "hover:border-purple-300" },
};

export default function CommissionModal({ onClose }) {
  const { commissionData, updateCommissionData } = useContext(CommissionContext);
  const [data, setData] = useState([]);

  // Загружаем данные из контекста при открытии модального окна
  useEffect(() => {
    if (commissionData.length > 0) {
      setData(JSON.parse(JSON.stringify(commissionData))); // Глубокая копия
    }
  }, [commissionData]);

  const handleValueChange = (platformIndex, field, value) => {
    const newData = [...data];

    if (field === "logistics" && Array.isArray(newData[platformIndex].logistics)) {
      const logisticsIndex = newData[platformIndex].logistics.findIndex((item) => item.label === value.label);
      if (logisticsIndex !== -1) {
        newData[platformIndex].logistics[logisticsIndex].value = value.value;
      }
    } else {
      newData[platformIndex][field] = value;
    }

    setData(newData);
  };

  const handleSave = () => {
    updateCommissionData(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaPercentage className="text-2xl text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Комиссии платформ</h2>
          </div>
          <button onClick={onClose} className="btn-secondary">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Карточки платформ */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((row, index) => (
              <div key={index} className={`border border-gray-300 rounded-lg p-4 ${platformStyles[row.platform]?.border}`}>
                <div className={`bg-gradient-to-r ${platformStyles[row.platform]?.header} px-6 py-4 border-b ${platformStyles[row.platform]?.border}`}>
                  <div className="flex items-center gap-3">
                    {platformIcons[row.platform] && React.createElement(platformIcons[row.platform], { className: `text-2xl ${platformStyles[row.platform]?.icon}` })}
                    <h3 className="text-lg font-bold text-gray-800">{row.platform}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Поля комиссии */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium">Комиссия:</label>
                    <input
                      type="text"
                      value={row.commission}
                      onChange={(e) => handleValueChange(index, "commission", e.target.value)}
                      className="border px-3 py-2 rounded-md w-full"
                    />
                  </div>

                  {/* Логистика (если массив) */}
                  {Array.isArray(row.logistics) && (
                    <div className="mb-2">
                      <label className="block text-sm font-medium">Логистика:</label>
                      {row.logistics.map((logItem, logIndex) => (
                        <div key={logIndex} className="flex items-center gap-2">
                          <span className="text-sm">{logItem.label}:</span>
                          <input
                            type="text"
                            value={logItem.value}
                            onChange={(e) =>
                              handleValueChange(index, "logistics", { label: logItem.label, value: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md w-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Остальные поля */}
                  {Object.keys(row).map((key) => {
                    if (key !== "platform" && key !== "logistics") {
                      return (
                        <div key={key} className="mb-2">
                          <label className="block text-sm font-medium">{key}:</label>
                          <input
                            type="text"
                            value={row[key]}
                            onChange={(e) => handleValueChange(index, key, e.target.value)}
                            className="border px-3 py-2 rounded-md w-full"
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
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