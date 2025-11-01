"use client";
import InputField from "@/app/components/dashboard/pofile/InputField";
import SelectField from "@/app/components/dashboard/pofile/SelectField";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaPenFancy, FaSeedling } from "react-icons/fa";

const Profile = () => {
  const { data: session, status, update } = useSession();

  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    division: "",
    district: "",
    upazila: "",
    role: "",
    accountStatus: "pending",
    avatar: null,
    primaryCrops: [],
    phone: "",
    farmSize: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasDatabaseData, setHasDatabaseData] = useState(false);

  // Function to find location IDs from names
  const findLocationIds = (divisionName, districtName, upazilaName) => {
    let divisionId = "";
    let districtId = "";
    let upazilaId = "";

    // Find division ID
    if (divisionName && divisions.length > 0) {
      const division = divisions.find(
        (div) =>
          div.ban_name === divisionName ||
          div.name === divisionName ||
          div.name?.toLowerCase() === divisionName?.toLowerCase()
      );
      divisionId = division?.id || divisionName;
    }

    // Find district ID
    if (districtName && districts.length > 0) {
      const district = districts.find(
        (dist) =>
          dist.bn_name === districtName ||
          dist.name === districtName ||
          dist.name?.toLowerCase() === districtName?.toLowerCase()
      );
      districtId = district?.id || districtName;
    }

    // Find upazila ID
    if (upazilaName && upazilas.length > 0) {
      const upazila = upazilas.find(
        (upz) =>
          upz.bn_name === upazilaName ||
          upz.name === upazilaName ||
          upz.name?.toLowerCase() === upazilaName?.toLowerCase()
      );
      upazilaId = upazila?.id || upazilaName;
    }

    return { divisionId, districtId, upazilaId };
  };

  // Fetch user data from API using email
  const fetchUserData = async () => {
    try {
      const userEmail = session?.user?.email;
      if (!userEmail) {
        throw new Error("No user email found");
      }

      const res = await axiosInstance.get(`/users/me`);
      console.log("User data response:", res.data);

      const response = await axiosInstance.get(`/api/users/me/${userEmail}`);

      if (response.status === 200) {
        const result = response.data;
        if (result.status && result.data) {
          setHasDatabaseData(true);
          return result.data;
        } else {
          throw new Error("No user data found in database");
        }
      } else {
        throw new Error("Failed to fetch user data from database");
      }
    } catch (error) {
      console.error("Error fetching user data from API:", error);
      setHasDatabaseData(false);
      return null;
    }
  };

  // Load user data from API or session
  useEffect(() => {
    if (status === "loading") return;

    const loadUserData = async () => {
      try {
        setLoading(true);

        if (session?.user) {
          // Try to fetch from API first
          const apiUserData = await fetchUserData();

          if (apiUserData) {
            // Convert location names to IDs after location data is loaded
            const { divisionId, districtId, upazilaId } = findLocationIds(
              apiUserData.division,
              apiUserData.district,
              apiUserData.upazila
            );

            // Use API data from database - map the exact API response format
            const userData = {
              _id: apiUserData._id || "",
              name:
                apiUserData.name ||
                session.user.name ||
                session.user.email ||
                "",
              email: apiUserData.email || session.user.email || "",
              division: divisionId || apiUserData.division || "",
              district: districtId || apiUserData.district || "",
              upazila: upazilaId || apiUserData.upazila || "",
              role: apiUserData.role || "farmer",
              accountStatus: apiUserData.accountStatus || "pending",
              avatar: apiUserData.avatar || session.user.image || null,
              primaryCrops: apiUserData.primaryCrops || [],
              phone: apiUserData.phone || "",
              farmSize: apiUserData.farmSize?.unit
                ? apiUserData.farmSize.unit
                : apiUserData.farmSize || "",
              totalCrops: apiUserData.totalCrops || "",
              address: apiUserData.address || "",
            };

            setUser(userData);
            setFormData(userData);
            setHasDatabaseData(true);
          } else {
            // Fallback to session data only (no database record)
            const sessionUserData = {
              _id: session.user.id || "",
              name: session.user.name || session.user.email || "",
              email: session.user.email || "",
              division: "",
              district: "",
              upazila: "",
              role: "farmer",
              accountStatus: "pending",
              avatar: session.user.image || null,
              primaryCrops: [],
              phone: "",
              farmSize: "",
              totalCrops: "",
              address: "",
            };

            setUser(sessionUserData);
            setFormData(sessionUserData);
            setHasDatabaseData(false);
          }
        } else if (status === "unauthenticated") {
          setError("অনুগ্রহ করে লগইন করুন");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setError("ব্যবহারকারী ডেটা লোড করতে সমস্যা হয়েছে");
        setHasDatabaseData(false);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [session, status]); // Removed location data dependencies to prevent infinite loop

  // Load location data from JSON files
  useEffect(() => {
    const loadLocationData = async () => {
      try {
        // Load divisions
        const divisionsResponse = await fetch("/division.json");
        const divisionsData = await divisionsResponse.json();
        setDivisions(divisionsData);

        // Load districts
        const districtsResponse = await fetch("/districts.json");
        const districtsData = await districtsResponse.json();
        setDistricts(districtsData);

        // Load upazilas
        const upazilasResponse = await fetch("/upazilas.json");
        const upazilasData = await upazilasResponse.json();
        setUpazilas(upazilasData);
      } catch (error) {
        console.error("Error loading location data:", error);
        setError("স্থান ডেটা লোড করতে সমস্যা হয়েছে");
      }
    };

    loadLocationData();
  }, []);

  // Update form data when location data is loaded and user has location names
  useEffect(() => {
    if (hasDatabaseData && user.division && divisions.length > 0) {
      const { divisionId, districtId, upazilaId } = findLocationIds(
        user.division,
        user.district,
        user.upazila
      );

      if (
        divisionId !== user.division ||
        districtId !== user.district ||
        upazilaId !== user.upazila
      ) {
        setFormData((prev) => ({
          ...prev,
          division: divisionId,
          district: districtId,
          upazila: upazilaId,
        }));

        setUser((prev) => ({
          ...prev,
          division: divisionId,
          district: districtId,
          upazila: upazilaId,
        }));
      }
    }
  }, [
    divisions,
    districts,
    upazilas,
    hasDatabaseData,
    user.division,
    user.district,
    user.upazila,
  ]);

  // Filter districts based on selected division
  const getFilteredDistricts = () => {
    if (!formData.division) return [];
    return districts.filter(
      (district) => district.division_id === formData.division
    );
  };

  // Filter upazilas based on selected district
  const getFilteredUpazilas = () => {
    if (!formData.district) return [];
    return upazilas.filter(
      (upazila) => upazila.district_id === formData.district
    );
  };

  // Get display names for current selections
  const getDivisionName = () => {
    if (!formData.division) return "নির্বাচন করুন";

    // Check if it's already a name or needs conversion
    const division = divisions.find(
      (div) =>
        div.id === formData.division ||
        div.ban_name === formData.division ||
        div.name === formData.division
    );

    return division ? division.ban_name : formData.division;
  };

  const getDistrictName = () => {
    if (!formData.district) return "নির্বাচন করুন";

    const district = districts.find(
      (dist) =>
        dist.id === formData.district ||
        dist.bn_name === formData.district ||
        dist.name === formData.district
    );

    return district ? district.bn_name : formData.district;
  };

  const getUpazilaName = () => {
    if (!formData.upazila) return "নির্বাচন করুন";

    const upazila = upazilas.find(
      (upz) =>
        upz.id === formData.upazila ||
        upz.bn_name === formData.upazila ||
        upz.name === formData.upazila
    );

    return upazila ? upazila.bn_name : formData.upazila;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Reset dependent fields when division or district changes
      if (name === "division") {
        updated.district = "";
        updated.upazila = "";
      } else if (name === "district") {
        updated.upazila = "";
      }

      return updated;
    });
  };

  const handleSave = async () => {
    try {
      const userEmail = session?.user?.email;
      if (!userEmail) {
        throw new Error("No user email available");
      }

      if (!hasDatabaseData) {
        throw new Error(
          "ডাটাবেসে ব্যবহারকারীর ডেটা নেই। আপডেট করার জন্য প্রথমে ডাটাবেসে রেকর্ড তৈরি করুন।"
        );
      }

      // Convert location IDs back to names for API
      const divisionName = getDivisionName();
      const districtName = getDistrictName();
      const upazilaName = getUpazilaName();

      // Prepare update data - don't include email and role (role cannot be changed)
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        division: divisionName,
        district: districtName,
        upazila: upazilaName,
        farmSize: formData.farmSize,
        avatar: formData.avatar,
        totalCrops: formData.totalCrops,
        address: formData.address,
        primaryCrops: formData.primaryCrops,
      };

      console.log("Sending update data:", updateData);

      const response = await axiosInstance.put(
        `/api/users/me/${userEmail}`,
        updateData
      );

      console.log(response.data);
      if (response.status === 200) {
        const result = response.data;

        if (result.status && result.data) {
          const updatedUser = result.data;

          // Update local state - keep the original role
          setUser((prev) => ({
            ...prev,
            name: formData.name,
            phone: formData.phone,
            division: formData.division,
            district: formData.district,
            upazila: formData.upazila,
            farmSize: formData.farmSize,
            avatar: formData.avatar,
            totalCrops: formData.totalCrops,
            address: formData.address,
            primaryCrops: formData.primaryCrops,
          }));

          setEditMode(false);

          // Update session with new data - keep original role
          await update({
            ...session,
            user: {
              ...session?.user,
              name: formData.name,
              phone: formData.phone,
              division: divisionName,
              district: districtName,
              upazila: upazilaName,
              farmSize: formData.farmSize,
              image: formData.avatar,
            },
          });

          console.log("Profile updated successfully:", updatedUser);
          alert("প্রোফাইল সফলভাবে আপডেট হয়েছে");
        } else {
          throw new Error(result.message || "Update failed");
        }
      } else {
        const errorData = response.data;
        throw new Error(errorData.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`প্রোফাইল আপডেট করতে সমস্যা হয়েছে: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setEditMode(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Add file validation
      if (!file.type.startsWith("image/")) {
        alert("দয়া করে একটি ছবির ফাইল নির্বাচন করুন");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("ছবির আকার 5MB এর কম হতে হবে");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.onerror = () => {
        alert("ফাইল পড়তে সমস্যা হয়েছে");
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-amber-500 text-white";
      case "inactive":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case "farmer":
        return "কৃষক";
      case "buyer":
        return "ক্রেতা";
      case "admin":
        return "প্রশাসক";
      case "agent":
        return "এজেন্ট";
      default:
        return role;
    }
  };

  // Debug: Log current form data
  useEffect(() => {
    console.log("Current formData:", formData);
    console.log("Available divisions:", divisions.length);
    console.log("Available districts:", districts.length);
    console.log("Available upazilas:", upazilas.length);
  }, [formData, divisions, districts, upazilas]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 font-hind flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">ডেটা লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 font-hind flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl max-w-md text-center">
          <p>{error || "অনুগ্রহ করে লগইন করুন"}</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            লগইন করুন
          </button>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 font-hind flex items-center justify-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-xl max-w-md text-center">
          <p>ব্যবহারকারী ডেটা পাওয়া যায়নি</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 font-hind">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header with Farmer Welcome */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="relative flex justify-end">
            <div className="absolute left-10 -bottom-24 ">
              <div className="relative">
                <Image
                  height={150}
                  width={150}
                  src={
                    formData.avatar ||
                    session.user.image ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="  rounded-full border-4 border-green-500 object-cover  mb-4 shadow-lg"
                />
                <div className="absolute scale-x-[-1] bottom-2.5 right-1 z-20 p-1.5 border-2 border-green-500 rounded-full bg-green-500 text-white hover:text-green-600 hover:bg-gray-200 transition-all duration-500 ease-in-out">
                  {" "}
                  <FaPenFancy />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">কৃষকের প্রোফাইল</h1>
              <p className="text-green-100">
                আপনার কৃষি তথ্য ও প্রোফাইল ব্যবস্থাপনা করুন
              </p>
              {!hasDatabaseData && (
                <div className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm inline-flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  ডাটাবেসে রেকর্ড নেই
                </div>
              )}
            </div>
            {!editMode && hasDatabaseData && (
              <button
                className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                onClick={() => setEditMode(true)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                প্রোফাইল সম্পাদনা
              </button>
            )}
            {!hasDatabaseData && (
              <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm">
                সম্পাদনা করার জন্য ডাটাবেসে রেকর্ড প্রয়োজন
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Sidebar - Farmer Overview */}
          <div className="flex items-center justify-center ">
            {/* Farmer Card */}
            <div className="bg-white rounded-2xl p-6 border border-green-100 w-full">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {user.name}
                </h2>
                <p className="text-green-600 font-medium">
                  {getRoleText(user.role)}
                </p>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusBadgeColor(
                    user.accountStatus
                  )}`}
                >
                  {user.accountStatus === "pending"
                    ? "বিচারাধীন"
                    : user.accountStatus}
                </div>
                {!hasDatabaseData && (
                  <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    সেশন ডেটা প্রদর্শিত হচ্ছে
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-green-100">
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="">
                  <div className="grid grid-cols-2 items-center  mb-8">
                    <h3 className="text-xl font-bold text-gray-800  border-b border-gray-100 flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      ব্যক্তিগত তথ্য
                    </h3>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="text-green-700 flex items-center gap-2 hover:text-green-900 font-bold"
                    >
                      <FaPenFancy /> <span>সম্পাদনা করুন</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 justify-between items-center space-y-6">
                    <div>
                      <span>পুরো নাম:</span>
                      <span className="ml-2  text-gray-700 font-semibold">
                        {formData.name}
                      </span>
                    </div>
                    <div className="">
                      <span>ইমেইল:</span>
                      <span className="ml-2  text-gray-700 font-semibold">
                        {formData.email}
                      </span>
                    </div>
                    <div>
                      <span>ফোন নম্বর:</span>
                      <span className="ml-2  text-gray-700 font-medium">
                        {formData.phone
                          ? formData.phone
                          : "নেই - ফোন নম্বর প্রদান করুন"}
                      </span>
                    </div>
                    <div>
                      <span>ঠিকানা:</span>
                      <span className="ml-2  text-gray-700 font-medium italic">
                        {formData.address
                          ? formData.address
                          : "নেই - ঠিকানা প্রদান করুন"}
                      </span>
                    </div>
                    <div></div>
                  </div>
                  <div></div>
                </div>

                {/* Location Information */}
                <div className="border-t border-gray-100 ">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaSeedling className="text-green-500" />
                    অবস্থান তথ্য
                  </h3>
                  <div>
                    <div>
                      <span>মোট ফসলের পরিমাণ:</span>
                      <span className="ml-2 text-gray-700 ">
                        {formData.totalCrops
                          ? formData.totalCrops
                          : "নেই - পরিমাণ প্রদান করুন"}
                      </span>
                    </div>
                    <div>
                      <span>প্রধান ফসল:</span>
                      <span className="ml-2 text-gray-700 ">
                        {formData.primaryCrops &&
                        formData.primaryCrops.length > 0
                          ? formData.primaryCrops.join(", ")
                          : "নেই - প্রধান ফসল প্রদান করুন"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* modal */}
                <div
                  className={`fixed bg-black/60 inset-0 z-50 flex items-center justify-center ${
                    editMode ? "block" : "hidden"
                  }`}
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4">
                      প্রোফাইল সম্পাদনা করুন
                    </h3>
                    <div className="space-y-4">
                      <InputField
                        label="ফোন নম্বর"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      <InputField
                        label="ঠিকানা"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                      <InputField
                        label="মোট ফসলের পরিমাণ"
                        name="totalCrops"
                        value={formData.totalCrops}
                        onChange={handleInputChange}
                      />
                      <SelectField
                        label="বিভাগ"
                        name="division"
                        value={formData.division}
                        onChange={handleInputChange}
                        options={divisions.map((div) => ({
                          value: div.id,
                          label: div.ban_name,
                        }))}
                      />
                      <SelectField
                        label="জেলা"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        options={getFilteredDistricts().map((dist) => ({
                          value: dist.id,
                          label: dist.bn_name,
                        }))}
                        disabled={!formData.division}
                      />
                      <SelectField
                        label="উপজেলা"
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleInputChange}
                        options={getFilteredUpazilas().map((upz) => ({
                          value: upz.id,
                          label: upz.bn_name,
                        }))}
                        disabled={!formData.district}
                      />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        বাতিল করুন
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        পরিবর্তন সংরক্ষণ করুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
