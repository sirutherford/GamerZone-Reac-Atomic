import React from 'react';

const ModalMensajeAdmin = ({ modalMensaje, setModalMensaje }) => {
  if (!modalMensaje.open) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(10, 15, 29, 0.85)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1f293d',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '28px 32px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
          {modalMensaje.tipo === 'error' ? '⛔' : modalMensaje.tipo === 'confirm' ? '⚠️' : 'ℹ️'}
        </div>
        
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
          {modalMensaje.titulo || 'Atención'}
        </h3>
        
        <p style={{ margin: '0 0 24px 0', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
          {modalMensaje.mensaje}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          {modalMensaje.tipo === 'confirm' && (
            <button
              onClick={() => setModalMensaje({ ...modalMensaje, open: false })}
              style={{
                padding: '10px 22px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#3b475d',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.88rem'
              }}
            >
              Cancelar
            </button>
          )}
          
          <button
            onClick={() => {
              if (modalMensaje.onConfirmar) {
                modalMensaje.onConfirmar();
              }
              setModalMensaje({ ...modalMensaje, open: false });
            }}
            style={{
              padding: '10px 26px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#0070f3',
              color: '#ffffff',
              cursor: 'pointer',
              fontWeight: '800',
              fontSize: '0.88rem',
              boxShadow: '0 0 12px rgba(0, 112, 243, 0.4)'
            }}
          >
            {modalMensaje.tipo === 'confirm' ? 'Aceptar' : 'Entendido'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMensajeAdmin;