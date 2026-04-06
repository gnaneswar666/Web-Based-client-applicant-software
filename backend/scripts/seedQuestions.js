const mongoose = require('mongoose');
const Question = require('../models/Question');

const questions = [
  {
    category: 'Technical',
    subCategory: 'Engineering',
    question: 'Explain the practical use of the Laws of Thermodynamics.',
    answer: 'The Laws of Thermodynamics have numerous practical applications in engineering and technology. The First Law (Conservation of Energy) is crucial in designing energy-efficient systems like engines and power plants. The Second Law (Entropy) helps in understanding efficiency limits of heat engines and refrigeration systems. The Third Law (Absolute Zero) is important in cryogenics and material science.',
    difficulty: 'Medium',
    tips: [
      'Discuss real-world applications like energy conservation in engines',
      'Explain efficiency limits of refrigerators',
      'Connect theoretical concepts to practical engineering solutions',
      'Mention specific examples from industry'
    ],
    keywords: ['Thermodynamics', 'Energy Conservation', 'Heat Engines', 'Efficiency']
  },
  {
    category: 'Technical',
    subCategory: 'Mechanical Engineering',
    question: 'What are the various loads acting on a car while it is moving on the road?',
    answer: 'A moving car experiences multiple forces: 1) Gravitational force acting vertically downward, 2) Normal force from the road surface, 3) Frictional force between tires and road, 4) Air resistance (drag force), 5) Engine thrust, 6) Centripetal force during turns, 7) Rolling resistance. Understanding these forces is crucial for vehicle design and performance optimization.',
    difficulty: 'Easy',
    tips: [
      'Mention forces like gravitational force, frictional force, air resistance, and engine thrust',
      'Explain their effects on motion',
      'Discuss how these forces influence vehicle design',
      'Connect to real-world driving scenarios'
    ],
    keywords: ['Forces', 'Vehicle Dynamics', 'Mechanics', 'Motion']
  },
  {
    category: 'Technical',
    subCategory: 'Project Experience',
    question: 'Describe your final year project and its potential applications.',
    answer: 'This question allows you to showcase your technical expertise and project management skills. Focus on: 1) Project objectives and scope, 2) Technical challenges faced, 3) Solutions implemented, 4) Results and outcomes, 5) Potential real-world applications, 6) Your specific role and contributions.',
    difficulty: 'Medium',
    tips: [
      'Provide a concise overview of your project',
      'Emphasize objectives, methodologies, and real-world relevance',
      'Highlight your specific contributions',
      'Discuss challenges and how you overcame them'
    ],
    keywords: ['Project Management', 'Technical Skills', 'Problem Solving', 'Innovation']
  },
  {
    category: 'Personality',
    subCategory: 'Career Goals',
    question: 'Why do you want to join DRDO?',
    answer: 'I want to join DRDO because: 1) It offers opportunities to work on cutting-edge defense technologies, 2) The organization plays a crucial role in national security, 3) It provides a platform to contribute to India\'s technological advancement, 4) The work environment fosters innovation and research, 5) It aligns with my career goals in defense technology.',
    difficulty: 'Easy',
    tips: [
      'Highlight your passion for defense research',
      'Align with DRDO\'s mission',
      'Explain how you can contribute to national security',
      'Show enthusiasm for research and development'
    ],
    keywords: ['Career Goals', 'Motivation', 'National Service', 'Research']
  },
  {
    category: 'Personality',
    subCategory: 'Career Planning',
    question: 'Where do you see yourself in five years?',
    answer: 'In five years, I envision myself: 1) Having contributed significantly to DRDO\'s projects, 2) Leading technical teams in research and development, 3) Specializing in a specific area of defense technology, 4) Mentoring junior engineers, 5) Contributing to innovative solutions for national defense.',
    difficulty: 'Medium',
    tips: [
      'Discuss your professional goals',
      'Emphasize growth within DRDO',
      'Show ambition while being realistic',
      'Align goals with DRDO\'s objectives'
    ],
    keywords: ['Career Planning', 'Professional Growth', 'Leadership', 'Goals']
  },
  {
    category: 'Personality',
    subCategory: 'Work Management',
    question: 'How do you handle stress and tight deadlines?',
    answer: 'I manage stress and deadlines through: 1) Effective time management and prioritization, 2) Breaking down complex tasks into manageable parts, 3) Maintaining a healthy work-life balance, 4) Regular communication with team members, 5) Staying organized and focused, 6) Taking short breaks to maintain productivity.',
    difficulty: 'Easy',
    tips: [
      'Share specific strategies like time management',
      'Discuss prioritization techniques',
      'Explain work-life balance maintenance',
      'Provide examples of handling past deadlines'
    ],
    keywords: ['Stress Management', 'Time Management', 'Work-Life Balance', 'Productivity']
  }
];

const seedQuestions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interview-prep', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert new questions
    await Question.insertMany(questions);
    console.log('Successfully seeded questions');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
};

seedQuestions(); 