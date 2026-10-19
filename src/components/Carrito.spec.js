import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Carrito from './Carrito';

describe('Pruebas Unitarias - Componente Carrito (GamerZone)', () => {
  let mockCerrarCarrito;
  let mockEliminarDelCarrito;

  // Imagen transparente en Base64 para evitar peticiones HTTP y errores 404 en Karma
  const imagenBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  beforeEach(() => {
    mockCerrarCarrito = jasmine.createSpy('cerrarCarrito');
    mockEliminarDelCarrito = jasmine.createSpy('eliminarDelCarrito');
  });

  it('Debe mostrar el mensaje de carrito vacío cuando el arreglo está vacío', () => {
    render(
      <Carrito 
        carrito={[]} 
        cerrarCarrito={mockCerrarCarrito} 
        eliminarDelCarrito={mockEliminarDelCarrito} 
      />
    );

    expect(screen.getByText('Tu carrito está vacío por ahora.')).toBeTruthy();
    expect(screen.queryByText('Total:')).toBeNull();
  });

  it('Debe renderizar la lista de videojuegos de consola, calcular el total correctamente y permitir eliminar elementos', () => {
    const productosPrueba = [
      { id: 1, titulo: 'The Legend of Zelda: Tears of the Kingdom', precio: '$54.990', cantidad: 1, imagen: imagenBase64 },
      { id: 2, titulo: 'God of War Ragnarök (PS5)', precio: '$45.000', cantidad: 2, imagen: imagenBase64 }
    ];

    render(
      <Carrito 
        carrito={productosPrueba} 
        cerrarCarrito={mockCerrarCarrito} 
        eliminarDelCarrito={mockEliminarDelCarrito} 
      />
    );

    // Verificar renderizado de títulos de consola
    expect(screen.getByText('The Legend of Zelda: Tears of the Kingdom')).toBeTruthy();
    expect(screen.getByText('God of War Ragnarök (PS5)')).toBeTruthy();

    // Verificar cálculo total: (54990 * 1) + (45000 * 2) = 144.990
    expect(screen.getByText('$144.990')).toBeTruthy();

    // Probar eliminación de un producto
    const botonesEliminar = screen.getAllByTitle('Eliminar producto');
    fireEvent.click(botonesEliminar[0]);
    expect(mockEliminarDelCarrito).toHaveBeenCalledWith(1);
  });

  it('Debe cerrar el modal al hacer clic en el fondo overlay o en el botón de cerrar ✕', () => {
    render(
      <Carrito 
        carrito={[]} 
        cerrarCarrito={mockCerrarCarrito} 
        eliminarDelCarrito={mockEliminarDelCarrito} 
      />
    );

    // Clic en el botón ✕
    const botonCerrar = screen.getByText('✕');
    fireEvent.click(botonCerrar);
    expect(mockCerrarCarrito).toHaveBeenCalledTimes(1);

    // Clic en la capa externa (overlay)
    const overlay = screen.getByText('🛒 Tu Carrito de Compras').closest('.modal-overlay');
    fireEvent.click(overlay);
    expect(mockCerrarCarrito).toHaveBeenCalledTimes(2);
  });

  it('Debe detener la propagación del evento click dentro del contenedor del modal', () => {
    render(
      <Carrito 
        carrito={[]} 
        cerrarCarrito={mockCerrarCarrito} 
        eliminarDelCarrito={mockEliminarDelCarrito} 
      />
    );

    const contenedorModal = screen.getByText('🛒 Tu Carrito de Compras').closest('.modal-carrito');
    fireEvent.click(contenedorModal);

    // No debe llamar a cerrarCarrito cuando se hace clic dentro del modal
    expect(mockCerrarCarrito).not.toHaveBeenCalled();
  });

  it('Debe tolerar precios con formatos inusuales o vacíos en el cálculo del total', () => {
    const productosSinPrecioValido = [
      { id: 10, titulo: 'Pase Game Pass Ultimate (Promocional)', precio: 'Gratis', cantidad: 1, imagen: imagenBase64 }
    ];

    render(
      <Carrito 
        carrito={productosSinPrecioValido} 
        cerrarCarrito={mockCerrarCarrito} 
        eliminarDelCarrito={mockEliminarDelCarrito} 
      />
    );

    expect(screen.getByText('Pase Game Pass Ultimate (Promocional)')).toBeTruthy();
    expect(screen.getByText('$0')).toBeTruthy();
  });
});