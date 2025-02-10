import React, { useState, useContext } from "react";
import { FaTimes, FaPercentage, FaBox, FaYandex, FaShoppingBag } from "react-icons/fa";
import { CommissionContext } from "../context/CommissionProvider";

const platformIcons = {
  OZON: <FaBox className="text-blue-500 text-lg" />,
  Yandex: <FaYandex className="text-yellow-500 text-lg" />,
  WB: <FaShoppingBag className="text-purple-500 text-lg" />
};

export default function CommissionModal({ onClose }) {
  const { commissionData, setCommissionData } = useContext(CommissionContext);
  const [data, setData] = useState([...commissionData]);

  const handleValueChange = (platformIndex, field, value) => {
    const newData = [...data];

    if (field === "logistics" && Array.isArray(newData[platformIndex].logistics)) {
      newData[platformIndex].logistics = newData[platformIndex].logistics.map((item, idx) => 
        idx === value.index ? { ...item, value: value.value } : item
      );
    } else {
      newData[platformIndex][field] = value;
    }

    setData(newData);
  };

  const handleSave = () => {
    setCommissionData(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Заголовок */}
        <div className="flex justify-between items-center bg-gray-100 p-4 border-b">
          <div className="flex items-center gap-3">
            <FaPercentage className="text-xl text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800">Комиссия маркетплейсов</h2>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Контент */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((platform, index) => (
              <div key={index} className="border p-5 rounded-xl shadow-lg bg-gray-50 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-4 border-b pb-2">
                  {platformIcons[platform.platform]}
                  <h3 className="text-base font-bold text-gray-800">{platform.platform}</h3>
                </div>

                {/* Комиссия */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-800">Комиссия:</span>
                  <div className="flex items-center w-24">
                    <input
                      type="text"
                      value={platform.commission.replace(/[^\d.]/g, '')} // Только число
                      onChange={(e) => handleValueChange(index, "commission", e.target.value)}
                      className="border px-2 py-1 rounded-lg w-full text-sm text-left focus:ring-2 focus:ring-blue-300"
                    />
                    <span className="ml-2 text-xs text-gray-500">%</span>
                  </div>
                </div>

                {/* Логистика (отдельный стиль) */}
                {Array.isArray(platform.logistics) && (
                  <div className="mt-2 p-3 bg-gray-100 rounded-lg border">
                    <span className="block text-sm font-semibold text-gray-800 mb-2">Логистика:</span>
                    {platform.logistics.map((logItem, logIndex) => (
                      <div key={logIndex} className="flex justify-between items-center py-1">
                        <span className="text-sm font-medium">{logItem.label}:</span>
                        <div className="flex items-center w-24">
                          <input
                            type="text"
                            value={logItem.value.replace(/[^\d.]/g, '')} // Только число
                            onChange={(e) =>
                              handleValueChange(index, "logistics", { index: logIndex, value: e.target.value })
                            }
                            className="border px-2 py-1 rounded-lg w-full text-sm text-left focus:ring-2 focus:ring-blue-300"
                          />
                          <span className="ml-2 text-xs text-gray-500">
                            {platform.platform === "Yandex" ? "%" : "₽"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Остальные поля */}
                {Object.entries(platform).map(([key, value]) => (
                  key !== "platform" &&
                  key !== "icon" &&
                  key !== "color" &&
                  key !== "logistics" &&
                  key !== "commission" && ( // Убираем повтор "commission"
                    <div key={key} className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium text-gray-800">
                        {key === "lastMile" ? "Последняя миля" :
                         key === "district" ? "Округ" :
                         key === "acquiring" ? "Эквайринг" :
                         key === "processing" ? "Обработка" :
                         key === "tax" ? "Налог" :
                         key === "additional" ? "Доп. расходы" :
                         key === "packaging" ? "Упаковка" :
                         key}
                      </span>
                      <div className="flex items-center w-24">
                        <input
                          type="text"
                          value={value.replace(/[^\d.]/g, '')} // Только число
                          onChange={(e) => handleValueChange(index, key, e.target.value)}
                          className="border px-2 py-1 rounded-lg w-full text-sm text-left focus:ring-2 focus:ring-blue-300"
                        />
                        <span className="ml-2 text-xs text-gray-500">
                          {["lastMile", "acquiring", "tax", "additional"].includes(key) ? "%" : "₽"}
                        </span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки */}
        <div className="p-4 flex justify-end bg-gray-100 border-t">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm mr-3 hover:bg-gray-600 transition">
            Закрыть
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
