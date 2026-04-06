import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import '../styles/PracticePage.css';

const practiceQuestions = [
  {
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to its own scope, the outer function's scope, and the global scope, even after the outer function has returned."
  },
  {
    question: "Explain the difference between == and === in JavaScript.",
    answer: "`==` checks for value equality with type coercion, while `===` checks for both value and type equality (strict equality)."
  },
  {
    question: "What is the purpose of the useEffect hook in React?",
    answer: "The useEffect hook lets you perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM."
  },
  {
    question: "How does prototypal inheritance work in JavaScript?",
    answer: "Objects in JavaScript can inherit properties and methods from other objects via the prototype chain, allowing for shared behavior."
  },
  {
    question: "What is the difference between var, let, and const?",
    answer: "`var` is function-scoped and can be redeclared/updated. `let` and `const` are block-scoped; `let` can be updated, `const` cannot be updated or redeclared."
  }
];

const PracticePage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="practice-page">
      <BackButton />
      <div className="practice-section">
        <h2>Interview Preparation</h2>
        <p className="practice-desc">Practice your interview skills with these common questions and answers.</p>
        {practiceQuestions.map((item, idx) => (
          <div
            className={`practice-question${openIndex === idx ? ' open' : ''}`}
            key={idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <div className="question">
              <span style={{ marginRight: 8, color: '#2b6cb0', fontWeight: 700 }}>
                {openIndex === idx ? '▼' : '▶'}
              </span>
              {item.question}
            </div>
            {openIndex === idx && (
              <div className="answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticePage; 