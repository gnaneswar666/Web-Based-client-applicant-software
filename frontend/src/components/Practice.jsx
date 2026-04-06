import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Brain, BookOpen, Terminal, Trophy } from 'lucide-react';

const Practice = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('programming');

  const sections = {
    programming: [
      { name: 'Python', icon: <Terminal />, difficulty: ['Basic', 'Intermediate', 'Advanced'] },
      { name: 'C Programming', icon: <Code />, difficulty: ['Basic', 'Intermediate', 'Advanced'] },
      { name: 'C++', icon: <Code />, difficulty: ['Basic', 'Intermediate', 'Advanced'] },
      { name: 'Java', icon: <Code />, difficulty: ['Basic', 'Intermediate', 'Advanced'] }
    ],
    aptitude: [
      { name: 'Logical Reasoning', icon: <Brain /> },
      { name: 'Quantitative Aptitude', icon: <Brain /> },
      { name: 'Verbal Ability', icon: <BookOpen /> }
    ],
    other: [
      { name: 'Mock Interviews', icon: <Trophy /> },
      { name: 'Problem Solving', icon: <Brain /> }
    ]
  };

  const handleProgrammingClick = (language, level) => {
    navigate(`/practice/programming/${language.toLowerCase()}/${level.toLowerCase()}`);
  };

  const handleAptitudeClick = (type) => {
    navigate(`/practice/aptitude/${type.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 p-8">
            <h1 className="text-4xl font-extrabold text-white">Practice Arena</h1>
            <p className="text-indigo-100 mt-2">Enhance your skills with hands-on practice</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 p-4">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`px-6 py-3 font-semibold rounded-lg mr-4 transition-all duration-200 ${
                  selectedSection === section
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections[selectedSection].map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                </div>
                
                {item.difficulty && (
                  <div className="space-y-3">
                    {item.difficulty.map((level) => (
                      <button
                        key={level}
                        onClick={() => handleProgrammingClick(item.name, level)}
                        className="w-full px-4 py-2 text-left rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                )}
                
                {!item.difficulty && (
                  <button 
                    onClick={() => handleAptitudeClick(item.name)}
                    className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
                  >
                    Start Practice
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;