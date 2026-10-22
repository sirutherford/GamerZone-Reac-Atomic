import React, { useState, useEffect } from 'react';
import Boton from '../components/atoms/Boton';
import ModalBoleta from '../components/molecules/ModalBoleta';

const HistorialCompras = ({ usuario, irATienda }) => {
  const [compras, setCompras] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  useEffect(() => {
    const cargarHistorial = () => {
      try {
        const historialTotal = JSON.parse(localStorage.getItem('historialComprasGamerZone')) || [];
        const usuariosLocales = JSON.parse(localStorage.getItem('usuariosGamerZone')) || [];

        // Obtener datos del usuario logueado
        let miEmail = '';
        let miNombre = '';

        if (typeof usuario === 'string') {
          if (usuario.includes('@')) miEmail = usuario.toLowerCase().trim();
          else miNombre = usuario.toLowerCase().trim();
        } else if (usuario && typeof usuario === 'object') {
          miEmail = String(usuario.email || '').toLowerCase().trim();
          miNombre = String(usuario.nombre || usuario.usuario || '').toLowerCase().trim();
        }

        // Si el usuario no tiene correo en el objeto, buscarlo en las cuentas locales
        if (!miEmail && miNombre) {
          const uEncontrado = usuariosLocales.find(u => String(u.nombre || '').toLowerCase().trim() === miNombre);
          if (uEncontrado) miEmail = String(uEncontrado.email || '').toLowerCase().trim();
        }

        // AUTO-REPARACIÓN: Vincular boletas creadas bajo nombres o correos anteriores (e.g. Simon Rutherford / simon@gmail.com)
        const historialReparado = historialTotal.map(boleta => {
          const bUser = String(boleta.usuario || '').toLowerCase().trim();
          const bEmail = String(boleta.email || boleta.datosEntrega?.email || '').toLowerCase().trim();

          const esMismaCuenta = 
            (miEmail && (bEmail === miEmail || bUser === miEmail)) ||
            (miEmail === 'simon@gmail.com' && (bUser.includes('simon') || bUser.includes('juan'))) ||
            (miNombre && bUser === miNombre);

          if (esMismaCuenta) {
            return {
              ...boleta,
              email: miEmail || 'simon@gmail.com',
              usuario: typeof usuario === 'object' ? usuario.nombre : (usuario || 'Juan Toro')
            };
          }
          return boleta;
        });

        // Guardar el historial corregido en localStorage
        localStorage.setItem('historialComprasGamerZone', JSON.stringify(historialReparado));

        // Filtrar boletas para el usuario activo
        const misCompras = historialReparado.filter((boleta) => {
          const bUser = String(boleta.usuario || '').toLowerCase().trim();
          const bEmail = String(boleta.email || boleta.datosEntrega?.email || '').toLowerCase().trim();

          if (!miEmail && !miNombre) return true;

          return (
            (miEmail && (bEmail === miEmail || bUser === miEmail)) ||
            (miNombre && (bUser === miNombre || bUser.includes(miNombre) || miNombre.includes(bUser))) ||
            (miEmail === 'simon@gmail.com' && (bUser.includes('simon') || bUser.includes('juan')))
          );
        });

        setCompras(misCompras);
      } catch (e) {
        console.error('Error al cargar e integrar historial:', e);
      }
    };

    cargarHistorial();
  }, [usuario]);

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '40px 20px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Encabezado */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#0f172a', fontWeight: '800', margin: 0 }}>
            📦 Mis Compras
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
            Revisa tu historial de pedidos realizados en GamerZone y descarga tus boletas cuando las necesites.
          </p>
        </div>

        {compras.length === 0 ? (
          <div style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '50px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎮</div>
            <h3 style={{ color: '#0f172a', margin: '0 0 10px 0', fontSize: '1.4rem', fontWeight: '700' }}>Aún no tienes compras registradas</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '25px' }}>Explora nuestro catálogo y equipa tu setup con los mejores juegos.</p>
            {irATienda && (
              <Boton 
                onClick={irATienda}
                style={{ backgroundColor: '#0070f3', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontWeight: '700', border: 'none' }}
              >
                Ir al Catálogo 
              </Boton>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {compras.map((compra, index) => (
              <div 
                key={compra.numBoleta || index}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* Cabecera de la Orden */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0070f3', backgroundColor: '#e0f2fe', padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                      Boleta N° {compra.numBoleta}
                    </span>
                    <span style={{ marginLeft: '12px', fontSize: '0.85rem', color: '#64748b' }}>
                      📅 {compra.fecha}
                    </span>
                  </div>

                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#10b981' }}>
                    ${(Number(compra.total) || 0).toLocaleString('es-CL')}
                  </div>
                </div>

                {/* Productos comprados */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {compra.productos && compra.productos.map((prod, pIdx) => (
                    <div key={prod.id || pIdx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      {prod.imagen && (
                        <img 
                          src={prod.imagen} 
                          alt={prod.titulo || prod.nombre} 
                          style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px', backgroundColor: '#f8fafc', padding: '4px' }} 
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <h5 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: '700' }}>
                          {prod.titulo || prod.nombre}
                        </h5>
                        <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                          Cantidad: {prod.cantidad || 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pie con información de envío y descarga de boleta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                    📍 <strong>Entrega:</strong> {compra.datosEntrega?.direccion || 'Retiro en tienda'}, {compra.datosEntrega?.comuna || ''}
                  </div>

                  <Boton
                    onClick={() => setOrdenSeleccionada(compra)}
                    style={{
                      backgroundColor: '#0f172a',
                      color: '#38bdf8',
                      border: '1px solid #1e293b',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Ver / Descargar Boleta 
                  </Boton>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal oficial de la Boleta seleccionada */}
        {ordenSeleccionada && (
          <ModalBoleta
            orden={ordenSeleccionada}
            alFinalizar={() => setOrdenSeleccionada(null)}
          />
        )}
      </div>
    </section>
  );
};

export default HistorialCompras;