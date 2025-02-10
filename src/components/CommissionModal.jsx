import React, { useState, useCallback, useMemo } from 'react'
import { FaTimes, FaPercentage, FaChevronLeft, FaChevronRight, FaBox, FaYandex, FaShoppingBag } from 'react-icons/fa'

const initialData = [
  {
    platform: 'OZON',
    icon: FaBox,
    color: 'blue',
    commission: '19%',
    logistics: [
      { label: '1л', value: '76 ₽' },
      { label: 'Доп', value: '12 ₽' }
    ],
    lastMile: '5.5%',
    district: '0 ₽',
    acquiring: '1.5%',
    processing: '30 ₽',
    tax: '7%',
    additional: '1%',
    packaging: '30 ₽'
  },
  {
    platform: 'Yandex',
    icon: FaYandex,
    color: 'yellow',
    commission: '18%',
    logistics: '4.5%',
    lastMile: '0 ₽',
    district: '10 ₽',
    acquiring: '1.3%',
    processing: '30 ₽',
    tax: '7%',
    additional: '1%',
    packaging: '30 ₽'
  },
  {
    platform: 'WB',
    icon: FaShoppingBag,
    color: 'purple',
    commission: '18.5%',
    logistics: [
      { label: '1л', value: '50.75 ₽' },
      { label: 'Доп', value: '12.33 ₽' }
    ],
    lastMile: '0 ₽',
    district: '0 ₽',
    acquiring: '0%',
    processing: '30 ₽',
    tax: '7%',
    additional: '1%',
    packaging: '30 ₽'
  }
]

const platformStyles = {
  OZON: {
    header: 'from-blue-100 to-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-500',
    hover: 'hover:border-blue-300'
  },
  Yandex: {
    header: 'from-yellow-100 to-yellow-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-500',
    hover: 'hover:border-yellow-300'
  },
  WB: {
    header: 'from-purple-100 to-purple-50',
    border: 'border-purple-200',
    icon: 'text-purple-500',
    hover: 'hover:border-purple-300'
  }
}

export default function CommissionModal({ onClose }) {
  const [data, setData] = useState(initialData)
  const [isVisible, setIsVisible] = useState(false)
  const [activePlatform, setActivePlatform] = useState(0)

  React.useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  const handleValueChange = useCallback((platformIndex, field, value) => {
    const newData = [...data]
    
    if (field === 'logistics' && Array.isArray(newData[platformIndex].logistics)) {
      if (typeof value === 'object') {
        const logisticsIndex = newData[platformIndex].logistics.findIndex(
          item => item.label === value.label
        )
        if (logisticsIndex !== -1) {
          newData[platformIndex].logistics[logisticsIndex].value = value.value
        }
      }
    } else {
      newData[platformIndex][field] = value
    }

    setData(newData)
  }, [data])

  const nextPlatform = () => {
    setActivePlatform((prev) => (prev + 1) % data.length)
  }

  const prevPlatform = () => {
    setActivePlatform((prev) => (prev - 1 + data.length) % data.length)
  }

  const renderPlatformCard = (row, platformIndex, isMobile = false) => {
    const fields = [
      { 
        label: 'Комиссия', 
        field: 'commission', 
        unit: '%',
        type: 'number',
        group: 'main'
      },
      { 
        label: 'Логистика', 
        field: 'logistics', 
        custom: true,
        group: 'main'
      },
      { 
        label: 'Посл. миля', 
        field: 'lastMile', 
        unit: '%',
        type: 'number',
        group: 'delivery'
      },
      { 
        label: 'Округ', 
        field: 'district', 
        unit: '₽',
        type: 'number',
        group: 'delivery'
      },
      { 
        label: 'Эквайринг', 
        field: 'acquiring', 
        unit: '%',
        type: 'number',
        group: 'finance'
      },
      { 
        label: 'Обработка', 
        field: 'processing', 
        unit: '₽',
        type: 'number',
        group: 'finance'
      },
      { 
        label: 'Налог', 
        field: 'tax', 
        unit: '%',
        type: 'number',
        group: 'finance'
      },
      { 
        label: 'Доп. расх.', 
        field: 'additional', 
        unit: '%',
        type: 'number',
        group: 'other'
      },
      { 
        label: 'Упаковка', 
        field: 'packaging', 
        unit: '₽',
        type: 'number',
        group: 'other'
      }
    ]

    const styles = platformStyles[row.platform]
    const Icon = row.icon

    const renderField = (field) => (
      <div key={field.field} className="flex items-center text-sm group">
        <span className="text-gray-600 w-32">{field.label}</span>
        <div className="flex-1">
          {field.custom ? (
            Array.isArray(row.logistics) ? (
              <div className="flex items-center gap-4">
                {row.logistics.map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="text-sm font-medium">{item.label}:</span>
                    <input
                      type="number"
                      value={parseFloat(item.value.replace(/[^0-9.]/g, '')) || ''}
                      onChange={(e) => {
                        const newValue = `${e.target.value} ₽`
                        handleValueChange(platformIndex, 'logistics', { 
                          label: item.label, 
                          value: newValue 
                        })
                      }}
                      className={`w-24 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-opacity-50 ${styles.border} ${styles.hover} focus:ring-${row.color}-200`}
                      step="0.01"
                    />
                    <span className="text-gray-500">₽</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={parseFloat(row.logistics.replace(/[^0-9.]/g, '')) || ''}
                  onChange={(e) => {
                    const newValue = `${e.target.value}%`
                    handleValueChange(platformIndex, 'logistics', newValue)
                  }}
                  className={`w-24 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-opacity-50 ${styles.border} ${styles.hover} focus:ring-${row.color}-200`}
                  step="0.1"
                />
                <span className="text-gray-500">%</span>
              </div>
            )
          ) : (
            <div className="flex items-center gap-1">
              <input
                type={field.type}
                value={parseFloat(row[field.field].replace(/[^0-9.]/g, '')) || ''}
                onChange={(e) => {
                  const value = e.target.value
                  const formattedValue = field.unit === '%' ? `${value}%` : `${value} ₽`
                  handleValueChange(platformIndex, field.field, formattedValue)
                }}
                className={`w-24 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-opacity-50 ${styles.border} ${styles.hover} focus:ring-${row.color}-200`}
                step="0.1"
              />
              <span className="text-gray-500">{field.unit}</span>
            </div>
          )}
        </div>
      </div>
    )

    return (
      <div className={`card animate-fade-in border-2 ${styles.border} ${styles.hover}`}>
        {!isMobile && (
          <div className={`bg-gradient-to-r ${styles.header} px-6 py-4 border-b ${styles.border}`}>
            <div className="flex items-center gap-3">
              <Icon className={`text-2xl ${styles.icon}`} />
              <h3 className="text-lg font-bold text-gray-800">{row.platform}</h3>
            </div>
          </div>
        )}
        <div className="p-6 space-y-6">
          {/* Main Fields */}
          <div className="space-y-4">
            {fields.filter(f => f.group === 'main').map(renderField)}
          </div>

          {/* Delivery Fields */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 border-b pb-2">Доставка</h4>
            {fields.filter(f => f.group === 'delivery').map(renderField)}
          </div>

          {/* Finance Fields */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 border-b pb-2">Финансы</h4>
            {fields.filter(f => f.group === 'finance').map(renderField)}
          </div>

          {/* Other Fields */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-500 border-b pb-2">Дополнительно</h4>
            {fields.filter(f => f.group === 'other').map(renderField)}
          </div>
        </div>
      </div>
    )
  }

  const totalCommission = useMemo(() => {
    return data.map(platform => parseFloat(platform.commission.replace('%', ''))).reduce((a, b) => a + b, 0).toFixed(1)
  }, [data])

  return (
    <div className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 transform">
        <div className="glass-effect p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaPercentage className="text-2xl text-blue-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Комиссии платформ</h2>
              <p className="text-sm text-gray-600">Средняя комиссия: {totalCommission}%</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="btn-secondary !py-2 !px-4"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Platform Tabs - Mobile Only */}
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-2">
            <button
              onClick={prevPlatform}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-2">
              {data.map((platform, index) => (
                <button
                  key={index}
                  onClick={() => setActivePlatform(index)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activePlatform === index
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {platform.platform}
                </button>
              ))}
            </div>
            <button
              onClick={nextPlatform}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Mobile View */}
          <div className="lg:hidden">
            {renderPlatformCard(data[activePlatform], activePlatform, true)}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {data.map((row, index) => (
              <div key={index}>
                {renderPlatformCard(row, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
