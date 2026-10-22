import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import ModalUsuario from '../components/admin/ModalUsuario';
import ModalProducto from '../components/admin/ModalProducto';
import ModalDetalleBoleta from '../components/admin/ModalDetalleBoleta';
import AdminLogin from './AdminLogin';

// Subcomponentes modulares
import TablaUsuarios from '../components/admin/TablaUsuarios';
import ModalBoletasCliente from '../components/admin/ModalBoletasCliente';
import ModalMensajeAdmin from '../components/admin/ModalMensajeAdmin';

const PRODUCTOS_BASE = [
  { id: 1, codigo: 'GZ-001', titulo: 'The Legend of Zelda: Tears of the Kingdom', categoria: 'Nintendo Switch', precio: 59990, stock: 15, imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400', descripcion: 'Explora los cielos y las profundidades de Hyrule.' },
  { id: 2, codigo: 'GZ-002', titulo: 'God of War Ragnarök', categoria: 'PlayStation 5', precio: 54990, stock: 12, imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400', descripcion: 'Embárcate en un viaje mítico junto a Kratos.' }
];

const USUARIOS_BASE = [
  { id: 1, rut: '18.765.432-1', nombre: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', comuna: 'Providencia', region: 'Región Metropolitana', bloqueado: false, rol: 'usuario' },
  { id: 3, rut: '11.111.111-1', nombre: 'Administrador Principal', email: 'admin@gamerzone.cl', comuna: 'Santiago', region: 'Región Metropolitana', bloqueado: false, rol: 'admin' }
];

const AdminDashboard = ({ navegarA, alCerrarSesion, usuarioActual }) => {
  const [esAdminAutenticado, setEsAdminAutenticado] = useState(() => {
    return localStorage.getItem('adminAutenticadoGamerZone') === 'true';
  });

  const [tabActiva, setTabActiva] = useState('dashboard');
  const [subTabUsuarios, setSubTabUsuarios] = useState('clientes');

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [historialCompras, setHistorialCompras] = useState([]);

  // Modales
  const [modalProductoOpen, setModalProductoOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [formDataProducto, setFormDataProducto] = useState({ 
    codigo: '', titulo: '', categoria: 'Todas las plataformas', precio: '', stock: 10, imagen: '', descripcion: '' 
  });

  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [formDataUsuario, setFormDataUsuario] = useState({ 
    rut: '', nombre: '', email: '', direccion: '', region: 'Región Metropolitana', provincia: 'Santiago', comuna: 'Providencia', password: '', confirmarPassword: '', bloqueado: false, rol: 'usuario'
  });

  const [modalBoletasCliente, setModalBoletasCliente] = useState({ open: false, cliente: null, boletas: [] });
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [modalMensaje, setModalMensaje] = useState({ open: false, titulo: '', mensaje: '', tipo: 'info', onConfirmar: null });

  useEffect(() => {
    const prods = localStorage.getItem('productosGamerZone');
    setProductos(prods ? JSON.parse(prods) : PRODUCTOS_BASE);

    const usrsRaw = localStorage.getItem('usuariosGamerZone');
    setUsuarios(usrsRaw ? JSON.parse(usrsRaw) : USUARIOS_BASE);

    const ordenes = localStorage.getItem('historialComprasGamerZone');
    setHistorialCompras(ordenes ? JSON.parse(ordenes) : []);
  }, []);

  const handleCerrarSesionAdmin = () => {
    localStorage.removeItem('adminAutenticadoGamerZone');
    setEsAdminAutenticado(false);
    if (alCerrarSesion) alCerrarSesion();
  };

  if (!esAdminAutenticado) {
    return <AdminLogin alAutenticar={() => setEsAdminAutenticado(true)} volverATienda={navegarA} />;
  }

  // --- APERTURA Y CIERRE DE BOLETAS (CORREGIDO) ---
  const handleVerDetalleDesdeHistorial = (boleta) => {
    setModalBoletasCliente(prev => ({ ...prev, open: false }));
    setOrdenSeleccionada(boleta); // Se asigna directo, sin cálculos previos que puedan fallar
  };

  const handleVerBoletaTabla = (orden) => {
    setOrdenSeleccionada(orden); // Abre directamente la boleta desde Órdenes/Boletas
  };

  const handleCerrarDetalleBoleta = () => {
    setOrdenSeleccionada(null);
    if (modalBoletasCliente.cliente) {
      setModalBoletasCliente(prev => ({ ...prev, open: true }));
    }
  };

  const handleCerrarTodoBoletas = () => {
    setOrdenSeleccionada(null);
    setModalBoletasCliente({ open: false, cliente: null, boletas: [] });
  };

  const handleCerrarHistorialCliente = () => {
    setModalBoletasCliente({ open: false, cliente: null, boletas: [] });
  };

  const handleVerBoletasCliente = (usr) => {
    if (!usr) return;
    const cEmail = String(usr.email || '').toLowerCase().trim();
    const boletasEncontradas = (historialCompras || []).filter((orden) => {
      const eBoleta = String(orden.email || orden.datosEntrega?.email || '').toLowerCase().trim();
      return eBoleta === cEmail;
    }).map(boleta => ({
      ...boleta,
      rut: boleta.rut || boleta.datosEntrega?.rut || usr.rut || 'Sin R.U.T.'
    }));
    setModalBoletasCliente({ open: true, cliente: usr, boletas: boletasEncontradas });
  };

  // Cálculos Dashboard
  const productosCriticos = productos.filter(p => (Number(p.stock) || 0) <= 5);
  const totalVentas = historialCompras.reduce((sum, ord) => sum + (Number(ord?.total) || 0), 0);
  const listaClientes = usuarios.filter(u => u.rol !== 'admin');
  const listaAdmins = usuarios.filter(u => u.rol === 'admin');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icono: '📊' },
    { id: 'productos', label: 'Productos', icono: '📦' },
    { id: 'critico', label: 'Stock Crítico', icono: '🚨', badge: productosCriticos.length },
    { id: 'usuarios', label: 'Usuarios', icono: '👥' },
    { id: 'ordenes', label: 'Órdenes', icono: '📑' },
    { id: 'boletas', label: 'Boletas', icono: '📄' },
    { id: 'reportes', label: 'Reportes', icono: '📈' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0f1d', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <AdminSidebar 
        menuItems={menuItems} tabActiva={tabActiva} setTabActiva={setTabActiva} 
        navegarA={navegarA} usuarioActual={usuarioActual || 'admin@gamerzone.cl'} 
        alCerrarSesion={handleCerrarSesionAdmin} 
      />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{ color: '#0070f3', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase' }}>PANEL DE CONTROL GAMERZONE</div>
            <h1 style={{ margin: '4px 0 0 0', fontSize: '2.2rem', fontWeight: '900', color: '#ffffff' }}>{menuItems.find(m => m.id === tabActiva)?.label}</h1>
          </div>
        </div>

        {/* 1. DASHBOARD */}
        {tabActiva === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <MetricCard titulo="Ventas Totales" valor={`$${totalVentas.toLocaleString('es-CL')}`} icono="💰" color="#10b981" />
            <MetricCard titulo="Catálogo Productos" valor={productos.length} icono="📦" color="#0070f3" />
            <MetricCard titulo="Stock Crítico (≤ 5 u.)" valor={productosCriticos.length} icono="🚨" color="#ef4444" />
            <MetricCard titulo="Usuarios Registrados" valor={usuarios.length} icono="👥" color="#8b5cf6" />
          </div>
        )}

        {/* 4. USUARIOS */}
        {tabActiva === 'usuarios' && (
          <TablaUsuarios 
            subTabUsuarios={subTabUsuarios} setSubTabUsuarios={setSubTabUsuarios}
            listaClientes={listaClientes} listaAdmins={listaAdmins}
            onVerBoletas={handleVerBoletasCliente} onToggleBloquear={() => {}} onEditar={() => {}} onEliminar={() => {}}
            contenedorEstilo={contenedorTablaGamer}
          />
        )}

        {/* 5 y 6. ÓRDENES Y BOLETAS (Boton corregido) */}
        {(tabActiva === 'ordenes' || tabActiva === 'boletas') && (
          <div style={contenedorTablaGamer}>
            {historialCompras.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Aún no hay compras registradas en el sistema.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', color: '#f8fafc' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontWeight: '700' }}>
                    <th style={{ padding: '16px 20px' }}>N° Boleta</th>
                    <th style={{ padding: '16px 20px' }}>Fecha</th>
                    <th style={{ padding: '16px 20px' }}>Cliente</th>
                    <th style={{ padding: '16px 20px' }}>Total</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {historialCompras.map((orden, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '16px 20px', fontWeight: '800', color: '#0070f3' }}>#{orden.numBoleta || 100000 + idx}</td>
                      <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{orden.fecha}</td>
                      <td style={{ padding: '16px 20px', fontWeight: '600', color: '#ffffff' }}>{orden.usuario || orden.cliente}</td>
                      <td style={{ padding: '16px 20px', fontWeight: '700', color: '#34d399' }}>${(orden.total || 0).toLocaleString('es-CL')}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        {/* Botón Restaurado */}
                        <button 
                          onClick={() => handleVerBoletaTabla(orden)} 
                          style={{ border: 'none', background: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: '700' }}
                        >
                          Ver Boleta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {modalBoletasCliente.open && (
        <ModalBoletasCliente 
          cliente={modalBoletasCliente.cliente}
          boletas={modalBoletasCliente.boletas}
          alCerrar={handleCerrarHistorialCliente}
          alCerrarX={handleCerrarTodoBoletas}
          alVerDetalleOrden={handleVerDetalleDesdeHistorial}
        />
      )}

      {ordenSeleccionada && (
        <ModalDetalleBoleta 
          orden={ordenSeleccionada} 
          alCerrar={handleCerrarDetalleBoleta} 
          alCerrarX={handleCerrarTodoBoletas}
        />
      )}
    </div>
  );
};

const MetricCard = ({ titulo, valor, icono, color }) => (
  <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ fontSize: '2rem', backgroundColor: '#0a0f1d', padding: '12px', borderRadius: '10px', border: '1px solid #334155' }}>{icono}</div>
    <div>
      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>{titulo}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: color || '#ffffff', marginTop: '2px' }}>{valor}</div>
    </div>
  </div>
);

const contenedorTablaGamer = { backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', overflow: 'hidden' };

export default AdminDashboard;