import React, { useState } from 'react';
import ModalNotificacion from './ModalNotificacion';

const Registro = ({ irALogin, alRegistrar }) => {
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    email: '',
    direccion: '',
    region: '',
    comuna: '',
    password: '',
    confirmPassword: '',
    terminos: false
  });

  const [error, setError] = useState('');
  const [modalData, setModalData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Función para validar la seguridad de la contraseña
  const validarPassword = (password) => {
    // Mínimo 8 caracteres, al menos 1 letra mayúscula, 1 minúscula, 1 número y 1 carácter especial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Validar seguridad de la contraseña
    if (!validarPassword(formData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial (ej: @$!%*?&).');
      return;
    }

    // 2. Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    
    // GUARDAR USUARIO EN LA MEMORIA DEL NAVEGADOR (Incluyendo los nuevos datos)
    localStorage.setItem('usuarioGamerZone', JSON.stringify({
      run: formData.run,
      nombre: formData.nombre,
      email: formData.email,
      direccion: formData.direccion,
      region: formData.region,
      comuna: formData.comuna,
      password: formData.password
    }));

    setModalData({
      titulo: '¡Registro Exitoso!',
      mensaje: `Cuenta creada exitosamente para ${formData.nombre || 'el usuario'}.`
    });
  };

  const handleCerrarModal = () => {
    const usuarioNombre = formData.nombre ? formData.nombre : formData.email;
    setModalData(null);
    if (alRegistrar) {
      alRegistrar(usuarioNombre);
    }
  };

  return (
    <section className="seccion-auth">
      <div className="auth-card">
        <h2>Crear Cuenta</h2>
        <p className="auth-subtitulo">Únete a la comunidad de GamerZone</p>

        {error && <div className="auth-error" style={{ color: '#ff4d4d', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          
          <div className="form-group">
            <label htmlFor="run">RUN (Ej: 12345678-5 o 19011022-2)</label>
            <input
              type="text"
              id="run"
              name="run"
              placeholder="12345678-5"
              value={formData.run}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

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
            <label htmlFor="direccion">DIRECCIÓN</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="region">REGIÓN</label>
            <select id="region" name="region" value={formData.region} onChange={handleChange} required>
              <option value="">- Seleccione la región -</option>
              <option value="RM">Región Metropolitana</option>
              <option value="V">Valparaíso</option>
              <option value="VIII">Biobío</option>
              {/* Puedes agregar más regiones aquí */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comuna">COMUNA</label>
            <select id="comuna" name="comuna" value={formData.comuna} onChange={handleChange} required>
              <option value="">- Seleccione la comuna -</option>
              <option value="Santiago">Santiago</option>
              <option value="Providencia">Providencia</option>
              <option value="Las Condes">Las Condes</option>
              <option value="Maipu">Maipú</option>
              <option value="Vina del Mar">Viña del Mar</option>
              <option value="Concepcion">Concepción</option>
              {/* Puedes agregar más comunas aquí */}
            </select>
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
            <small style={{ fontSize: '0.75rem', color: '#888', marginTop: '5px', display: 'block' }}>
              Debe contener al menos 8 caracteres, una mayúscula, un número y un símbolo.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="terminos"
              name="terminos"
              checked={formData.terminos}
              onChange={handleChange}
              required
            />
            <label htmlFor="terminos">Acepto los términos y condiciones</label>
          </div>

          <button type="submit" className="btn-primary btn-auth">
            Registrarme
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <button type="button" className="btn-link" onClick={irALogin}>
              Inicia sesión aquí
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

export default Registro;