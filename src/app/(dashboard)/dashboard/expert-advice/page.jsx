"use client";

import { ChatProvider } from "@/app/components/dashboard/expertAdvice/chatProvider/ChatProvider";
import EmptyState from "@/app/components/dashboard/expertAdvice/EmptyState";
import ExpertCard from "@/app/components/dashboard/expertAdvice/ExpertCard";
import LoadingState from "@/app/components/dashboard/expertAdvice/LoadingState";
import SearchFilter from "@/app/components/dashboard/expertAdvice/SearchFilter";
import React, { useState, useEffect } from "react";
import { FaUserTie } from "react-icons/fa";

const ExpertAdvice = () => {
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("সব");
  const [availabilityFilter, setAvailabilityFilter] = useState("সব");

  // Fetch experts
  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/users/all");
      const data = await response.json();

      if (data.status) {
        const expertUsers = data.data.users.filter(
          (user) => user.role === "expert" || user.role === "farmer"
        );
        setExperts(expertUsers);
        setFilteredExperts(expertUsers);
      } else {
        setError("ডেটা লোড করতে সমস্যা হয়েছে");
      }
    } catch (err) {
      console.error("Error fetching experts:", err);
      setError("সার্ভার থেকে ডেটা আনতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  // Filter experts
  useEffect(() => {
    let filtered = [...experts];

    if (searchTerm) {
      filtered = filtered.filter(
        (expert) =>
          expert.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expert.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expert.division?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expert.district?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (specialtyFilter !== "সব") {
      filtered = filtered.filter(
        (expert) => expert.specialty === specialtyFilter
      );
    }

    if (availabilityFilter === "অনলাইন") {
      filtered = filtered.filter((expert) => expert.accountStatus === "active");
    }

    setFilteredExperts(filtered);
  }, [searchTerm, specialtyFilter, availabilityFilter, experts]);

  return (
    <ChatProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 rounded-2xl shadow-lg">
                <FaUserTie className="text-white text-3xl md:text-4xl" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-hind mb-3">
              কৃষি বিশেষজ্ঞের সাথে যোগাযোগ করুন
            </h1>

            <p className="text-lg text-gray-600 font-hind max-w-2xl">
              অভিজ্ঞ কৃষি বিশেষজ্ঞদের কাছ থেকে পেশাদার পরামর্শ নিন এবং আপনার
              ফসলের উন্নতি করুন
            </p>

            {!loading && !error && (
              <div className="mt-6 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 font-hind">
                  {filteredExperts.length} জন বিশেষজ্ঞ উপলব্ধ
                </span>
              </div>
            )}
          </div>

          {/* Search & Filter */}
          {!loading && (
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              specialtyFilter={specialtyFilter}
              setSpecialtyFilter={setSpecialtyFilter}
              availabilityFilter={availabilityFilter}
              setAvailabilityFilter={setAvailabilityFilter}
            />
          )}

          {/* Loading */}
          {loading && <LoadingState />}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 font-hind font-medium">{error}</p>
              <button
                onClick={fetchExperts}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-hind"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {/* Experts Grid */}
          {!loading && !error && (
            <>
              {filteredExperts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExperts.map((expert) => (
                    <ExpertCard key={expert._id} expert={expert} />
                  ))}
                </div>
              ) : (
                <EmptyState searchTerm={searchTerm} />
              )}
            </>
          )}

          {/* CTA */}
          {!loading && !error && filteredExperts.length > 0 && (
            <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-center shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-hind mb-4">
                আপনার কৃষি সমস্যার সমাধান পান
              </h2>
              <p className="text-green-50 font-hind text-lg mb-6 max-w-2xl mx-auto">
                বিশেষজ্ঞদের সাথে সরাসরি কথা বলুন এবং আপনার ফসলের সর্বোচ্চ ফলন
                নিশ্চিত করুন
              </p>
            </div>
          )}
        </div>
      </div>
    </ChatProvider>
  );
};

export default ExpertAdvice;
