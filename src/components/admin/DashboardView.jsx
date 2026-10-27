import React from 'react';

const obtenerCodigoProducto = (prod, index = 0) => {
  if (prod && prod.codigo && String(prod.codigo).trim().length > 0) {
    return prod.codigo;
  }
  const num = prod?.id || (index + 1);
  return `GZ-${String(num).padStart(4, '0')}`;
};

const DashboardView = ({
  totalVentas,
  ticketPromedio,
  productos = [],
  productosCriticos = [],
  productosPorAgotar = [],
  productosOptimos = [],
  listaClientes = [],
  historialCompras = [],
  formatearMonedaCLP,
  parsePrecioLimpio,
  setTabActiva
}) => {
  // CÁLCULO DINÁMICO DE PORCENTAJES Y ÁNGULOS PARA EL GRÁFICO DONUT SVG
  const totalProductos = productos.length || 1;
  const pctOptimo = (productosOptimos.length / totalProductos) * 100;
  const pctPorAgotar = (productosPorAgotar.length / totalProductos) * 100;
  const pctCritico = (productosCriticos.length / totalProductos) * 100;

  const offsetPorAgotar = -pctOptimo;
  const offsetCritico = -(pctOptimo + pctPorAgotar);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* 1. TARJETAS KPI DE RENDIMIENTO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KpiCardModerno 
          titulo="Ventas Totales" 
          valor={formatearMonedaCLP(totalVentas)} 
          tendencia="+14.2%" 
          icono="💰"
          colorBorder="#10b981" 
          colorTexto="#34d399" 
        />
        <KpiCardModerno 
          titulo="Ticket Promedio" 
          valor={formatearMonedaCLP(ticketPromedio)} 
          tendencia="+5.8%" 
          icono="🏷️"
          colorBorder="#38bdf8" 
          colorTexto="#38bdf8" 
        />
        <KpiCardModerno 
          titulo="Stock Crítico" 
          valor={`${productosCriticos.length} items`} 
          tendencia={productosCriticos.length > 0 ? "Requiere atención" : "Normal"} 
          esAlerta={productosCriticos.length > 0} 
          icono="🚨"
          colorBorder="#ef4444" 
          colorTexto="#f87171" 
        />
        <KpiCardModerno 
          titulo="Clientes Registrados" 
          valor={listaClientes.length} 
          tendencia="+8.5%" 
          icono="👥"
          colorBorder="#8b5cf6" 
          colorTexto="#a78bfa" 
        />
      </div>

      {/* 2. GRÁFICOS VISUALES */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* GRÁFICO DE BARRAS DE VENTAS MENSUALES */}
        <div style={cardEstiloGamer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>
                 Volumen de Ventas Mensual
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Comportamiento de ingresos del período actual
              </span>
            </div>
            <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>
              2026
            </span>
          </div>

          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', padding: '10px 0', borderBottom: '1px solid #334155' }}>
            {[
              { mes: 'Mayo', valor: 420000, h: '45%' },
              { mes: 'Junio', valor: 650000, h: '65%' },
              { mes: 'Julio', valor: 510000, h: '50%' },
              { mes: 'Agosto', valor: 890000, h: '85%' },
              { mes: 'Sept', valor: 740000, h: '70%' },
              { mes: 'Octubre', valor: totalVentas > 0 ? totalVentas : 305930, h: totalVentas > 0 ? `${Math.min(100, Math.max(20, (totalVentas / 1000000) * 100))}%` : '40%', activo: true }
            ].map((bar, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                <div style={{ fontSize: '0.7rem', color: bar.activo ? '#34d399' : '#94a3b8', fontWeight: '700', whiteSpace: 'nowrap' }}>
                  ${Math.round(parsePrecioLimpio(bar.valor) / 1000)}k
                </div>
                <div style={{
                  width: '100%',
                  maxWidth: '38px',
                  height: bar.h,
                  backgroundColor: bar.activo ? '#0070f3' : '#334155',
                  borderRadius: '6px 6px 0 0',
                  boxShadow: bar.activo ? '0 0 15px rgba(0, 112, 243, 0.6)' : 'none',
                  transition: 'all 0.5s ease'
                }} />
                <span style={{ fontSize: '0.75rem', color: bar.activo ? '#ffffff' : '#64748b', fontWeight: bar.activo ? '800' : '600' }}>
                  {bar.mes}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GRÁFICO DONUT 100% DINÁMICO */}
        <div style={cardEstiloGamer}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>
             Estado de Inventario
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Proporción de disponibilidad</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
            <svg width="130" height="130" viewBox="0 0 36 36">
              {/* Fondo del Donut */}
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#334155" strokeWidth="3.8" />
              
              {/* Tramo Óptimo (Verde) */}
              {pctOptimo > 0 && (
                <path 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3.8" 
                  strokeDasharray={`${pctOptimo}, 100`} 
                  strokeDashoffset="0"
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              )}

              {/* Tramo Por Agotar (Amarillo) */}
              {pctPorAgotar > 0 && (
                <path 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="3.8" 
                  strokeDasharray={`${pctPorAgotar}, 100`} 
                  strokeDashoffset={offsetPorAgotar}
                  style={{ transition: 'stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease' }}
                />
              )}

              {/* Tramo Crítico (Rojo) */}
              {pctCritico > 0 && (
                <path 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="3.8" 
                  strokeDasharray={`${pctCritico}, 100`} 
                  strokeDashoffset={offsetCritico}
                  style={{ transition: 'stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease' }}
                />
              )}

              <text x="18" y="20.5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">{productos.length}</text>
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#86efac', fontWeight: '600' }}>🟢 Óptimo (&gt; 15 u.):</span>
              <strong style={{ color: '#ffffff' }}>{productosOptimos.length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fde047', fontWeight: '600' }}>🟡 Por Agotar (6-15 u.):</span>
              <strong style={{ color: '#ffffff' }}>{productosPorAgotar.length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fca5a5', fontWeight: '600' }}>🔴 Crítico (≤ 5 u.):</span>
              <strong style={{ color: '#ffffff' }}>{productosCriticos.length}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 3. PRODUCTOS DESTACADOS Y COMPRAS RECIENTES DINÁMICAS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* PRODUCTOS DESTACADOS */}
        <div style={cardEstiloGamer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>
               Productos Destacados
            </h3>
            <button onClick={() => setTabActiva('productos')} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>
              Ver todos →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {productos.slice(0, 4).map((p, idx) => {
              const stockNum = parsePrecioLimpio(p.stock);
              return (
                <div key={p.id || idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: '800', color: '#0070f3', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      {obtenerCodigoProducto(p, idx)}
                    </span>
                    {p.imagen && <img src={p.imagen} alt={p.titulo || p.nombre} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />}
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#ffffff' }}>{p.titulo || p.nombre}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.categoria || 'Variado'}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#34d399' }}>{formatearMonedaCLP(p.precio)}</div>
                    <div style={{ fontSize: '0.75rem', color: stockNum <= 5 ? '#ef4444' : '#94a3b8', fontWeight: stockNum <= 5 ? '800' : '400' }}>
                      {stockNum === 0 ? 'AGOTADO' : `${stockNum} u. disponibles`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPRAS RECIENTES */}
        <div style={cardEstiloGamer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>
               Compras Recientes
            </h3>
            <button onClick={() => setTabActiva('boletas')} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>
              Ver Boletas →
            </button>
          </div>

          {historialCompras.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
              No hay ventas registradas aún.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {historialCompras.slice(0, 4).map((ord, idx) => (
                <div key={ord.id || idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0f172a', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0070f3', whiteSpace: 'nowrap' }}>
                      Boleta #{ord.numBoleta || ord.idBoleta || ord.id || (10000 + idx)}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                      {ord.usuario || ord.cliente || ord.nombreCliente || ord.datosEntrega?.nombre || 'Cliente Registrado'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#34d399' }}>
                      {formatearMonedaCLP(ord.total || ord.montoTotal || ord.totalPagar)}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>
                      Completado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

const KpiCardModerno = ({ titulo, valor, tendencia, icono, colorBorder, colorTexto, esAlerta }) => (
  <div style={{
    backgroundColor: '#1e293b',
    borderRadius: '14px',
    border: '1px solid #334155',
    borderLeft: `4px solid ${colorBorder || '#0070f3'}`,
    padding: '20px 22px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
  }}>
    <div>
      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {titulo}
      </div>
      <div style={{ fontSize: '1.65rem', fontWeight: '900', color: '#ffffff', marginTop: '4px', whiteSpace: 'nowrap' }}>
        {valor}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '800', marginTop: '6px', color: esAlerta ? '#f87171' : (colorTexto || '#34d399') }}>
        <span>▲</span>
        <span>{tendencia}</span>
      </div>
    </div>
    <div style={{ fontSize: '1.8rem', backgroundColor: '#0f172a', padding: '10px 14px', borderRadius: '12px', border: '1px solid #334155' }}>
      {icono}
    </div>
  </div>
);

const cardEstiloGamer = {
  backgroundColor: '#1e293b',
  borderRadius: '14px',
  border: '1px solid #334155',
  padding: '22px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
};

export default DashboardView;