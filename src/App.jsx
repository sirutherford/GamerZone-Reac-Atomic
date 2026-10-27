import React, { useState, useEffect, useCallback } from 'react';

// Organismos
import Header from './components/organisms/Header';
import Hero from './components/organisms/Hero';
import Footer from './components/organisms/Footer';
import Carrito from './components/organisms/Carrito';

// Páginas
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import HistorialCompras from './pages/HistorialCompras';
import ConfiguracionUsuario from './pages/ConfiguracionUsuario';
import AdminDashboard from './pages/AdminDashboard';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const PRODUCTOS_BASE_DEFAULT = [
  { id: 1, codigo: 'GZ-0001', titulo: 'The Legend of Zelda: Tears of the Kingdom', categoria: 'Nintendo Switch', precio: 59990, stock: 15, imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400', descripcion: 'Explora los cielos y las profundidades de Hyrule.' },
  { id: 2, codigo: 'GZ-0002', titulo: 'God of War Ragnarök', categoria: 'PlayStation 5', precio: 54990, stock: 12, imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400', descripcion: 'Embárcate en un viaje mítico junto a Kratos.' }
];

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  
  const [vistaActual, setVistaActual] = useState('home');
  const [seccionActiva, setSeccionActiva] = useState('home');
  
  // Estado global persistente de Productos
  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('productosGamerZone');
      if (guardados) return JSON.parse(guardados);
      localStorage.setItem('productosGamerZone', JSON.stringify(PRODUCTOS_BASE_DEFAULT));
      return PRODUCTOS_BASE_DEFAULT;
    } catch (e) {
      return PRODUCTOS_BASE_DEFAULT;
    }
  });

  // Estado del usuario
  const [usuario, setUsuario] = useState(() => {
    try {
      const sesionRaw = localStorage.getItem('usuarioGamerZone');
      if (!sesionRaw) return null;

      let userObj = typeof JSON.parse(sesionRaw) === 'object' 
        ? JSON.parse(sesionRaw) 
        : { nombre: JSON.parse(sesionRaw) };

      return userObj;
    } catch (e) {
      return null;
    }
  });

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Sincronizar catálogo y usuario desde localStorage
  const sincronizarTodo = useCallback(() => {
    try {
      // 1. Cargar Productos actualizados
      const prodsGuardados = localStorage.getItem('productosGamerZone');
      if (prodsGuardados) {
        setProductos(JSON.parse(prodsGuardados));
      }

      // 2. Cargar Usuario actualizado
      const sesionRaw = localStorage.getItem('usuarioGamerZone');
      const esAdminAuth = localStorage.getItem('adminAutenticadoGamerZone') === 'true';

      if (sesionRaw) {
        let userObj = JSON.parse(sesionRaw);
        if (typeof userObj !== 'object') {
          userObj = { nombre: userObj };
        }

        if (esAdminAuth) {
          userObj.esAdmin = true;
          userObj.rol = 'admin';
        }

        setUsuario(userObj);
      } else if (esAdminAuth) {
        setUsuario({
          nombre: 'Administrador',
          email: 'admin@gamerzone.cl',
          rol: 'admin',
          esAdmin: true
        });
      } else {
        setUsuario(null);
      }
    } catch (e) {
      console.error('Error al sincronizar estado global:', e);
    }
  }, []);

  useEffect(() => {
    sincronizarTodo();

    window.addEventListener('storage', sincronizarTodo);
    return () => window.removeEventListener('storage', sincronizarTodo);
  }, [vistaActual, sincronizarTodo]);

  // Verificación global de Administrador
  const rolActual = (usuario?.rol || usuario?.role || usuario?.tipo || '').toLowerCase();
  const esAdmin = Boolean(
    usuario?.esAdmin === true ||
    rolActual === 'admin' ||
    rolActual === 'administrador' ||
    localStorage.getItem('adminAutenticadoGamerZone') === 'true'
  );

  const nombreUsuario = typeof usuario === 'object' 
    ? (usuario?.nombre || usuario?.usuario || usuario?.email) 
    : usuario;

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleVerDetalle = (producto) => {
    setProductoSeleccionado(producto);
    navegarA('detalle-producto');
  };

  const handleFinalizarCompra = (datosEntrega = {}) => {
    if (carrito.length === 0) return;

    try {
      let productosActuales = productos;
      const guardados = localStorage.getItem('productosGamerZone');
      if (guardados) {
        productosActuales = JSON.parse(guardados);
      }

      const productosActualizados = productosActuales.map((prod) => {
        const enCarrito = carrito.find((item) => item.id === prod.id || item.codigo === prod.codigo);
        if (enCarrito) {
          const stockActual = Number(prod.stock) || 0;
          const nuevoStock = Math.max(0, stockActual - enCarrito.cantidad);
          return { ...prod, stock: nuevoStock };
        }
        return prod;
      });

      localStorage.setItem('productosGamerZone', JSON.stringify(productosActualizados));
      setProductos(productosActualizados);

      const totalPagar = carrito.reduce((sum, item) => {
        const precioNum = typeof item.precio === 'number'
          ? item.precio
          : parseInt(String(item.precio || 0).replace(/[^0-9]/g, ''), 10) || 0;
        return sum + (precioNum * item.cantidad);
      }, 0);

      const nuevaBoleta = {
        numBoleta: Math.floor(100000 + Math.random() * 900000),
        fecha: new Date().toLocaleDateString('es-CL'),
        usuario: nombreUsuario || 'Cliente',
        email: typeof usuario === 'object' ? (usuario?.email || '') : '',
        rut: typeof usuario === 'object' ? (usuario?.rut || datosEntrega?.rut || 'Sin RUT') : (datosEntrega?.rut || 'Sin RUT'),
        total: totalPagar,
        productos: [...carrito],
        datosEntrega
      };

      const historialPrevio = JSON.parse(localStorage.getItem('historialComprasGamerZone')) || [];
      localStorage.setItem('historialComprasGamerZone', JSON.stringify([nuevaBoleta, ...historialPrevio]));

      vaciarCarrito();
      setMostrarCarrito(false);
      alert('🎉 ¡Compra realizada con éxito! La boleta ha quedado registrada.');
    } catch (e) {
      console.error('Error al procesar compra:', e);
      alert('Ocurrió un error al procesar la compra.');
    }
  };

  const handleIngresarAdmin = () => {
    sincronizarTodo();
    setVistaActual('admin');
    setSeccionActiva('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthExitoso = (datosUsuario) => {
    let objetoUsuario = typeof datosUsuario === 'object' 
      ? datosUsuario 
      : { nombre: datosUsuario, email: datosUsuario };

    const posiblesClaves = ['usuariosGamerZone', 'usuarios', 'users', 'cuentas'];
    for (let clave of posiblesClaves) {
      const dataLocal = localStorage.getItem(clave);
      if (dataLocal) {
        const lista = JSON.parse(dataLocal);
        if (Array.isArray(lista)) {
          const coincidencia = lista.find(u => 
            (u.email && u.email.toLowerCase() === (objetoUsuario.email || '').toLowerCase()) ||
            (u.nombre && u.nombre.toLowerCase() === (objetoUsuario.nombre || '').toLowerCase())
          );
          if (coincidencia) {
            objetoUsuario = { ...objetoUsuario, ...coincidencia };
            break;
          }
        }
      }
    }

    const rolVal = (objetoUsuario.rol || objetoUsuario.role || '').toLowerCase();
    const esAdminDetectado = objetoUsuario.esAdmin === true || rolVal === 'admin' || rolVal === 'administrador';

    if (esAdminDetectado) {
      objetoUsuario.esAdmin = true;
      objetoUsuario.rol = 'admin';
      localStorage.setItem('adminAutenticadoGamerZone', 'true');
    }

    setUsuario(objetoUsuario);
    localStorage.setItem('usuarioGamerZone', JSON.stringify(objetoUsuario));

    if (esAdminDetectado) {
      sincronizarTodo();
      setVistaActual('admin');
      setSeccionActiva('admin');
    } else {
      navegarA('home');
    }
  };

  const handleCerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioGamerZone');
    localStorage.removeItem('adminAutenticadoGamerZone');
    sincronizarTodo();
    navegarA('home');
  };

  const navegarA = (nuevaVista, idSeccion = null) => {
    sincronizarTodo();
    setVistaActual(nuevaVista);
    setSeccionActiva(idSeccion || nuevaVista);

    setTimeout(() => {
      const elemento = document.getElementById(idSeccion || nuevaVista);
      
      if (elemento) {
        const headerOffset = 64;
        const elementPosition = elemento.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  useEffect(() => {
    if (vistaActual !== 'home') return;

    const handleScroll = () => {
      const blogsEl = document.getElementById('blogs');
      const contactoEl = document.getElementById('contacto');
      const puntoGatillo = 300;

      if (contactoEl && contactoEl.getBoundingClientRect().top <= puntoGatillo) {
        setSeccionActiva('contacto');
      } else if (blogsEl && blogsEl.getBoundingClientRect().top <= puntoGatillo) {
        setSeccionActiva('blogs');
      } else {
        setSeccionActiva('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [vistaActual]);

  // VISTA DEDICADA: PANEL ADMINISTRADOR
  if (vistaActual === 'admin') {
    return (
      <AdminDashboard 
        navegarA={navegarA}
        alCerrarSesion={handleCerrarSesion}
        usuarioActual={nombreUsuario || 'Administrador'}
        alAutenticar={handleAuthExitoso}
      />
    );
  }

  // VISTAS PÚBLICAS DE LA TIENDA GAMERZONE
  return (
    <div>
      <Header 
        cantidadCarrito={totalItems} 
        abrirCarrito={() => setMostrarCarrito(true)}
        seccionActiva={seccionActiva}
        navegarA={navegarA}
        usuario={usuario}
        nombreUsuario={nombreUsuario}
        esAdmin={esAdmin}
        cerrarSesion={handleCerrarSesion}
        alIngresarAdmin={handleIngresarAdmin}
      />
      
      <main>
        {vistaActual === 'productos' ? (
          <div style={{ paddingTop: '20px' }}>
            <Productos 
              productos={productos}
              agregarAlCarrito={agregarAlCarrito} 
              verDetalle={handleVerDetalle}
            />
          </div>
        ) : vistaActual === 'detalle-producto' ? (
          <DetalleProducto 
            producto={productoSeleccionado}
            alAgregarAlCarrito={agregarAlCarrito}
            volverAProductos={() => navegarA('productos')}
          />
        ) : vistaActual === 'nosotros' ? (
          <div style={{ paddingTop: '20px' }}>
            <Nosotros />
          </div>
        ) : vistaActual === 'historial' ? (
          <div style={{ paddingTop: '20px' }}>
            <HistorialCompras 
              usuario={usuario}
              irATienda={() => navegarA('productos')}
            />
          </div>
        ) : vistaActual === 'configuracion' ? (
          <div style={{ paddingTop: '20px' }}>
            <ConfiguracionUsuario 
              usuario={nombreUsuario}
              alActualizarUsuario={(nuevoNombre) => setUsuario(prev => typeof prev === 'object' ? { ...prev, nombre: nuevoNombre } : nuevoNombre)}
            />
          </div>
        ) : vistaActual === 'login' ? (
          <Login 
            irARegistro={() => navegarA('registro')} 
            alIniciarSesion={handleAuthExitoso}
          />
        ) : vistaActual === 'registro' ? (
          <Registro 
            irALogin={() => navegarA('login')} 
            alRegistrar={handleAuthExitoso}
          />
        ) : (
          <>
            <Hero />
            <Productos 
              productos={productos}
              limite={5} 
              agregarAlCarrito={agregarAlCarrito} 
              verCatalogoCompleto={() => navegarA('productos')}
              verDetalle={handleVerDetalle}
            />
            
            <div id="blogs">
              <Blogs />
            </div>
            
            <div id="contacto">
              <Contacto />
            </div>
          </>
        )}
      </main>

      <Footer navegarA={navegarA} />

      {mostrarCarrito && (
        <Carrito 
          carrito={carrito} 
          cerrarCarrito={() => setMostrarCarrito(false)} 
          eliminarDelCarrito={eliminarDelCarrito}
          vaciarCarrito={vaciarCarrito}
          usuario={nombreUsuario}
          irALogin={() => navegarA('login')}
          irARegistro={() => navegarA('registro')}
          alFinalizarCompra={handleFinalizarCompra}
        />
      )}
    </div>
  );
}

export default App;