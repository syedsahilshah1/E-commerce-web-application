import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import { 
  RiUser3Line, 
  RiFileList3Line, 
  RiHeartLine, 
  RiLogoutBoxRLine,
  RiMapPin2Line,
  RiSaveLine,
  RiEditLine
} from 'react-icons/ri';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout, orders, wishlist } = useApp();

  // If not logged in, redirect to login
  if (!user) {
    setTimeout(() => navigate('/login'), 0);
    return null;
  }

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Page Breadcrumb */}
      <Breadcrumb items={[{ name: 'My Profile', path: '/profile' }]} />

      <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white text-left mb-2">
        My Account
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2 text-left">
        
        {/* Left Column: Account Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Avatar and basic summary */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-primary-500 mb-4"
            />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">{user.email}</p>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-full">
              Member since {user.joinedDate}
            </span>
          </div>

          {/* Account shortcuts */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
            <Link
              to="/orders"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="flex items-center gap-2.5">
                <RiFileList3Line className="w-5 h-5 text-slate-400" />
                My Orders
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 text-xs text-slate-500 font-mono font-bold">
                {orders.length}
              </span>
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="flex items-center gap-2.5">
                <RiHeartLine className="w-5 h-5 text-slate-400" />
                Wishlist
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 text-xs text-slate-500 font-mono font-bold">
                {wishlist.length}
              </span>
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 p-3 rounded-xl text-left font-bold text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 border-t border-slate-100 dark:border-slate-800/80 mt-2 cursor-pointer"
            >
              <RiLogoutBoxRLine className="w-5 h-5" />
              Logout Session
            </button>
          </div>

        </div>

        {/* Right Column: User Profile Edit / Address Summary (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* User information panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <RiUser3Line className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Details</h3>
              </div>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs flex items-center gap-1 cursor-pointer text-slate-700 dark:text-slate-300"
                >
                  <RiEditLine className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-202 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-800 dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-202 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-800 dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-202 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-800 dark:text-white"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setFormData({ name: user.name, email: user.email, phone: user.phone });
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-350 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-sm font-bold hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RiSaveLine className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</span>
                  <span className="text-slate-900 dark:text-white font-bold">{user.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</span>
                  <span className="text-slate-900 dark:text-white font-bold">{user.email}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</span>
                  <span className="text-slate-900 dark:text-white font-bold">{user.phone}</span>
                </div>
              </div>
            )}
          </div>

          {/* Addresses list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <RiMapPin2Line className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Shipping Address</h3>
            </div>
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((addr) => (
                <div key={addr.id} className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-850 rounded-2xl flex flex-col gap-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Default Address</span>
                    {addr.isDefault && (
                      <span className="text-[9px] font-bold uppercase bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-500 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{addr.street}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{addr.city}, {addr.state} {addr.zip}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{addr.country}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-450 italic text-sm">No addresses registered yet. Save shipping details during checkout!</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
