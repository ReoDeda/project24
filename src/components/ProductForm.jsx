import React, { useState, useEffect } from 'react';

export default function ProductForm({ product: initialProduct, onAdd, onClose }) {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    article: '',
    barcode: '',
    price: '',
    quantity: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    image: null
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in product.dimensions) {
      setProduct(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [name]: value
        }
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setProduct(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product);
    if (!initialProduct) {
      setProduct({
        id: '',
        name: '',
        article: '',
        barcode: '',
        price: '',
        quantity: '',
        weight: '',
        dimensions: {
          length: '',
          width: '',
          height: ''
        },
        image: null
      });
    }
    onClose();
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Photo Upload (Centered) */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Фото
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-sm tracking-wide border border-blue-600 cursor-pointer hover:bg-blue-50">
                {product.image ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="Preview"
                      className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg mb-2"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">
                      {product.image.name}
                    </span>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-xs sm:text-sm">Загрузить фото</span>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
					{/* Product Name (Full width) */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Наименование товара
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Other Input Fields */}
          {['article', 'barcode', 'price', 'quantity', 'weight', 'length', 'width', 'height'].map(field => (
            <div key={field} className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                {field === 'length' ? 'Длина (см)' :
                field === 'width' ? 'Ширина (см)' :
                field === 'height' ? 'Высота (см)' :
                field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="number"
                name={field}
                value={field in product.dimensions ? product.dimensions[field] : product[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary text-xs sm:text-sm"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="btn-primary text-xs sm:text-sm"
          >
            {initialProduct ? 'Сохранить изменения' : 'Добавить товар'}
          </button>
        </div>
      </form>
    </div>
  );
}
