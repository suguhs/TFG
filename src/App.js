import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Welcome from './Components/Welcome';
import Comentarios from './Components/Comentarios';
import Navbar from './Components/Navbar';
import ReservaForm from './Components/ReservaForm';
import SeleccionPlatos from './Components/SeleccionPlatos';
import Historial from './Components/Historial';

////si se le pone fuera de los Routes hace que se vea en todas las paginas               )}
function App() {
  <h1 style={{ color: 'red' }}>Probando App.js</h1>

  return (
    
    <Router>
      <Navbar />               
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/comentarios" element={<Comentarios />} />
        <Route path="/reserva" element={<ReservaForm />} />
        <Route path="/reservas/:id/platos" element={<SeleccionPlatos />} />
        <Route path="/historial" element={<Historial />} />

      </Routes>
    </Router>
  );
}

export default App;
