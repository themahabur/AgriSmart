"use client";
import InputField from '@/app/components/dashboard/pofile/InputField';
import SelectField from '@/app/components/dashboard/pofile/SelectField';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const { data: session, status, update } = useSession();
  
  // Sample user data - will be replaced with session data
  const [user, setUser] = useState({
    "_id": "",
    "name": "",
    "email": "",
    "division": "",
    "district": "",
    "upazila": "",
    "role": "",
    "accountStatus": "pending",
    "avatar": null,
    "primaryCrops": [],
    "phone": "",
    "farmSize": ""
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data from session
  useEffect(() => {
    if (status === 'loading') return;
    
    if (session?.user) {
      const userData = {
        "_id": session.user.id || "",
        "name": session.user.name || "",
        "email": session.user.email || "",
        "division": session.user.division || "3",
        "district": session.user.district || "23",
        "upazila": session.user.upazila || "75",
        "role": session.user.role || "farmer",
        "accountStatus": session.user.accountStatus || "pending",
        "avatar": session.user.image || null,
        "primaryCrops": session.user.primaryCrops || [],
        "phone": session.user.phone || "+880 1234-567890",
        "farmSize": session.user.farmSize || "৫ একর"
      };
      
      setUser(userData);
      setFormData(userData);
      setLoading(false);
    } else if (status === 'unauthenticated') {
      setError('অনুগ্রহ করে লগইন করুন');
      setLoading(false);
    }
  }, [session, status]);

  // Load location data from JSON files
  useEffect(() => {
    const loadLocationData = async () => {
      try {
        // Load divisions
        const divisionsResponse = await fetch('/division.json');
        const divisionsData = await divisionsResponse.json();
        setDivisions(divisionsData);

        // Load districts
        const districtsResponse = await fetch('/districts.json');
        const districtsData = await districtsResponse.json();
        setDistricts(districtsData);

        // Load upazilas
        const upazilasResponse = await fetch('/upazilas.json');
        const upazilasData = await upazilasResponse.json();
        setUpazilas(upazilasData);
        
      } catch (error) {
        console.error('Error loading location data:', error);
        setError('স্থান ডেটা লোড করতে সমস্যা হয়েছে');
      }
    };

    loadLocationData();
  }, []);

  // Filter districts based on selected division
  const getFilteredDistricts = () => {
    if (!formData.division) return [];
    return districts.filter(district => 
      district.division_id === formData.division
    );
  };

  // Filter upazilas based on selected district
  const getFilteredUpazilas = () => {
    if (!formData.district) return [];
    return upazilas.filter(upazila => 
      upazila.district_id === formData.district
    );
  };

  // Get display names for current selections
  const getDivisionName = () => {
    const division = divisions.find(div => div.id === formData.division);
    return division ? division.ban_name : formData.division;
  };

  const getDistrictName = () => {
    const district = districts.find(dist => dist.id === formData.district);
    return district ? district.bn_name : formData.district;
  };

  const getUpazilaName = () => {
    const upazila = upazilas.find(upz => upz.id === formData.upazila);
    return upazila ? upazila.bn_name : formData.upazila;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Reset dependent fields when division or district changes
      if (name === 'division') {
        updated.district = '';
        updated.upazila = '';
      } else if (name === 'district') {
        updated.upazila = '';
      }
      
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the user
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode(false);
        
        // Update session if needed
        await update({
          ...session,
          user: {
            ...session?.user,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            division: updatedUser.division,
            district: updatedUser.district,
            upazila: updatedUser.upazila,
            role: updatedUser.role,
            farmSize: updatedUser.farmSize,
            image: updatedUser.avatar
          }
        });
        
        console.log('Updated user data:', updatedUser);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('প্রোফাইল আপডেট করতে সমস্যা হয়েছে');
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
      if (!file.type.startsWith('image/')) {
        alert('দয়া করে একটি ছবির ফাইল নির্বাচন করুন');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('ছবির আকার 5MB এর কম হতে হবে');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.onerror = () => {
        alert('ফাইল পড়তে সমস্যা হয়েছে');
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-amber-500 text-white';
      case 'inactive':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'farmer':
        return 'কৃষক';
      case 'buyer':
        return 'ক্রেতা';
      case 'admin':
        return 'প্রশাসক';
      case 'agent':
        return 'এজেন্ট';
      default:
        return role;
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 font-hind flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">ডেটা লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 font-hind flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl max-w-md text-center">
          <p>{error || 'অনুগ্রহ করে লগইন করুন'}</p>
          <button 
            onClick={() => window.location.href = '/login'}
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">কৃষকের প্রোফাইল</h1>
              <p className="text-green-100">আপনার কৃষি তথ্য ও প্রোফাইল ব্যবস্থাপনা করুন</p>
            </div>
            {!editMode && (
              <button 
                className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                onClick={() => setEditMode(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                প্রোফাইল সম্পাদনা
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Sidebar - Farmer Overview */}
          <div className="xl:col-span-1 space-y-6">
            {/* Farmer Card */}
            <div className="bg-white rounded-2xl  p-6 border border-green-100">
              <div className="text-center">
                <div className="relative inline-block">
                  <img 
                    src={formData.avatar || session.user.image || '/default-avatar.png'} 
                    alt="Profile" 
                    className="w-28 h-28 rounded-full border-4 border-green-500 object-cover mx-auto mb-4 shadow-lg"
                  />
                  {editMode && (
                    <div className="absolute bottom-1 right-1">
                      <label 
                        htmlFor="avatar-upload" 
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer transition-all duration-200  inline-block"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </label>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{formData.name}</h2>
                <p className="text-green-600 font-medium">{getRoleText(formData.role)}</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusBadgeColor(user.accountStatus)}`}>
                  {user.accountStatus === 'pending' ? 'বিচারাধীন' : user.accountStatus}
                </div>
              </div>
            </div>

            {/* Location Info Card */}
            <div className="bg-white rounded-2xl  p-6 border border-green-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                অবস্থান
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">বিভাগ</span>
                  <span className="font-semibold text-gray-800">{getDivisionName()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">জেলা</span>
                  <span className="font-semibold text-gray-800">{getDistrictName()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">উপজেলা</span>
                  <span className="font-semibold text-gray-800">{getUpazilaName()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl  p-6 border border-green-100">
              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    ব্যক্তিগত তথ্য
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="পুরো নাম"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      required
                    />
                    
                    <InputField
                      label="ইমেইল"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      required
                    />

                    <InputField
                      label="মোবাইল নম্বর"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />

                    <SelectField
                      label="ভূমিকা"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      options={[
                        { value: 'farmer', label: 'কৃষক' },
                        { value: 'buyer', label: 'ক্রেতা' },
                        { value: 'admin', label: 'প্রশাসক' },
                        { value: 'agent', label: 'এজেন্ট' }
                      ]}
                      disabled={!editMode}
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    অবস্থান তথ্য
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                      label="বিভাগ"
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      options={divisions.map(div => ({ 
                        value: div.id, 
                        label: div.ban_name 
                      }))}
                      disabled={!editMode}
                    />
                    
                    <SelectField
                      label="জেলা"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      options={getFilteredDistricts().map(dist => ({
                        value: dist.id, 
                        label: dist.bn_name
                      }))}
                      disabled={!editMode || !formData.division}
                    />

                    <SelectField
                      label="উপজেলা"
                      name="upazila"
                      value={formData.upazila}
                      onChange={handleInputChange}
                      options={getFilteredUpazilas().map(upz => ({ 
                        value: upz.id, 
                        label: upz.bn_name
                      }))}
                      disabled={!editMode || !formData.district}
                    />

                    <InputField
                      label="জমির পরিমাণ"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                {editMode && (
                  <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-100">
                    <button 
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                      onClick={handleSave}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      পরিবর্তন সংরক্ষণ করুন
                    </button>
                    <button 
                      className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                      onClick={handleCancel}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      বাতিল করুন
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;