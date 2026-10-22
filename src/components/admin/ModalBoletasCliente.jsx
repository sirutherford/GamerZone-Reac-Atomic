import React from 'react';

const ModalBoletasCliente = ({ cliente, boletas = [], alCerrar, alCerrarX, alVerDetalleOrden }) => {
  if (!cliente) return null;

  const obtenerPrecioNumerico = (precio) => {
    return typeof precio === 'number' ? precio : parseInt(String(precio || 0).replace(/[^0-9]/g, ''), 10) || 0;
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(10, 15, 29, 0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '16px', padding: '28px 32px',
        width: '100%', maxWidth: '650px', maxHeight: '82vh', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '800', color: '#38bdf8' }}>Historial de Boletas</h3>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cliente: <strong style={{ color: '#ffffff' }}>{cliente.nombre}</strong></span>
          </div>
          <button onClick={alCerrarX || alCerrar} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '6px' }}>
          {(!boletas || boletas.length === 0) ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>Este usuario no registra boletas.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {boletas.map((boleta, idx) => (
                <div key={idx} style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: '800', color: '#0070f3', fontSize: '1rem' }}>Boleta #{boleta.numBoleta || 100000 + idx}</span>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{boleta.fecha}</span>
                    <span style={{ fontWeight: '800', color: '#34d399', fontSize: '1.05rem' }}>${obtenerPrecioNumerico(boleta.total).toLocaleString('es-CL')}</span>
                  </div>
                  
                  <div style={{ marginTop: '10px', textAlign: 'right' }}>
                    {/* Evento corregido directo */}
                    <button onClick={() => alVerDetalleOrden(boleta)} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: '700', fontSize: '0.82rem' }}>
                      Ver detalle completo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right', borderTop: '1px solid #334155', paddingTop: '14px' }}>
          <button onClick={alCerrar} style={{ backgroundColor: '#0070f3', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalBoletasCliente;