import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ... your existing update profile logic ...

      // After successful update, navigate to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // ... rest of your component code ...
};