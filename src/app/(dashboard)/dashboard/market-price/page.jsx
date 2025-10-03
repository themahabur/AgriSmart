"use client";
import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaStore,
  FaWarehouse,
} from "react-icons/fa";
import { HiOutlineSelector } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { IoIosCalendar } from "react-icons/io";
import { AiOutlineTag } from "react-icons/ai";
import Loading from "@/app/components/loading/Loading";

export default function MarketPricePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("table");
  const [category, setCategory] = useState("সব");
  const [date, setDate] = useState("সব");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataType, setDataType] = useState("today");
  const itemsPerPage = 6;

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://agri-smart-server.vercel.app/api/market"
        );
        if (!res.ok) throw new Error("ডেটা লোড ব্যর্থ হয়েছে");
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        setError(err.message || "ডেটা লোড ব্যর্থ হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const marketData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return dataType === "today"
      ? data[0]?.todayMarketData || []
      : data[0]?.preMarketData || [];
  }, [data, dataType]);

  // Dates & Categories
  const dates = useMemo(
    () => [
      "সব",
      ...new Set(marketData.map((d) => d.price_date).filter(Boolean)),
    ],
    [marketData]
  );

  const categories = useMemo(
    () => ["সব", ...new Set(marketData.map((d) => d.nameBn).filter(Boolean))],
    [marketData]
  );

  // Filtered data
  const filteredData = useMemo(() => {
    return marketData.filter((item) => {
      if (!item) return false;
      if (date !== "সব" && item.price_date !== date) return false;
      if (category !== "সব" && item.nameBn !== category) return false;
      if (
        query &&
        !`${item.text_bn || ""} ${item.text_en || ""} ${item.nameBn || ""} ${
          item.nameEn || ""
        }`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [marketData, date, category, query]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  // Summary
  const summary = useMemo(() => {
    if (!filteredData.length)
      return { highest: "-", lowest: "-", average: "-", total: 0 };

    const retailPrices = filteredData
      .map((d) => parseFloat(d.a_r_lowestPrice))
      .filter((price) => !isNaN(price));

    if (retailPrices.length === 0)
      return { highest: "-", lowest: "-", average: "-", total: 0 };

    return {
      highest: Math.max(...retailPrices),
      lowest: Math.min(...retailPrices),
      average: (
        retailPrices.reduce((a, b) => a + b, 0) / retailPrices.length
      ).toFixed(2),
      total: filteredData.length,
    };
  }, [filteredData]);

  // Chart data
  const chartData = useMemo(() => {
    return filteredData.map((d) => ({
      name: d.nameBn || d.nameEn || "অজানা",
      retail: parseFloat(d.a_r_lowestPrice) || 0,
      wholesale: parseFloat(d.a_w_lowestPrice) || 0,
      category: d.name || "অজানা",
    }));
  }, [filteredData]);

  // Pagination handlers
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  const getPaginationPages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      if (end - start + 1 < maxVisiblePages)
        start = Math.max(1, end - maxVisiblePages + 1);
      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  };

  if (loading) {
    return Loading();
  }

  const selectClasses =
    "appearance-none w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none transition-colors duration-200 bg-white pr-8";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 px-4 font-sans">
      <div className="container mx-auto md:px-10">
        {/* Error */}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        {/* Header */}
        <div className="mb-5 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 mx-auto lg:mx-0 lg:pl-3">
            <span className="text-green-600">বাজার দর</span> মনিটর
          </h1>
          <p className="leading-relaxed text-gray-700 text-sm sm:text-base lg:pl-3">
            সর্বশেষ বাজার মূল্যের তথ্য পান এবং আপনার প্রয়োজনীয় পণ্যের দর তুলনা
            করুন।
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            {
              title: "মোট এন্ট্রি",
              value: summary.total,
              icon: FaChartLine,
            },
            {
              title: "সর্বোচ্চ দর",
              value: summary.highest === "-" ? "-" : `${summary.highest} ৳`,
              icon: FaArrowUp,
              textColor: "text-red-600",
            },
            {
              title: "সর্বনিম্ন দর",
              value: summary.lowest === "-" ? "-" : `${summary.lowest} ৳`,
              icon: FaArrowDown,
            },
            {
              title: "গড় দর",
              value: summary.average === "-" ? "-" : `${summary.average} ৳`,
              icon: FaFilter,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 border border-green-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-600 font-medium">{card.title}</h3>
                <card.icon className={`text-green-600 text-lg`} />
              </div>
              <p className={`text-2xl font-bold text-green-600`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-8 border border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4">
            <div className="md:col-span-2 lg:col-span-4">
              <label className="block text-gray-700 font-medium mb-3 flex items-center gap-1">
                <GoSearch className="text-green-600" />
                খুঁজুন
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="পণ্যের নাম লিখুন..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none transition-colors duration-200"
                />
                <GoSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-2">
              <label className="text-gray-700 font-medium mb-3 flex items-center gap-1">
                <IoIosCalendar className="text-green-600" />
                তারিখ
              </label>
              <div className="relative">
                <select
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={selectClasses}
                >
                  {dates.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <HiOutlineSelector className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-2">
              <label className="text-gray-700 font-medium mb-3 flex items-center gap-1">
                <AiOutlineTag className="text-green-600" />
                পণ্য
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={selectClasses}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <HiOutlineSelector className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-2 mt-4 md:mt-0 justify-end items-end w-full">
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-full">
                {["table", "chart"].map((view) => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`px-3 py-1.5 md:py-2 rounded-lg font-medium transition-colors duration-200 text-xs md:text-sm flex-1 text-center ${
                      activeView === view
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {view === "table" ? "টেবিল" : "চার্ট"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex lg:hidden justify-center mt-4">
            <div className="flex gap-2 w-full max-w-xs">
              {["table", "chart"].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm ${
                    activeView === view
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {view === "table" ? "টেবিল ভিউ" : "চার্ট ভিউ"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-30 md:hidden">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse h-64"
                >
                  <div className="bg-gray-200 rounded h-5 mb-4"></div>
                  <div className="bg-gray-200 rounded h-4 mb-6"></div>
                  <div className="space-y-4">
                    <div className="bg-gray-200 rounded h-16"></div>
                    <div className="bg-gray-200 rounded h-16"></div>
                  </div>
                </div>
              ))
            : paginatedData.map((item, idx) => (
                <div
                  key={`${item._id || idx}-${idx}`}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {item.text_bn}
                      </h3>
                      <p className="text-gray-500 text-sm">{item.text_en}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {item.nameBn || item.nameEn || "অজানা"}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>তারিখ:</span>
                      <span className="font-medium">{item.price_date}</span>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FaStore className="text-green-600" />
                          <span className="text-gray-700 font-medium">
                            রিটেইল দর
                          </span>
                        </div>
                        <span className="text-gray-600 text-sm">টাকা/কেজি</span>
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        {item.a_r_lowestPrice} - {item.a_r_howestPrice}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FaWarehouse className="text-green-600" />
                          <span className="text-gray-700 font-medium">
                            হোলসেল দর
                          </span>
                        </div>
                        <span className="text-gray-600 text-sm">টাকা/কেজি</span>
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        {item.a_w_lowestPrice} - {item.a_w_howestPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Desktop Table View */}
        {activeView === "table" && (
          <div className="bg-white rounded-lg border border-gray-200 mb-30 overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "#",
                      "পণ্য",
                      "রিটেইল (৳/কেজি)",
                      "হোলসেল (৳/কেজি)",
                      "তারিখ",
                    ].map((header) => (
                      <th
                        key={header}
                        className="p-4 text-left font-medium text-gray-700"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-gray-500">
                        {loading ? "লোড হচ্ছে..." : "কোনো ডেটা পাওয়া যায়নি"}
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((item, idx) => (
                      <tr
                        key={`${item._id || idx}-${idx}`}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="p-4 text-gray-600">
                          {idx + 1 + (currentPage - 1) * itemsPerPage}
                        </td>
                        <td className="p-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {item.nameBn || item.nameEn || "অজানা"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FaStore className="text-green-600" />
                            <span className="font-medium text-green-600">
                              {item.a_r_lowestPrice} - {item.a_r_howestPrice}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FaWarehouse className="text-green-600" />
                            <span className="font-medium text-green-600">
                              {item.a_w_lowestPrice} - {item.a_w_howestPrice}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{item.price_date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredData.length > itemsPerPage && (
              <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <div className="text-gray-600">
                  পৃষ্ঠা {currentPage} এর {totalPages} (মোট{" "}
                  {filteredData.length} আইটেম)
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
                  >
                    <FaChevronLeft className="text-green-600" />
                  </button>
                  {getPaginationPages().map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors duration-200 ${
                        currentPage === page
                          ? "bg-green-600 text-white"
                          : "border border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
                  >
                    <FaChevronRight className="text-green-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chart View */}
        {activeView === "chart" && (
          <div className="bg-white rounded-lg p-6 mb-30 border border-gray-200 hidden md:block">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                দর তুলনা চার্ট
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>রিটেইল দর</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-700 rounded"></div>
                  <span>হোলসেল দর</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
                  >
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tick={{ fill: "#4b5563" }}
                    />
                    <YAxis
                      tick={{ fill: "#4b5563" }}
                      tickFormatter={(value) => `${value} ৳`}
                    />
                    <Tooltip
                      formatter={(value) => [`${value} টাকা/কেজি`, "দর"]}
                      labelFormatter={(label) => `অঞ্চল: ${label}`}
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    />
                    <Bar
                      dataKey="retail"
                      name="রিটেইল দর"
                      radius={[6, 6, 0, 0]}
                      fill="#16a34a"
                    />
                    <Bar
                      dataKey="wholesale"
                      name="হোলসেল দর"
                      radius={[6, 6, 0, 0]}
                      fill="#15803d"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {loading
                    ? "চার্ট লোড হচ্ছে..."
                    : "চার্ট দেখানোর জন্য ডেটা পাওয়া যায়নি"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
