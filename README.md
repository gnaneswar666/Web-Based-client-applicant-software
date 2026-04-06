# Interview Preparation Platform

## About the Project

This is a full-stack web application designed to help users prepare for job interviews. It provides a comprehensive platform with features like user authentication, question banks, interview simulations, and feedback mechanisms to enhance interview skills.

The application consists of:
- **Backend**: Built with Node.js, Express, and MongoDB for data management and API services.
- **Frontend**: Developed using React and Vite for a responsive and interactive user interface.

## Features

- **User Authentication**: Secure login, registration, and password reset functionality.
- **Question Bank**: Access to a curated collection of interview questions across various domains.
- **Interview Simulation**: Simulate different types of interviews including technical, behavioral, and domain-specific.
- **Practice Mode**: Practice questions and track progress.
- **Feedback System**: Receive feedback on interview performance.
- **Dashboard**: Personalized dashboard to view progress and manage profile.
- **Profile Management**: Update user profiles and settings.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd MiniProject
   ```

2. Install dependencies for the entire project:
   ```
   npm run install:all
   ```

### Running the Application

1. Start the backend server:
   ```
   npm run dev:backend
   ```

2. Start the frontend development server:
   ```
   npm run dev:frontend
   ```

3. Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

### Building for Production

To build the frontend for production:
```
npm run build
```

## Project Structure

- `backend/`: Contains the Node.js/Express server, models, routes, and controllers.
- `frontend/`: Contains the React application with components, pages, and services.
- `package.json`: Root package.json with scripts for managing the full-stack setup.

## Technologies Used

- **Frontend**: React, Vite, React Router, Chart.js, Framer Motion
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Styling**: CSS, Lucide React icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.