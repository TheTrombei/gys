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
    "lote":    [10, 20, 20, 25],
    "nicho":   [15, 25, 25, 30],
    "cipres":  [15, 25, 25, 30],
    "mural":   [20, 30, 30, 35],
    "sendero": [20, 30, 30, 35]
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

// --- LOGICA INTERFAZ INICIO ---
function toggleOpcionesEnganche() {
    const tp = document.getElementById('tipo-pago');
    const mp = document.getElementById('metodo-pago');
    const panel = document.getElementById('grupo-enganche-principal');
    
    if(tp && mp) {
        if(tp.value === 'enganche') {
            mp.disabled = true; 
            if(panel) panel.style.display = 'block';
        } else {
            mp.disabled = false; 
            if(panel) panel.style.display = 'none';
        }
    }
}

// --- LOGICA PROMO 3X2 ---
function toggleEnganche3x2() {
    const mpVal = document.getElementById('mp-3x2');
    if(!mpVal) return;
    const grupoEng = document.getElementById('grupo-enganche-3x2');
    const grupoPlazo = document.getElementById('grupo-plazo-3x2');
    const nota = document.getElementById('nota-3x2');
    
    if (mpVal.value === 'contado' || mpVal.value === '3' || mpVal.value === '8') {
        if(grupoEng) grupoEng.style.display = 'none';
        if(grupoPlazo) grupoPlazo.style.display = 'none';
        if(nota) nota.style.display = 'none';
    } else {
        if(grupoEng) grupoEng.style.display = 'block';
        if(grupoPlazo) grupoPlazo.style.display = 'block';
        if(nota) nota.style.display = 'block';
    }
}

function generarCotizacion3x2() {
    const cliente = document.getElementById('nombre-cliente').value || "No especificado";
    const servicioPrecio = parseFloat(document.getElementById('servicio-especial').value);
    const lista = document.getElementById('lista-items');
    const totales = document.getElementById('totales-tabla');
    
    lista.innerHTML = '';
    totales.innerHTML = '';
    let totalPagar = 0;
    let precioBase = servicioPrecio * 2;
    let descTexto = "";
    let htmlTotales = "";

    const mpVal = document.getElementById('mp-3x2').value;
    const subtitulo = "Promoción 3 x 2";

    if (mpVal === 'contado') {
        totalPagar = precioBase * 0.80; // CORREGIDO A 20%
        descTexto = `Paga 2, Lleva 3 (Contado -20%)`;
        
        lista.innerHTML = `<tr><td>Paquete ${subtitulo} (Universal/Premier)</td><td class="text-right">${fmt(precioBase)}</td><td class="text-right">${descTexto}</td><td class="text-right"><strong>${fmt(totalPagar)}</strong></td></tr>`;
        htmlTotales += `<tr class="total-highlight"><td colspan="3" align="right">TOTAL FINAL A PAGAR:</td><td class="text-right" style="color:var(--primary); font-size:1.2em;">${fmt(totalPagar)}</td></tr>`;
        htmlTotales += `<tr style="color:#004b23; font-weight:bold;"><td colspan="3" align="right">Pago Único de Contado:</td><td class="text-right">${fmt(totalPagar)}</td></tr>`;
    } else if (mpVal === '3' || mpVal === '8') {
        let mpDesc = parseFloat(mpVal);
        totalPagar = precioBase * (1 - (mpDesc / 100));
        let nombreMP = mpDesc === 3 ? "DD36" : "D036"; 
        descTexto = `Paga 2, Lleva 3 (${nombreMP} -${mpDesc}%)`;
        
        lista.innerHTML = `<tr><td>Paquete ${subtitulo} (Universal/Premier)</td><td class="text-right">${fmt(precioBase)}</td><td class="text-right">${descTexto}</td><td class="text-right"><strong>${fmt(totalPagar)}</strong></td></tr>`;
        htmlTotales += `<tr class="total-highlight"><td colspan="3" align="right">TOTAL FINAL A PAGAR:</td><td class="text-right" style="color:var(--primary); font-size:1.2em;">${fmt(totalPagar)}</td></tr>`;
        htmlTotales += `<tr style="color:#004b23; font-weight:bold;"><td colspan="3" align="right">36 Mensualidades de:</td><td class="text-right">${fmt(totalPagar / 36)}</td></tr>`;
    } else {
        let mpDesc = 15;
        totalPagar = precioBase * (1 - (mpDesc / 100));
        descTexto = `Paga 2, Lleva 3 (Enganche -15%)`;
        
        const meses = parseInt(document.getElementById('plazo-3x2').value); // Ahora incluye el 36
        const enganchePorcentaje = parseInt(document.getElementById('enganche-3x2').value) / 100;
        
        let engancheMonto = totalPagar * enganchePorcentaje;
        let saldoRestante = totalPagar - engancheMonto;
        let mensualidadFinanciada = saldoRestante / (meses - 1);
        
        lista.innerHTML = `<tr><td>Paquete ${subtitulo} (Universal/Premier)</td><td class="text-right">${fmt(precioBase)}</td><td class="text-right">${descTexto}</td><td class="text-right"><strong>${fmt(totalPagar)}</strong></td></tr>`;
        htmlTotales += `<tr class="total-highlight"><td colspan="3" align="right">TOTAL FINAL A PAGAR:</td><td class="text-right" style="color:var(--primary); font-size:1.2em;">${fmt(totalPagar)}</td></tr>`;
        htmlTotales += `<tr style="color:#c0392b;"><td colspan="3" align="right">Enganche / 1ra Mensualidad (${enganchePorcentaje*100}%):</td><td class="text-right"><strong>${fmt(engancheMonto)}</strong></td></tr>`;
        htmlTotales += `<tr style="color:#004b23; font-weight:bold; background:#eef5f0;"><td colspan="3" align="right">${meses-1} Mensualidades Restantes de:</td><td class="text-right">${fmt(mensualidadFinanciada)}</td></tr>`;
    }

    totales.innerHTML = htmlTotales;
    document.getElementById('res-cliente').innerText = cliente;
    document.getElementById('res-asesor').innerText = document.getElementById('asesor').value;
    document.getElementById('res-telefono').innerText = document.getElementById('telefono').value;
    document.getElementById('fecha-label').innerText = new Date().toLocaleDateString('es-MX');
    document.getElementById('resultado-cotizacion').style.display = 'block';
    document.getElementById('resultado-cotizacion').scrollIntoView({ behavior: 'smooth' });
}

// --- LOGICA PROMO 4X2 ---
function toggleEnganche4x2() {
    const formaPago = document.getElementById('forma-pago-4x2');
    if(!formaPago) return;
    const grupoEnganche = document.getElementById('grupo-enganche-4x2');
    const nota = document.getElementById('nota-4x2');
    
    if (formaPago.value === 'contado') {
        if(grupoEnganche) grupoEnganche.style.display = 'none';
        if(nota) nota.style.display = 'none';
    } else {
        if(grupoEnganche) grupoEnganche.style.display = 'block';
        if(nota) nota.style.display = 'block';
    }
}

function generarCotizacion4x2() {
    const cliente = document.getElementById('nombre-cliente').value || "No especificado";
    const servicioPrecio = parseFloat(document.getElementById('servicio-especial').value);
    const lista = document.getElementById('lista-items');
    const totales = document.getElementById('totales-tabla');
    
    lista.innerHTML = '';
    totales.innerHTML = '';
    let totalPagar = 0;
    let subtitulo = "Promoción 4 x 2";
    let precioBase = servicioPrecio * 2;
    let descTexto = "";
    let htmlTotales = "";

    const formaPago = document.getElementById('forma-pago-4x2').value;

    if (formaPago === 'contado') {
        totalPagar = precioBase * 0.95; 
        descTexto = "Paga 2, Lleva 4 (Contado -5%)";
        
        lista.innerHTML = `<tr><td>Paquete ${subtitulo} (Universal/Premier)</td><td class="text-right">${fmt(precioBase)}</td><td class="text-right">${descTexto}</td><td class="text-right"><strong>${fmt(totalPagar)}</strong></td></tr>`;
        htmlTotales += `<tr class="total-highlight"><td colspan="3" align="right">TOTAL FINAL A PAGAR:</td><td class="text-right" style="color:var(--primary); font-size:1.2em;">${fmt(totalPagar)}</td></tr>`;
        htmlTotales += `<tr style="color:#004b23; font-weight:bold;"><td colspan="3" align="right">Pago Único de Contado:</td><td class="text-right">${fmt(totalPagar)}</td></tr>`;
    } else {
        totalPagar = precioBase; 
        descTexto = `Paga 2, Lleva 4 (${formaPago})`;
        const meses = (formaPago === 'D012') ? 12 : 24;
        const enganchePorcentaje = parseInt(document.getElementById('enganche-4x2').value) / 100;
        
        let engancheMonto = totalPagar * enganchePorcentaje;
        let saldoRestante = totalPagar - engancheMonto;
        let mensualidadFinanciada = saldoRestante / (meses - 1);

        lista.innerHTML = `<tr><td>Paquete ${subtitulo} (Universal/Premier)</td><td class="text-right">${fmt(precioBase)}</td><td class="text-right">${descTexto}</td><td class="text-right"><strong>${fmt(totalPagar)}</strong></td></tr>`;
        htmlTotales += `<tr class="total-highlight"><td colspan="3" align="right">TOTAL FINAL A PAGAR:</td><td class="text-right" style="color:var(--primary); font-size:1.2em;">${fmt(totalPagar)}</td></tr>`;
        htmlTotales += `<tr style="color:#c0392b;"><td colspan="3" align="right">Enganche / 1ra Mensualidad (${enganchePorcentaje*100}%):</td><td class="text-right"><strong>${fmt(engancheMonto)}</strong></td></tr>`;
        htmlTotales += `<tr style="color:#004b23; font-weight:bold; background:#eef5f0;"><td colspan="3" align="right">${meses-1} Mensualidades Restantes de:</td><td class="text-right">${fmt(mensualidadFinanciada)}</td></tr>`;
    }

    totales.innerHTML = htmlTotales;
    document.getElementById('res-cliente').innerText = cliente;
    document.getElementById('res-asesor').innerText = document.getElementById('asesor').value;
    document.getElementById('res-telefono').innerText = document.getElementById('telefono').value;
    document.getElementById('fecha-label').innerText = new Date().toLocaleDateString('es-MX');
    document.getElementById('resultado-cotizacion').style.display = 'block';
    document.getElementById('resultado-cotizacion').scrollIntoView({ behavior: 'smooth' });
}

