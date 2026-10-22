// Algoritmo Módulo 11 para verificar si un RUT chileno es real
export const validarRut = (rut) => {
  if (!rut || typeof rut !== 'string') return false;

  // Limpiar puntos, guiones y espacios
  const rutLimpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();

  // En Chile un RUT válido tiene al menos 8 dígitos (cuerpo + DV)
  if (rutLimpio.length < 8) return false;

  const cuerpo = rutLimpio.slice(0, -1);
  const dvIngresado = rutLimpio.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  // Cálculo Módulo 11
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvCalculado = 11 - (suma % 11);
  let dvEsperado = '';

  if (dvCalculado === 11) dvEsperado = '0';
  else if (dvCalculado === 10) dvEsperado = 'K';
  else dvEsperado = dvCalculado.toString();

  return dvIngresado === dvEsperado;
};

// Función para formatear automáticamente mientras el usuario escribe (Ej: 12345678k -> 12.345.678-K)
export const formatearRut = (rut) => {
  const actual = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (actual.length <= 1) return actual;

  const cuerpo = actual.slice(0, -1);
  const dv = actual.slice(-1);

  let cuerpoFormateado = '';
  for (let i = cuerpo.length - 1, j = 1; i >= 0; i--, j++) {
    cuerpoFormateado = cuerpo.charAt(i) + cuerpoFormateado;
    if (j % 3 === 0 && i !== 0) {
      cuerpoFormateado = '.' + cuerpoFormateado;
    }
  }

  return `${cuerpoFormateado}-${dv}`;
};