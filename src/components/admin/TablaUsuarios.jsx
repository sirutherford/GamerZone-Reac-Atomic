import React from 'react';

const TablaUsuarios = ({
  subTabUsuarios,
  setSubTabUsuarios,
  listaClientes,
  listaAdmins,
  onVerBoletas,
  onToggleBloquear,
  onEditar,
  onEliminar,
  contenedorEstilo
}) => {
  const usuariosAMostrar = subTabUsuarios === 'admins' ? listaAdmins : listaClientes;

  return (
    <div>
      {/* Sub-pestañas de selección */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => setSubTabUsuarios('clientes')}
          style={{
            padding: '10px 22px',
            borderRadius: '10px',
            border: subTabUsuarios === 'clientes' ? '1px solid #0070f3' : '1px solid #334155',
            backgroundColor: subTabUsuarios === 'clientes' ? '#0070f3' : '#1e293b',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: subTabUsuarios === 'clientes' ? '0 0 12px rgba(0, 112, 243, 0.4)' : 'none',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fa-solid fa-users"></i>
          Clientes ({listaClientes.length})
        </button>

        <button
          onClick={() => setSubTabUsuarios('admins')}
          style={{
            padding: '10px 22px',
            borderRadius: '10px',
            border: subTabUsuarios === 'admins' ? '1px solid #0070f3' : '1px solid #334155',
            backgroundColor: subTabUsuarios === 'admins' ? '#0070f3' : '#1e293b',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: subTabUsuarios === 'admins' ? '0 0 12px rgba(0, 112, 243, 0.4)' : 'none',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fa-solid fa-user-shield"></i>
          Administradores ({listaAdmins.length})
        </button>
      </div>

      {/* Tabla de usuarios con botones estilizados tipo Chip/Badge */}
      <div style={{ ...contenedorEstilo, overflowX: 'auto' }}>
        {usuariosAMostrar.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontWeight: '600' }}>
            No hay {subTabUsuarios === 'admins' ? 'administradores' : 'clientes'} registrados en el sistema.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem', color: '#f8fafc', minWidth: '920px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontWeight: '700' }}>
                <th style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>R.U.T.</th>
                <th style={{ padding: '14px 16px' }}>Nombre</th>
                <th style={{ padding: '14px 16px' }}>Correo Electrónico</th>
                <th style={{ padding: '14px 16px' }}>Ubicación</th>
                <th style={{ padding: '14px 16px', textAlign: 'center' }}>Estado</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosAMostrar.map(usr => {
                const estaBloqueado = Boolean(usr.bloqueado);

                return (
                  <tr key={usr.id || usr.email} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', whiteSpace: 'nowrap', fontWeight: '600' }}>
                      {usr.rut || 'N/A'}
                    </td>

                    {/* Celda de Nombre con etiqueta (Admin) debajo */}
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#ffffff' }}>
                      <div>{usr.nombre}</div>
                      {usr.rol === 'admin' && (
                        <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '600', marginTop: '2px' }}>
                          (Admin)
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '14px 16px', color: '#38bdf8', wordBreak: 'break-all' }}>{usr.email}</td>

                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                      {usr.comuna ? `${usr.comuna}, ${usr.region || ''}` : 'Sin especificar'}
                    </td>

                    {/* Estado con Badge */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        backgroundColor: estaBloqueado ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: estaBloqueado ? '#f87171' : '#34d399',
                        border: `1px solid ${estaBloqueado ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                        whiteSpace: 'nowrap'
                      }}>
                        <span style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: estaBloqueado ? '#ef4444' : '#10b981',
                          display: 'inline-block'
                        }}></span>
                        {estaBloqueado ? 'Bloqueado' : 'Activo'}
                      </span>
                    </td>

                    {/* Acciones estilizadas como Chips/Badges interactivos */}
                    <td style={{ padding: '14px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                        
                        {/* Botón Boletas */}
                        <button 
                          onClick={() => onVerBoletas(usr)} 
                          style={btnChipBoletas}
                          title="Ver boletas del usuario"
                        >
                          <i className="fa-solid fa-receipt" style={{ fontSize: '0.78rem' }}></i>
                          Boletas
                        </button>

                        {/* Botón Bloquear / Desbloquear */}
                        <button 
                          onClick={() => onToggleBloquear(usr.id || usr.email)} 
                          style={estaBloqueado ? btnChipDesbloquear : btnChipBloquear}
                          title={estaBloqueado ? "Desbloquear usuario" : "Bloquear usuario"}
                        >
                          <i className={`fa-solid ${estaBloqueado ? 'fa-user-check' : 'fa-user-slash'}`} style={{ fontSize: '0.78rem' }}></i>
                          {estaBloqueado ? 'Desbloquear' : 'Bloquear'}
                        </button>

                        {/* Botón Editar */}
                        <button 
                          onClick={() => onEditar(usr)} 
                          style={btnChipEditar}
                          title="Editar usuario"
                        >
                          <i className="fa-solid fa-pen-to-square" style={{ fontSize: '0.78rem' }}></i>
                          Editar
                        </button>

                        {/* Botón Eliminar */}
                        <button 
                          onClick={() => onEliminar(usr.id || usr.email)} 
                          style={btnChipEliminar}
                          title="Eliminar usuario"
                        >
                          <i className="fa-solid fa-trash-can" style={{ fontSize: '0.78rem' }}></i>
                          Eliminar
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// ESTILOS DE CHIPS PARA BOTONES DE ACCIÓN
const btnChipBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 12px',
  borderRadius: '8px',
  fontSize: '0.8rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  border: '1px solid transparent',
  outline: 'none'
};

const btnChipBoletas = {
  ...btnChipBase,
  backgroundColor: 'rgba(52, 211, 153, 0.12)',
  color: '#34d399',
  border: '1px solid rgba(52, 211, 153, 0.3)'
};

const btnChipBloquear = {
  ...btnChipBase,
  backgroundColor: 'rgba(245, 158, 11, 0.12)',
  color: '#fbbf24',
  border: '1px solid rgba(245, 158, 11, 0.3)'
};

const btnChipDesbloquear = {
  ...btnChipBase,
  backgroundColor: 'rgba(16, 185, 129, 0.12)',
  color: '#10b981',
  border: '1px solid rgba(16, 185, 129, 0.3)'
};

const btnChipEditar = {
  ...btnChipBase,
  backgroundColor: 'rgba(56, 189, 248, 0.12)',
  color: '#38bdf8',
  border: '1px solid rgba(56, 189, 248, 0.3)'
};

const btnChipEliminar = {
  ...btnChipBase,
  backgroundColor: 'rgba(239, 68, 68, 0.12)',
  color: '#f87171',
  border: '1px solid rgba(239, 68, 68, 0.3)'
};

export default TablaUsuarios;