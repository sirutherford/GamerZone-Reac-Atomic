import React from 'react';
import Boton from '../atoms/Boton';

const ModalAuthRequerido = ({ alIrALogin, alIrARegistro, alCerrar }) => {
  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }} onClick={alCerrar}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0f172a',
          border: '1.5px solid #00d2ff',
          borderRadius: '16px',
          maxWidth: '420px',
          width: '90%',
          padding: '32px 24px',
          textAlign: 'center',
          boxShadow: '0 0 30px rgba(0, 210, 255, 0.25)',
          color: '#ffffff',
          position: 'relative'
        }}
      >
        {/* Botón cerrar */}
        <button 
          onClick={alCerrar}
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '1.3rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {/* Ícono de destellos */}
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✨</div>

        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '800', 
          color: '#38bdf8', 
          margin: '0 0 10px 0',
          letterSpacing: '-0.5px'
        }}>
          ¡Inicio de Sesión Requerido!
        </h3>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
          Para finalizar tu compra en GamerZone debes iniciar sesión o registrarte.
        </p>

        {/* Dos botones de acción */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Boton
            onClick={alIrALogin}
            className="btn-primary"
            style={{
              width: '100%',
              backgroundColor: '#0070f3',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 14px rgba(0, 112, 243, 0.4)'
            }}
          >
            Iniciar sesión 🔑
          </Boton>

          <Boton
            onClick={alIrARegistro}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              color: '#38bdf8',
              border: '1.5px solid #38bdf8',
              padding: '11px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Registrarse 📝
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default ModalAuthRequerido;