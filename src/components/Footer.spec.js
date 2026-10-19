import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Pruebas Unitarias - Componente Footer (GamerZone)', () => {
  let mockNavegarA;

  beforeEach(() => {
    mockNavegarA = jasmine.createSpy('navegarA');
  });

  it('Debe renderizar la información de la marca, enlaces rápidos y copyright', () => {
    render(<Footer navegarA={mockNavegarA} />);

    expect(screen.getByText('GamerZone')).toBeTruthy();
    expect(screen.getByText('Tu tienda de videojuegos de confianza con los mejores títulos y entregas inmediatas.')).toBeTruthy();
    expect(screen.getByText('Enlaces rápidos')).toBeTruthy();
    expect(screen.getByText('Síguenos')).toBeTruthy();

    const anioActual = new Date().getFullYear();
    expect(screen.getByText(new RegExp(anioActual.toString()))).toBeTruthy();
  });

  it('Debe ejecutar la función navegarA con los argumentos correspondientes en cada enlace rápido', () => {
    render(<Footer navegarA={mockNavegarA} />);

    // Clic en Home
    fireEvent.click(screen.getByText('Home'));
    expect(mockNavegarA).toHaveBeenCalledWith('home');

    // Clic en Productos
    fireEvent.click(screen.getByText('Productos'));
    expect(mockNavegarA).toHaveBeenCalledWith('productos');

    // Clic en Nosotros
    fireEvent.click(screen.getByText('Nosotros'));
    expect(mockNavegarA).toHaveBeenCalledWith('nosotros');

    // Clic en Blogs
    fireEvent.click(screen.getByText('Blogs'));
    expect(mockNavegarA).toHaveBeenCalledWith('home', 'blogs');

    // Clic en Contacto
    fireEvent.click(screen.getByText('Contacto'));
    expect(mockNavegarA).toHaveBeenCalledWith('home', 'contacto');

    // Clic en Equipo GZ
    fireEvent.click(screen.getByText('Equipo GZ'));
    expect(mockNavegarA).toHaveBeenCalledWith('nosotros');
  });

  it('Debe renderizar correctamente los enlaces a redes sociales con atributo target="_blank"', () => {
    render(<Footer navegarA={mockNavegarA} />);

    const enlaceFacebook = screen.getByRole('link', { name: /facebook/i });
    const enlaceInstagram = screen.getByRole('link', { name: /instagram/i });
    const enlaceTwitter = screen.getByRole('link', { name: /twitter/i });
    const enlaceDiscord = screen.getByRole('link', { name: /discord/i });

    expect(enlaceFacebook.getAttribute('href')).toBe('https://facebook.com');
    expect(enlaceFacebook.getAttribute('target')).toBe('_blank');

    expect(enlaceInstagram.getAttribute('href')).toBe('https://instagram.com');
    expect(enlaceInstagram.getAttribute('target')).toBe('_blank');

    expect(enlaceTwitter.getAttribute('href')).toBe('https://twitter.com');
    expect(enlaceTwitter.getAttribute('target')).toBe('_blank');

    expect(enlaceDiscord.getAttribute('href')).toBe('https://discord.com');
    expect(enlaceDiscord.getAttribute('target')).toBe('_blank');
  });

  it('Debe prevenir el comportamiento por defecto y no fallar cuando navegarA no es proporcionada', () => {
    render(<Footer />);

    expect(() => {
      fireEvent.click(screen.getByText('Home'));
    }).not.toThrow();
  });
});