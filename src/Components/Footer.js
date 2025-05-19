import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4 py-3">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Sección izquierda */}
          <div className="col-md-4 mb-3">
            <h5>Mi App</h5>
            <p className="text-muted">
              Tu restaurante de confianza. Reserva, pide y disfruta desde casa.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-4 mb-3">
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Inicio</Link></li>
              <li><Link to="/menu" className="text-white text-decoration-none">Menú</Link></li>
              <li><Link to="/reserva" className="text-white text-decoration-none">Reserva</Link></li>
              <li><Link to="/comentarios" className="text-white text-decoration-none">Comentarios</Link></li>
            </ul>
          </div>

          {/* Contacto o redes */}
          <div className="col-md-4 mb-3">
            <h5>Contacto</h5>
            <p className="mb-1"><i className="bi bi-envelope-fill me-2"></i> contacto@miapp.com</p>
            <p className="mb-1"><i className="bi bi-phone-fill me-2"></i> +34 600 123 456</p>
            <div className="mt-2">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center text-muted">
          &copy; {new Date().getFullYear()} Mi App. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
