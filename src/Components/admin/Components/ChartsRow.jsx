import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const ChartsRow = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visitor Analytics</h3>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-600">Chart visualization would go here</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Growth</h3>
        <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-gray-600">Growth chart would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsRow;
