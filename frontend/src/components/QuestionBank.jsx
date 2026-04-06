import { useQuestions } from '../context/QuestionContext';

const QuestionBank = () => {
  const { questions, addQuestion } = useQuestions();
  
  const handleAddQuestion = async (category, subject, questionData) => {
    const newQuestion = {
      category,
      subject,
      ...questionData
    };
    
    const success = await addQuestion(newQuestion);
    if (success) {
      // Show success message or update UI
    }
  };

  // ... rest of your component code ...
};