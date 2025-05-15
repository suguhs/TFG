import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Welcome from './Components/Welcome';
import Comentarios from './Components/Comentarios';
import Navbar from './Components/Navbar';
import ReservaForm from './Components/ReservaForm';
import SeleccionPlatos from './Components/SeleccionPlatos';

function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 visible en todas las rutas */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/comentarios" element={<Comentarios />} />
        <Route path="/reserva" element={<ReservaForm />} />
        <Route path="/reservas/:id/platos" element={<SeleccionPlatos />} />
      </Routes>
    </Router>
  );
}

export default App;
