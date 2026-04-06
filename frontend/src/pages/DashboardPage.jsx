import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/DashboardPage.css';
import BackButton from '../components/BackButton';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const { user } = useAuth();

  // Read interview results from localStorage
  const [interviewResults, setInterviewResults] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const interviewTypes = ['All', 'Technical', 'Behavioral', 'Domain'];

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('interviewResults') || '[]');
    setInterviewResults(results);
  }, []);

  // Handle delete
  const handleDeleteResult = (date) => {
    const updatedResults = interviewResults.filter(r => r.date !== date);
    setInterviewResults(updatedResults);
    localStorage.setItem('interviewResults', JSON.stringify(updatedResults));
  };

  // Filter results by selected type
  const filteredResults = selectedType === 'All'
    ? interviewResults
    : interviewResults.filter(r => (r.type || 'Technical') === selectedType);

  // Calculate stats
  const interviewsCompleted = filteredResults.length;
  const averageScore =
    interviewsCompleted > 0
      ? Math.round(
          filteredResults.reduce((sum, r) => sum + (r.accuracy || 0), 0) / interviewsCompleted
        )
      : 0;
  const hoursPracticed =
    interviewsCompleted > 0
      ? Math.round(
          filteredResults.reduce((sum, r) => sum + ((r.totalQuestions || 0) * 2), 0) / 60
        )
      : 0; // Assume 2 min per question

  // Prepare data for chart and activity list
  const recentActivities = filteredResults.slice(-7).reverse(); // Last 7, most recent first
  const chartData = {
    labels: recentActivities.map(activity => new Date(activity.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Interview Scores',
        data: recentActivities.map(activity => activity.accuracy),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(75, 192, 192)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recent Interview Performance'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <motion.div 
      className="dashboard-page"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <BackButton />
      {/* Tabs for interview type filter */}
      <div className="interview-type-tabs">
        {interviewTypes.map(type => (
          <button
            key={type}
            className={`type-tab${selectedType === type ? ' active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <motion.div 
        className="dashboard-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <Link to="/interview-simulation" className="start-interview-btn">
          Start New Interview
        </Link>
      </motion.div>

      <motion.div 
        className="stats-grid"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <motion.div className="stat-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.3 }}>
          <h3>{interviewsCompleted}</h3>
          <p>Interviews Completed</p>
        </motion.div>
        <motion.div className="stat-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
          <h3>{averageScore}%</h3>
          <p>Average Score</p>
        </motion.div>
        <motion.div className="stat-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, duration: 0.3 }}>
          <h3>{hoursPracticed}</h3>
          <p>Hours Practiced</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="dashboard-sections"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.div 
          className="recent-activity"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <h2>Recent Activity</h2>
          {recentActivities.length > 0 ? (
            <>
              <div className="activity-graph">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="activity-list">
                {recentActivities.map((activity, index) => (
                  <motion.div 
                    key={index} 
                    className="activity-card"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  >
                    <div className="activity-info">
                      <h4>{activity.type || "Technical"} Interview</h4>
                      <p>{new Date(activity.date).toLocaleString()}</p>
                      <p>Questions: {activity.totalQuestions}, Correct: {activity.correctAnswers}</p>
                    </div>
                    <div className="activity-score">
                      <span>{activity.accuracy}%</span>
                      <button
                        className="delete-activity-btn"
                        title="Delete this result"
                        onClick={() => handleDeleteResult(activity.date)}
                      >
                        &#128465;
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-activity">No interview results yet. Start an interview to see your progress!</div>
          )}
        </motion.div>

        <motion.div 
          className="quick-actions"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            {['Update Profile', 'Technical Interview', 'Behavioral Interview', 'Give Feedback'].map((action, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
              >
                <Link 
                  to={action === 'Update Profile' ? '/candidate-profile' : action === 'Give Feedback' ? '/feedback' : '/interview-simulation'} 
                  className="action-btn"
                >
                  {action}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;