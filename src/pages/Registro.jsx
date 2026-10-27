import React, { useState } from 'react';
import Boton from '../components/atoms/Boton';
import ModalNotificacion from '../components/molecules/ModalNotificacion';
import { DIVISION_CHILE } from '../data/divisionChile';
import { validarRut, formatearRut } from '../utils/validaRut';

const Registro = ({ irALogin, alRegistrar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    direccion: '',
    region: 'Región Metropolitana de Santiago',
    provincia: 'Santiago',
    comuna: 'Santiago',
    password: '',
    confirmarPassword: '',
    aceptaTerminos: false
  });

  const [modalNotificacion, setModalNotificacion] = useState(null);

  // Validaciones
  const esRutValido = validarRut(formData.rut);
  const tieneMinLongitud = formData.password.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(formData.password);
  const tieneNumero = /[0-9]/.test(formData.password);
  const tieneSimbolo = /[^A-Za-z0-9]/.test(formData.password);

  const esPasswordValida = tieneMinLongitud && tieneMayuscula && tieneNumero && tieneSimbolo;
  const coincidenPasswords = formData.password.length > 0 && formData.password === formData.confirmarPassword;

  // Desplegables dinámicos
  const regionEncontrada = DIVISION_CHILE.find((r) => r.region === formData.region) || DIVISION_CHILE[14];
  const listaProvincias = regionEncontrada.provincias;

  const provinciaEncontrada = listaProvincias.find((p) => p.provincia === formData.provincia) || listaProvincias[0];
  const listaComunas = provinciaEncontrada ? provinciaEncontrada.comunas : [];

  const handleRegionChange = (e) => {
    const nuevaRegion = e.target.value;
    const regObj = DIVISION_CHILE.find((r) => r.region === nuevaRegion);
    const primeraProvincia = regObj && regObj.provincias[0] ? regObj.provincias[0].provincia : '';
    const primeraComuna = regObj && regObj.provincias[0] && regObj.provincias[0].comunas[0] ? regObj.provincias[0].comunas[0] : '';

    setFormData({
      ...formData,
      region: nuevaRegion,
      provincia: primeraProvincia,
      comuna: primeraComuna
    });
  };

  const handleProvinciaChange = (e) => {
    const nuevaProvincia = e.target.value;
    const provObj = listaProvincias.find((p) => p.provincia === nuevaProvincia);
    const primeraComuna = provObj && provObj.comunas[0] ? provObj.comunas[0] : '';

    setFormData({
      ...formData,
      provincia: nuevaProvincia,
      comuna: primeraComuna
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'rut') {
      setFormData({
        ...formData,
        rut: formatearRut(value)
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!esRutValido) {
      setModalNotificacion({
        titulo: '⚠️ R.U.T. Inválido',
        mensaje: 'El R.U.T. ingresado no existe o no es numéricamente válido en Chile.'
      });
      return;
    }

    if (!esPasswordValida) {
      setModalNotificacion({
        titulo: '⚠️ Contraseña Insegura',
        mensaje: 'La contraseña no cumple con los requisitos mínimos de seguridad.'
      });
      return;
    }

    if (formData.password !== formData.confirmarPassword) {
      setModalNotificacion({
        titulo: '⚠️ Error de Coincidencia',
        mensaje: 'Las contraseñas no coinciden. Por favor verifícalas.'
      });
      return;
    }

    if (!formData.aceptaTerminos) {
      setModalNotificacion({
        titulo: '⚠️ Términos y Condiciones',
        mensaje: 'Debes aceptar los términos y condiciones para poder registrarte.'
      });
      return;
    }

    const passFinal = formData.password.trim();

    const nuevoUsuario = {
      id: Date.now(),
      nombre: formData.nombre.trim(),
      rut: formData.rut.trim(),
      email: formData.email.trim().toLowerCase(),
      direccion: formData.direccion.trim(),
      region: formData.region,
      provincia: formData.provincia,
      comuna: formData.comuna,
      password: passFinal,
      clave: passFinal,
      bloqueado: false,
      rol: 'usuario'
    };

    try {
      const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosGamerZone')) || [];

      const existe = usuariosRegistrados.some(
        (u) => (u.email && u.email.toLowerCase() === nuevoUsuario.email) ||
               (u.nombre && u.nombre.toLowerCase() === nuevoUsuario.nombre.toLowerCase()) ||
               (u.rut && u.rut === nuevoUsuario.rut)
      );

      if (existe) {
        setModalNotificacion({
          titulo: '⚠️ Registro Existente',
          mensaje: 'Este usuario, R.U.T. o correo electrónico ya se encuentra registrado.'
        });
        return;
      }

      const nuevaLista = [...usuariosRegistrados, nuevoUsuario];
      localStorage.setItem('usuariosGamerZone', JSON.stringify(nuevaLista));
      localStorage.setItem('usuarioGamerZone', JSON.stringify(nuevoUsuario));

      if (alRegistrar) {
        alRegistrar(nuevoUsuario);
      }
    } catch (err) {
      console.error('Error al guardar registro:', err);
    }
  };

  const estiloCampo = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
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
    <section style={{ backgroundColor: '#f8fafc', padding: '40px 20px', minHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        padding: '36px',
        maxWidth: '540px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a', fontWeight: '800' }}>
            Crea tu cuenta en <span style={{ color: '#0070f3' }}>GamerZone</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px' }}>
            Regístrate para realizar compras, guardar tu dirección y acceder a tus boletas.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Nombre Completo */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '5px' }}>
              Nombre Completo / Usuario
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Gamer Zone"
              required
              style={estiloCampo}
            />
          </div>

          {/* R.U.T. */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '5px' }}>
              R.U.T.
            </label>
            <input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder="Ej: 12.345.678-K"
              maxLength={12}
              required
              style={{
                ...estiloCampo,
                borderColor: formData.rut.length > 3 ? (esRutValido ? '#10b981' : '#ef4444') : '#cbd5e1'
              }}
            />
            {formData.rut.length > 3 && (
              <div style={{
                marginTop: '4px',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: esRutValido ? '#059669' : '#dc2626'
              }}>
                {esRutValido ? '✓ R.U.T. válido' : '✕ R.U.T. inválido (verifica números y dígito verificador)'}
              </div>
            )}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '5px' }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
              style={estiloCampo}
            />
          </div>

          {/* Dirección */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '5px' }}>
              Dirección de Calle y Número
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Ej: Av. Providencia 1234, Depto 502"
              required
              style={estiloCampo}
            />
          </div>

          {/* Desplegables Encadenados */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                Región
              </label>
              <select name="region" value={formData.region} onChange={handleRegionChange} style={estiloCampo}>
                {DIVISION_CHILE.map((item) => (
                  <option key={item.region} value={item.region} style={estiloOpcion}>{item.region}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                Provincia
              </label>
              <select name="provincia" value={formData.provincia} onChange={handleProvinciaChange} style={estiloCampo}>
                {listaProvincias.map((p) => (
                  <option key={p.provincia} value={p.provincia} style={estiloOpcion}>{p.provincia}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                Comuna
              </label>
              <select name="comuna" value={formData.comuna} onChange={handleChange} style={estiloCampo}>
                {listaComunas.map((comuna) => (
                  <option key={comuna} value={comuna} style={estiloOpcion}>{comuna}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '5px' }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={{
                ...estiloCampo,
                borderColor: formData.password ? (esPasswordValida ? '#10b981' : '#f59e0b') : '#cbd5e1'
              }}
            />
            
            <div style={{ backgroundColor: '#f1f5f9', padding: '10px 12px', borderRadius: '8px', marginTop: '6px', fontSize: '0.78rem' }}>
              <div style={{ fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                La contraseña debe contener:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                <span style={{ color: tieneMinLongitud ? '#059669' : '#94a3b8', fontWeight: tieneMinLongitud ? '700' : '400' }}>
                  {tieneMinLongitud ? '✓' : '•'} Mínimo 8 caracteres
                </span>
                <span style={{ color: tieneMayuscula ? '#059669' : '#94a3b8', fontWeight: tieneMayuscula ? '700' : '400' }}>
                  {tieneMayuscula ? '✓' : '•'} Una mayúscula
                </span>
                <span style={{ color: tieneNumero ? '#059669' : '#94a3b8', fontWeight: tieneNumero ? '700' : '400' }}>
                  {tieneNumero ? '✓' : '•'} Un número
                </span>
                <span style={{ color: tieneSimbolo ? '#059669' : '#94a3b8', fontWeight: tieneSimbolo ? '700' : '400' }}>
                  {tieneSimbolo ? '✓' : '•'} Un símbolo (!@#$...)
                </span>
              </div>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '5px' }}>
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={{
                ...estiloCampo,
                borderColor: formData.confirmarPassword
                  ? (coincidenPasswords ? '#10b981' : '#ef4444')
                  : '#cbd5e1'
              }}
            />

            {formData.confirmarPassword.length > 0 && (
              <div style={{
                marginTop: '5px',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: coincidenPasswords ? '#059669' : '#dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {coincidenPasswords
                  ? '✓ Las contraseñas coinciden'
                  : '✕ Las contraseñas no coinciden'}
              </div>
            )}
          </div>

          {/* Checkbox Términos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
            <input
              type="checkbox"
              id="aceptaTerminos"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              style={{ cursor: 'pointer', width: '16px', height: '16px' }}
            />
            <label htmlFor="aceptaTerminos" style={{ fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
              Acepto los términos y condiciones
            </label>
          </div>

          <Boton
            type="submit"
            className="btn-primary"
            style={{
              backgroundColor: '#0070f3',
              color: '#ffffff',
              padding: '13px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              border: 'none',
              marginTop: '6px'
            }}
          >
            Registrarme 🚀
          </Boton>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.88rem', color: '#64748b' }}>
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={irALogin}
            style={{ background: 'none', border: 'none', color: '#0070f3', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Iniciar sesión aquí
          </button>
        </div>
      </div>

      {modalNotificacion && (
        <ModalNotificacion
          titulo={modalNotificacion.titulo}
          mensaje={modalNotificacion.mensaje}
          alCerrar={() => setModalNotificacion(null)}
        />
      )}
    </section>
  );
};

export default Registro;