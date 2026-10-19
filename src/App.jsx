import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Productos from './components/Productos';
import Nosotros from './components/Nosotros';
import Blogs from './components/Blogs';
import Contacto from './components/Contacto';
import Login from './components/Login';
import Registro from './components/Registro';
import Carrito from './components/Carrito';
import Footer from './components/Footer';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  
  // Vistas principales: 'home', 'productos', 'nosotros', 'login', 'registro'
  const [vistaActual, setVistaActual] = useState('home');
  // Iluminación del menú: 'home', 'productos', 'nosotros', 'blogs', 'contacto', 'login', 'registro'
  const [seccionActiva, setSeccionActiva] = useState('home');
  const [usuario, setUsuario] = useState(null);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Función para manejar el inicio de sesión exitoso
  const handleAuthExitoso = (nombreUsuario) => {
    setUsuario(nombreUsuario);
    navegarA('home');
  };

  // Función global de navegación con scroll nativo y preciso
  const navegarA = (nuevaVista, idSeccion = null) => {
    setVistaActual(nuevaVista);
    setSeccionActiva(idSeccion || nuevaVista);

    // Damos un pequeño respiro para que React renderice la vista
    setTimeout(() => {
      // Intentamos buscar el elemento en la página
      const elemento = document.getElementById(idSeccion || nuevaVista);
      
      if (elemento) {
        // Si la sección existe (ej: 'blogs', 'contacto'), bajamos hasta ella
        const headerOffset = 64; // Altura de tu nuevo menú
        const elementPosition = elemento.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Si no existe la sección, nos aseguramos de ir al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  // Detección de scroll únicamente dentro de la vista 'home'
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

  return (
    <div>
      <Header 
        cantidadCarrito={totalItems} 
        abrirCarrito={() => setMostrarCarrito(true)}
        seccionActiva={seccionActiva}
        navegarA={navegarA}
        usuario={usuario}
        cerrarSesion={() => setUsuario(null)}
      />
      
      <main>
        {vistaActual === 'productos' ? (
          <div style={{ paddingTop: '20px' }}>
            <Productos agregarAlCarrito={agregarAlCarrito} />
          </div>
        ) : vistaActual === 'nosotros' ? (
          <div style={{ paddingTop: '20px' }}>
            <Nosotros />
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
              limite={5} 
              agregarAlCarrito={agregarAlCarrito} 
              verCatalogoCompleto={() => navegarA('productos')}
            />
            
            {/* AQUI AGREGAMOS LOS IDENTIFICADORES ID */}
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
        />
      )}
    </div>
  );
}

export default App;