import React, { useState } from 'react'
import { FaPlus, FaPercentage } from 'react-icons/fa'
import ProductForm from './components/ProductForm'
import ProductTable from './components/ProductTable'
import CommissionModal from './components/CommissionModal'
import ExpensesTable from './components/ExpensesTable'

function App() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showCommission, setShowCommission] = useState(false)
  const [isExpensesVisible, setIsExpensesVisible] = useState(false)

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product])
    setShowForm(false)
  }

  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
  }

  const updateProduct = (id, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="glass-effect fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Добро пожаловать!</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCommission(true)}
              className="btn-secondary"
            >
              <FaPercentage className="inline-block mr-2" />
              Комиссия
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <FaPlus className="inline-block mr-2" />
              Добавить товар
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {showForm && (
            <div className="card p-6 mb-6">
              <ProductForm
                onAdd={addProduct}
                onClose={() => setShowForm(false)}
              />
            </div>
          )}
          <div className="card p-6">
            <ProductTable
              products={products}
              onDelete={deleteProduct}
              onUpdate={updateProduct}
            />
          </div>
        </div>
      </main>

      {showCommission && (
        <CommissionModal onClose={() => setShowCommission(false)} />
      )}
    </div>
  )
}

export default App
