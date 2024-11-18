import React, { useState } from 'react';

function SellerDashboard() {
  // State to manage products
  const [products, setProducts] = useState([
    { id: 1, name: 'Sustainable Grass Mulch', price: 10.0, category: 'Gardening Supplies' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', price: '', category: '' });

  // Handle Add Product Button
  const openAddProductModal = () => {
    setIsEditing(false);
    setCurrentProduct({ id: null, name: '', price: '', category: '' });
    setIsModalOpen(true);
  };

  // Handle Edit Product Button
  const openEditProductModal = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  // Handle Save (Add/Edit) Product
  const handleSaveProduct = () => {
    if (isEditing) {
      setProducts(products.map((prod) => (prod.id === currentProduct.id ? currentProduct : prod)));
    } else {
      setProducts([...products, { ...currentProduct, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // Handle Delete Product
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Green Paradise Seller Dashboard</h1>
        <button className="bg-white text-green-700 py-1 px-4 rounded border border-green-700 hover:bg-green-700 hover:text-white">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Welcome, Seller!</h2>

        {/* Product Management Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-green-600 mb-4">Manage Products</h3>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <button onClick={openAddProductModal} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 mb-4">
              Add New Product
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Product Name</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Category</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2 px-4 border-b">{product.name}</td>
                      <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                      <td className="py-2 px-4 border-b">{product.category}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => openEditProductModal(product)}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Modal for Adding/Editing Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded"
                value={currentProduct.price}
                onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={currentProduct.category}
                onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-700 text-white py-4 text-center">
        <p>&copy; 2024 Green Paradise</p>
      </footer>
    </div>
  );
}

export default SellerDashboard;
