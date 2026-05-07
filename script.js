const asesoresDB = {
    "340": [
        { n: "FERNANDEZ DUARTE CLAUDIA", t: "477" },
        { n: "CHAVEZ MALDONADO HUMBERTINA", t: "477" },
        { n: "GRANA LUNA BRENDA LIZBETH", t: "477" },
        { n: "GUICOL BARRENO JOSE LUIS ELIAS", t: "477" },
        { n: "DELGADO PEREZ YOLANDA LETICIA", t: "477" },
        { n: "CASTILLO SAAVEDRA JOSE DE JESUS", t: "477" }
    ],
    "342": [
        { n: "BARRON MENDOZA SONIA JAZMIN", t: "477" },
        { n: "AGUIRRE PEREZ SALVADOR", t: "477" },
        { n: "RUIZ CAMARILLO WENDY GERALDINE", t: "477" },
        { n: "PALMA PALOMINO ARACELI", t: "477" },
        { n: "GUERRA GRANADOS OSCAR DAVID", t: "477" },
        { n: "FUENTES NUÑEZ BERENICE", t: "477" },
        { n: "RAMIREZ HERNANDEZ LEONARDO", t: "477" }
    ],
    "889": [ 
        { n: "LUNA ALVARADO MAURICIO", t: "477" },
        { n: "SANCHEZ MORELES ABELINA", t: "477" },
        { n: "RIOS SANDOVAL MAGNOLIA", t: "477" },
        { n: "ACOSTA MOLINA ELENA MARIA GUADALUPE", t: "477" },
        { n: "HERNANDEZ ALVARADO ANGELICA MARIA", t: "477" },
        { n: "MURILLO JARAMILLO ANA BERTHA", t: "477" },
        { n: "FLORES OCHOA AYME", t: "477" },
        { n: "GALLAGA MAGDALENO ADELA", t: "477" },
        { n: "MONTAÑO DELGADO CARLOS JAIME", t: "477" },
        { n: "MIRANDA DE LA PARRA CLAUDIA", t: "477" }
    ],
    "703": [
        { n: "GONZALEZ ESCOTO ANTONIO", t: "477" },
        { n: "BENITEZ HERNANDEZ JESUS ROGELIO", t: "477" },
        { n: "PEREZ SILVA LAURA", t: "477" },
        { n: "URRUTIA MATA MARGARITO SEBASTIAN", t: "477" },
        { n: "PATLAN ALVARADO SERGIO ALEJANDRO", t: "477" },
        { n: "HERNANDEZ QUINTERO RICARDO", t: "477" },
        { n: "CHACON URIBE GILBERTO", t: "477" },
        { n: "MENDOZA RODRIGUEZ BELEM GUADALUPE", t: "477" },
        { n: "SANDOVAL GUTIERREZ NATALI ELIZABETH", t: "477" },
        { n: "MEDINA CRUZ LUIS RAMON", t: "477" },
        { n: "TREJO ABARCA NURIA FABIOLA", t: "477" }
    ]
};

const tablaIntegrales = {
    "capilla": [3, 5, 6, 7],
    "jardin":  [7, 9, 11, 12],
    "lote":    [10, 15, 15, 20],
    "nicho":   [15, 20, 20, 25],
    "cipres":  [15, 20, 20, 30],
    "mural":   [20, 25, 25, 30],
    "sendero": [20, 25, 25, 30]
};

function actualizarAsesores() {
    const g = document.getElementById('gerencia').value;
    const a = document.getElementById('asesor');
    if(!a) return;
    a.innerHTML = '<option value="">Seleccione...</option>';
    if (asesoresDB[g]) {
        asesoresDB[g].forEach(p => {
            let opt = document.createElement('option');
            opt.value = p.n; opt.textContent = p.n; opt.dataset.tel = p.t;
            a.appendChild(opt);
        });
    }
}

function actualizarTelefono() {
    const a = document.getElementById('asesor');
    if(!a) return;
    const sel = a.options[a.selectedIndex];
    document.getElementById('telefono').value = sel ? sel.dataset.tel || '' : '';
}

function fmt(n) { return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n); }

// --- LOGICA PAGINA PROMOCIONES ---
function toggleOpcionesPromo() {
    const promo = document.getElementById('tipo-promo').value;
    document.getElementById('grupo-mp-especial').style.display = (promo === '3x2') ? 'block' : 'none';
    
    // Al cambiar de promo, reiniciar paneles de 4x2
    if(promo !== '4x2') {
        document.getElementById('grupo-tipo-pago-4x2').style.display = 'none';
        document.getElementById('panel-financiamiento-4x2').style.display = 'none';
    } else {
        document.getElementById('grupo-tipo-pago-4x2').style.display = 'block';
        toggleFinanciamiento4x2(); // Checar estado inicial del selector financiado/contado
    }
}

function toggleFinanciamiento4x2() {
    const tipoPago = document.getElementById('tipo-pago-4x2').value;
    document.getElementById('panel-financiamiento-4x2').style.display = (tipoPago === 'financiado') ? 'block' : 'none';
}

function generarCotizacionEspecial() {
    const cliente = document.getElementById('nombre-cliente').value || "No especificado";
    const servicioPrecio = parseFloat(document.getElementById('servicio-especial').value);
    const promo = document.getElementById('tipo-promo').value;
    const lista = document.getElementById('lista-items');
    const totales = document.getElementById('totales-tabla');
    
    lista.innerHTML = '';
    totales.innerHTML = '';
    let totalPagar = 0;
    let subtitulo = "";

    // Siempre se pagan 2 servicios de base (precio lista normal)
    let precioBase = servicioPrecio * 2;
    let descTexto = "";

    if (promo === '3x2') {
        const mpDesc = parseFloat(document.getElementById('metodo-pago-especial').value) || 0;
        // M036 es 0%, pero la formula queda lista si cambia la regla
        totalPagar = precioBase * (1 - (mpDesc / 100));
        descTexto = `Paga 2, Lleva 3 (M036)`;
        subtitulo = "Promoción 3 x 2";
    } else {
        const tipoPago4x2 = document.getElementById('tipo-pago-4x2').value;
        subtitulo = "Promoción 4 x 2";
        
        if (tipoPago4x2 === 'contado') {
            totalPagar = precioBase * 0.95; // 5% Descuento directo
            descTexto = "Paga 2, Lleva 4 (Contado -5%)";
        } else {
            totalPagar = precioBase; // Precio base normal financiado
            descTexto = "Paga 2, Lleva 4 (Financiado)";
        }
    }

    // Fila del artículo en la tabla
    lista.innerHTML = `
        <tr>
            <td>Paquete ${subtitulo} (Universal/Premier)</td>
            <td class="text-right">${fmt(precioBase)}</td>
            <td class="text-right">${descTexto}</td>
            <td class="text-right"><strong>${fmt(totalPagar)}</strong></td>
        </tr>
    `;

    // --- RENDERIZADO DE TOTALES Y MENSUALIDADES ---
    
    // Fila 1: Total Final
    let htmlTotales = `<tr class="total-highlight"><td colspan="3" align="right">TOTAL FINAL A PAGAR:</td><td class="text-right" style="color:var(--primary); font-size:1.2em;">${fmt(totalPagar)}</td></tr>`;

    // Lógica de cuotas según la promoción
    if (promo === '3x2') {
        // Tradicional 36 meses directo sobre el total
        htmlTotales += `<tr style="color:#004b23; font-weight:bold;"><td colspan="3" align="right">36 Mensualidades de:</td><td class="text-right">${fmt(totalPagar / 36)}</td></tr>`;
    } else {
        // Lógica 4x2
        const tipoPago4x2 = document.getElementById('tipo-pago-4x2').value;
        
        if (tipoPago4x2 === 'financiado') {
            const meses = parseInt(document.getElementById('plazo-4x2').value);
            const enganchePorcentaje = parseInt(document.getElementById('enganche-4x2').value) / 100;
            
            // CÁLCULO NUEVO SOLICITADO
            // 1. El enganche es el monto directo (la primer mensualidad)
            let engancheMonto = totalPagar * enganchePorcentaje;
            
            // 2. El saldo restante
            let saldoRestante = totalPagar - engancheMonto;
            
            // 3. Meses restantes
            let mesesRestantes = meses - 1;
            
            // 4. Mensualidad financiada
            let mensualidadFinanciada = saldoRestante / mesesRestantes;

            // Renderizado en tabla
            htmlTotales += `<tr style="color:#c0392b;"><td colspan="3" align="right">Enganche / 1ra Mensualidad (${enganchePorcentaje*100}%):</td><td class="text-right"><strong>${fmt(engancheMonto)}</strong></td></tr>`;
            htmlTotales += `<tr><td colspan="3" align="right">Saldo Restante Financiado:</td><td class="text-right">${fmt(saldoRestante)}</td></tr>`;
            htmlTotales += `<tr style="color:#004b23; font-weight:bold; background:#eef5f0;"><td colspan="3" align="right">${mesesRestantes} Mensualidades Restantes de:</td><td class="text-right" style="font-size:1.1em;">${fmt(mensualidadFinanciada)}</td></tr>`;
        
        } else {
            // Contado 4x2, solo muestra que es pago único
            htmlTotales += `<tr style="color:#004b23; font-weight:bold;"><td colspan="3" align="right">Pago Único de Contado:</td><td class="text-right">${fmt(totalPagar)}</td></tr>`;
        }
    }

    totales.innerHTML = htmlTotales;
    
    // Llenar info de cabecera del recibo
    document.getElementById('res-cliente').innerText = cliente;
    document.getElementById('res-asesor').innerText = document.getElementById('asesor').value;
    document.getElementById('res-telefono').innerText = document.getElementById('telefono').value;
    document.getElementById('fecha-label').innerText = new Date().toLocaleDateString('es-MX');
    
    // Mostrar y scrollear
    document.getElementById('resultado-cotizacion').style.display = 'block';
    document.getElementById('resultado-cotizacion').scrollIntoView({ behavior: 'smooth' });
}

