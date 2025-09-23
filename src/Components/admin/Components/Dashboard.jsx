import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Tags, CheckCircle } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL ;

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentBusinesses, setRecentBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminToken = localStorage.getItem("adminToken");

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(
        `${API}admin/dashboard/count`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      const { totalUsers, totalBusinesses, approvedBusinesses } = res.data.stats;

      setStats([
        { label: "Total Listings", value: totalBusinesses, icon: Tags, color: "bg-blue-500" },
        { label: "Total Users", value: totalUsers, icon: Users, color: "bg-purple-500" },
        { label: "Businesses Approved", value: approvedBusinesses, icon: CheckCircle, color: "bg-green-500" },
      ]);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };


  const fetchRecentBusinesses = async () => {
    try {
      const res = await axios.get(
        `${API}admin/dashboard/recent-businesses`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      setRecentBusinesses(res.data.recent || []);
    } catch (err) {
      console.error("Error fetching recent businesses", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchDashboardStats(), fetchRecentBusinesses()]);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 "> Dashboard</h1>
      {loading ? (
        <div className="text-center text-gray-500 py-6 animate-pulse">
          Loading dashboard...
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.length > 0 ? (
              stats.map(({ label, value, icon: Icon, color }, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500 text-sm">{label}</p>
                    <h3 className="text-xl font-bold text-black">{value}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">No Count available</div>
            )}
          </div>


          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">Recent Businesses</h2>

            {recentBusinesses.length > 0 ? (
              <div className="overflow-x-auto overflow-y-auto max-h-96 rounded-lg border border-gray-200">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 font-medium text-gray-700">Image</th>
                      <th className="px-4 py-2 font-medium text-gray-700">Title</th>
                      <th className="px-4 py-2 font-medium text-gray-700">Category</th>
                      <th className="px-4 py-2 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBusinesses.map((biz) => (
                      <tr
                        key={biz._id || biz.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        {/* Image */}
                        <td className="px-4 py-2">
                          <img
                            src={biz.images?.[0] || "https://via.placeholder.com/48"}
                            alt={biz.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>

                        {/* Title */}
                        <td className="px-4 py-2 font-semibold text-gray-800">{biz.name}</td>

                        {/* Category */}
                        <td className="px-4 py-2 text-gray-600">{biz.category}</td>

                        {/* Status */}
                        <td className="px-4 py-2">
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full
                              ${biz.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : biz.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                          >
                            {biz.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500">No recent businesses</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
