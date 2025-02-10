import React, { useState } from 'react';
import { FaRocket, FaRegMoneyBillAlt, FaTruck } from 'react-icons/fa';

const platformIcons = {
  OZON: <FaRocket className="text-blue-500" />,
  Yandex: <FaTruck className="text-yellow-500" />,
  WB: <FaRegMoneyBillAlt className="text-red-500" />
};

const ExpensesTable = () => {
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  
  const commissionData = {
    OZON: {
      Комиссия: '',
      Логистика: '',
      'Посл.миля': '',
      Округ: '',
      Эквайринг: '',
      Обработка: '',
      Налог: '',
      'Доп.расх': '',
      Упаковка: ''
    },
    Yandex: {
      Комиссия: '',
      Логистика: '',
      'Посл.миля': '',
      Округ: '',
      Эквайринг: '',
      Обработка: '',
      Налог: '',
      'Доп.расх': '',
      Упаковка: ''
    },
    WB: {
      Комиссия: '',
      Логистика: '',
      'Посл.миля': '',
      Округ: '',
      Эквайринг: '',
      Обработка: '',
      Налог: '',
      'Доп.расх': '',
      Упаковка: ''
    }
  };

  return (
    <div className="animate-slideDown mt-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">Расчет прибыли</h3>
        
        {/* Volume Weight Dropdown Button */}
        <button
          onClick={() => setIsVolumeVisible(!isVolumeVisible)}
          className="mt-4 btn-secondary w-full"
        >
          Объемный вес
        </button>

        {/* Volume Weight Dropdown Content */}
        {isVolumeVisible && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Объем товара</h4>
                <div className="flex justify-between text-sm">
                  <span>Расчет:</span>
                  <span className="font-mono">0.000 м3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Округление:</span>
                  <span className="font-mono">0 м3</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Объемный вес</h4>
                <div className="flex justify-between text-sm">
                  <span>Расчет:</span>
                  <span className="font-mono">0.000 кг</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Округление:</span>
                  <span className="font-mono">0 кг</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Площадка</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Комиссия</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Логистика</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Посл.миля</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Округ</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Эквайринг</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Обработка</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Налог</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Доп.расх</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Упаковка</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Прибыль</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {['OZON', 'Yandex', 'WB'].map((platform) => (
              <tr key={platform} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {platformIcons[platform]}
                    <span className="font-medium">{platform}</span>
                  </div>
                </td>
                {['Комиссия', 'Логистика', 'Посл.миля', 'Округ', 'Эквайринг', 'Обработка', 'Налог', 'Доп.расх', 'Упаковка'].map((field) => (
                  <td key={field} className="px-4 py-3 text-gray-600">
                    {commissionData[platform][field]}
                  </td>
                ))}
                <td className="px-4 py-3 font-semibold text-green-600">
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 Все расчеты приведены с учетом последних изменений в тарифах платформ
        </p>
      </div>
    </div>
  );
};

export default ExpensesTable;