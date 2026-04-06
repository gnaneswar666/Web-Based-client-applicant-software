import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Interview = () => {
  // Sample data - replace with actual data from your backend
  const [activityData] = useState([
    { date: 'Mon', questions: 5 },
    { date: 'Tue', questions: 8 },
    { date: 'Wed', questions: 12 },
    { date: 'Thu', questions: 6 },
    { date: 'Fri', questions: 15 },
    { date: 'Sat', questions: 10 },
    { date: 'Sun', questions: 7 },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 p-8">
            <h1 className="text-4xl font-extrabold text-white">Interview Preparation</h1>
            <p className="text-indigo-100 mt-1 text-lg">Practice your interview skills</p>
          </div>
          <div className="p-10 space-y-8">
            {/* Activity Graph */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="questions" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;