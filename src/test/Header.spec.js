import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Header from '../components/organisms/Header';

fdescribe('Pruebas Unitarias - Componente Header (GamerZone)', () => {
  let mockNavegarA;
  let mockAbrirCarrito;
  let mockCerrarSesion;

  beforeEach(() => {
    mockNavegarA = jasmine.createSpy('navegarA');
    mockAbrirCarrito = jasmine.createSpy('abrirCarrito');
    mockCerrarSesion = jasmine.createSpy('cerrarSesion');
  });

  it('Debe renderizar la cantidad correcta de productos en el carrito y llamar a abrirCarrito', () => {
    render(
      <Header 
        cantidadCarrito={3} 
        abrirCarrito={mockAbrirCarrito} 
        navegarA={mockNavegarA} 
      />
    );

    const botonCarrito = screen.getByRole('button', { name: /Cart \( 3 \)/i });
    expect(botonCarrito).toBeTruthy();

    fireEvent.click(botonCarrito);
    expect(mockAbrirCarrito).toHaveBeenCalled();
  });

  it('Debe ejecutar la navegación en los enlaces principales y en el logo', () => {
    render(
      <Header 
        seccionActiva="productos" 
        navegarA={mockNavegarA} 
      />
    );

    // Clic en el Logo
    const logoImg = screen.getByAltText('GamerZone Logo');
    fireEvent.click(logoImg.parentElement);
    expect(mockNavegarA).toHaveBeenCalledWith('home', null);

    // Clic en enlaces directos
    fireEvent.click(screen.getByText('Hogar'));
    expect(mockNavegarA).toHaveBeenCalledWith('home', null);

    fireEvent.click(screen.getByText('Productos'));
    expect(mockNavegarA).toHaveBeenCalledWith('productos', null);

    fireEvent.click(screen.getByText(/Nosotros/i));
    expect(mockNavegarA).toHaveBeenCalledWith('nosotros', null);

    fireEvent.click(screen.getByText('Blogs'));
    expect(mockNavegarA).toHaveBeenCalledWith('blogs', null);

    fireEvent.click(screen.getByText('Contacto'));
    expect(mockNavegarA).toHaveBeenCalledWith('contacto', null);
  });

  it('Debe manejar la interacción con el submenú de "Nosotros" y sus sub-enlaces', () => {
    render(<Header navegarA={mockNavegarA} />);

    const enlaceNosotros = screen.getByText(/Nosotros/i);
    const contenedorNosotros = enlaceNosotros.closest('div');

    // 1. Abrir submenú envolviendo el evento en act()
    act(() => {
      fireEvent.mouseEnter(contenedorNosotros);
    });

    // 2. Probar GamerZone
    const enlaceGamerZone = screen.getByText('GamerZone');
    
    act(() => {
      fireEvent.mouseEnter(enlaceGamerZone);
      fireEvent.mouseLeave(enlaceGamerZone);
      fireEvent.click(enlaceGamerZone);
    });

    expect(mockNavegarA).toHaveBeenCalledWith('nosotros', 'sobre-gamerzone');

    // 3. Re-abrir submenú para probar Equipo GZ
    act(() => {
      fireEvent.mouseEnter(contenedorNosotros);
    });

    const enlaceEquipo = screen.getByText('Equipo GZ');

    act(() => {
      fireEvent.mouseEnter(enlaceEquipo);
      fireEvent.mouseLeave(enlaceEquipo);
      fireEvent.click(enlaceEquipo);
    });

    expect(mockNavegarA).toHaveBeenCalledWith('nosotros', 'equipo-gz');

    // 4. Cierre del submenú
    act(() => {
      fireEvent.mouseLeave(contenedorNosotros);
    });

    expect(screen.queryByText('GamerZone')).toBeNull();
  });

  it('Debe mostrar el saludo y llamar a cerrarSesion cuando un usuario está autenticado', () => {
    render(
      <Header 
        usuario="GamerRoot" 
        cerrarSesion={mockCerrarSesion}
        navegarA={mockNavegarA} 
      />
    );

    expect(screen.getByText(/Hola, GamerRoot/i)).toBeTruthy();

    const botonSalir = screen.getByRole('button', { name: /Salir/i });
    fireEvent.click(botonSalir);
    expect(mockCerrarSesion).toHaveBeenCalled();
  });

  it('Debe permitir navegar a login y registro cuando no hay usuario autenticado', () => {
    render(<Header navegarA={mockNavegarA} />);

    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(mockNavegarA).toHaveBeenCalledWith('login', null);

    fireEvent.click(screen.getByText('Registrar usuario'));
    expect(mockNavegarA).toHaveBeenCalledWith('registro', null);
  });

  it('Debe tolerar la navegación de manera segura cuando la prop navegarA no es proporcionada', () => {
    render(<Header />);

    expect(() => {
      fireEvent.click(screen.getByText('Hogar'));
    }).not.toThrow();
  });

  it('Debe aplicar el color activo correspondiente según seccionActiva', () => {
    const { rerender } = render(<Header seccionActiva="home" />);
    expect(screen.getByText('Hogar').style.color).toBe('rgb(0, 210, 255)');

    rerender(<Header seccionActiva="nosotros" />);
    expect(screen.getByText(/Nosotros/i).style.color).toBe('rgb(0, 210, 255)');

    rerender(<Header seccionActiva="blogs" />);
    expect(screen.getByText('Blogs').style.color).toBe('rgb(0, 210, 255)');

    rerender(<Header seccionActiva="contacto" />);
    expect(screen.getByText('Contacto').style.color).toBe('rgb(0, 210, 255)');
  });
});