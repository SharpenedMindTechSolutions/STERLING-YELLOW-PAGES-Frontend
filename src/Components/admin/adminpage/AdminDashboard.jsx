
const useAuth = () => {
  const navigate = useNavigate();

  return {
    logout: () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      navigate('/admin/login');
    }
  };
};

// Converted AdminDashboard.tsx to AdminDashboard.jsx format
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Users,
  Building,
  Tags,
  TrendingUp,
  BarChart3,
  Flag,
  UserRoundCog,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Phone
} from 'lucide-react';
import Dashboard from '../Components/Dashboard';
import BusinessListings from '../Components/BusinessListings';
import UserManagement from '../Components/UserManagement';
import CategoryManagement from '../Components/CategoryManagement';
import AdUploadForm from '../Components/AdUploadForm';
import AdminProfileForm from '../Components/AdminProfileForm';
import CreatecategoryForm from '../Components/CreatecategoryForm';
import ContactEditForm from '../Components/ContactEditForm';


const AdminDashboard = () => {
  const { id } = useParams();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get('section') || 'dashboard';

  const setActiveSection = (section) => {
    setSearchParams({ section });
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview & Analytics' },
    { id: 'listings', label: 'Business Listings', icon: Building, description: 'Manage all business listings', },
    { id: 'users', label: 'User Management', icon: Users, description: 'Manage platform users' },
    { id: 'categories', label: 'Categories list', icon: Tags, description: 'Manage business categories' },
    { id: 'create-category', label: 'Create Category', icon: PlusCircle, description: 'Add new categories' },
    { id: 'ads', label: 'Ads Slider Section', icon: Flag, description: 'Handle Ads Slider' },
    { id: 'profile', label: 'Profile Edit', icon: UserRoundCog, description: 'Manage Admin Profilre' },
    { id: 'contact', label: 'Contact Edit', icon: Phone, description: 'Edit contact information' },



  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'listings': return <BusinessListings />;
      case 'users': return <UserManagement />;
      case 'categories': return <CategoryManagement />;
      case 'ads': return <AdUploadForm />;
      case 'profile': return <AdminProfileForm />;
      case 'create-category': return <CreatecategoryForm />;
      case 'contact': return <ContactEditForm />;

      default: return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden ">
      <div className={`${sidebarOpen ? 'w-80' : 'w-20'}  shadow-lg flex flex-col transition-all duration-300`}>
        <div className="p-5 border-b border-r  border-gray-300 flex items-center justify-between sticky top-0  z-10">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">YellowPages Management</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar Items - scrollable */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 border-r border-gray-300 ">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === item.id
                ? 'bg-yellow-400 text-yellow-100-600 border border-yellow-200'
                : 'text-black hover:bg-yellow-100 hover:text-gray-900 border border-transparent'
                }`}
            >
              <item.icon
                className={`w-5 h-5 ${activeSection === item.id ? 'text-black' : 'text-gray-500 w-8 h-5'
                  }`}
              />
              {sidebarOpen && (
                <>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-700 hover:text-black">{item.description}</div>
                  </div>

                </>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-r  border-gray-300">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium text-red-600">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 overflow-hidden">
        <header className="bg-gray border-b border-gray-300 px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {activeSection === 'dashboard'
                  ? 'Dashboard Overview'
                  : activeSection.replace(/([A-Z])/g, ' $1')}
              </h2>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4 ">

              <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-medium text-sm">A</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>

  );
};

export default AdminDashboard;
