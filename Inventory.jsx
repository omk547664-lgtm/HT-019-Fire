import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '', category: '', costPrice: '', sellingPrice: '', stock: '', supplier: ''
    });

    // Mock initial data fetch
    useEffect(() => {
        // TODO: distinct API call
        setProducts([
            { _id: '1', name: 'Running Shoes', category: 'Footwear', costPrice: 40, sellingPrice: 90, stock: 50, supplier: 'Nike Inc.' },
            { _id: '2', name: 'Cotton T-Shirt', category: 'Apparel', costPrice: 5, sellingPrice: 20, stock: 120, supplier: 'Basic Tees' },
            { _id: '3', name: 'Smart Watch', category: 'Electronics', costPrice: 150, sellingPrice: 200, stock: 5, supplier: 'TechGiants' },
        ]);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { ...formData, _id: Date.now().toString() };
        setProducts([...products, newProduct]);
        setIsModalOpen(false);
        setFormData({ name: '', category: '', costPrice: '', sellingPrice: '', stock: '', supplier: '' });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Inventory Management</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <FaPlus /> Add Product
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Cost/Sell)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">${product.costPrice} / ${product.sellingPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4"><FaEdit /></button>
                                    <button className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Simple Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md shadow-xl w-96">
                        <h3 className="text-xl font-bold mb-4">Add New Product</h3>
                        <form onSubmit={handleSubmit}>
                            <input name="name" placeholder="Name" onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                            <input name="category" placeholder="Category" onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                            <div className="flex gap-2 mb-3">
                                <input name="costPrice" type="number" placeholder="Cost" onChange={handleChange} className="w-1/2 p-2 border rounded" required />
                                <input name="sellingPrice" type="number" placeholder="Sell" onChange={handleChange} className="w-1/2 p-2 border rounded" required />
                            </div>
                            <input name="stock" type="number" placeholder="Stock" onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                            <input name="supplier" placeholder="Supplier" onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;