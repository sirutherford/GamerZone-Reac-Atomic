import React from 'react';

const TarjetaInfoNosotros = ({ icono, titulo, descripcion }) => {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '2px solid #00d2ff',
      borderRadius: '16px',
      padding: '22px 18px',
      textAlign: 'center',
      boxShadow: '0 6px 18px -4px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icono}</div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
        {titulo}
      </h3>
      <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.4', margin: 0 }}>
        {descripcion}
      </p>
    </div>
  );
};

export default TarjetaInfoNosotros;