// --- LOGICA PAGINA INICIO (Mantenida exactamente igual) ---
function generarCotizacion() {
    if(!document.getElementById('tipo-pago')) return; 

    const tp = document.getElementById('tipo-pago').value;
    const mp = parseFloat(document.getElementById('metodo-pago').value);
    const toggleElement = document.getElementById('toggle-inmediato');
    const esInmediato = toggleElement ? toggleElement.checked : false;
    
    const lista = document.getElementById('lista-items');
    const totales = document.getElementById('totales-tabla');
    lista.innerHTML = '';
    let sumaFinal = 0;

    const selServ = document.getElementById('servicio');
    const selProp = document.getElementById('propiedad');
    const cantServicios = parseInt(document.getElementById('cantidad-servicios').value) || 0;
    
    let valServicio = esInmediato ? parseFloat(selServ.options[selServ.selectedIndex].dataset.precioInm) || 0 : parseFloat(selServ.value) || 0;
    let valPropiedad = esInmediato ? parseFloat(selProp.options[selProp.selectedIndex].dataset.precioInm) || 0 : parseFloat(selProp.value) || 0;

    let dPromoServicio = 0, dPromoPropiedad = 0, dMP = 0;

    if (esInmediato) {
        dPromoServicio = 0; dPromoPropiedad = 0; dMP = 0;
    } else {
        dMP = (tp === 'enganche') ? 15 : mp;
        if (tp === 'contado') {
            dPromoServicio = 20; dPromoPropiedad = 20;
        } else {
            if (cantServicios > 0 && valPropiedad > 0) {
                const cat = selProp.options[selProp.selectedIndex].dataset.categoria;
                if (cat && tablaIntegrales[cat]) {
                    let idx = cantServicios >= 4 ? 3 : cantServicios - 1;
                    dPromoServicio = tablaIntegrales[cat][idx];
                    dPromoPropiedad = tablaIntegrales[cat][idx];
                }
            } else if (cantServicios > 0) {
                dPromoServicio = (cantServicios === 1) ? 10 : 20;
            }
        }
    }

    if (cantServicios > 0 && valServicio > 0) {
        let pBase = valServicio * cantServicios;
        let pPromo = pBase * (1 - (dPromoServicio / 100));
        let finalS = pPromo * (1 - (dMP / 100));
        sumaFinal += finalS;
        lista.innerHTML += `<tr><td>Servicio: ${selServ.options[selServ.selectedIndex].dataset.nombre} (x${cantServicios})</td><td>${selServ.options[selServ.selectedIndex].dataset.clave}</td><td class="text-right">${fmt(pBase)}</td><td class="text-right">-${dPromoServicio}%</td><td class="text-right">${fmt(pPromo)}</td><td class="text-right">-${dMP}%</td><td class="text-right"><strong>${fmt(finalS)}</strong></td></tr>`;
    }
    if (valPropiedad > 0) {
        let pPromo = valPropiedad * (1 - (dPromoPropiedad / 100));
        let finalP = pPromo * (1 - (dMP / 100));
        sumaFinal += finalP;
        lista.innerHTML += `<tr><td>Propiedad: ${selProp.options[selProp.selectedIndex].dataset.nombre}</td><td>${selProp.options[selProp.selectedIndex].dataset.clave}</td><td class="text-right">${fmt(valPropiedad)}</td><td class="text-right">-${dPromoPropiedad}%</td><td class="text-right">${fmt(pPromo)}</td><td class="text-right">-${dMP}%</td><td class="text-right"><strong>${fmt(finalP)}</strong></td></tr>`;
    }

    totales.innerHTML = `<tr class="total-highlight"><td colspan="6" align="right">TOTAL A PAGAR:</td><td class="text-right" style="color:var(--primary); font-size:1.2em;">${fmt(sumaFinal)}</td></tr>`;
    if (tp === 'enganche' && !esInmediato) totales.innerHTML += `<tr style="color:#c0392b; font-weight:bold;"><td colspan="6" align="right">Monto Sugerido de Enganche (15%):</td><td class="text-right">${fmt(sumaFinal*0.15)}</td></tr>`;
    if (tp !== 'contado' && sumaFinal > 0) totales.innerHTML += `<tr style="color:#004b23; font-weight:bold;"><td colspan="6" align="right">36 Mensualidades de:</td><td class="text-right">${fmt(sumaFinal/36)}</td></tr>`;

    document.getElementById('res-cliente').innerText = document.getElementById('nombre-cliente').value;
    document.getElementById('res-asesor').innerText = document.getElementById('asesor').value;
    document.getElementById('res-telefono').innerText = document.getElementById('telefono').value;
    document.getElementById('fecha-label').innerText = new Date().toLocaleDateString('es-MX');
    document.getElementById('resultado-cotizacion').style.display = 'block';
    document.getElementById('resultado-cotizacion').scrollIntoView({ behavior: 'smooth' });
}

// --- FUNCIONES COMUNES (Descargas y Modal) ---
function descargarPDF() {
    const { jsPDF } = window.jspdf;
    html2canvas(document.getElementById('pdf-capture'), { scale: 2 }).then(canvas => {
        const img = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Cotizacion_Gayosso.pdf');
    });
}

function descargarImagen() {
    html2canvas(document.getElementById('pdf-capture'), { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Cotizacion_Gayosso.jpg';
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
    });
}

function abrirModal(src) { 
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgAmpliacion");
    if(modal && modalImg) {
        modal.style.display = "block"; 
        modalImg.src = src;
    }
}
function cerrarModal() { 
    const modal = document.getElementById("imgModal");
    if(modal) {
        modal.style.display = "none";
    }
}
window.onclick = function(event) {
    const modal = document.getElementById("imgModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}