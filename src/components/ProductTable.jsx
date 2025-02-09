// src/components/ProductTable.jsx
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaMoneyBillAlt } from 'react-icons/fa';
import ProductForm from './ProductForm';
import ExpensesTable from './ExpensesTable';

const ProductTable = ({ products, onDelete, onUpdate, onPriceUpdate }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [editedPrices, setEditedPrices] = useState({});

  const handleEdit = (product) => {
    setEditingProduct(product);
  }

  const handleUpdate = (updatedProduct) => {
    onUpdate(updatedProduct.id, updatedProduct);
    setEditingProduct(null);
  }

  const handlePriceChange = (productId, newValue) => {
    setEditedPrices(prev => ({
      ...prev,
      [productId]: newValue
    }));
    onPriceUpdate(productId, newValue);
  }

  return (
    <div className="overflow-x-auto">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg 
            className="w-24 h-24 text-gray-300 mb-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Нет добавленных товаров
          </h3>
          <p className="text-gray-500 mb-6">
            Нажмите «Добавить товар» в верхнем правом углу, чтобы начать
          </p>
        </div>
      ) : (
        <>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Фото</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Наименование</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Артикул</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Цена</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <React.Fragment key={product.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {product.image && (
                        <img 
                          src={URL.createObjectURL(product.image)} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-gray-700">{product.article}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editedPrices[product.id] || product.price}
                          onChange={(e) => handlePriceChange(product.id, e.target.value)}
                          className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-500">₽</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash size={18} />
                        </button>
                        <button
                          onClick={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Расходы"
                        >
                          <FaMoneyBillAlt size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedProductId === product.id && (
                    <tr key={`expenses-${product.id}`}>
                      <td colSpan="5" className="p-4 bg-gray-50">
                        <ExpensesTable />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {editingProduct && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
                <ProductForm
                  product={editingProduct}
                  onAdd={handleUpdate}
                  onClose={() => setEditingProduct(null)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductTable;