'use client';

import React, { useState } from 'react';
import {
  FaShoppingCart,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaStore,
  FaTruck,
  FaMoneyBillWave,
  FaChartLine,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';

const SellProducePage = () => {
  // State for products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'আম ফল',
      category: 'ফল',
      quantity: '৫০ কেজি',
      price: '১২০ ৳/কেজি',
      status: 'বিক্রির জন্য প্রস্তুত',
      date: '২০২৫-১০-০৫',
      location: 'সিলেট, বাংলাদেশ',
      image: '/images/mango.jpg',
    },
    {
      id: 2,
      name: 'ধান',
      category: 'শস্য',
      quantity: '১০০০ কেজি',
      price: '৪৫ ৳/কেজি',
      status: 'বিক্রি হয়েছে',
      date: '২০২৫-১০-০৩',
      location: 'সিলেট, বাংলাদেশ',
      image: '/images/rice.jpg',
    },
    {
      id: 3,
      name: 'আলু',
      category: 'সবজি',
      quantity: '২০০ কেজি',
      price: '৩০ ৳/কেজি',
      status: 'বিক্রির জন্য প্রস্তুত',
      date: '২০২৫-১০-০৭',
      location: 'সিলেট, বাংলাদেশ',
      image: '/images/potato.jpg',
    },
  ]);

  // State for buyers
  const [buyers] = useState([
    {
      id: 1,
      name: 'ঢাকা বাজার লিমিটেড',
      type: 'হোলসেল ব্যবসায়ী',
      location: 'ঢাকা',
      rating: 4.8,
      lastDeal: '২০২৫-০৯-২৮',
    },
    {
      id: 2,
      name: 'গ্রামীণ খাদ্য কোম্পানি',
      type: 'প্রসেসিং কারখানা',
      location: 'চট্টগ্রাম',
      rating: 4.6,
      lastDeal: '২০২৫-০৯-২০',
    },
    {
      id: 3,
      name: 'সুপার মার্কেট চেইন',
      type: 'রিটেইল চেইন',
      location: 'খুলনা',
      rating: 4.9,
      lastDeal: '২০২৫-০৯-১৫',
    },
  ]);

  // State for sales statistics
  const [salesStats] = useState({
    totalSales: '১২,৫০০ ৳',
    monthlySales: '৩,২০০ ৳',
    productsSold: '১,২৫০ কেজি',
    avgPrice: '৪২ ৳/কেজি',
  });

  // State for form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    location: '',
  });

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('সব');
  const [statusFilter, setStatusFilter] = useState('সব');

  // Handle adding a new product
  const handleAddProduct = e => {
    e.preventDefault();
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.quantity &&
      newProduct.price
    ) {
      const product = {
        id: products.length + 1,
        ...newProduct,
        status: 'বিক্রির জন্য প্রস্তুত',
        date: new Date().toISOString().split('T')[0].replace(/-/g, '-'),
        image: '/images/default-produce.jpg',
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        category: '',
        quantity: '',
        price: '',
        location: '',
      });
      setShowAddForm(false);
    }
  };

  // Handle input changes for new product
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle deleting a product
  const handleDeleteProduct = id => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Filtered products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'সব' || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'সব' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Categories for filtering
  const categories = ['সব', ...new Set(products.map(p => p.category))];
  const statuses = [
    'সব',
    'বিক্রির জন্য প্রস্তুত',
    'বিক্রি হয়েছে',
    'অপেক্ষারত',
  ];

  return (
    <div className="font-hind p-4 sm:p-6 md:p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
            <FaShoppingCart className="text-green-600 mr-3" />
            পণ্য বিক্রি
          </h1>
          <p className="text-gray-600 mt-2">
            আপনার কৃষি পণ্য বিক্রি করুন এবং বাজারের সাথে সংযোগ রাখুন
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <FaPlus className="mr-2" />
          নতুন পণ্য যুক্ত করুন
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-xl border border-green-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            নতুন পণ্য যুক্ত করুন
          </h2>
          <form onSubmit={handleAddProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">পণ্যের নাম</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="পণ্যের নাম লিখুন"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">বিভাগ</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">বিভাগ নির্বাচন করুন</option>
                  <option value="ফল">ফল</option>
                  <option value="সবজি">সবজি</option>
                  <option value="শস্য">শস্য</option>
                  <option value="ডাল">ডাল</option>
                  <option value="অন্যান্য">অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  পরিমাণ (কেজি)
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="পরিমাণ লিখুন"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">দর (৳/কেজি)</label>
                <input
                  type="text"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="দর লিখুন"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">অবস্থান</label>
                <input
                  type="text"
                  name="location"
                  value={newProduct.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="পণ্যের অবস্থান লিখুন"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                পণ্য যুক্ত করুন
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                বাতিল করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sales Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">মোট বিক্রি</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {salesStats.totalSales}
              </p>
            </div>
            <FaMoneyBillWave className="text-green-600 text-2xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">এই মাসের বিক্রি</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {salesStats.monthlySales}
              </p>
            </div>
            <FaChartLine className="text-blue-600 text-2xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">বিক্রিত পণ্য</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">
                {salesStats.productsSold}
              </p>
            </div>
            <FaStore className="text-amber-600 text-2xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">গড় দর</p>
              <p className="text-2xl font-bold text-purple-700 mt-1">
                {salesStats.avgPrice}
              </p>
            </div>
            <FaTruck className="text-purple-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gray-50 p-6 rounded-xl border border-green-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="পণ্য অনুসন্ধান করুন..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Products List */}
        <div className="lg:col-span-2">
          {/* Products List */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaShoppingCart className="text-green-600 mr-2" />
                আপনার পণ্যসমূহ
              </h2>
            </div>
            <div className="p-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <FaShoppingCart className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">এখনও কোন পণ্য যুক্ত করা হয়নি</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    প্রথম পণ্য যুক্ত করুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex">
                          <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center mr-4">
                            <FaShoppingCart className="text-gray-600 text-xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {product.category}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {product.quantity}
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {product.price}
                              </span>
                              <span
                                className={`${
                                  product.status === 'বিক্রির জন্য প্রস্তুত'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : product.status === 'বিক্রি হয়েছে'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                } text-xs font-medium px-2.5 py-0.5 rounded`}
                              >
                                {product.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 p-2">
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500">
                        <span className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1 text-gray-400" />
                          {product.date}
                        </span>
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-400" />
                          {product.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Buyers and Quick Actions */}
        <div className="lg:col-span-1">
          {/* Potential Buyers */}
          <div className="bg-white rounded-xl border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaUser className="text-green-600 mr-2" />
                সম্ভাব্য ক্রেতা
              </h2>
            </div>
            <div className="p-4">
              {buyers.length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  কোন সম্ভাব্য ক্রেতা পাওয়া যায়নি
                </p>
              ) : (
                <div className="space-y-4">
                  {buyers.map(buyer => (
                    <div
                      key={buyer.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800">
                          {buyer.name}
                        </h3>
                        <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                          <FaCheckCircle className="text-amber-500 text-xs mr-1" />
                          <span className="text-amber-700 text-sm font-medium">
                            {buyer.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{buyer.type}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500 flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {buyer.location}
                        </span>
                        <button className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors">
                          যোগাযোগ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaExclamationCircle className="text-green-600 mr-2" />
                দ্রুত কাজ
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700">
                    বাজার দর চেক করুন
                  </span>
                  <FaChartLine className="text-green-600" />
                </button>
                <button className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700">
                    লগিস্টিক্স বুক করুন
                  </span>
                  <FaTruck className="text-green-600" />
                </button>
                <button className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700">
                    পেমেন্ট হিসাব
                  </span>
                  <FaMoneyBillWave className="text-green-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProducePage;
