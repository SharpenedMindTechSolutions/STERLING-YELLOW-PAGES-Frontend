import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const RecentSubmissions = ({ recentBusinesses, onApprove, onReject }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Business Submissions</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentBusinesses.map((business) => (
            <div key={business.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <img
                  src={business.logo || business.images[0]}
                  alt={business.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{business.name}</h4>
                  <p className="text-sm text-gray-600">{business.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  business.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : business.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {business.status}
                </span>
                {business.status === 'pending' && (
                  <div className="flex space-x-1">
                    <button onClick={() => onApprove(business.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => onReject(business.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSubmissions;
