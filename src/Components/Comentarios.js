import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [contenido, setContenido] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user) setUsuario(user);
    obtenerComentarios();
  }, []);

  const obtenerComentarios = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/comentarios');
      setComentarios(res.data);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    }
  };

  const enviarComentario = async (e) => {
    e.preventDefault();
    setError('');

    if (!usuario) {
      setError('Debes iniciar sesión para comentar.');
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/comentarios', {
        usuario_id: usuario.id_usuario,
        contenido
      });
      setComentarios([res.data.comentario, ...comentarios]);
      setContenido('');
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join(' '));
      } else {
        setError('Error al enviar comentario.');
      }
    }
  };

  const eliminarComentario = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/comentarios/${id}`);
      setComentarios(comentarios.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error al eliminar comentario:', err);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        <i className="bi bi-chat-left-text"></i> Comentarios
      </h2>

      {/* Formulario */}
      <form onSubmit={enviarComentario} className="mb-4">
        {usuario ? (
          <>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Escribe tu comentario..."
              ></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
          </>
        ) : (
          <p className="text-center text-muted">
            🔒 <a href="/login">Inicia sesión</a> para comentar.
          </p>
        )}
      </form>

      {/* Lista de comentarios */}
      <div className="d-flex flex-column gap-3">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="card">
            <div className="card-body d-flex justify-content-between align-items-start">
              <div>
                <h6 className="card-subtitle mb-2 text-muted">{comentario.usuario?.nombre}:</h6>
                <p className="card-text mb-1">{comentario.contenido}</p>
                <small className="text-muted">
                  {new Date(comentario.created_at).toLocaleString()}
                </small>
              </div>
              {usuario && comentario.usuario_id === usuario.id_usuario && (
                <button
                  onClick={() => eliminarComentario(comentario.id)}
                  className="btn btn-link text-danger btn-sm ms-3"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comentarios;
