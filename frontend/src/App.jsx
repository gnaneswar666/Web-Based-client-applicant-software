import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Interview from './components/Interview';
import Navbar from './components/navbar';
import PrivateRoute from './components/PrivateRoute';
import LoadingSpinner from './components/LoadingSpinner';
import Profile from './components/Profile';
import LearnMore from './components/LearnMore';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import FeedbackPage from './pages/FeedbackPage';

// Lazy load components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const InterviewSimulationPage = React.lazy(() => import('./pages/InterviewSimulationPage'));
const QuestionBankPage = React.lazy(() => import('./pages/QuestionBankPage'));
const CandidateProfilePage = React.lazy(() => import('./pages/CandidateProfilePage'));
const IntroductionPage = React.lazy(() => import('./pages/IntroductionPage'));
const TechnicalInterviewPage = React.lazy(() => import('./pages/TechnicalInterviewPage'));
const BehavioralInterviewPage = React.lazy(() => import('./pages/BehavioralInterviewPage'));
const DomainInterviewPage = React.lazy(() => import('./pages/DomainInterviewPage'));
const PracticePage = React.lazy(() => import('./pages/PracticePage'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/interview" element={<PrivateRoute><Interview /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/interview-simulation" element={<PrivateRoute><InterviewSimulationPage /></PrivateRoute>} />
            <Route path="/questions" element={<PrivateRoute><QuestionBankPage /></PrivateRoute>} />
            <Route path="/candidate-profile" element={<PrivateRoute><CandidateProfilePage /></PrivateRoute>} />
            <Route path="/introduction" element={<IntroductionPage />} />
            <Route path="/technical-interview" element={<PrivateRoute><TechnicalInterviewPage /></PrivateRoute>} />
            <Route path="/behavioral-interview" element={<PrivateRoute><BehavioralInterviewPage /></PrivateRoute>} />
            <Route path="/domain-interview" element={<PrivateRoute><DomainInterviewPage /></PrivateRoute>} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/practice" element={<PrivateRoute><PracticePage /></PrivateRoute>} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// Inside your Routes component
<Routes>
  <Route path="/learn-more" element={<LearnMore />} />
</Routes>