// --- LOGICA PAGINA INICIO ---
function generarCotizacion() {
    if(!document.getElementById('tipo-pago')) return; 

    const tp = document.getElementById('tipo-pago').value;
    let mp = parseFloat(document.getElementById('metodo-pago').value);
    
    if(tp === 'enganche') { mp = 15; }

    const esInmediato = document.getElementById('toggle-inmediato').checked;
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
        if (mp === 0) {
            dPromoServicio = 0;
            dPromoPropiedad = 0;
            dMP = 0;
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
    
    if (tp === 'contado') {
        totales.innerHTML += `<tr style="color:#004b23; font-weight:bold;"><td colspan="6" align="right">PAGO ÚNICO DE CONTADO:</td><td class="text-right">${fmt(sumaFinal)}</td></tr>`;
    } else if (tp === 'enganche' && !esInmediato) {
        const enganchePorc = parseInt(document.getElementById('enganche-principal').value) / 100;
        let engancheMonto = sumaFinal * enganchePorc;
        let saldoRestante = sumaFinal - engancheMonto;
        let mensualidad = saldoRestante / 35; 

        totales.innerHTML += `<tr style="color:#c0392b;"><td colspan="6" align="right">Enganche Inicial (${enganchePorc*100}%):</td><td class="text-right"><strong>${fmt(engancheMonto)}</strong></td></tr>`;
        totales.innerHTML += `<tr><td colspan="6" align="right">Saldo a Financiar:</td><td class="text-right">${fmt(saldoRestante)}</td></tr>`;
        totales.innerHTML += `<tr style="color:#004b23; font-weight:bold; background:#eef5f0;"><td colspan="6" align="right">35 Mensualidades de:</td><td class="text-right">${fmt(mensualidad)}</td></tr>`;
    } else if (tp === 'normal' && sumaFinal > 0) {
        totales.innerHTML += `<tr style="color:#004b23; font-weight:bold;"><td colspan="6" align="right">36 Mensualidades de:</td><td class="text-right">${fmt(sumaFinal/36)}</td></tr>`;
    }

    document.getElementById('res-cliente').innerText = document.getElementById('nombre-cliente').value;
    document.getElementById('res-asesor').innerText = document.getElementById('asesor').value;
    document.getElementById('res-telefono').innerText = document.getElementById('telefono').value;
    document.getElementById('fecha-label').innerText = new Date().toLocaleDateString('es-MX');
    document.getElementById('resultado-cotizacion').style.display = 'block';
    document.getElementById('resultado-cotizacion').scrollIntoView({ behavior: 'smooth' });
}

// --- COMUNES ---
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
window.onclick = function(e) { if(e.target == document.getElementById("imgModal")) cerrarModal(); }

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