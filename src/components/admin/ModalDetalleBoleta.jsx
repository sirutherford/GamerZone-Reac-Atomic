import React from 'react';

const ModalDetalleBoleta = ({ orden, alCerrar, alCerrarX }) => {
  if (!orden) return null;

  const rutCliente = orden.rut || orden.rutCliente || orden.datosEntrega?.rut || 'Sin R.U.T.';
  const emailCliente = orden.email || orden.datosEntrega?.email || 'N/A';
  
  const direccionCliente = (orden.datosEntrega && typeof orden.datosEntrega === 'object') 
    ? `${orden.datosEntrega.direccion || ''}, ${orden.datosEntrega.comuna || ''}` 
    : 'Retiro en Tienda';

  const totalBruto = typeof orden.total === 'number' 
    ? orden.total 
    : parseInt(String(orden.total || 0).replace(/[^0-9]/g, ''), 10) || 0;

  const montoNeto = Math.round(totalBruto / 1.19);
  const montoIVA = totalBruto - montoNeto;
  const numBoleta = orden.numBoleta || '161906';

  // Plantilla HTML con el diseño exacto del S.I.I.
  const generarPlantillaHTML = () => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Boleta N° ${numBoleta} - GamerZone</title>
      <style>
        body { font-family: Arial, sans-serif; color: #333; background-color: #f0f0f0; padding: 40px; margin: 0; }
        .boleta-container { max-width: 850px; margin: 0 auto; background: #fff; border: 2px solid #0070f3; border-radius: 8px; padding: 40px; box-sizing: border-box; }
        .header { display: flex; justify-content: space-between; margin-bottom: 20px; align-items: flex-start; }
        .empresa-info h1 { color: #0070f3; margin: 0 0 10px 0; font-size: 22px; font-weight: 900; display: flex; align-items: center; gap: 8px; }
        .empresa-info p { margin: 3px 0; font-size: 13px; color: #444; }
        .sii-box { border: 2px solid #dc2626; color: #dc2626; padding: 15px 40px; text-align: center; font-weight: bold; border-radius: 4px; }
        .sii-box p { margin: 4px 0; font-size: 15px; }
        .divider { border-top: 2px solid #0070f3; margin: 25px 0; }
        .cliente-info { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 13px; color: #111; }
        .cliente-info div p { margin: 6px 0; }
        .cliente-info strong { display: inline-block; width: 150px; color: #000; }
        table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 13px; }
        th { background-color: #0070f3; color: white; text-align: left; padding: 12px; font-size: 12px; }
        th.center { text-align: center; }
        th.right { text-align: right; }
        td { padding: 12px; border-bottom: 1px solid #e2e8f0; color: #111; }
        td.center { text-align: center; }
        td.right { text-align: right; }
        td.bold { font-weight: bold; }
        td.codigo { color: #64748b; }
        .totales-container { display: flex; justify-content: flex-end; margin-top: 20px; }
        .totales-box { width: 320px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px 20px; background-color: #f8fafc; }
        .totales-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #555; }
        .totales-total { display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 2px solid #0070f3; font-weight: 900; font-size: 16px; color: #000; }
        .totales-total .monto-final { color: #10b981; font-size: 18px; }
        .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 20px; line-height: 1.6; }
        @media print { body { background-color: #fff; padding: 0; } .boleta-container { border: none; box-shadow: none; padding: 20px; max-width: 100%; } }
      </style>
    </head>
    <body>
      <div class="boleta-container">
        <div class="header">
          <div class="empresa-info">
            <h1>🎮 GAMERZONE CHILE</h1>
            <p>GamerZone SpA</p>
            <p>R.U.T. Empresa: 76.543.210-K</p>
            <p>Giro: Venta de Videojuegos y Equipamiento Gamer</p>
            <p>Av. Providencia 1234, Santiago, Chile</p>
          </div>
          <div class="sii-box">
            <p>R.U.T. 76.543.210-K</p>
            <p>BOLETA ELECTRÓNICA</p>
            <p>N° ${numBoleta}</p>
          </div>
        </div>
        
        <div class="divider"></div>

        <div class="cliente-info">
          <div>
            <p><strong>Cliente:</strong> ${orden.usuario || orden.cliente || 'Anónimo'}</p>
            <p><strong>Fecha Emisión:</strong> ${orden.fecha || 'N/A'}</p>
            <p><strong>Dirección de Entrega:</strong> ${direccionCliente}</p>
          </div>
          <div>
            <p><strong>R.U.T. Cliente:</strong> <span style="color: #0070f3; font-weight: bold;">${rutCliente}</span></p>
            <p><strong>Correo Electrónico:</strong> ${emailCliente}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>PRODUCTO</th>
              <th class="center">CANT.</th>
              <th class="right">PRECIO UN.</th>
              <th class="right">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${(orden.productos || []).map((p, i) => {
              const precioNum = typeof p.precio === 'number' ? p.precio : parseInt(String(p.precio || 0).replace(/[^0-9]/g, ''), 10) || 0;
              const cantidad = p.cantidad || 1;
              const codigoProd = p.codigo || `GZ-00${i + 1}`;
              return `
                <tr>
                  <td class="codigo">${codigoProd}</td>
                  <td class="bold">${p.titulo || p.nombre}</td>
                  <td class="center">${cantidad}</td>
                  <td class="right">$${precioNum.toLocaleString('es-CL')}</td> <td class="right bold">$${(precioNum * cantidad).toLocaleString('es-CL')}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div class="totales-container">
          <div class="totales-box">
            <div class="totales-row"><span>Monto Neto:</span><span>$${montoNeto.toLocaleString('es-CL')}</span></div>
            <div class="totales-row"><span>19% I.V.A.:</span><span>$${montoIVA.toLocaleString('es-CL')}</span></div>
            <div class="totales-total"><span>Total Bruto:</span><span class="monto-final">$${totalBruto.toLocaleString('es-CL')}</span></div>
          </div>
        </div>

        <div class="footer">
          El IVA de esta boleta ha sido retenido y pagado de acuerdo a la normativa legal vigente del S.I.I.<br>
          ¡Gracias por tu compra en GamerZone! www.gamerzone.cl
        </div>
      </div>
    </body>
    </html>
  `;

  const handleVerEnNavegador = () => {
    const ventanaNueva = window.open('', '_blank');
    if (ventanaNueva) {
      ventanaNueva.document.write(generarPlantillaHTML());
      ventanaNueva.document.close();
    }
  };

  const handleDescargarPDF = () => {
    const ventanaNueva = window.open('', '_blank');
    if (ventanaNueva) {
      ventanaNueva.document.write(generarPlantillaHTML());
      ventanaNueva.document.close();
      setTimeout(() => {
        ventanaNueva.print();
      }, 300);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(10, 15, 29, 0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 4000
    }}>
      <div style={{
        backgroundColor: '#1f293d', border: '1px solid #334155', borderRadius: '16px', padding: '28px 32px',
        width: '90%', maxWidth: '520px', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)', color: '#ffffff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff' }}>Boleta #{numBoleta}</h3>
          <button onClick={alCerrarX || alCerrar} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
        </div>
        
        <div style={{ margin: '16px 0', fontSize: '0.88rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
          <div><strong>Fecha:</strong> {orden.fecha || 'N/A'}</div>
          <div><strong>Cliente:</strong> {orden.usuario || orden.cliente || 'Anónimo'}</div>
          <div><strong>R.U.T. Cliente:</strong> <span style={{ color: '#38bdf8', fontWeight: '700' }}>{rutCliente}</span></div>
          {emailCliente !== 'N/A' && <div><strong>Correo:</strong> {emailCliente}</div>}
        </div>

        <h4 style={{ margin: '14px 0 8px 0', fontSize: '0.95rem', color: '#38bdf8', textAlign: 'center' }}>Detalle Resumido:</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem', borderTop: '1px solid #334155', maxHeight: '180px', overflowY: 'auto' }}>
          {(orden.productos || []).map((p, i) => {
            const precioNum = typeof p.precio === 'number' ? p.precio : parseInt(String(p.precio || 0).replace(/[^0-9]/g, ''), 10) || 0;
            const subtotal = precioNum * (p.cantidad || 1);
            return (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #334155' }}>
                <span>{p.titulo || p.nombre} (x{p.cantidad || 1})</span>
                <strong style={{ color: '#34d399' }}>${subtotal.toLocaleString('es-CL')}</strong>
              </li>
            );
          })}
        </ul>

        {/* Caja de totales con Monto Neto e I.V.A. incorporados */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '12px 16px', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}><span>Monto Neto:</span><span>${montoNeto.toLocaleString('es-CL')}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}><span>19% I.V.A.:</span><span>${montoIVA.toLocaleString('es-CL')}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #334155', paddingTop: '8px', marginTop: '2px' }}>
            <span style={{ fontWeight: '700', fontSize: '1.05rem', color: '#ffffff' }}>Total Bruto:</span>
            <span style={{ fontWeight: '800', fontSize: '1.35rem', color: '#34d399' }}>${totalBruto.toLocaleString('es-CL')}</span>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleVerEnNavegador} style={{ padding: '9px 14px', border: '1px solid #38bdf8', borderRadius: '8px', backgroundColor: 'transparent', color: '#38bdf8', cursor: 'pointer', fontWeight: '700', fontSize: '0.82rem' }}>
              Abrir Formato SII
            </button>
            <button onClick={handleDescargarPDF} style={{ padding: '9px 14px', border: 'none', borderRadius: '8px', backgroundColor: '#10b981', color: '#ffffff', cursor: 'pointer', fontWeight: '700', fontSize: '0.82rem' }}>
              Imprimir / PDF
            </button>
          </div>
          
          <button onClick={alCerrar} style={{ padding: '9px 16px', border: 'none', borderRadius: '8px', backgroundColor: '#0070f3', color: '#ffffff', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleBoleta;