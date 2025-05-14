import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Welcome from './Components/Welcome';
import Comentarios from './Components/Comentarios';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar /> //si se le ponefuera de los Routes hace que se vea en todas las paginas
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/comentarios" element={<Comentarios />} />
      </Routes>
    </Router>
  );
}

export default App;
