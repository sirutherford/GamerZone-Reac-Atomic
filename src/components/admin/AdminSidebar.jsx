import React from 'react';

const AdminSidebar = ({ menuItems, tabActiva, setTabActiva, navegarA, usuarioActual, alCerrarSesion }) => {
  return (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: '#0f172a',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      boxSizing: 'border-box',
      borderRight: '1px solid #1e293b',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '0 12px 28px 12px' }}>
        <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '900', letterSpacing: '-0.5px', color: '#ffffff' }}>
          Gamer<span style={{ color: '#0070f3', textShadow: '0 0 10px rgba(0,112,243,0.5)' }}>Zone</span> Admin
        </h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {menuItems.map((item) => {
          const esActivo = tabActiva === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTabActiva(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: esActivo ? '#1e293b' : 'transparent',
                color: esActivo ? '#0070f3' : '#94a3b8',
                fontWeight: esActivo ? '800' : '500',
                fontSize: '0.92rem',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: esActivo ? 'inset 3px 0 0 #0070f3' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icono}</span>
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ height: '1px', backgroundColor: '#1e293b', margin: '20px 0' }} />

      {/* Botón Volver a la Tienda */}
      <button
        onClick={() => navegarA && navegarA('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid #334155',
          backgroundColor: '#0a0f1d',
          color: '#38bdf8',
          fontWeight: '600',
          fontSize: '0.9rem',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        Volver a la tienda
      </button>

      {/* Tarjeta de Administrador y Botón de Cerrar Sesión justo debajo */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '14px', marginTop: '12px', border: '1px solid #334155' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffffff' }}>
          Administrador GamerZone
        </div>
        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px', wordBreak: 'break-all' }}>
          {typeof usuarioActual === 'string' ? usuarioActual : 'admin@gamerzone.cl'}
        </div>

        <button
          onClick={alCerrarSesion}
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171',
            fontWeight: '700',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;