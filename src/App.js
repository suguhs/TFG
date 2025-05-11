import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Welcome from './Components/Welcome';

function App() {
  return (
    <Router>
      <div>
        <h1>Mi Aplicación</h1>
        <Routes>
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
