import React, { useState, useEffect } from 'react';
import Boton from '../components/atoms/Boton';
import ModalNotificacion from '../components/molecules/ModalNotificacion';

const ConfiguracionUsuario = ({ usuario, alActualizarUsuario }) => {
  const [datosPerfil, setDatosPerfil] = useState({
    nombre: '',
    email: '',
    clave: '',
    direccion: '',
    region: 'RM',
    comuna: 'Santiago'
  });

  const [modalNotificacion, setModalNotificacion] = useState(null);

  useEffect(() => {
    try {
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioGamerZone')) || {};
      const nombreActual = typeof usuario === 'string' ? usuario : (usuarioGuardado.nombre || '');
      
      setDatosPerfil({
        nombre: usuarioGuardado.nombre || nombreActual || '',
        email: usuarioGuardado.email || '',
        clave: usuarioGuardado.clave || usuarioGuardado.password || '',
        direccion: usuarioGuardado.direccion || '',
        region: usuarioGuardado.region || 'RM',
        comuna: usuarioGuardado.comuna || 'Santiago'
      });
    } catch (e) {
      console.error('Error al cargar datos del usuario:', e);
    }
  }, [usuario]);

  const handleChange = (e) => {
    setDatosPerfil({
      ...datosPerfil,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!datosPerfil.nombre.trim()) {
      alert('Por favor ingresa un nombre de usuario válido.');
      return;
    }

    try {
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioGamerZone')) || {};
      const datosActualizados = {
        ...usuarioGuardado,
        nombre: datosPerfil.nombre.trim(),
        email: datosPerfil.email.trim(),
        clave: datosPerfil.clave,
        password: datosPerfil.clave,
        direccion: datosPerfil.direccion.trim(),
        region: datosPerfil.region,
        comuna: datosPerfil.comuna
      };

      // Guardar perfil actualizado en localStorage
      localStorage.setItem('usuarioGamerZone', JSON.stringify(datosActualizados));

      // Actualizar el estado global del usuario en React
      if (alActualizarUsuario) {
        alActualizarUsuario(datosPerfil.nombre.trim());
      }

      setModalNotificacion({
        titulo: '⚙️ ¡Perfil Actualizado!',
        mensaje: 'Tus datos de usuario, contraseña y dirección de entrega se guardaron correctamente.'
      });
    } catch (e) {
      console.error('Error al guardar datos:', e);
      alert('Ocurrió un error al guardar los cambios.');
    }
  };

  // Estilo unificado y de alto contraste para inputs y selects
  const estiloCampo = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1.5px solid #94a3b8',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: '0.95rem',
    fontWeight: '500',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const estiloOpcion = {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: '0.95rem'
  };

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '40px 20px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>
        
        {/* Encabezado */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#0f172a', fontWeight: '800', margin: 0 }}>
            ⚙️ Configuración de Cuenta
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
            Actualiza tu información personal, clave y dirección de despacho en GamerZone.
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          padding: '32px'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Nombre de usuario */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                👤 Nombre de usuario
              </label>
              <input
                type="text"
                name="nombre"
                value={datosPerfil.nombre}
                onChange={handleChange}
                placeholder="Tu nombre de usuario"
                required
                style={estiloCampo}
              />
            </div>

            {/* Correo Electrónico */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                ✉️ Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={datosPerfil.email}
                onChange={handleChange}
                placeholder="ejemplo@gamerzone.cl"
                required
                style={estiloCampo}
              />
            </div>

            {/* Contraseña / Clave */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                🔑 Contraseña / Clave
              </label>
              <input
                type="password"
                name="clave"
                value={datosPerfil.clave}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={estiloCampo}
              />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '5px 0' }} />

            <h4 style={{ margin: '0 0 5px 0', fontSize: '1.05rem', color: '#0f172a', fontWeight: '700' }}>
              📍 Ubicación y Dirección de Entrega
            </h4>

            {/* Dirección */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                Dirección de Calle y Número
              </label>
              <input
                type="text"
                name="direccion"
                value={datosPerfil.direccion}
                onChange={handleChange}
                placeholder="Ej: Av. Providencia 1234, Depto 502"
                style={estiloCampo}
              />
            </div>

            {/* Región y Comuna */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                  Región
                </label>
                <select
                  name="region"
                  value={datosPerfil.region}
                  onChange={handleChange}
                  style={estiloCampo}
                >
                  <option value="RM" style={estiloOpcion}>Región Metropolitana</option>
                  <option value="V" style={estiloOpcion}>Valparaíso</option>
                  <option value="VIII" style={estiloOpcion}>Biobío</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                  Comuna
                </label>
                <select
                  name="comuna"
                  value={datosPerfil.comuna}
                  onChange={handleChange}
                  style={estiloCampo}
                >
                  <option value="Santiago" style={estiloOpcion}>Santiago</option>
                  <option value="Providencia" style={estiloOpcion}>Providencia</option>
                  <option value="Las Condes" style={estiloOpcion}>Las Condes</option>
                  <option value="Maipú" style={estiloOpcion}>Maipú</option>
                  <option value="Viña del Mar" style={estiloOpcion}>Viña del Mar</option>
                  <option value="Concepción" style={estiloOpcion}>Concepción</option>
                </select>
              </div>
            </div>

            <Boton
              type="submit"
              className="btn-primary"
              style={{
                marginTop: '10px',
                backgroundColor: '#0070f3',
                color: '#ffffff',
                padding: '14px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 112, 243, 0.3)'
              }}
            >
              Guardar Cambios 💾
            </Boton>
          </form>
        </div>

        {modalNotificacion && (
          <ModalNotificacion
            titulo={modalNotificacion.titulo}
            mensaje={modalNotificacion.mensaje}
            alCerrar={() => setModalNotificacion(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ConfiguracionUsuario;