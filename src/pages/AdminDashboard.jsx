import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import ModalUsuario from '../components/admin/ModalUsuario';
import ModalProducto from '../components/admin/ModalProducto';
import ModalDetalleBoleta from '../components/admin/ModalDetalleBoleta';
import AdminLogin from './AdminLogin';

// Subcomponentes modulares
import DashboardView from '../components/admin/DashboardView';
import TablaUsuarios from '../components/admin/TablaUsuarios';
import ModalBoletasCliente from '../components/admin/ModalBoletasCliente';

const PRODUCTOS_BASE = [
  { id: 1, codigo: 'GZ-0001', titulo: 'The Legend of Zelda: Tears of the Kingdom', categoria: 'Nintendo Switch', precio: 59990, stock: 15, imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400', descripcion: 'Explora los cielos y las profundidades de Hyrule.' },
  { id: 2, codigo: 'GZ-0002', titulo: 'God of War Ragnarök', categoria: 'PlayStation 5', precio: 54990, stock: 12, imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400', descripcion: 'Embárcate en un viaje mítico junto a Kratos.' }
];

const USUARIOS_BASE = [
  { id: 1, rut: '18.765.432-1', nombre: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', comuna: 'Providencia', region: 'Región Metropolitana', bloqueado: false, rol: 'usuario' },
  { id: 3, rut: '11.111.111-1', nombre: 'Administrador Principal', email: 'admin@gamerzone.cl', comuna: 'Santiago', region: 'Región Metropolitana', bloqueado: false, rol: 'admin' }
];

// Formato de código unificado sin salto de línea
const obtenerCodigoProducto = (prod, index = 0) => {
  if (prod && prod.codigo && String(prod.codigo).trim().length > 0) {
    return prod.codigo;
  }
  const num = prod?.id || (index + 1);
  return `GZ-${String(num).padStart(4, '0')}`;
};

const sanitizarUsuarios = (lista) => {
  if (!Array.isArray(lista)) return USUARIOS_BASE;
  const vistos = new Set();
  const resultado = [];

  for (const u of lista) {
    if (!u) continue;
    const emailKey = u.email ? String(u.email).toLowerCase().trim() : '';
    const rutKey = u.rut ? String(u.rut).trim() : '';
    const idKey = u.id ? String(u.id) : '';
    
    const claveUnica = emailKey || rutKey || idKey;

    if (claveUnica && !vistos.has(claveUnica)) {
      vistos.add(claveUnica);
      resultado.push({
        ...u,
        id: u.id || Date.now() + Math.floor(Math.random() * 1000)
      });
    }
  }

  return resultado;
};

// Convierte a número respetando el 0
const parsePrecioLimpio = (precio) => {
  if (typeof precio === 'number') return precio;
  const num = Number(String(precio ?? '0').replace(/\D/g, ''));
  return isNaN(num) ? 0 : num;
};

const formatearMonedaCLP = (precio) => {
  const monto = parsePrecioLimpio(precio);
  return `$${monto.toLocaleString('es-CL')}`;
};

const obtenerEstadoStock = (stockInput) => {
  const stock = parsePrecioLimpio(stockInput);
  if (stock <= 5) {
    return {
      clave: 'critico',
      etiqueta: stock === 0 ? 'AGOTADO' : 'STOCK CRÍTICO',
      colorTexto: '#fca5a5',
      colorBg: 'rgba(239, 68, 68, 0.2)',
      colorBorde: '#ef4444'
    };
  } else if (stock <= 15) {
    return {
      clave: 'porAgotar',
      etiqueta: 'POR AGOTAR',
      colorTexto: '#fde047',
      colorBg: 'rgba(245, 158, 11, 0.2)',
      colorBorde: '#f59e0b'
    };
  } else {
    return {
      clave: 'optimo',
      etiqueta: 'STOCK ÓPTIMO',
      colorTexto: '#86efac',
      colorBg: 'rgba(16, 185, 129, 0.2)',
      colorBorde: '#10b981'
    };
  }
};

const AdminDashboard = ({ navegarA, alCerrarSesion, usuarioActual }) => {
  const [esAdminAutenticado, setEsAdminAutenticado] = useState(() => {
    return localStorage.getItem('adminAutenticadoGamerZone') === 'true';
  });

  const [tabActiva, setTabActiva] = useState('dashboard');
  const [subTabUsuarios, setSubTabUsuarios] = useState('clientes');
  const [filtroEstadoStock, setFiltroEstadoStock] = useState('todos');

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [historialCompras, setHistorialCompras] = useState([]);

  // Modales
  const [modalProductoOpen, setModalProductoOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [formDataProducto, setFormDataProducto] = useState({ 
    codigo: '', titulo: '', nombre: '', categoria: 'Nintendo Switch', precio: '', stock: 10, imagen: '', descripcion: '' 
  });

  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [formDataUsuario, setFormDataUsuario] = useState({ 
    rut: '', nombre: '', email: '', direccion: '', region: 'Región Metropolitana', provincia: 'Santiago', comuna: 'Providencia', password: '', confirmarPassword: '', bloqueado: false, rol: 'usuario'
  });

  const [modalBoletasCliente, setModalBoletasCliente] = useState({ open: false, cliente: null, boletas: [] });
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  useEffect(() => {
    const cargarDatos = () => {
      const prods = localStorage.getItem('productosGamerZone');
      setProductos(prods ? JSON.parse(prods) : PRODUCTOS_BASE);

      let ordenes = [];
      const ordenesRaw = 
        localStorage.getItem('historialComprasGamerZone') ||
        localStorage.getItem('comprasGamerZone') ||
        localStorage.getItem('boletasGamerZone') ||
        localStorage.getItem('ordenesGamerZone');

      if (ordenesRaw) {
        try {
          ordenes = JSON.parse(ordenesRaw);
          setHistorialCompras(ordenes);
        } catch (e) {
          console.error("Error al parsear historial de compras:", e);
          setHistorialCompras([]);
        }
      } else {
        setHistorialCompras([]);
      }

      const usrsRaw = localStorage.getItem('usuariosGamerZone');
      let listaCargada = usrsRaw ? JSON.parse(usrsRaw) : USUARIOS_BASE;

      if (Array.isArray(ordenes) && ordenes.length > 0) {
        ordenes.forEach((orden, idx) => {
          const emailBoleta = String(orden.email || orden.datosEntrega?.email || '').toLowerCase().trim();
          const nombreBoleta = orden.usuario || orden.cliente || orden.nombreCliente || orden.datosEntrega?.nombre || '';

          if (emailBoleta || nombreBoleta) {
            const existe = listaCargada.some(u => 
              (emailBoleta && String(u.email || '').toLowerCase().trim() === emailBoleta) ||
              (nombreBoleta && String(u.nombre || '').toLowerCase().trim() === nombreBoleta.toLowerCase().trim())
            );

            if (!existe) {
              listaCargada.push({
                id: Date.now() + idx,
                rut: orden.rut || orden.datosEntrega?.rut || 'Sin R.U.T.',
                nombre: nombreBoleta || 'Cliente Registrado',
                email: emailBoleta || `cliente${idx}@gamerzone.cl`,
                direccion: orden.datosEntrega?.direccion || orden.direccion || '',
                comuna: orden.datosEntrega?.comuna || orden.comuna || 'Santiago',
                region: orden.datosEntrega?.region || orden.region || 'Región Metropolitana',
                bloqueado: false,
                rol: 'usuario'
              });
            }
          }
        });
      }

      listaCargada = sanitizarUsuarios(listaCargada);

      const tieneAdmin = listaCargada.some(u => u.rol === 'admin');
      if (!tieneAdmin) {
        const adminsBase = USUARIOS_BASE.filter(u => u.rol === 'admin');
        listaCargada = sanitizarUsuarios([...listaCargada, ...adminsBase]);
      }

      setUsuarios(listaCargada);
      localStorage.setItem('usuariosGamerZone', JSON.stringify(listaCargada));
    };

    cargarDatos();
  }, [tabActiva]);

  const handleCerrarSesionAdmin = () => {
    localStorage.removeItem('adminAutenticadoGamerZone');
    setEsAdminAutenticado(false);
    if (alCerrarSesion) alCerrarSesion();
  };

  if (!esAdminAutenticado) {
    return <AdminLogin alAutenticar={() => setEsAdminAutenticado(true)} volverATienda={navegarA} />;
  }

  // CRUD PRODUCTOS
  const handleAbrirModalCrearProducto = () => {
    setProductoEditar(null);
    const siguienteCodigo = `GZ-${String(productos.length + 1).padStart(4, '0')}`;
    setFormDataProducto({ 
      codigo: siguienteCodigo, 
      titulo: '', nombre: '', categoria: 'Nintendo Switch', precio: '', stock: 10, imagen: '', descripcion: '' 
    });
    setModalProductoOpen(true);
  };

  const handleAbrirModalEditarProducto = (prod) => {
    setProductoEditar(prod);
    const precioNumerico = parsePrecioLimpio(prod.precio);
    setFormDataProducto({ 
      codigo: obtenerCodigoProducto(prod),
      titulo: prod.titulo || prod.nombre || '',
      nombre: prod.nombre || prod.titulo || '',
      categoria: prod.categoria || prod.plataforma || prod.platform || 'Todas las plataformas',
      precio: precioNumerico > 0 ? precioNumerico.toString() : '',
      stock: prod.stock !== undefined ? prod.stock : 0,
      imagen: prod.imagen || '',
      descripcion: prod.descripcion || ''
    });
    setModalProductoOpen(true);
  };

  const handleEliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto del catálogo?')) {
      const nuevosProductos = productos.filter(p => p.id !== id);
      setProductos(nuevosProductos);
      localStorage.setItem('productosGamerZone', JSON.stringify(nuevosProductos));
    }
  };

  const handleGuardarProducto = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const precioNumerico = parsePrecioLimpio(formDataProducto.precio);
    const stockNumerico = parsePrecioLimpio(formDataProducto.stock);
    const nombreProducto = formDataProducto.titulo || formDataProducto.nombre || 'Nuevo Producto';
    const categoriaSeleccionada = formDataProducto.categoria || 'Todas las plataformas';

    let nuevosProductos;
    if (productoEditar) {
      nuevosProductos = productos.map(p => 
        p.id === productoEditar.id 
          ? { ...p, ...formDataProducto, titulo: nombreProducto, nombre: nombreProducto, categoria: categoriaSeleccionada, precio: precioNumerico, stock: stockNumerico } 
          : p
      );
    } else {
      const nuevoProducto = { 
        id: Date.now(), 
        ...formDataProducto, 
        codigo: formDataProducto.codigo || `GZ-${String(productos.length + 1).padStart(4, '0')}`,
        titulo: nombreProducto, 
        nombre: nombreProducto, 
        categoria: categoriaSeleccionada, 
        precio: precioNumerico, 
        stock: stockNumerico 
      };
      nuevosProductos = [...productos, nuevoProducto];
    }

    setProductos(nuevosProductos);
    localStorage.setItem('productosGamerZone', JSON.stringify(nuevosProductos));
    setModalProductoOpen(false);
  };

  // CRUD USUARIOS
  const handleAbrirModalCrearUsuario = () => {
    setUsuarioEditar(null);
    setFormDataUsuario({
      rut: '', nombre: '', email: '', direccion: '', region: 'Región Metropolitana', provincia: 'Santiago', comuna: 'Providencia', password: '', confirmarPassword: '', bloqueado: false, rol: subTabUsuarios === 'admins' ? 'admin' : 'usuario'
    });
    setModalUsuarioOpen(true);
  };

  const handleAbrirModalEditarUsuario = (usr) => {
    setUsuarioEditar(usr);
    setFormDataUsuario({
      rut: usr.rut || '',
      nombre: usr.nombre || '',
      email: usr.email || '',
      direccion: usr.direccion || '',
      region: usr.region || 'Región Metropolitana',
      provincia: usr.provincia || 'Santiago',
      comuna: usr.comuna || 'Providencia',
      password: '',
      confirmarPassword: '',
      bloqueado: usr.bloqueado || false,
      rol: usr.rol || 'usuario'
    });
    setModalUsuarioOpen(true);
  };

  const handleGuardarUsuario = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    let nuevosUsuarios;

    if (usuarioEditar) {
      const targetId = usuarioEditar.id;
      const targetEmail = usuarioEditar.email ? String(usuarioEditar.email).toLowerCase().trim() : '';
      const targetRut = usuarioEditar.rut ? String(usuarioEditar.rut).trim() : '';

      nuevosUsuarios = usuarios.map(u => {
        const uEmail = u.email ? String(u.email).toLowerCase().trim() : '';
        const uRut = u.rut ? String(u.rut).trim() : '';
        const esMismo = (targetId && u.id === targetId) || (targetEmail && uEmail === targetEmail) || (targetRut && uRut === targetRut);

        if (esMismo) {
          return { ...u, ...formDataUsuario, id: u.id || targetId || Date.now() };
        }
        return u;
      });
    } else {
      const nuevoUsuario = { id: Date.now(), ...formDataUsuario };
      nuevosUsuarios = [...usuarios, nuevoUsuario];
    }

    const listaLimpia = sanitizarUsuarios(nuevosUsuarios);
    setUsuarios(listaLimpia);
    localStorage.setItem('usuariosGamerZone', JSON.stringify(listaLimpia));
    setModalUsuarioOpen(false);
  };

  const handleEliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const nuevosUsuarios = usuarios.filter(u => u.id !== id);
      const listaLimpia = sanitizarUsuarios(nuevosUsuarios);
      setUsuarios(listaLimpia);
      localStorage.setItem('usuariosGamerZone', JSON.stringify(listaLimpia));
    }
  };

  const handleToggleBloquearUsuario = (id) => {
    const nuevosUsuarios = usuarios.map(u => u.id === id ? { ...u, bloqueado: !u.bloqueado } : u);
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuariosGamerZone', JSON.stringify(nuevosUsuarios));
  };

  // MANEJO DE BOLETAS
  const handleVerDetalleDesdeHistorial = (boleta) => {
    setModalBoletasCliente(prev => ({ ...prev, open: false }));
    const emailBoleta = String(boleta.email || boleta.datosEntrega?.email || '').toLowerCase().trim();
    const usuarioEncontrado = usuarios.find(u => u.email && String(u.email).toLowerCase().trim() === emailBoleta);
    
    setOrdenSeleccionada({
      ...boleta,
      rut: boleta.rut || boleta.datosEntrega?.rut || (usuarioEncontrado ? usuarioEncontrado.rut : (modalBoletasCliente.cliente?.rut || 'Sin R.U.T.'))
    });
  };

  const handleVerBoletaTabla = (orden) => {
    if (!orden) return;
    const emailOrden = String(orden.email || orden.datosEntrega?.email || '').toLowerCase().trim();
    const nombreOrden = String(orden.usuario || orden.cliente || orden.nombreCliente || orden.datosEntrega?.nombre || '').toLowerCase().trim();

    const usuarioEncontrado = usuarios.find(u => 
      (u.email && String(u.email).toLowerCase().trim() === emailOrden) ||
      (u.nombre && String(u.nombre).toLowerCase().trim() === nombreOrden)
    );

    setOrdenSeleccionada({
      ...orden,
      rut: orden.rut || orden.datosEntrega?.rut || (usuarioEncontrado ? usuarioEncontrado.rut : 'Sin R.U.T.'),
      cliente: usuarioEncontrado ? usuarioEncontrado.nombre : (orden.usuario || orden.cliente || 'Cliente Registrado')
    });
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
    const cNombre = String(usr.nombre || '').toLowerCase().trim();

    const boletasEncontradas = (historialCompras || []).filter((orden) => {
      const eBoleta = String(orden.email || orden.datosEntrega?.email || '').toLowerCase().trim();
      const nBoleta = String(orden.usuario || orden.cliente || orden.nombreCliente || orden.datosEntrega?.nombre || '').toLowerCase().trim();
      return eBoleta === cEmail || (cNombre && nBoleta === cNombre);
    }).map(boleta => ({
      ...boleta,
      rut: boleta.rut || boleta.datosEntrega?.rut || usr.rut || 'Sin R.U.T.'
    }));

    setModalBoletasCliente({ open: true, cliente: usr, boletas: boletasEncontradas });
  };

  // CÁLCULOS
  const productosCriticos = productos.filter(p => parsePrecioLimpio(p.stock) <= 5);
  const productosPorAgotar = productos.filter(p => parsePrecioLimpio(p.stock) > 5 && parsePrecioLimpio(p.stock) <= 15);
  const productosOptimos = productos.filter(p => parsePrecioLimpio(p.stock) > 15);

  const totalVentas = historialCompras.reduce((sum, ord) => sum + parsePrecioLimpio(ord?.total || ord?.montoTotal || ord?.totalPagar), 0);
  const valorInventario = productos.reduce((sum, p) => sum + (parsePrecioLimpio(p.precio) * parsePrecioLimpio(p.stock)), 0);
  const ticketPromedio = historialCompras.length > 0 ? Math.round(totalVentas / historialCompras.length) : 0;

  const listaClientes = usuarios.filter(u => u.rol !== 'admin');
  const listaAdmins = usuarios.filter(u => u.rol === 'admin');

  const productosMonitoreados = productos.filter(p => {
    const st = obtenerEstadoStock(p.stock);
    if (filtroEstadoStock === 'critico') return st.clave === 'critico';
    if (filtroEstadoStock === 'porAgotar') return st.clave === 'porAgotar';
    if (filtroEstadoStock === 'optimo') return st.clave === 'optimo';
    return true;
  });

  const categoriasResumen = productos.reduce((acc, p) => {
    const cat = p.categoria || p.plataforma || p.platform || 'Todas las plataformas';
    if (!acc[cat]) {
      acc[cat] = { cantidad: 0, stockTotal: 0, valorTotal: 0 };
    }
    acc[cat].cantidad += 1;
    acc[cat].stockTotal += parsePrecioLimpio(p.stock);
    acc[cat].valorTotal += (parsePrecioLimpio(p.precio) * parsePrecioLimpio(p.stock));
    return acc;
  }, {});

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icono: '📊' },
    { id: 'productos', label: 'Productos', icono: '📦' },
    { id: 'critico', label: 'Control de Stock', icono: '🚨', badge: productosCriticos.length },
    { id: 'usuarios', label: 'Usuarios', icono: '👥' },
    { id: 'ordenes', label: 'Órdenes', icono: '📑' },
    { id: 'boletas', label: 'Boletas', icono: '📄' },
    { id: 'reportes', label: 'Reportes', icono: '📈' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0f1d', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <AdminSidebar 
        menuItems={menuItems} tabActiva={tabActiva} setTabActiva={setTabActiva} 
        navegarA={navegarA} usuarioActual={usuarioActual || 'Admin Principal'} 
        alCerrarSesion={handleCerrarSesionAdmin} 
      />

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{ color: '#0070f3', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              PANEL DE CONTROL GAMERZONE
            </div>
            <h1 style={{ margin: '4px 0 0 0', fontSize: '2.2rem', fontWeight: '900', color: '#ffffff' }}>
              {menuItems.find(m => m.id === tabActiva)?.label}
            </h1>
          </div>
        </div>

        {/* 1. DASHBOARD */}
        {tabActiva === 'dashboard' && (
          <DashboardView 
            totalVentas={totalVentas}
            ticketPromedio={ticketPromedio}
            productos={productos}
            productosCriticos={productosCriticos}
            productosPorAgotar={productosPorAgotar}
            productosOptimos={productosOptimos}
            listaClientes={listaClientes}
            historialCompras={historialCompras}
            formatearMonedaCLP={formatearMonedaCLP}
            parsePrecioLimpio={parsePrecioLimpio}
            setTabActiva={setTabActiva}
          />
        )}

        {/* 2. PRODUCTOS */}
        {tabActiva === 'productos' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button
                onClick={handleAbrirModalCrearProducto}
                style={{ backgroundColor: '#0070f3', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                + Agregar Nuevo Producto
              </button>
            </div>

            <div style={contenedorTablaGamer}>
              {productos.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No hay productos registrados en el catálogo.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', color: '#f8fafc' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontWeight: '700' }}>
                      <th style={{ padding: '16px 20px' }}>Código</th>
                      <th style={{ padding: '16px 20px' }}>Producto</th>
                      <th style={{ padding: '16px 20px' }}>Categoría</th>
                      <th style={{ padding: '16px 20px' }}>Precio</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center' }}>Stock</th>
                      <th style={{ padding: '16px 20px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((prod, idx) => (
                      <tr key={prod.id} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '16px 20px', fontWeight: '800', color: '#0070f3', whiteSpace: 'nowrap' }}>
                          {obtenerCodigoProducto(prod, idx)}
                        </td>
                        <td style={{ padding: '16px 20px', fontWeight: '600', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {prod.imagen && <img src={prod.imagen} alt={prod.titulo || prod.nombre} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />}
                          {prod.titulo || prod.nombre}
                        </td>
                        <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{prod.categoria || prod.plataforma || prod.platform || 'Todas las plataformas'}</td>
                        <td style={{ padding: '16px 20px', fontWeight: '700', color: '#34d399' }}>{formatearMonedaCLP(prod.precio)}</td>
                        <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '800', color: parsePrecioLimpio(prod.stock) <= 5 ? '#ef4444' : '#ffffff', whiteSpace: 'nowrap' }}>
                          {parsePrecioLimpio(prod.stock)} u.
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button onClick={() => handleAbrirModalEditarProducto(prod)} style={{ border: 'none', background: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: '700', marginRight: '16px' }}>Editar</button>
                          <button onClick={() => handleEliminarProducto(prod.id)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '700' }}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* 3. CONTROL DE STOCK */}
        {tabActiva === 'critico' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div onClick={() => setFiltroEstadoStock('critico')} style={{ backgroundColor: '#1e293b', border: `2px solid ${filtroEstadoStock === 'critico' ? '#ef4444' : '#334155'}`, borderRadius: '12px', padding: '16px 20px', cursor: 'pointer' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fca5a5' }}>🔴 CRÍTICO / AGOTADO (≤ 5 u.)</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444', marginTop: '4px' }}>{productosCriticos.length} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>prod.</span></div>
              </div>

              <div onClick={() => setFiltroEstadoStock('porAgotar')} style={{ backgroundColor: '#1e293b', border: `2px solid ${filtroEstadoStock === 'porAgotar' ? '#f59e0b' : '#334155'}`, borderRadius: '12px', padding: '16px 20px', cursor: 'pointer' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fde047' }}>🟡 POR AGOTAR (6 a 15 u.)</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#f59e0b', marginTop: '4px' }}>{productosPorAgotar.length} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>prod.</span></div>
              </div>

              <div onClick={() => setFiltroEstadoStock('optimo')} style={{ backgroundColor: '#1e293b', border: `2px solid ${filtroEstadoStock === 'optimo' ? '#10b981' : '#334155'}`, borderRadius: '12px', padding: '16px 20px', cursor: 'pointer' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#86efac' }}>🟢 STOCK ÓPTIMO (&gt; 15 u.)</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981', marginTop: '4px' }}>{productosOptimos.length} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>prod.</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#94a3b8' }}>Filtrar Vista:</span>
              <button onClick={() => setFiltroEstadoStock('todos')} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #334155', backgroundColor: filtroEstadoStock === 'todos' ? '#0070f3' : '#0f172a', color: '#ffffff', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Todos ({productos.length})</button>
              <button onClick={() => setFiltroEstadoStock('critico')} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #ef4444', backgroundColor: filtroEstadoStock === 'critico' ? 'rgba(239, 68, 68, 0.3)' : '#0f172a', color: '#fca5a5', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>🔴 Crítico ({productosCriticos.length})</button>
              <button onClick={() => setFiltroEstadoStock('porAgotar')} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #f59e0b', backgroundColor: filtroEstadoStock === 'porAgotar' ? 'rgba(245, 158, 11, 0.3)' : '#0f172a', color: '#fde047', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>🟡 Por Agotar ({productosPorAgotar.length})</button>
              <button onClick={() => setFiltroEstadoStock('optimo')} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #10b981', backgroundColor: filtroEstadoStock === 'optimo' ? 'rgba(16, 185, 129, 0.3)' : '#0f172a', color: '#86efac', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>🟢 Óptimo ({productosOptimos.length})</button>
            </div>

            <div style={contenedorTablaGamer}>
              {productosMonitoreados.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No hay productos registrados en este filtro.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', color: '#f8fafc' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontWeight: '700' }}>
                      <th style={{ padding: '16px 20px' }}>Código</th>
                      <th style={{ padding: '16px 20px' }}>Producto</th>
                      <th style={{ padding: '16px 20px' }}>Categoría</th>
                      <th style={{ padding: '16px 20px' }}>Precio</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center' }}>Stock Actual</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center' }}>Estado</th>
                      <th style={{ padding: '16px 20px', textAlign: 'right' }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosMonitoreados.map((prod, idx) => {
                      const est = obtenerEstadoStock(prod.stock);
                      return (
                        <tr key={prod.id} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '16px 20px', fontWeight: '800', color: '#0070f3', whiteSpace: 'nowrap' }}>
                            {obtenerCodigoProducto(prod, idx)}
                          </td>
                          <td style={{ padding: '16px 20px', fontWeight: '600', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {prod.imagen && <img src={prod.imagen} alt={prod.titulo || prod.nombre} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />}
                            {prod.titulo || prod.nombre}
                          </td>
                          <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{prod.categoria || prod.plataforma || prod.platform || 'Todas las plataformas'}</td>
                          <td style={{ padding: '16px 20px', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap' }}>{formatearMonedaCLP(prod.precio)}</td>
                          <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '800', color: est.colorTexto, fontSize: '1.05rem', whiteSpace: 'nowrap' }}>
                            {parsePrecioLimpio(prod.stock)} u.
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                            <span style={{ 
                              padding: '6px 14px', 
                              borderRadius: '20px', 
                              fontSize: '0.75rem', 
                              fontWeight: '800', 
                              backgroundColor: est.colorBg, 
                              color: est.colorTexto, 
                              border: `1px solid ${est.colorBorde}`,
                              whiteSpace: 'nowrap',
                              display: 'inline-block'
                            }}>
                              {est.etiqueta}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <button onClick={() => handleAbrirModalEditarProducto(prod)} style={{ border: 'none', background: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: '700' }}>Editar Stock</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* 4. USUARIOS */}
        {tabActiva === 'usuarios' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button
                onClick={handleAbrirModalCrearUsuario}
                style={{ backgroundColor: '#0070f3', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                + Agregar Nuevo {subTabUsuarios === 'admins' ? 'Administrador' : 'Cliente'}
              </button>
            </div>

            <TablaUsuarios 
              subTabUsuarios={subTabUsuarios} 
              setSubTabUsuarios={setSubTabUsuarios}
              listaClientes={listaClientes} 
              listaAdmins={listaAdmins}
              onVerBoletas={handleVerBoletasCliente} 
              onToggleBloquear={handleToggleBloquearUsuario} 
              onEditar={handleAbrirModalEditarUsuario} 
              onEliminar={handleEliminarUsuario}
              contenedorEstilo={contenedorTablaGamer}
            />
          </div>
        )}

        {/* 5 y 6. ÓRDENES Y BOLETAS */}
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
                  {historialCompras.map((orden, idx) => {
                    const numBoleta = orden.numBoleta || orden.idBoleta || orden.id || (100000 + idx);
                    const fechaBoleta = orden.fecha || orden.fechaCompra || 'Reciente';
                    const clienteNombre = orden.usuario || orden.cliente || orden.nombreCliente || orden.datosEntrega?.nombre || orden.email || 'Cliente Registrado';
                    const totalMonto = parsePrecioLimpio(orden.total || orden.montoTotal || orden.totalPagar);

                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '16px 20px', fontWeight: '800', color: '#0070f3', whiteSpace: 'nowrap' }}>#{numBoleta}</td>
                        <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{fechaBoleta}</td>
                        <td style={{ padding: '16px 20px', fontWeight: '600', color: '#ffffff' }}>{clienteNombre}</td>
                        <td style={{ padding: '16px 20px', fontWeight: '700', color: '#34d399', whiteSpace: 'nowrap' }}>{formatearMonedaCLP(totalMonto)}</td>
                        <td style={{ padding: '16px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button onClick={() => handleVerBoletaTabla(orden)} style={{ border: 'none', background: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: '700' }}>Ver Boleta</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* 7. REPORTES */}
        {tabActiva === 'reportes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <MetricCard titulo="Ventas Acumuladas" valor={formatearMonedaCLP(totalVentas)} icono="📈" color="#10b981" />
              <MetricCard titulo="Órdenes Realizadas" valor={historialCompras.length} icono="📑" color="#38bdf8" />
              <MetricCard titulo="Ticket Promedio" valor={formatearMonedaCLP(ticketPromedio)} icono="🏷️" color="#f59e0b" />
              <MetricCard titulo="Valor Inventario" valor={formatearMonedaCLP(valorInventario)} icono="💎" color="#8b5cf6" />
            </div>

            <div style={contenedorTablaGamer}>
              <div style={{ padding: '20px', borderBottom: '1px solid #334155', fontWeight: '800', fontSize: '1.1rem', color: '#38bdf8' }}>
                📊 Resumen de Inventario por Categoría
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', color: '#f8fafc' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontWeight: '700' }}>
                    <th style={{ padding: '16px 20px' }}>Categoría / Plataforma</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center' }}>Modelos Registrados</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center' }}>Unidades Disponibles</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>Valor Total Estimado</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(categoriasResumen).length === 0 ? (
                    <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No hay datos disponibles.</td></tr>
                  ) : (
                    Object.entries(categoriasResumen).map(([cat, data], idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '16px 20px', fontWeight: '700', color: '#ffffff' }}>{cat}</td>
                        <td style={{ padding: '16px 20px', textAlign: 'center', color: '#94a3b8' }}>{data.cantidad} prod.</td>
                        <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '700', color: data.stockTotal <= 5 ? '#ef4444' : '#34d399', whiteSpace: 'nowrap' }}>{data.stockTotal} u.</td>
                        <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: '800', color: '#ffffff', whiteSpace: 'nowrap' }}>{formatearMonedaCLP(data.valorTotal)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* MODALES DE CONTROL */}
      {modalProductoOpen && (
        <ModalProducto
          alCerrar={() => setModalProductoOpen(false)}
          onSubmit={handleGuardarProducto}
          alGuardar={handleGuardarProducto}
          formData={formDataProducto}
          setFormData={setFormDataProducto}
          esEdicion={!!productoEditar}
        />
      )}

      {modalUsuarioOpen && (
        <ModalUsuario
          alCerrar={() => setModalUsuarioOpen(false)}
          alGuardar={handleGuardarUsuario}
          onSubmit={handleGuardarUsuario}
          formData={formDataUsuario}
          setFormData={setFormDataUsuario}
          esEdicion={!!usuarioEditar}
        />
      )}

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