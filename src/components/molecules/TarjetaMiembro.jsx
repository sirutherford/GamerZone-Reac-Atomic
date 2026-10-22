import React from 'react';

const TarjetaMiembro = ({ miembro }) => {
  return (
    <div 
      style={{ 
        backgroundColor: '#0f172a', 
        padding: '30px 20px', 
        borderRadius: '16px', 
        width: '250px', 
        textAlign: 'center',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s, border-color 0.3s',
        border: '1px solid #1e293b'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = '#00d2ff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#1e293b';
      }}
    >
      <div style={{ 
        width: '60px', 
        height: '60px', 
        borderRadius: '50%', 
        backgroundColor: '#1e293b', 
        margin: '0 auto 16px auto', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.7rem',
        border: '2px solid #00d2ff'
      }}>
        {miembro.avatar}
      </div>
      <h4 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: '700', margin: '0 0 6px 0' }}>{miembro.nombre}</h4>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>{miembro.rol}</p>
    </div>
  );
};

export default TarjetaMiembro;