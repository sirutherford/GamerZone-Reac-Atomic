import React, { useState, useEffect } from 'react';
import Boton from '../atoms/Boton';
import { DIVISION_CHILE } from '../../data/divisionChile';

const ModalConfirmarDireccion = ({ total, alConfirmar, alCancelar }) => {
  const [datosDireccion, setDatosDireccion] = useState({
    direccion: '',
    region: 'Región Metropolitana de Santiago',
    provincia: 'Santiago',
    comuna: 'Santiago'
  });

  // Cargar automáticamente la dirección guardada en el perfil del usuario
  useEffect(() => {
    try {
      const sesion = localStorage.getItem('usuarioGamerZone');
      if (sesion) {
        const usuarioGuardado = JSON.parse(sesion);
        if (typeof usuarioGuardado === 'object' && usuarioGuardado !== null) {
          setDatosDireccion({
            direccion: usuarioGuardado.direccion || '',
            region: usuarioGuardado.region || 'Región Metropolitana de Santiago',
            provincia: usuarioGuardado.provincia || 'Santiago',
            comuna: usuarioGuardado.comuna || 'Santiago'
          });
        }
      }
    } catch (e) {
      console.error('Error al cargar datos de dirección del usuario:', e);
    }
  }, []);

  // Buscar provincias y comunas disponibles según la región seleccionada
  const regionEncontrada = DIVISION_CHILE.find((r) => r.region === datosDireccion.region) || DIVISION_CHILE[14];
  const listaProvincias = regionEncontrada.provincias;

  const provinciaEncontrada = listaProvincias.find((p) => p.provincia === datosDireccion.provincia) || listaProvincias[0];
  const listaComunas = provinciaEncontrada ? provinciaEncontrada.comunas : [];

  // Manejar cambio de Región (actualiza provincia y comuna por defecto)
  const handleRegionChange = (e) => {
    const nuevaRegion = e.target.value;
    const regObj = DIVISION_CHILE.find((r) => r.region === nuevaRegion);
    const primeraProvincia = regObj && regObj.provincias[0] ? regObj.provincias[0].provincia : '';
    const primeraComuna = regObj && regObj.provincias[0] && regObj.provincias[0].comunas[0] ? regObj.provincias[0].comunas[0] : '';

    setDatosDireccion({
      ...datosDireccion,
      region: nuevaRegion,
      provincia: primeraProvincia,
      comuna: primeraComuna
    });
  };

  // Manejar cambio de Provincia (actualiza comuna por defecto)
  const handleProvinciaChange = (e) => {
    const nuevaProvincia = e.target.value;
    const provObj = listaProvincias.find((p) => p.provincia === nuevaProvincia);
    const primeraComuna = provObj && provObj.comunas[0] ? provObj.comunas[0] : '';

    setDatosDireccion({
      ...datosDireccion,
      provincia: nuevaProvincia,
      comuna: primeraComuna
    });
  };

  const handleChange = (e) => {
    setDatosDireccion({
      ...datosDireccion,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!datosDireccion.direccion.trim()) {
      alert('Por favor ingresa una dirección de despacho válida.');
      return;
    }

    // Actualizar también el perfil del usuario en localStorage con la nueva dirección editada
    try {
      const sesion = localStorage.getItem('usuarioGamerZone');
      if (sesion) {
        const usuarioGuardado = JSON.parse(sesion);
        if (typeof usuarioGuardado === 'object' && usuarioGuardado !== null) {
          const usuarioActualizado = {
            ...usuarioGuardado,
            direccion: datosDireccion.direccion.trim(),
            region: datosDireccion.region,
            provincia: datosDireccion.provincia,
            comuna: datosDireccion.comuna
          };
          localStorage.setItem('usuarioGamerZone', JSON.stringify(usuarioActualizado));
        }
      }
    } catch (e) {
      console.error('Error al actualizar dirección en perfil:', e);
    }

    alConfirmar(datosDireccion);
  };

  const estiloCampoModal = {
    padding: '11px 14px',
    borderRadius: '8px',
    backgroundColor: '#1e293b',
    color: '#ffffff',
    border: '1px solid #334155',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };

  const estiloOpcionModal = {
    backgroundColor: '#1e293b',
    color: '#ffffff'
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }} onClick={alCancelar}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0f172a',
          border: '1.5px solid #00d2ff',
          borderRadius: '16px',
          maxWidth: '560px',
          width: '90%',
          padding: '28px',
          boxShadow: '0 0 30px rgba(0, 210, 255, 0.2)',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#ffffff', fontWeight: '800' }}>
            📦 Dirección de Entrega
          </h3>
          <button onClick={alCancelar} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>
            Confirma o edita los datos donde enviaremos tu pedido:
          </p>

          {/* Dirección de calle y número precargada */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#38bdf8' }}>
              Dirección de calle y número
            </label>
            <input
              type="text"
              name="direccion"
              value={datosDireccion.direccion}
              onChange={handleChange}
              placeholder="Ej: Av. Providencia 1234, Depto 502"
              required
              style={estiloCampoModal}
            />
          </div>

          {/* Desplegables de Región, Provincia y Comuna encadenados */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            
            {/* Región */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#38bdf8', marginBottom: '4px' }}>
                Región
              </label>
              <select
                name="region"
                value={datosDireccion.region}
                onChange={handleRegionChange}
                style={estiloCampoModal}
              >
                {DIVISION_CHILE.map((item) => (
                  <option key={item.region} value={item.region} style={estiloOpcionModal}>
                    {item.region}
                  </option>
                ))}
              </select>
            </div>

            {/* Provincia */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#38bdf8', marginBottom: '4px' }}>
                Provincia
              </label>
              <select
                name="provincia"
                value={datosDireccion.provincia}
                onChange={handleProvinciaChange}
                style={estiloCampoModal}
              >
                {listaProvincias.map((p) => (
                  <option key={p.provincia} value={p.provincia} style={estiloOpcionModal}>
                    {p.provincia}
                  </option>
                ))}
              </select>
            </div>

            {/* Comuna */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#38bdf8', marginBottom: '4px' }}>
                Comuna
              </label>
              <select
                name="comuna"
                value={datosDireccion.comuna}
                onChange={handleChange}
                style={estiloCampoModal}
              >
                {listaComunas.map((comuna) => (
                  <option key={comuna} value={comuna} style={estiloOpcionModal}>
                    {comuna}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Total */}
          <div style={{ backgroundColor: '#1e293b', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.95rem', color: '#cbd5e1', fontWeight: '600' }}>Total a pagar:</span>
            <span style={{ fontSize: '1.35rem', color: '#10b981', fontWeight: '800' }}>
              ${total.toLocaleString('es-CL')}
            </span>
          </div>

          {/* Botones de acción */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Boton
              type="button"
              onClick={alCancelar}
              style={{
                flex: 1,
                backgroundColor: '#334155',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </Boton>
            <Boton
              type="submit"
              className="btn-primary"
              style={{
                flex: 1.5,
                backgroundColor: '#0070f3',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 112, 243, 0.4)'
              }}
            >
              Confirmar y Pagar 💳
            </Boton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalConfirmarDireccion;