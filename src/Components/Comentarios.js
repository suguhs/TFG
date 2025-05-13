import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [contenido, setContenido] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar usuario logueado desde localStorage
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
        contenido: contenido
      });
      setComentarios([res.data.comentario, ...comentarios]);
      setContenido('');
    } catch (err) {
      if (err.response && err.response.data.errors) {
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
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Comentarios</h2>

      {/* ✅ Solo mostrar el formulario si hay usuario logueado */}
      {usuario ? (
        <form onSubmit={enviarComentario} className="mb-6">
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full border rounded p-2 mb-2"
            placeholder="Escribe tu comentario..."
            rows="3"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Enviar
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500 mb-4">
          🔒 Debes <a href="/login" className="text-blue-600">iniciar sesión</a> para comentar.
        </p>
      )}

      <ul>
        {comentarios.map((comentario) => (
          <li key={comentario.id} className="border-b py-3 flex justify-between items-start">
            <div>
              <p className="font-semibold">{comentario.usuario?.nombre}:</p>
              <p>{comentario.contenido}</p>
              <p className="text-sm text-gray-500">{new Date(comentario.created_at).toLocaleString()}</p>
            </div>
            {usuario && comentario.usuario_id === usuario.id_usuario && (
              <button
                onClick={() => eliminarComentario(comentario.id)}
                className="text-red-600 text-sm ml-4"
              >
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Comentarios;