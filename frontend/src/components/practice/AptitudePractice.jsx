import React from 'react';
import { useParams } from 'react-router-dom';

const AptitudePractice = () => {
  const { type } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">{type}</h2>
          {/* Add your aptitude practice content here */}
        </div>
      </div>
    </div>
  );
};

export default AptitudePractice;