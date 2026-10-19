import React, { useState } from 'react';
import ModalNotificacion from './ModalNotificacion';

const Login = ({ irARegistro, alIniciarSesion }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(''); // Estado para manejar los errores
  const [modalData, setModalData] = useState(null);
  const [nombreLogueado, setNombreLogueado] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    
    // Consultar la "base de datos" local
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioGamerZone'));

    // 1. Validar si el usuario existe
    if (!usuarioGuardado || usuarioGuardado.email !== formData.email) {
      setError('El correo electrónico no está registrado.');
      return;
    }

    // 2. Validar si la contraseña es correcta
    if (usuarioGuardado.password !== formData.password) {
      setError('La contraseña es incorrecta.');
      return;
    }

    // Si pasa las validaciones, iniciamos sesión correctamente
    const nombreMostrar = usuarioGuardado.nombre || formData.email;
    setNombreLogueado(nombreMostrar);

    setModalData({
      titulo: '¡Bienvenido de nuevo!',
      mensaje: `Sesión iniciada correctamente para ${nombreMostrar}.`
    });
  };

  const handleCerrarModal = () => {
    setModalData(null);
    if (alIniciarSesion) {
      alIniciarSesion(nombreLogueado);
    }
  };

  return (
    <section className="seccion-auth">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <p className="auth-subtitulo">Ingresa a tu cuenta de GamerZone</p>

        {/* Mostrar mensaje de error si las credenciales son inválidas */}
        {error && (
          <div className="auth-error" style={{ color: '#ff4d4d', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-auth">
            Ingresar
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <button type="button" className="btn-link" onClick={irARegistro}>
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>

      {modalData && (
        <ModalNotificacion
          titulo={modalData.titulo}
          mensaje={modalData.mensaje}
          alCerrar={handleCerrarModal}
        />
      )}
    </section>
  );
};

export default Login;