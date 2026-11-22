/* Charlas Primera Notaría de Los Ángeles · inducción y ergonomía */
/* Charlas Primera Notaría de Los Ángeles · inducción, Para todos y áreas del hotel. Armado: 05-11-2026 */
/* ---- 00_dibujos.js ---- */
// ===== Primera Notaría de Los Ángeles · fondos y objetos comunes para los dibujos de las charlas =====
// Lienzo 320 x 200. Piso a la altura y = 165 (las personas W(x,165,...) miden ~85 de alto con s = 1).
// Todos los dibujos deben ser proporcionales: una puerta ~ 1,3 veces la persona, una cama a la altura de la rodilla, etc.
// Uso: const H = window.HD;  H.fondo.habitacion() + H.cama(150,165) + W(80,165,{area:'habitaciones'})
window.SI_CONT = window.SI_CONT || { temas: [] };
window.HD = window.HD || {};
(function (H) {
  const T = (x, y, s, size = 12, c = '#263238', a = 'middle', w = 'bold') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${w}" text-anchor="${a}" fill="${c}" font-family="Arial">${s}</text>`;
  H.T = T;
  let K = 0; const uid = p => 'hd' + p + (K++);
  // rótulo tipo píldora (texto blanco)
  H.pill = (cx, y, t, c = '#263238', fs = 11) => { const w = Math.round(t.length * fs * 0.6 + 16); cx = Math.max(w / 2 + 3, Math.min(317 - w / 2, cx)); return `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="${fs + 9}" rx="${(fs + 9) / 2}" fill="${c}"/>` + T(cx, y + fs + 2, t, fs, '#fff'); };
  // ---------------- FONDOS ----------------
  const piso = (c1, c2, y = 165) => `<rect y="${y}" width="320" height="${200 - y}" fill="${c1}"/><rect y="${y}" width="320" height="3" fill="#000" opacity=".08"/>` + (c2 ? [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<line x1="${i * 46}" y1="${y}" x2="${i * 46 - 22}" y2="200" stroke="${c2}" stroke-width="1.3"/>`).join('') : '');
  const pared = (c, y = 165) => `<rect width="320" height="${y}" fill="${c}"/>`;
  const zocalo = (c = '#8D6E63', y = 165) => `<rect y="${y - 6}" width="320" height="6" fill="${c}"/>`;
  const ventana = (x, y, w = 70, h = 54, cielo = '#BBDEFB') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${cielo}" stroke="#ECEFF1" stroke-width="4"/><line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="#ECEFF1" stroke-width="3"/><path d="M${x + 4},${y + h - 4} q${w * .3},${-h * .45} ${w - 8},${-h * .3}" stroke="#81C784" stroke-width="6" fill="none" opacity=".7"/>`;
  H.ventana = ventana;
  H.fondo = {
    // habitación del hotel: muro cálido, alfombra, ventana con vista al bosque
    habitacion: () => pared('#F4E9DA') + ventana(222, 30, 76, 60) + `<rect x="214" y="26" width="10" height="72" fill="#A1887F"/><rect x="296" y="26" width="10" height="72" fill="#A1887F"/>` + zocalo('#A1887F') + piso('#B08968', '#9C7553'),
    // baño: cerámica clara
    bano: () => pared('#E3F2FD') + `${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<line x1="${i * 34}" y1="0" x2="${i * 34}" y2="165" stroke="#CFE3F2" stroke-width="1.5"/>`).join('')}${[0, 1, 2, 3, 4].map(i => `<line x1="0" y1="${i * 34}" x2="320" y2="${i * 34}" stroke="#CFE3F2" stroke-width="1.5"/>`).join('')}` + piso('#CFD8DC', '#B0BEC5'),
    // cocina industrial: azulejo blanco y piso rojo antideslizante
    cocina: () => pared('#F5F5F5') + `${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<line x1="${i * 28}" y1="40" x2="${i * 28}" y2="165" stroke="#E0E0E0" stroke-width="1.2"/>`).join('')}${[1, 2, 3, 4].map(i => `<line x1="0" y1="${40 + i * 28}" x2="320" y2="${40 + i * 28}" stroke="#E0E0E0" stroke-width="1.2"/>`).join('')}<rect width="320" height="40" fill="#ECEFF1"/>` + piso('#B23A2B', '#9A2F22'),
    // comedor / sala de desayuno
    comedor: () => pared('#FFF3E0') + ventana(30, 30, 80, 60) + ventana(210, 30, 80, 60) + zocalo('#8D6E63') + piso('#A1887F', '#8D6E63'),
    // lavandería: muro gris claro
    lavanderia: () => pared('#E8EEF2') + `<rect y="0" width="320" height="22" fill="#CFD8DC"/>` + zocalo('#90A4AE') + piso('#B0BEC5', '#9EADB5'),
    // recepción: muro de madera y logo
    recepcion: () => pared('#EFE6D8') + `<rect x="0" y="0" width="320" height="18" fill="#0E3962"/>` + `${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${i * 40 + 2}" y="18" width="36" height="140" fill="#D7C4A8" opacity=".35"/>`).join('')}` + zocalo('#6D4C41') + piso('#8D6E63', '#7B5E50'),
    // pasillo de habitaciones con puertas
    pasillo: () => pared('#F1E7D6') + [30, 150, 270].map(x => `<rect x="${x - 22}" y="56" width="44" height="109" rx="2" fill="#8D6E63" stroke="#6D4C41" stroke-width="2"/><circle cx="${x + 14}" cy="112" r="2.6" fill="#FFD54F"/><rect x="${x - 8}" y="44" width="16" height="9" rx="2" fill="#0E3962"/>`).join('') + zocalo('#A1887F') + piso('#7B4B3A', '#6A3F31'),
    // exterior: cielo, cerros con bosque, pasto (el hotel está en un parque con mucha área verde)
    jardin: (suelo = '#7CB342') => { const k = uid('sky'); return `<defs><linearGradient id="${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#90CAF9"/><stop offset="1" stop-color="#E3F2FD"/></linearGradient></defs><rect width="320" height="200" fill="url(#${k})"/>`
      + `<path d="M0,118 q50,-34 110,-12 q60,-30 120,-6 q50,-20 90,4 v40 h-320z" fill="#558B2F" opacity=".55"/>`
      + `${[18, 52, 250, 290].map((x, i) => `<path d="M${x},${126} l${12 + i % 2 * 3},-${40 + i * 4} l${12 + i % 2 * 3},${40 + i * 4}z" fill="#2E7D32"/>`).join('')}`
      + `<rect y="140" width="320" height="60" fill="${suelo}"/><rect y="140" width="320" height="3" fill="#000" opacity=".06"/>` },
    // bodega: estanterías al fondo
    bodega: () => pared('#E0E0E0') + `${[20, 120, 220].map(x => `<rect x="${x}" y="40" width="4" height="125" fill="#607D8B"/><rect x="${x + 76}" y="40" width="4" height="125" fill="#607D8B"/>${[0, 1, 2].map(i => `<rect x="${x}" y="${70 + i * 34}" width="80" height="4" fill="#78909C"/>`).join('')}`).join('')}` + piso('#9E9E9E', '#8A8A8A'),
    // sala de calderas: muro de ladrillo
    caldera: () => pared('#BCAAA4') + `${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => [0, 1, 2, 3, 4, 5, 6, 7, 8].map(c => `<rect x="${c * 38 + (r % 2) * 19 - 19}" y="${r * 15}" width="36" height="13" fill="#A1887F" opacity=".55"/>`).join('')).join('')}` + piso('#757575', '#666'),
    // piscina
    piscina: () => { const k = uid('sky'); return `<defs><linearGradient id="${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#90CAF9"/><stop offset="1" stop-color="#E3F2FD"/></linearGradient></defs><rect width="320" height="200" fill="url(#${k})"/><path d="M0,112 q60,-28 140,-8 q80,-24 180,0 v30 h-320z" fill="#689F38" opacity=".6"/><rect y="130" width="320" height="70" fill="#E0D6C8"/><rect x="150" y="150" width="170" height="50" fill="#29B6F6"/><path d="M150,150 h170" stroke="#fff" stroke-width="3"/>${[0, 1, 2].map(i => `<path d="M${165 + i * 50},${168 + i * 7} q8,-4 16,0 t16,0" stroke="#E1F5FE" stroke-width="2" fill="none"/>`).join('')}` },
    // oficina / administración
    oficina: () => pared('#F3EDE2') + ventana(226, 22, 76, 58) + zocalo('#A1825A') + piso('#C8A97E', '#B08E60')
  };
  // ---------------- OBJETOS COMUNES ----------------
  // letrero "piso mojado" (caballete amarillo)
  H.letreroMojado = (x, y = 165, s = 1) => `<path d="M${x - 14 * s},${y} l${10 * s},${-46 * s} h${8 * s} l${10 * s},${46 * s}" fill="#FFC20E" stroke="#8D6E00" stroke-width="1.5"/><path d="M${x - 6 * s},${y - 26 * s} l${6 * s},${-11 * s} l${6 * s},${11 * s}z" fill="#263238"/><rect x="${x - 2 * s}" y="${y - 20 * s}" width="${4 * s}" height="${3 * s}" fill="#263238"/>`;
  // charco de agua
  H.charco = (x, y = 172, rx = 34, c = '#4FC3F7') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .2}" fill="${c}" opacity=".7"/><ellipse cx="${x - rx * .3}" cy="${y - 1}" rx="${rx * .25}" ry="${rx * .06}" fill="#fff" opacity=".6"/>`;
  // extintor PQS (o CO2) apoyado o colgado; y = base
  H.extintor = (x, y, k = 'PQS', s = 1) => `<rect x="${x}" y="${y - 52 * s}" width="${22 * s}" height="${52 * s}" rx="${8 * s}" fill="#D32F2F" stroke="#8E0000" stroke-width="1.2"/><rect x="${x + 6 * s}" y="${y - 60 * s}" width="${10 * s}" height="${9 * s}" fill="#37474F"/><path d="M${x + 16 * s},${y - 58 * s} h${10 * s} l${4 * s},${4 * s}" stroke="#263238" stroke-width="${2.5 * s}" fill="none"/><rect x="${x + 3 * s}" y="${y - 40 * s}" width="${16 * s}" height="${18 * s}" fill="#fff"/>` + T(x + 11 * s, y - 27 * s, k === 'CO2' ? 'CO₂' : 'PQS', 7 * s, '#263238') + `<path d="M${x + 2 * s},${y - 50 * s} q${-10 * s},${10 * s} ${-8 * s},${30 * s}" stroke="#263238" stroke-width="${2.5 * s}" fill="none"/>`;
  // bidón / botella de producto químico con etiqueta y pictograma
  H.bidon = (x, y, c = '#1E88E5', label = 'CLORO', s = 1) => `<path d="M${x},${y} v${-40 * s} q0,${-6 * s} ${6 * s},${-8 * s} h${10 * s} v${-6 * s} h${8 * s} v${6 * s} q${8 * s},${2 * s} ${8 * s},${8 * s} v${40 * s}z" fill="${c}" stroke="#263238" stroke-width="1.2"/><rect x="${x + 4 * s}" y="${y - 30 * s}" width="${24 * s}" height="${16 * s}" fill="#fff"/>` + T(x + 16 * s, y - 19 * s, label, 6.5 * s, '#263238') + `<path d="M${x + 16 * s},${y - 12 * s} l${5 * s},${5 * s} l${-5 * s},${5 * s} l${-5 * s},${-5 * s}z" fill="#fff" stroke="#D32F2F" stroke-width="1"/>`;
  // escala de tijera (mantención): x = pata izquierda, y = piso, h alto
  H.escala = (x, y, h = 100) => { let g = `<line x1="${x}" y1="${y}" x2="${x + 18}" y2="${y - h}" stroke="#90A4AE" stroke-width="4"/><line x1="${x + 40}" y1="${y}" x2="${x + 22}" y2="${y - h}" stroke="#78909C" stroke-width="4"/><rect x="${x + 14}" y="${y - h - 4}" width="12" height="6" rx="2" fill="#546E7A"/>`;
    for (let i = 1; i < 6; i++) { const k = i / 6, yy = y - h * k; g += `<line x1="${(x + 18 * k).toFixed(1)}" y1="${yy.toFixed(1)}" x2="${(x + 40 - 18 * k).toFixed(1)}" y2="${yy.toFixed(1)}" stroke="#607D8B" stroke-width="3"/>`; }
    return g; };
  // ✓ / ✗ (la píldora redonda que se usa en las láminas)
  H.ok = (x, y, bien = true, r = 15) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${bien ? '#2E7D32' : '#D7262B'}" stroke="#fff" stroke-width="3"/>` + (bien ? `<path d="M${x - r * .45},${y} l${r * .3},${r * .32} l${r * .6},${-r * .62}" stroke="#fff" stroke-width="${r * .22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M${x - r * .38},${y - r * .38} l${r * .76},${r * .76} M${x + r * .38},${y - r * .38} l${-r * .76},${r * .76}" stroke="#fff" stroke-width="${r * .22}" stroke-linecap="round"/>`);
  // celular con número
  H.fono = (x, y, n = '1404') => `<rect x="${x}" y="${y}" width="34" height="58" rx="5" fill="#263238"/><rect x="${x + 3}" y="${y + 6}" width="28" height="42" fill="#E3F2FD"/>` + T(x + 17, y + 32, n, 11, '#2E7D32');
  // árbol (el hotel está rodeado de bosque)
  H.arbol = (x, y, h = 120) => `<path d="M${x - 5},${y} q2,-${h * .35} -2,-${h * .55} h14 q-4,${h * .2} -2,${h * .55}z" fill="#6D4C41"/><ellipse cx="${x}" cy="${y - h * .72}" rx="${h * .42}" ry="${h * .33}" fill="#558B2F"/><ellipse cx="${x - h * .2}" cy="${y - h * .66}" rx="${h * .25}" ry="${h * .2}" fill="#689F38"/><ellipse cx="${x + h * .18}" cy="${y - h * .82}" rx="${h * .22}" ry="${h * .17}" fill="#7CB342"/>`;
})(window.HD);

/* ---- 10_induccion.js ---- */

/* ---- 10_induccion.js · Primera Notaría de Los Ángeles · Inducción de Prevención de Riesgos (IRL), "charla madre" ---- */
// Base: Plan de emergencia, RIOHS y estudio de puesto de la notaría (Lautaro 325, Los Ángeles).
window.SI_IND_PUESTO = {
  atencion: '<li><b>Atención de público y mesón:</b> posturas frente al computador; clientes molestos o agresivos; trato con mucho público durante el día. <span class="ctrl">✅ Control:</span> pantalla a la altura de los ojos y pausas activas, trato formal y pedir apoyo a la jefatura ante una agresión, avisar de inmediato cualquier situación de violencia.</li>',
  caja: '<li><b>Caja:</b> manejo de dinero, posturas sentado por horas, movimientos repetidos de manos y muñecas, riesgo de robo o asalto. <span class="ctrl">✅ Control:</span> silla y teclado ajustados, pausas de manos y muñecas, seguir el procedimiento de la jefatura ante un robo y no oponer resistencia.</li>',
  escrituras: '<li><b>Escrituras, copias y archivo:</b> mover libros, protocolos, archivadores y resmas de papel; polvo del archivo; caídas desde escalas o sillas; uso del computador. <span class="ctrl">✅ Control:</span> cargas livianas, flectar las rodillas, usar un carro o pedir ayuda, escala firme (nunca una silla), mascarilla y guantes en el archivo antiguo, pausas activas.</li>',
  admin: '<li><b>Oficina y administración:</b> computador por muchas horas, cables y enchufes, ruido de impresoras, carga de trabajo y plazos. <span class="ctrl">✅ Control:</span> puesto ajustado y pausas, cables ordenados, enchufes sin sobrecargar, conversar con la jefatura si el trabajo se acumula.</li>'
};
window.SI_IND_TRANSV = {
  notaria: '<li><b>Para todos en la notaría:</b> resbalones en pisos mojados y escaleras entre los dos niveles, tropiezos con cables y cajas, incendio por sobrecarga eléctrica y papel acumulado, sismo, accidente de trayecto. <span class="ctrl">✅ Control:</span> orden y pisos secos, usar el pasamanos, conocer la vía de evacuación y la zona de seguridad en el frontis, dos extintores y red húmeda despejados.</li>'
};

(function () {
  const H = window.HD, T = H.T;
  const f1 = v => (+v).toFixed(1);
  const TT = (x, y, s, z = 12, c = '#263238', a = 'middle', w = 'bold') => H.T(x, y, s, z, c, a, w);
  const GG = (cls, inner, st) => `<g class="${cls}"${st ? ` style="${st}"` : ''}>${inner}</g>`;
  const lab = (x, y, s, c = '#1B365D', z = 11) => { const w = s.length * z * .6 + 14, h = z + 9; x = Math.max(w / 2 + 2, Math.min(318 - w / 2, x)); return `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${f1(w)}" height="${h}" rx="${h / 2}" fill="${c}"/>` + TT(x, y + z * .36, s, z, '#fff'); };
  const arr = (x1, y1, x2, y2, c = '#2E7D32', w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    return `<line x1="${x1}" y1="${y1}" x2="${f1(x2 - 5 * Math.cos(a))}" y2="${f1(y2 - 5 * Math.sin(a))}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${f1(x2 - h * Math.cos(a - .45))},${f1(y2 - h * Math.sin(a - .45))} ${f1(x2 - h * Math.cos(a + .45))},${f1(y2 - h * Math.sin(a + .45))}" fill="${c}"/>`; };
  const ST = `<style>.n_in_pu{animation:nInPu 1.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes nInPu{50%{transform:scale(1.15)}}.n_in_bl{animation:nInBl 1s steps(2) infinite}@keyframes nInBl{50%{opacity:.25}}.n_in_mv{animation:nInMv 1.3s ease-in-out infinite alternate}@keyframes nInMv{from{transform:translateX(-4px)}to{transform:translateX(5px)}}</style>`;
  const sv2 = g => sv(ST + g);
  const C1 = '#1B365D', C2 = '#B08D57';
  // ---------- objetos de la notaría (piso y = 165) ----------
  const fachada = (x, y, w = 190) => { const h = 110; let g = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#EFE6D8" stroke="#8D6E63" stroke-width="2"/><rect x="${x}" y="${y - h}" width="${w}" height="20" fill="${C1}"/>` + TT(x + w / 2, y - h + 14, 'PRIMERA NOTARÍA', 10, '#fff') + `<line x1="${x}" y1="${y - 52}" x2="${x + w}" y2="${y - 52}" stroke="#8D6E63" stroke-width="3"/>`;
    for (let i = 0; i < 3; i++) { g += `<rect x="${x + 14 + i * 56}" y="${y - h + 30}" width="34" height="26" fill="#BBDEFB" stroke="#ECEFF1" stroke-width="3"/>`; if (i !== 1) g += `<rect x="${x + 14 + i * 56}" y="${y - 44}" width="34" height="28" fill="#BBDEFB" stroke="#ECEFF1" stroke-width="3"/>`; }
    g += `<rect x="${x + w / 2 - 17}" y="${y - 44}" width="34" height="44" fill="${C1}"/><rect x="${x + w / 2 - 12}" y="${y - 38}" width="24" height="36" fill="#90CAF9" opacity=".8"/>`; return g; };
  const meson = (x, w) => `<rect x="${x}" y="128" width="${w}" height="37" fill="#8D6E63" stroke="#5D4037"/><rect x="${x}" y="136" width="${w}" height="8" fill="${C1}"/><rect x="${x}" y="144" width="${w}" height="2" fill="${C2}"/><rect x="${x - 4}" y="122" width="${w + 8}" height="7" rx="1" fill="#5D4037"/>`;
  const pc = (x, top = 122, c = '#263238') => `<rect x="${x - 10}" y="${top - 3}" width="20" height="3" fill="${c}"/><rect x="${x - 1.5}" y="${top - 12}" width="3" height="10" fill="#455A64"/><rect x="${x - 13}" y="${top - 32}" width="26" height="21" rx="2" fill="${c}"/><rect x="${x - 11}" y="${top - 30}" width="22" height="17" fill="#90CAF9"/>`;
  const escr = (x, w, top = 125) => `<rect x="${x}" y="${top}" width="${w}" height="5" fill="#A1887F" stroke="#6D4C41"/><rect x="${x + w - 9}" y="${top + 5}" width="5" height="${165 - top - 5}" fill="#6D4C41"/><rect x="${x + 4}" y="${top + 5}" width="5" height="${165 - top - 5}" fill="#6D4C41"/>`;
  const arch = (x, y = 165, w = 34, h = 84) => { let g = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="2" fill="#90A4AE" stroke="#546E7A" stroke-width="1.6"/>`; const n = Math.floor(h / 21); for (let i = 0; i < n; i++) g += `<rect x="${x + 3}" y="${y - h + 4 + i * 21}" width="${w - 6}" height="17" fill="#B0BEC5" stroke="#607D8B"/><rect x="${x + w / 2 - 6}" y="${y - h + 10 + i * 21}" width="12" height="3" fill="#455A64"/>`; return g; };
  const cajaL = (x, y, w = 34, h = 24, t = 'LIBROS') => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#C89B5E" stroke="#8D6E63" stroke-width="1.2"/><rect x="${x}" y="${y - h}" width="${w}" height="4" fill="#B5854A"/>` + TT(x + w / 2, y - h / 2 + 4, t, 7, '#5D4037');
  const resma = (x, y, w = 28) => `<rect x="${x}" y="${y - 9}" width="${w}" height="9" fill="#fff" stroke="#90A4AE"/><rect x="${x}" y="${y - 6}" width="${w}" height="2" fill="#E57373"/>`;
  const cable = (x1, y, x2) => `<path d="M${x1},${y} q${(x2 - x1) / 4},-9 ${(x2 - x1) / 2},0 t${(x2 - x1) / 2},0" stroke="#263238" stroke-width="3" fill="none"/>`;
  const puertaSalida = (x, y = 56) => `<rect x="${x}" y="${y}" width="44" height="109" fill="#6D4C41" stroke="#4E342E" stroke-width="2"/><circle cx="${x + 36}" cy="${y + 56}" r="2.6" fill="#FFD54F"/><rect x="${x - 4}" y="${y - 22}" width="52" height="18" rx="2" fill="#2E7D32"/>` + TT(x + 22, y - 9, 'SALIDA', 10, '#fff');
  const redH = (x, y) => `<rect x="${x}" y="${y - 62}" width="40" height="62" rx="3" fill="#C62828" stroke="#8E0000" stroke-width="2"/><circle cx="${x + 20}" cy="${y - 30}" r="15" fill="#B71C1C" stroke="#fff" stroke-width="2"/><circle cx="${x + 20}" cy="${y - 30}" r="6" fill="#fff"/>` + TT(x + 20, y - 46, 'RED', 7, '#fff') + TT(x + 20, y - 5, 'HÚMEDA', 6.5, '#fff');
  const zonaSeg = (x, y) => `<rect x="${x}" y="${y}" width="96" height="40" rx="4" fill="#2E7D32" stroke="#fff" stroke-width="2"/>` + TT(x + 48, y + 16, 'ZONA DE', 10, '#fff') + TT(x + 48, y + 30, 'SEGURIDAD', 10, '#fff');
  const escalera = (x, y = 165) => { let g = ''; for (let i = 0; i < 6; i++) g += `<rect x="${x + i * 14}" y="${y - (i + 1) * 12}" width="${90 - i * 14}" height="12" fill="${i % 2 ? '#BCAAA4' : '#A1887F'}" stroke="#6D4C41"/>`; return g + `<line x1="${x}" y1="${y - 40}" x2="${x + 86}" y2="${y - 98}" stroke="#455A64" stroke-width="3"/>`; };
  const enchufeM = (x, y, malo) => `<rect x="${x}" y="${y}" width="${malo ? 96 : 64}" height="14" rx="4" fill="#ECEFF1" stroke="#78909C"/>` + [0, 1, 2, 3, 4, 5].slice(0, malo ? 6 : 3).map(i => `<rect x="${x + 6 + i * 15}" y="${y + 4}" width="9" height="6" fill="#455A64"/>`).join('');
  const vf = (q, mal) => '';
  const J = { area: 'admin', shirt: '#455A64' };
  const D = (n, f) => { S['n_in_' + n] = () => f(false); S['n_in_' + n + '_q'] = () => f(true); };
  const escudo = (cx, cy) => `<path d="M${cx},${cy - 50} L${cx + 40},${cy - 36} V${cy} Q${cx + 40},${cy + 32} ${cx},${cy + 50} Q${cx - 40},${cy + 32} ${cx - 40},${cy} V${cy - 36}Z" fill="${C1}" stroke="${C2}" stroke-width="3"/>` + TT(cx, cy - 12, 'Ley', 14, C2) + TT(cx, cy + 8, '16.744', 16, '#fff');
  const tirada = (x, y, o) => `<g transform="translate(${x},${y - 8}) rotate(-90)">${W(0, 0, Object.assign({ face: 'pain' }, o))}</g>`;

  // ===================== DIBUJOS =====================
  D('empresa', q => sv2(H.fondo.jardin() + H.arbol(20, 150, 80) + H.arbol(304, 150, 70) + fachada(66, 150, 190) + `<rect x="0" y="150" width="320" height="50" fill="#BCAAA4"/>` + W(30, 184, { area: 'general', hair: true }) + W(290, 184, { area: 'atencion', flip: true }) + (q ? '' : lab(160, 176, 'Lautaro 325, Los Ángeles', C1))));
  D('requisitos', q => sv2(H.fondo.oficina() + escr(20, 120) + pc(60) + W(90, 176, Object.assign({ pose: 'point' }, J)) + [['Orden y limpieza', 40], ['Usar el EPP', 76], ['Respetar señales', 112], ['Basura al basurero', 148]].map(([t, y]) => H.ok(160, y, true, 11) + (q ? '' : TT(177, y + 4, t, 11, '#263238', 'start'))).join('')));
  D('orden', q => { const mal = escr(10, 70) + cajaL(90, 165, 36, 26) + cajaL(126, 165, 36, 26) + cable(30, 172, 150) + W(54, 178, { area: 'escrituras', pose: 'walk', face: 'worried' });
    const bien = arch(212, 165, 34, 84) + arch(250, 165, 34, 84) + cajaL(180, 165, 28, 20) + W(130 + 150, 182, { area: 'escrituras', hair: true, s: .8 });
    return sv2(H.fondo.oficina() + mal + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + bien + badge(140, 26, false, 13) + badge(300, 26, true, 13)); });
  D('equipos', q => sv2(H.fondo.oficina() + escr(14, 100) + pc(44) + pc(84) + `<rect x="140" y="105" width="56" height="60" rx="4" fill="#CFD8DC" stroke="#78909C" stroke-width="2"/><rect x="146" y="112" width="44" height="8" fill="#546E7A"/><rect x="150" y="122" width="36" height="3" fill="#fff"/>` + escr(210, 100) + pc(250) + W(180, 178, { area: 'admin', hair: true }) + (q ? '' : lab(160, 24, 'Solo los equipos que conoces', C1) + lab(168, 96, 'Fotocopiadora', '#546E7A', 9))));
  D('ambiente', q => sv2(H.fondo.oficina() + `<rect x="130" y="2" width="60" height="7" rx="3" fill="#FFF59D" stroke="#757575"/><path d="M122,9 L198,9 L220,110 L100,110Z" fill="#FFF8E1" opacity=".5"/>` + escr(40, 130) + pc(80) + W(120, 176, { area: 'admin', hair: true }) + `<rect x="272" y="104" width="10" height="52" rx="5" fill="#fff" stroke="#546E7A" stroke-width="2"/><rect x="275" y="130" width="4" height="22" fill="#43A047"/>` + (q ? '' : lab(160, 26, 'Buena luz', '#F9A825') + TT(277, 94, '18 a 26', 11, '#2E7D32') + TT(277, 170, 'grados', 10, '#2E7D32') + lab(60, 100, 'Ventilación', '#1565C0'))));
  D('ley', q => sv2(H.fondo.oficina() + escudo(234, 82) + W(70, 178, { area: 'atencion', hair: true }) + W(110, 178, { area: 'caja' }) + W(150, 178, { area: 'escrituras', hair: true }) + (q ? '' : lab(110, 24, 'Todos protegidos', C1))));
  D('accidente', q => sv2(H.fondo.oficina() + escr(0, 100) + W(60, 176, { area: 'escrituras', face: 'pain', hair: true }) + W(130, 176, Object.assign({ flip: true, pose: 'point' }, J)) + (q ? '' : bubble(6, 40, 'Me corté con papel', 120) + arr(150, 64, 196, 64, '#2E7D32', 4) + `<rect x="200" y="20" width="110" height="60" rx="6" fill="#fff" stroke="#2E7D32" stroke-width="3"/><path d="M226,36 v24 M214,48 h24" stroke="#2E7D32" stroke-width="7"/>` + TT(276, 46, 'ACHS', 14, '#2E7D32') + TT(276, 66, '1404', 15, '#C62828'))));
  D('grave', q => sv2(H.fondo.pasillo() + H.escala(30, 165, 118) + tirada(130, 182, { area: 'admin' }) + `<line x1="160" y1="150" x2="250" y2="150" stroke="#fff" stroke-width="6"/><line x1="160" y1="150" x2="250" y2="150" stroke="#D7262B" stroke-width="3" stroke-dasharray="8 8"/>` + W(274, 176, Object.assign({ pose: 'stop' }, J)) + (q ? '' : lab(160, 24, 'Más de 1,8 m = accidente grave', '#C62828', 10))));
  D('politica', q => sv2(H.fondo.oficina() + `<rect x="100" y="24" width="112" height="76" rx="3" fill="#fff" stroke="${C2}" stroke-width="3"/><rect x="100" y="24" width="112" height="18" fill="${C1}"/>` + TT(156, 37, 'POLÍTICA SST', 10, '#fff') + [0, 1, 2, 3].map(i => `<rect x="110" y="${52 + i * 11}" width="${92 - (i % 2) * 22}" height="3" fill="#B0BEC5"/>`).join('') + W(70, 178, { area: 'atencion', hair: true, pose: 'point' }) + W(250, 178, { area: 'admin', flip: true }) + (q ? '' : lab(156, 118, 'Compromiso de todos', C1))));
  D('epp', q => sv2(H.fondo.oficina() + arch(190, 165, 34, 100) + arch(228, 165, 34, 100) + W(120, 178, { area: 'escrituras', glasses: true, gloves: '#90A4AE', pose: 'carry' }) + `<rect x="123" y="104" width="13" height="8" rx="3" fill="#fff" stroke="#90A4AE"/>` + (q ? '' : lab(80, 40, 'Mascarilla y guantes', C1) + lab(230, 40, 'Archivo antiguo', '#8D6E63', 10))));
  D('extintor', q => sv2(H.fondo.pasillo() + H.extintor(60, 165, 'PQS', 1.1) + H.extintor(210, 165, 'PQS', 1.1) + redH(250, 165) + (q ? '' : lab(72, 80, 'PQS 6 kg', '#C62828', 10) + lab(222, 60, 'PQS 6 kg', '#C62828', 10) + lab(270, 104, 'Red húmeda', C1, 9)) + W(150, 184, { area: 'admin', hair: true, pose: 'point' })));
  D('senal', q => sv2(H.fondo.jardin() + fachada(10, 150, 150) + `<rect x="0" y="150" width="320" height="50" fill="#B0BEC5"/>` + [0, 1, 2, 3].map(i => `<rect x="${60 + i * 24}" y="174" width="16" height="4" fill="#fff"/>`).join('') + zonaSeg(210, 100) + arr(84, 182, 200, 182, '#2E7D32', 4) + W(60, 190, { area: 'atencion', hair: true, pose: 'walk' }) + W(150, 190, { area: 'general', pose: 'walk' }) + (q ? '' : lab(160, 24, 'Zona de seguridad: el frontis', '#2E7D32', 10))));
  D('carga', q => { const mal = W(60, 165, { area: 'escrituras', pose: 'bend', face: 'pain' }) + cajaL(84, 165, 36, 28) + lab(78, 190, 'Espalda doblada', '#C62828', 9);
    const bien = GG('n_in_pu', W(230, 165, { area: 'escrituras', pose: 'squat' }) + cajaL(236, 165, 36, 28)) + lab(250, 190, 'Rodillas flectadas', '#2E7D32', 9);
    return sv2(H.fondo.oficina() + mal + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + bien + badge(130, 30, false, 13) + badge(296, 30, true, 13) + (q ? '' : lab(160, 100, 'Máx. 25 kg', C1, 10))); });
  D('tmert', q => sv2(H.fondo.oficina() + escr(20, 150) + pc(80) + W(60, 165, { area: 'admin', pose: 'bend', face: 'pain', hair: true }) + GG('n_in_bl', `<circle cx="84" cy="112" r="7" fill="#E53935" opacity=".55"/>`) + clock(250, 60, 24) + (q ? '' : lab(250, 100, 'Pausa cada hora', '#2E7D32', 10) + lab(110, 26, 'Cuello y muñecas', '#C62828', 10))));
  D('karin', q => sv2(H.fondo.recepcion() + meson(40, 110) + pc(80, 122) + W(190, 176, { area: 'general', flip: true, face: 'worried', pose: 'stop', shirt: '#C62828' }) + W(60, 160, { area: 'atencion', hair: true, face: 'worried' }) + `<path d="M250,40 l22,8 v18 q0,18 -22,28 q-22,-10 -22,-28 v-18 z" fill="#2E7D32" stroke="#1B5E20" stroke-width="1.5"/><path d="M240,64 l7,7 l13,-14" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>` + (q ? '' : lab(250, 112, 'Ley Karin', C1) + bubble(150, 30, '¡Esto es inaceptable!', 130))));
  D('psico', q => sv2(H.fondo.recepcion() + meson(20, 110) + pc(60, 122) + W(40, 160, { area: 'atencion', hair: true, face: 'worried' }) + [170, 205, 240, 275].map((x, i) => W(x, 176, { area: 'general', flip: true, shirt: ['#C62828', '#6A1B9A', '#2E7D32', '#EF6C00'][i] })).join('') + clock(150, 50, 22) + (q ? '' : lab(220, 60, 'Mucho trabajo y plazos', '#6A1B9A', 10))));
  D('caidas', q => sv2(H.fondo.pasillo() + escalera(10, 165) + H.charco(190, 180, 34) + (q ? '' : H.letreroMojado(250, 180)) + W(150, 176, { area: 'admin', hair: true, face: q ? 'worried' : undefined }) + (q ? '' : lab(190, 24, 'Pasamanos y piso seco', C1, 10))));
  D('electrico', q => sv2(H.fondo.oficina() + `<rect x="120" y="60" width="80" height="70" fill="#ECEFF1" stroke="#90A4AE"/><rect x="150" y="96" width="20" height="26" fill="#CFD8DC" stroke="#78909C"/>` + enchufeM(112, 124, true) + [0, 1, 2, 3, 4].map(i => `<path d="M${122 + i * 15},${138} q4,22 ${i * 8 - 16},${40}" stroke="#263238" stroke-width="2.5" fill="none"/>`).join('') + GG('n_in_bl', `<path d="M200,112 l-10,14 h8 l-6,14 l16,-18 h-8 l6,-10z" fill="#FFC20E" stroke="#C79200"/>`) + W(40, 178, { area: 'admin', hair: true, face: 'worried' }) + (q ? '' : lab(160, 32, 'Un enchufe, muchos equipos', '#C62828', 10))));
  D('incendio', q => sv2(H.fondo.oficina() + escr(20, 120) + `<rect x="60" y="96" width="30" height="29" fill="#fff" stroke="#90A4AE"/>` + resma(96, 125, 26) + resma(96, 116, 26) + `<g><rect x="168" y="138" width="30" height="27" rx="3" fill="#EF6C00" stroke="#BF360C"/>${[0, 1, 2].map(i => `<line x1="${174 + i * 9}" y1="142" x2="${174 + i * 9}" y2="160" stroke="#BF360C"/>`).join('')}</g>` + GG('n_in_bl', `<path d="M183,136 q-8,-14 0,-24 q4,10 10,4 q4,10 -2,20z" fill="#FF7043"/>`) + H.extintor(250, 165, 'PQS', 1) + (q ? '' : lab(150, 40, 'Papel lejos del calor', '#C62828', 10) + H.ok(226, 124, true, 11))));
  D('trayecto', q => sv2(H.fondo.jardin() + fachada(190, 150, 120) + `<rect x="0" y="150" width="320" height="22" fill="#9E9E9E"/>` + [0, 1, 2, 3].map(i => `<rect x="${24 + i * 40}" y="159" width="22" height="4" fill="#fff"/>`).join('') + `<rect x="0" y="172" width="320" height="28" fill="#7CB342"/>` + [100, 112, 124, 136].map(x => `<rect x="${x}" y="150" width="8" height="22" fill="#fff" opacity=".9"/>`).join('') + W(120, 190, { area: 'general', pose: 'walk', hair: true }) + (q ? '' : lab(118, 134, 'Cruce peatonal', '#2E7D32', 10))));
  D('puesto', q => { const R = [['Computador y pausas', '#1565C0'], ['Atención de público', '#6A1B9A'], ['Cargas livianas', '#EF6C00'], ['Caja y dinero', '#2E7D32']]; return sv2(H.fondo.oficina() + R.map(([t, c], i) => (q ? `<rect x="40" y="${24 + i * 32}" width="240" height="24" rx="12" fill="${c}"/>` : lab(160, 36 + i * 32, t, c, 12))).join('') + W(40, 184, { area: 'atencion', hair: true, s: .8 }) + W(280, 184, { area: 'escrituras', s: .8, flip: true })); });
  D('pts', q => { const cols = [C1, '#C62828', '#2E7D32', '#EF6C00']; const nom = ['Plan de emergencia', 'Reglamento (RIOHS)', 'Uso del computador', 'Atención de público']; return sv2(H.fondo.oficina() + nom.map((n, i) => `<rect x="${24 + (i % 2) * 140}" y="${22 + Math.floor(i / 2) * 60}" width="128" height="48" rx="4" fill="#fff" stroke="${cols[i]}" stroke-width="3"/><rect x="${24 + (i % 2) * 140}" y="${22 + Math.floor(i / 2) * 60}" width="128" height="14" fill="${cols[i]}"/>` + (q ? '' : TT(88 + (i % 2) * 140, 55 + Math.floor(i / 2) * 60, n, 9.5, cols[i]))).join('') + W(160, 186, { area: 'admin', pose: 'point', hair: true, s: .85 })); });
  // tarjetas de las actividades
  const c = (n, f) => { S['n_in_c_' + n] = () => sv2(f()); };
  c('cajas', () => H.fondo.oficina() + cajaL(130, 165, 40, 28) + cajaL(170, 165, 40, 28) + W(80, 176, { area: 'escrituras', pose: 'walk', face: 'worried' }) + puertaSalida(240));
  c('cable', () => H.fondo.oficina() + cable(30, 172, 240) + W(150, 176, { area: 'admin', pose: 'walk', face: 'worried' }) + escr(250, 60));
  c('mojado', () => H.fondo.pasillo() + H.charco(160, 182, 40) + H.letreroMojado(110, 182) + W(220, 176, { area: 'admin', hair: true }));
  c('salida', () => H.fondo.pasillo() + puertaSalida(120) + W(60, 176, { area: 'admin', hair: true }) + W(240, 176, { area: 'atencion', flip: true }));
  c('residuos', () => H.fondo.oficina() + `<path d="M170,128 h34 l-4,37 h-26z" fill="#43A047" stroke="#263238"/>` + `<path d="M210,128 h34 l-4,37 h-26z" fill="#1E88E5" stroke="#263238"/>` + W(110, 176, { area: 'admin', hair: true, pose: 'carry' }));
  c('manos', () => H.fondo.bano() + `<rect x="150" y="116" width="46" height="10" rx="4" fill="#ECEFF1" stroke="#90A4AE" stroke-width="1.5"/>` + W(120, 176, { area: 'admin', hair: true, pose: 'carry' }));
  c('rodillas', () => H.fondo.oficina() + W(100, 176, { area: 'escrituras', pose: 'squat' }) + cajaL(108, 176, 36, 26));
  c('espalda', () => H.fondo.oficina() + W(100, 176, { area: 'escrituras', pose: 'bend', face: 'pain' }) + cajaL(124, 176, 36, 26));
  c('silla', () => H.fondo.oficina() + `<rect x="120" y="150" width="30" height="5" fill="#455A64"/><rect x="132" y="155" width="5" height="10" fill="#607D8B"/>` + W(135, 150, { area: 'admin', hair: true, pose: 'stop', face: 'worried' }) + `<rect x="120" y="2" width="48" height="7" rx="3" fill="#9E9E9E"/>`);
  c('escala', () => H.fondo.oficina() + H.escala(120, 165, 100) + W(138, 118, { area: 'admin', pose: 'stop' }));
  c('enchufes', () => H.fondo.oficina() + enchufeM(120, 124, true) + [0, 1, 2, 3, 4].map(i => `<path d="M${130 + i * 15},138 q4,22 ${i * 6 - 12},38" stroke="#263238" stroke-width="2.5" fill="none"/>`).join('') + W(240, 176, { area: 'admin', hair: true, flip: true, face: 'worried' }));
  c('apagar', () => H.fondo.oficina() + escr(30, 110) + pc(70) + W(150, 176, { area: 'admin', hair: true, pose: 'point' }));
  c('pausa', () => H.fondo.oficina() + escr(20, 120) + pc(60) + W(170, 176, { area: 'admin', hair: true, pose: 'stop' }) + clock(260, 50, 22));
  c('pantalla', () => H.fondo.oficina() + escr(20, 140) + pc(70, 125) + W(60, 165, { area: 'admin', hair: true, pose: 'bend', face: 'pain' }));
  c('apoyo', () => H.fondo.recepcion() + meson(30, 110) + W(70, 160, { area: 'atencion', hair: true, face: 'worried' }) + W(190, 176, { area: 'general', flip: true, face: 'worried', pose: 'stop', shirt: '#C62828' }) + W(270, 176, { area: 'admin', flip: true, pose: 'point' }));
  c('gritar', () => H.fondo.recepcion() + meson(30, 110) + W(70, 160, { area: 'atencion', hair: true, face: 'worried' }) + W(190, 176, { area: 'general', flip: true, face: 'worried', pose: 'stop', shirt: '#C62828' }) + bubble(230, 60, '¡¡¡!!!', 70));
  c('espacio', () => H.fondo.pasillo() + W(70, 176, { area: 'atencion', hair: true }) + W(250, 176, { area: 'general', flip: true }) + H.extintor(150, 165, 'PQS', 1));
  c('tapar', () => H.fondo.pasillo() + H.extintor(110, 165, 'PQS', 1) + cajaL(90, 165, 40, 30) + cajaL(94, 135, 34, 24));

  // ===================== LÁMINAS =====================
  const PUESTO_X = 'La empresa debe informarte los <b>riesgos de tu puesto</b>, sus <b>consecuencias</b> y las <b>medidas</b> para controlarlos. Lo hace al ingresar y cada vez que cambie tu puesto o tus tareas. Los principales en la notaría:<ul>'
    + Object.keys(window.SI_IND_PUESTO).map(k => window.SI_IND_PUESTO[k]).join('') + window.SI_IND_TRANSV.notaria + '</ul>';
  const learn = [
    { s: 'n_in_empresa', t: 'Le damos la bienvenida a la Primera Notaría de Los Ángeles', x: 'La Primera Notaría de Los Ángeles atiende público todos los días en <b>Lautaro 325</b>. Es una oficina de <b>dos niveles</b>, con sectores de <b>atención de público y mesón</b>, <b>caja</b>, <b>escrituras y copias</b>, <b>archivo</b> y <b>administración</b>.<ul><li>Aquí se trabaja con documentos, computadores y mucho público.</li><li>Cuando trabaja seguro, también cuida a las personas que nos visitan.</li></ul>' },
    { s: 'n_in_requisitos', t: 'Lo que todo trabajador debe cumplir', x: 'Desde que entra a la notaría y mientras esté en ella:<ul><li>Mantenga el <b>orden y la limpieza</b> en su puesto y en las áreas que use.</li><li>Use el <b>EPP</b> que corresponda a su tarea.</li><li>Respete la señalización y <b>no tape</b> pasillos, escaleras, salidas ni extintores.</li><li>Deje los <b>residuos</b> en los lugares habilitados.</li><li>Lávese las manos después de tocar basura o productos de aseo y antes de comer.</li></ul>No cumplir es una <b>falta grave</b> a la seguridad y a la normativa interna.' },
    { s: 'n_in_orden', t: 'Orden y limpieza, sin excepciones', x: 'El desorden provoca <b>golpes y tropiezos</b>.<ul><li>No deje cajas de libros ni resmas en pasillos, escaleras o frente a la salida.</li><li>Cables ordenados y <b>fuera del paso</b>.</li><li>Lo pesado, <b>abajo</b> y estable; nada en el borde de una repisa.</li><li>Cada archivador y libro tiene su <b>lugar definido</b>.</li></ul>' },
    { s: 'n_in_equipos', t: 'Computadores y equipos de oficina', x: 'En la notaría se usan <b>computadores, impresoras, fotocopiadora, escáner</b> y otros equipos de oficina.<ul><li>Use solo los equipos que le <b>enseñaron</b> a usar.</li><li>Si un equipo falla, hace ruido raro o huele a quemado, <b>no lo use</b> y avise.</li><li>Nunca meta la mano en una fotocopiadora o impresora enchufada.</li></ul>' },
    { s: 'n_in_ambiente', t: 'Luz, ventilación, temperatura y ruido', x: 'Cada puesto debe tener buenas condiciones:<ul><li><b>Iluminación</b> suficiente: una luz apagada o que parpadea se avisa.</li><li><b>Ventilación</b> adecuada.</li><li><b>Temperatura</b> confortable, entre <b>18 y 26 grados</b>.</li><li><b>Ruido</b> bajo: avise si una impresora o equipo hace ruido excesivo.</li></ul>' },
    { s: 'n_in_ley', t: 'Ley 16.744: usted está protegido', x: 'La <b>Ley 16.744</b> protege a todos los trabajadores de la notaría contra los <b>accidentes del trabajo</b>, los <b>accidentes de trayecto</b> (de la casa al trabajo y de vuelta) y las <b>enfermedades profesionales</b>.<ul><li>Incluye atención médica, rehabilitación y prestaciones en dinero.</li><li>Nuestro organismo administrador es la <b>ACHS</b>.</li></ul>' },
    { s: 'n_in_accidente', t: 'Si tiene un accidente del trabajo o de trayecto', x: '<ol><li>Avise <b>de inmediato</b> a su jefatura, aunque parezca leve.</li><li>La jefatura lo deriva a la <b>ACHS</b>.</li><li>Si es una emergencia, llame al <b>1404</b> de la ACHS, las 24 horas.</li></ol>Otros números: <b>131</b> SAMU, <b>132</b> Bomberos y <b>133</b> Carabineros.', k: 'ACHS 1404: emergencias las 24 horas.' },
    { s: 'n_in_grave', t: 'Accidente grave o fatal', x: 'Es <b>grave</b> el accidente que, por ejemplo, ocurre por una <b>caída de más de 1,8 metros</b>, obliga a maniobras de reanimación o de rescate, o produce una amputación.<ul><li>Se <b>paraliza el trabajo</b> en el área y se delimita el lugar.</li><li>Se avisa de inmediato a la jefatura y a la ACHS.</li><li>No se mueve nada del lugar hasta que se indique.</li></ul>' },
    { s: 'n_in_politica', t: 'Política de Seguridad y Salud en el Trabajo', x: 'La notaría se compromete a <b>cuidar la vida y la salud</b> de su equipo y de las personas que la visitan. A usted le corresponde <b>cumplir las normas</b>, usar el EPP, avisar los peligros y participar en las capacitaciones. La seguridad es tarea de todos.' },
    { s: 'n_in_epp', t: 'Sus EPP: úselos y cuídelos', x: 'En una oficina se usan pocos EPP, pero hay que usarlos <b>cuando corresponde</b>:<ul><li><b>Mascarilla y guantes</b> al revisar el archivo antiguo o con mucho polvo.</li><li><b>Calzado cerrado</b> y estable para circular por las escaleras.</li><li>Lentes si usa productos de aseo en aerosol.</li></ul>Si un EPP está dañado, avise para reponerlo.' },
    { s: 'n_in_extintor', t: 'Extintores y red húmeda', x: 'La notaría cuenta con <b>2 extintores de polvo químico seco (PQS) de 6 kg</b> y una <b>red húmeda</b>. Manténgalos siempre <b>despejados</b>.<ol><li><b>Tire</b> el seguro.</li><li><b>Apunte</b> a la base del fuego.</li><li><b>Apriete</b> la manilla.</li><li><b>Barra</b> de lado a lado.</li></ol>Si el fuego es grande, <b>no lo apague</b>: evacue y llame a Bomberos, al <b>132</b>.' },
    { s: 'n_in_senal', t: 'Señalización, evacuación y zona de seguridad', x: '<ul><li>Conozca la <b>vía de evacuación</b> de su nivel y la salida más cercana.</li><li>Ante una emergencia, <b>no corra</b>, no use ascensores y siga las indicaciones.</li><li>La <b>zona de seguridad</b> está en el <b>frontis</b> de la notaría.</li><li>No tape las señales ni los accesos.</li></ul>' },
    { s: 'n_in_carga', t: 'Manejo manual de carga (Ley 20.949)', x: 'En la notaría se mueven <b>libros, protocolos, archivadores y resmas de papel</b>. Es carga liviana, pero mal movida igual daña la espalda.<ul><li>Máximo <b>25 kg</b> por persona. Mujeres y menores de 18 años, máximo <b>20 kg</b>. Embarazadas no manipulan carga.</li><li><b>Flecte las rodillas</b>, espalda recta y la carga cerca del cuerpo.</li><li>Use un <b>carro</b> o pida ayuda cuando pese o sea grande.</li></ul>' },
    { s: 'n_in_tmert', t: 'Posturas, tareas repetitivas y pausas (TMERT)', x: 'Trabajar muchas horas con computador y con las manos puede causar dolor de <b>cuello, espalda, hombros y muñecas</b>.<ul><li>Pantalla a la altura de los ojos y silla ajustada.</li><li>Muñecas rectas al teclear o usar el mouse.</li><li>Una <b>pausa activa cada hora</b>: levántese, estire y camine.</li></ul>Si algo le duele o le hormiguea, avise.' },
    { s: 'n_in_karin', t: 'Ley Karin: buen trato, sin acoso ni violencia', x: 'La <b>Ley Karin</b> protege a todos contra el <b>acoso laboral, el acoso sexual y la violencia en el trabajo</b>, incluida la que viene de personas externas, como clientes.<ul><li>Ante un cliente molesto, mantenga la calma y un trato formal.</li><li>Si la situación sube de tono, <b>retírese y pida apoyo</b> a la jefatura.</li><li>Denuncie cualquier conducta que le incomode: hay un protocolo y se resguarda su confidencialidad.</li></ul>' },
    { s: 'n_in_psico', t: 'Riesgos psicosociales (CEAL-SM)', x: 'La carga de trabajo, los plazos, el trato con el público y la relación con los compañeros también afectan la salud.<ul><li>Si el trabajo se acumula, <b>converse con su jefatura</b>.</li><li>Todos participamos en la evaluación <b>CEAL-SM</b>, que mide estos riesgos para mejorarlos.</li><li>Pedir ayuda a tiempo es parte del trabajo seguro.</li></ul>' },
    { s: 'n_in_caidas', t: 'Caídas: escaleras, pisos y cables', x: 'Hay <b>escaleras entre los dos niveles</b> y pisos que se mojan.<ul><li>Use siempre el <b>pasamanos</b> y no suba corriendo ni con las manos ocupadas.</li><li>Piso mojado: <b>letrero</b> y séquelo.</li><li>Cables recogidos y nada en el suelo que haga tropezar.</li><li>Para llegar a lo alto, use una <b>escala firme</b>, nunca una silla.</li></ul>' },
    { s: 'n_in_electrico', t: 'Riesgo eléctrico', x: '<ul><li>No sobrecargue los <b>enchufes múltiples</b>: un enchufe, pocos equipos.</li><li>Cable pelado, enchufe quemado o que calienta: <b>no lo use</b> y avise.</li><li>No toque un equipo con las manos mojadas.</li><li>Desenchufe los equipos al terminar la jornada.</li></ul>' },
    { s: 'n_in_incendio', t: 'Prevención de incendios', x: 'En una oficina el papel <b>se quema con facilidad</b>.<ul><li>Mantenga el papel y los cartones <b>lejos de estufas y enchufes</b>.</li><li>No fume dentro de la notaría.</li><li>Nada frente a los extintores, la red húmeda ni las salidas.</li><li>Si ve humo o fuego, <b>de la alarma, evacue</b> y llame al <b>132</b>.</li></ul>' },
    { s: 'n_in_trayecto', t: 'Accidente de trayecto', x: 'Es el que ocurre en el <b>camino directo</b> entre su casa y el trabajo, de ida o de vuelta.<ul><li>Cruce por el cruce peatonal y mire a ambos lados.</li><li>No use el celular al caminar por la calle ni al conducir.</li><li>En bicicleta, con casco y luces.</li><li>Si le pasa algo, avise y pida el parte o los datos del accidente.</li></ul>' },
    { s: 'n_in_puesto', t: 'Los riesgos de su puesto (IRL)', x: PUESTO_X },
    { s: 'n_in_pts', t: 'Procedimientos y Reglamento Interno', x: 'Conozca y cumpla:<ul><li>El <b>Plan de emergencia</b> de la notaría.</li><li>El <b>Reglamento Interno de Orden, Higiene y Seguridad (RIOHS)</b>.</li><li>Las instrucciones de su jefatura para el uso del computador y la atención de público.</li></ul>Ante cualquier duda, pregunte antes de actuar.' }
  ];

  // ===================== EVALUACIÓN =====================
  const quiz = [
    { s: 'n_in_ley_q', v: [
      { q: '¿Qué cubre el seguro de la Ley 16.744?', o: ['Accidentes del trabajo, de trayecto y enfermedades profesionales', 'Solo los accidentes graves', 'Solo las enfermedades comunes', 'Solo los accidentes dentro de la oficina'], w: 'La Ley 16.744 cubre accidentes del trabajo, de trayecto y enfermedades profesionales.' },
      { q: '¿Qué entrega el seguro a quien se accidenta en el trabajo?', o: ['Atención médica, rehabilitación y prestaciones económicas', 'Solo un bono en dinero', 'Solo la primera consulta', 'Solo los remedios'], w: 'Incluye atención médica, rehabilitación y prestaciones económicas.' },
      { q: 'Todos los trabajadores de la notaría están protegidos por la Ley 16.744, sin importar su cargo.', vf: true, w: 'Verdadero. Todos están cubiertos.' }] },
    { s: 'n_in_accidente_q', v: [
      { q: 'Se corta con papel y parece leve. ¿Qué hace?', o: ['Aviso de inmediato a mi jefatura', 'Me pongo una curita y sigo', 'Aviso al final del turno', 'Lo cuento solo si empeora'], w: 'Todo accidente, aunque parezca leve, se avisa de inmediato.' },
      { q: '¿Cuál es el número de emergencias de la ACHS, las 24 horas?', o: ['1404', '131', '132', '133'], w: 'ACHS: 1404. El 131 es SAMU, el 132 Bomberos y el 133 Carabineros.' },
      { q: 'Si tiene un accidente del trabajo, se atiende en la ACHS, nuestra mutualidad.', vf: true, w: 'Verdadero. La jefatura lo deriva a la ACHS.' }] },
    { s: 'n_in_grave_q', v: [
      { q: '¿Cuál de estos es un accidente grave?', o: ['Una caída de más de 1,8 metros de altura', 'Un corte pequeño con papel', 'Un golpe leve en el brazo', 'Un tropiezo sin lesión'], w: 'Una caída de más de 1,8 metros se considera accidente grave.' },
      { q: 'Ocurre un accidente grave en la notaría. ¿Qué se hace en el lugar?', o: ['Se paraliza el trabajo y se delimita el área', 'Se sigue trabajando con cuidado', 'Se ordena el lugar de inmediato', 'Se mueve todo para limpiar'], w: 'Se paraliza el trabajo en el área y se delimita, sin alterar el lugar.' },
      { q: 'Es accidente grave el que obliga a hacer maniobras de rescate o de reanimación.', vf: true, w: 'Verdadero. También la amputación y la caída de más de 1,8 metros.' }] },
    { s: 'n_in_politica_q', v: [
      { q: '¿Qué le corresponde a usted según la Política de Seguridad y Salud en el Trabajo?', o: ['Cumplir las normas, avisar los peligros y participar en las capacitaciones', 'Nada: es solo tarea de la jefatura', 'Solo usar el EPP cuando lo supervisan', 'Solo asistir al comité'], w: 'La seguridad es tarea de todos.' },
      { q: 'La seguridad en la notaría es responsabilidad solo de la jefatura.', vf: false, w: 'Falso. Es responsabilidad de todo el equipo.' },
      { q: 'Ve un peligro en su puesto. ¿Qué hace?', o: ['Lo aviso a mi jefatura', 'Lo ignoro', 'Espero que alguien más lo vea', 'Lo comento después de un accidente'], w: 'Avisar los peligros a tiempo evita accidentes.' }] },
    { s: 'n_in_epp_q', v: [
      { q: 'Va a revisar el archivo antiguo, con mucho polvo. ¿Qué usa?', o: ['Mascarilla y guantes', 'Nada, es solo papel', 'Solo lentes de sol', 'Un pañuelo mojado'], w: 'El polvo del archivo se respira: mascarilla y guantes.' },
      { q: 'Su guante está roto. ¿Qué hace?', o: ['Aviso para que lo repongan', 'Lo uso igual', 'Lo remiendo con cinta', 'Trabajo sin guantes sin avisar'], w: 'Un EPP dañado no protege: se avisa para reponerlo.' },
      { q: 'El calzado cerrado y estable ayuda a evitar caídas en las escaleras.', vf: true, w: 'Verdadero.' }] },
    { s: 'n_in_extintor_q', v: [
      { q: '¿Qué extintores hay en la notaría?', o: ['2 extintores PQS de 6 kg y una red húmeda', 'Solo una red húmeda', 'Ninguno', 'Solo extintores de agua'], w: 'Hay 2 extintores de polvo químico seco (PQS) de 6 kg y una red húmeda.' },
      { q: '¿Qué significa la P de la técnica de uso del extintor?', o: ['Tirar el seguro', 'Pasar corriendo', 'Probar a distancia', 'Pedir ayuda'], w: 'Tirar, apuntar a la base, apretar y barrer.' },
      { q: 'Si el fuego es grande, usted debe evacuar y llamar a Bomberos.', vf: true, w: 'Verdadero. Bomberos: 132.' }] },
    { s: 'n_in_senal_q', v: [
      { q: 'Suena la alarma de evacuación. ¿A dónde va?', o: ['A la zona de seguridad, en el frontis', 'Al segundo nivel', 'A mi escritorio', 'A la bodega'], w: 'La zona de seguridad está en el frontis de la notaría.' },
      { q: 'Durante una evacuación, ¿qué debe hacer?', o: ['Caminar sin correr y seguir las indicaciones', 'Correr por las escaleras', 'Usar el ascensor', 'Volver a buscar mis cosas'], w: 'Se evacúa con calma, sin correr y sin volver atrás.' },
      { q: 'Está permitido dejar cajas frente a una salida si es por poco rato.', vf: false, w: 'Falso. Las salidas siempre van despejadas.' }] },
    { s: 'n_in_carga_q', v: [
      { q: '¿Cómo se levanta una caja con libros?', o: ['Flectando las rodillas y con la espalda recta', 'Con la espalda doblada y las piernas rectas', 'Girando el tronco con la caja', 'Con los brazos estirados'], w: 'Rodillas flectadas, espalda recta y la carga cerca del cuerpo.' },
      { q: '¿Cuál es el máximo de carga para un trabajador adulto, según la Ley 20.949?', o: ['25 kg', '50 kg', '40 kg', '60 kg'], w: 'El máximo es 25 kg. Mujeres y menores de 18 años, 20 kg.' },
      { q: 'La carga es grande y pesada. ¿Qué hace?', o: ['Uso un carro o pido ayuda', 'La levanto rápido', 'La arrastro por el piso', 'La subo en una silla'], w: 'Con carga pesada se usa el carro o se pide ayuda.' }] },
    { s: 'n_in_tmert_q', v: [
      { q: '¿Cada cuánto conviene hacer una pausa activa?', o: ['Al menos una vez cada hora', 'Una vez al día', 'Solo al terminar el turno', 'Cuando ya duele la espalda'], w: 'Cada hora: levántese, estire y camine un poco.' },
      { q: '¿Dónde debe quedar el borde superior de la pantalla?', o: ['A la altura de los ojos o un poco más abajo', 'Muy abajo, a la altura del pecho', 'Sobre la cabeza', 'Al costado, girada'], w: 'Así mira de frente, sin agachar la cabeza.' },
      { q: 'Siente hormigueo en la mano después de horas de mouse. ¿Qué hace?', o: ['Corrijo la postura, hago pausas y aviso si sigue', 'Sigo igual', 'Aprieto más el mouse', 'Escribo con más fuerza'], w: 'Es una señal de alerta: se corrige y se avisa.' }] },
    { s: 'n_in_karin_q', v: [
      { q: 'Un cliente le grita y la situación sube de tono. ¿Qué hace?', o: ['Me retiro y pido apoyo a mi jefatura', 'Le grito también', 'Me quedo aguantando todo el tiempo', 'Lo ignoro y sigo'], w: 'Se mantiene la calma, se retira del lugar y se pide apoyo.' },
      { q: 'La Ley Karin protege también de la violencia que viene de clientes.', vf: true, w: 'Verdadero. Incluye la violencia de terceros.' },
      { q: 'Si una conducta le incomoda, ¿qué corresponde?', o: ['Denunciarla: hay un protocolo y se resguarda la confidencialidad', 'Callarme', 'Esperar a que pase sola', 'Resolverlo por mi cuenta'], w: 'Se denuncia por el protocolo.' }] },
    { s: 'n_in_caidas_q', v: [
      { q: 'Baja por la escalera entre los dos niveles. ¿Qué hace?', o: ['Uso el pasamanos y no llevo las manos ocupadas', 'Bajo corriendo', 'Bajo mirando el celular', 'Bajo saltando escalones'], w: 'El pasamanos y las manos libres evitan caídas.' },
      { q: 'Necesita un archivador de una repisa alta. ¿Qué usa?', o: ['Una escala firme', 'Una silla con ruedas', 'Una caja de libros', 'Me estiro en la punta de los pies'], w: 'Nunca una silla: se usa una escala firme.' },
      { q: 'Hay un charco en el pasillo. ¿Qué hace?', o: ['Pongo el letrero y lo seco', 'Paso rápido', 'Lo dejo para después', 'Aviso solo si alguien se cae'], w: 'Se señaliza y se seca.' }] },
    { s: 'n_in_electrico_q', v: [
      { q: 'Un enchufe múltiple tiene muchos equipos y se calienta. ¿Qué hace?', o: ['Lo desenchufo y aviso', 'Sigo trabajando', 'Le pongo más equipos', 'Lo tapo con papel'], w: 'Un enchufe sobrecargado puede incendiarse.' },
      { q: 'Su cable tiene el aislante pelado. ¿Qué hace?', o: ['No lo uso y aviso', 'Lo uso con cuidado', 'Lo envuelvo con cinta y sigo', 'Espero a que falle'], w: 'Un cable dañado puede dar un golpe eléctrico.' },
      { q: 'Se puede tocar un equipo enchufado con las manos mojadas.', vf: false, w: 'Falso. Aumenta el riesgo de electrocución.' }] },
    { s: 'n_in_pts_q', v: [
      { q: '¿Qué documento reúne las normas internas de orden, higiene y seguridad?', o: ['El RIOHS', 'La factura', 'La boleta de honorarios', 'El libro de reclamos'], w: 'El Reglamento Interno de Orden, Higiene y Seguridad (RIOHS).' },
      { q: 'Ante cualquier duda sobre cómo hacer una tarea de forma segura, ¿qué hace?', o: ['Pregunto antes de actuar', 'Hago lo que creo', 'Pruebo hasta que resulte', 'Espero a que me corrijan'], w: 'Se pregunta antes de actuar.' },
      { q: '¿Qué debe informarle la empresa sobre su puesto?', o: ['Sus riesgos, consecuencias y medidas de control', 'Solo el horario', 'Solo el sueldo', 'Solo las sanciones'], w: 'Los riesgos, sus consecuencias y las medidas preventivas.' }] }
  ];
  SI_CONT.temas.push({ id: 'induccion', sec: 'todos', emp: ['notaria'], title: 'Inducción de Prevención de Riesgos (IRL)', thumb: 'n_in_empresa', mins: 40, learn, quiz });

  // ===================== ACTIVIDADES =====================
  window.HT_ACT = (window.HT_ACT || []).concat([
    { tema: 'induccion', tipo: 'tarjetas', q: '🧩 Actividad: orden y seguridad en la oficina. ¿Así sí o así no? Desliza cada tarjeta.', binario: true, cats: ['✅ Así sí', '❌ Así no'], sub: ['', ''],
      items: [['Dejar cajas de libros frente a la salida', 1, 'n_in_c_cajas'], ['Recoger los cables para que no haya tropiezos', 0, 'n_in_c_cable'],
        ['Poner el letrero de piso mojado y secar', 0, 'n_in_c_mojado'], ['Subirse a una silla para alcanzar un archivador alto', 1, 'n_in_c_silla'],
        ['Dejar los extintores y la salida despejados', 0, 'n_in_c_salida'], ['Conectar muchos equipos a un solo enchufe múltiple', 1, 'n_in_c_enchufes']],
      w: 'Así sí: salidas y extintores despejados, cables recogidos, letrero de piso mojado. Así no: tapar salidas, subirse a una silla o sobrecargar un enchufe.' },
    { tema: 'induccion', tipo: 'tarjetas', q: '🧩 Actividad: cuide su cuerpo y trate bien al público. ¿Así sí o así no? Desliza cada tarjeta.', binario: true, cats: ['✅ Así sí', '❌ Así no'], sub: ['', ''],
      items: [['Levantar una caja con las rodillas flectadas', 0, 'n_in_c_rodillas'], ['Levantar una caja con la espalda doblada', 1, 'n_in_c_espalda'],
        ['Hacer una pausa activa cada hora', 0, 'n_in_c_pausa'], ['Trabajar con la pantalla muy baja, agachando el cuello', 1, 'n_in_c_pantalla'],
        ['Pedir apoyo a la jefatura ante un cliente agresivo', 0, 'n_in_c_apoyo'], ['Responderle a gritos a un cliente molesto', 1, 'n_in_c_gritar']],
      w: 'Así sí: rodillas flectadas, pausas cada hora, pantalla a la altura de los ojos y pedir apoyo ante la agresión. Así no: espalda doblada, cuello agachado o responder a gritos.' }
  ]);
})();

(function () {
  const H = window.HD, T = H.T, OL = '#22303A', FL = 165, MT = 120;
  // ---------- animaciones (clases propias) ----------
  const ST = '<style>'
    + '.h_co_fl{animation:hCoFl .45s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}@keyframes hCoFl{from{transform:scaleY(.78)}to{transform:scaleY(1.15)}}'
    + '.h_co_st{animation:hCoSt 2.4s ease-out infinite;transform-box:fill-box;transform-origin:50% 100%}.h_co_st2{animation-delay:1.2s}@keyframes hCoSt{0%{opacity:0;transform:translateY(4px)}35%{opacity:.9}100%{opacity:0;transform:translateY(-16px)}}'
    + '.h_co_bl{animation:hCoBl 1.1s steps(2) infinite}@keyframes hCoBl{50%{opacity:.2}}'
    + '.h_co_sp{animation:hCoSp .7s linear infinite;transform-box:fill-box;transform-origin:50% 50%}@keyframes hCoSp{to{transform:rotate(360deg)}}'
    + '.h_co_mv{animation:hCoMv 1.3s ease-in-out infinite alternate}@keyframes hCoMv{from{transform:translateX(-4px)}to{transform:translateX(5px)}}'
    + '.h_co_up{animation:hCoUp 1.3s ease-in-out infinite alternate}@keyframes hCoUp{from{transform:translateY(-6px)}to{transform:translateY(4px)}}'
    + '.h_co_fall{animation:hCoFall 1.8s ease-in infinite}@keyframes hCoFall{0%,15%{transform:translateY(0);opacity:1}70%{transform:translateY(36px);opacity:1}100%{transform:translateY(36px);opacity:0}}'
    + '.h_co_dr{animation:hCoDr .8s linear infinite}@keyframes hCoDr{from{stroke-dashoffset:0}to{stroke-dashoffset:-16}}'
    + '.h_co_bub{animation:hCoBub 1.1s ease-in infinite;transform-box:fill-box}@keyframes hCoBub{0%{opacity:0;transform:translateY(3px)}50%{opacity:1}100%{opacity:0;transform:translateY(-4px)}}'
    + '.h_co_sn{animation:hCoSn 3.2s linear infinite}@keyframes hCoSn{0%{transform:translateY(-12px);opacity:0}20%{opacity:1}100%{transform:translateY(40px);opacity:0}}'
    + '.h_co_pu{animation:hCoPu 1.2s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}@keyframes hCoPu{50%{transform:scale(1.18)}}'
    + '.h_co_sh{animation:hCoSh .18s linear infinite alternate}@keyframes hCoSh{from{transform:translateX(-1.5px)}to{transform:translateX(1.5px)}}'
    + '.h_re_lz{animation:hReLz 2.6s ease-in-out infinite alternate;transform-box:view-box}@keyframes hReLz{from{transform:rotate(-9deg)}to{transform:rotate(7deg)}}'
    + '.h_re_ga{animation:hReGa 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}@keyframes hReGa{0%,100%{opacity:.35}50%{opacity:1}}'
    + '</style>';
  const Z = (fondo, inner) => sv(ST + fondo + inner);
  const C = o => Object.assign({ area: 'cocina' }, o || {});
  const pill = (x, y, s, c = '#1565C0', fs = 11) => H.pill(x, y, s, c, fs);
  const arr = (x1, y1, x2, y2, c = '#2E7D32', w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 8; return `<line x1="${x1}" y1="${y1}" x2="${(x2 - Math.cos(a) * 5).toFixed(1)}" y2="${(y2 - Math.sin(a) * 5).toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2},${y2} L${(x2 - h * Math.cos(a - .5)).toFixed(1)},${(y2 - h * Math.sin(a - .5)).toFixed(1)} L${(x2 - h * Math.cos(a + .5)).toFixed(1)},${(y2 - h * Math.sin(a + .5)).toFixed(1)}Z" fill="${c}"/>`; };
  const linea = (x1, y1, x2, y2, c = '#1565C0') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2"/>`;
  const aro = (x, y, r = 14, c = '#D7262B') => `<circle class="h_co_bl" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="3"/>`;
  const prohibido = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#D7262B" stroke-width="3"/><line x1="${x - r * .7}" y1="${y - r * .7}" x2="${x + r * .7}" y2="${y + r * .7}" stroke="#D7262B" stroke-width="3"/>`;
  const vap = (cx, y, k = 1, c = '#CFD8DC') => `<g class="h_co_st"><path d="M${cx - 5 * k},${y} q${-4 * k},${-6 * k} 0,${-11 * k} q${4 * k},${-5 * k} 0,${-10 * k}" stroke="${c}" stroke-width="${2.5 * k}" fill="none" stroke-linecap="round"/></g><g class="h_co_st h_co_st2"><path d="M${cx + 5 * k},${y} q${4 * k},${-6 * k} 0,${-11 * k} q${-4 * k},${-5 * k} 0,${-10 * k}" stroke="${c}" stroke-width="${2.5 * k}" fill="none" stroke-linecap="round"/></g>`;
  const llama = (cx, y, w = 10, c = '#42A5F5', c2) => `<g class="h_co_fl"><path d="M${cx - w / 2},${y} q${w * .1},${-w * .7} ${w / 2},${-w * 1.05} q${w * .4},${w * .35} ${w / 2},${w * 1.05} z" fill="${c}"/>${c2 ? `<path d="M${cx - w / 4},${y} q${w * .05},${-w * .4} ${w / 4},${-w * .6} q${w * .2},${w * .2} ${w / 4},${w * .6} z" fill="${c2}"/>` : ''}</g>`;
  const fuego = (cx, y, w = 40) => `<g class="h_co_fl"><path d="M${cx - w / 2},${y} q${-w * .05},${-w * .5} ${w * .15},${-w * .8} q${w * .02},${w * .3} ${w * .15},${w * .3} q${-w * .05},${-w * .6} ${w * .25},${-w * 1} q${w * .1},${w * .5} ${w * .22},${w * .6} q${w * .1},${-w * .2} ${w * .05},${-w * .5} q${w * .3},${w * .4} ${w * .18},${w * .9} z" fill="#FF7043"/><path d="M${cx - w / 4},${y} q0,${-w * .35} ${w * .15},${-w * .55} q${w * .05},${w * .25} ${w * .12},${w * .25} q${w * .02},${-w * .3} ${w * .12},${-w * .45} q${w * .15},${w * .35} ${w * .08},${w * .75} z" fill="#FFCA28"/></g>`;
  // mano grande (primeros planos), vista lateral. o.glove = color del guante
  const puno = (x, y, s = 1, c = SK) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-11" y="-9" width="22" height="18" rx="8" fill="${c}" stroke="${OL}" stroke-width="1.2"/><path d="M-6,-9 v18 M0,-9 v18 M6,-9 v18" stroke="${OL}" stroke-width=".7" opacity=".45"/><rect x="-14" y="-6" width="7" height="11" rx="3.5" fill="${c}" stroke="${OL}" stroke-width="1"/></g>`;
  const brazo = (x1, y1, x2, y2, c = '#FFFFFF', w = 16) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${OL}" stroke-width="${w + 2.4}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  const malla = id => `<defs><pattern id="${id}" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.6" fill="none" stroke="#546E7A" stroke-width=".7"/></pattern></defs>`;


  const GA = x => x;
  const HU = (o, i = 0) => Object.assign({ area: 'general', shirt: ['#C62828', '#6A1B9A', '#2E7D32', '#EF6C00'][i % 4], pants: ['#5D4037', '#37474F', '#1A237E', '#455A64'][i % 4] }, o || {});
  const pl = (pts, c, w) => `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${OL}" stroke-width="${w + 2.4}" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  // persona sentada (pies en el piso): cadera en (x, y). Modelo San Ignacio.
  function sitP(x, y, o = {}) {
    const k = o.s || 1, bad = o.bad, shirt = o.shirt || '#90CAF9', pants = o.pants || '#37474F', fx = o.flip ? -1 : 1;
    const P = (a, b) => [+(x + a * k * fx).toFixed(1), +(y + b * k).toFixed(1)];
    const hip = P(0, 0), kn = P(22, 0), ft = o.feetUp ? P(26, 14) : P(24, 22), nk = bad ? P(12, -24) : P(2, -27), hd = bad ? P(20, -31) : P(4, -38);
    const el = o.elbow ? P(o.elbow[0], o.elbow[1]) : (bad ? P(16, -10) : P(5, -12)), hn = o.hand ? P(o.hand[0], o.hand[1]) : (bad ? P(30, -12) : P(22, -12));
    let g = pl([hip, kn, ft], pants, 8 * k) + `<rect x="${ft[0] - (fx > 0 ? 4 : 8) * k}" y="${ft[1] - 3 * k}" width="${12 * k}" height="${5 * k}" rx="${2 * k}" fill="#3E2723"/>`;
    g += pl(bad ? [hip, P(8, -14), nk] : [hip, P(-2, -14), nk], shirt, 14 * k);
    g += pl([nk, el, hn], shirt, 6 * k) + `<circle cx="${hn[0]}" cy="${hn[1]}" r="${3.8 * k}" fill="${SK}" stroke="${OL}" stroke-width="1"/>`;
    g += `<line x1="${nk[0]}" y1="${nk[1]}" x2="${hd[0]}" y2="${hd[1] + 6 * k}" stroke="${SK}" stroke-width="${5 * k}"/><circle cx="${hd[0]}" cy="${hd[1]}" r="${9.5 * k}" fill="${SK}" stroke="${OL}" stroke-width="1.2"/>`;
    if (o.longHair) g += `<path d="M${hd[0] - 8 * k * fx},${hd[1] - 2 * k} q${-5 * k * fx},${14 * k} ${-2 * k * fx},${22 * k}" stroke="${o.hair || '#4E342E'}" stroke-width="${6 * k}" fill="none" stroke-linecap="round"/>`;
    g += `<path d="M${hd[0] - 9.5 * k},${hd[1] - 1 * k} Q${hd[0] - 8 * k * fx},${hd[1] - 12 * k} ${hd[0] + 2 * k * fx},${hd[1] - 10 * k} Q${hd[0] - 2 * k * fx},${hd[1] - 5 * k} ${hd[0] - 9.5 * k * fx},${hd[1] - 1 * k}Z" fill="${o.hair || '#4E342E'}"/>`;
    g += `<circle cx="${hd[0] + 4 * k * fx}" cy="${hd[1] - .5 * k}" r="${1.3 * k}" fill="${OL}"/><path d="M${hd[0] + 3 * k * fx},${hd[1] + 4.5 * k} q${2 * k * fx},${o.face === 'pain' ? -1.5 * k : 1.5 * k} ${4 * k * fx},0" stroke="${OL}" stroke-width="1" fill="none"/>`;
    return g;
  }

// =====================================================================
  // 6. TRABAJO CON COMPUTADOR (recepción, administración y recursos humanos)
  // =====================================================================
  const R = o => Object.assign({ area: 'admin' }, o || {});
  const RSH = '#ECEFF1', RPA = '#263238';
  const desk = (x, top, w) => `<rect x="${x}" y="${top}" width="${w}" height="5" fill="#A1887F" stroke="#6D4C41"/><rect x="${x + w - 10}" y="${top + 5}" width="5" height="${FL - top - 5}" fill="#6D4C41"/><rect x="${x + 30}" y="${top + 5}" width="4" height="${FL - top - 5}" fill="#8D6E63"/>`;
  const chair = (x, y, k = 1, o = {}) => { let g = `<rect x="${x - 10 * k}" y="${y + 3 * k}" width="${28 * k}" height="${5 * k}" rx="2" fill="#37474F"/><rect x="${x + 1 * k}" y="${y + 8 * k}" width="${4 * k}" height="${FL - y - 14 * k}" fill="#607D8B"/><path d="M${x - 14 * k},${FL - 4} H${x + 20 * k}" stroke="#37474F" stroke-width="${3 * k}"/><circle cx="${x - 13 * k}" cy="${FL - 2}" r="${2.5 * k}" fill="#212121"/><circle cx="${x + 19 * k}" cy="${FL - 2}" r="${2.5 * k}" fill="#212121"/>`;
    g += `<path d="M${x - 12 * k},${y + 2 * k} L${x - 16 * k},${y - 32 * k} q0,-4 4,-4 h3 q3,0 3,3 L${x - 6 * k},${y + 2 * k} Z" fill="#455A64"/>`;
    if (o.lumbar) g += `<ellipse cx="${x - 9 * k}" cy="${y - 12 * k}" rx="${4 * k}" ry="${7 * k}" fill="#26A69A"/>`;
    return g; };
  const monitor = (x, deskTop, top, k = 1) => `<rect x="${x - 9 * k}" y="${deskTop - 3}" width="${18 * k}" height="3" fill="#263238"/><rect x="${x - 1.5}" y="${top + 20 * k}" width="3" height="${deskTop - top - 20 * k}" fill="#455A64"/><rect x="${x - 3 * k}" y="${top}" width="${6 * k}" height="${24 * k}" rx="1.5" fill="#263238"/><rect x="${x - 4.5 * k}" y="${top + 2 * k}" width="${2 * k}" height="${20 * k}" fill="#64B5F6"/>`;
  const kb = (x, y, k = 1) => `<rect x="${x}" y="${y - 3 * k}" width="${22 * k}" height="${3 * k}" rx="1" fill="#37474F"/>`;
  function station(hx, k, o = {}) { const hy = FL - (o.feetUp ? 32 : 25) * k, dt = hy - 14 * k, eyeY = hy - 38.5 * k, mtop = o.mtop !== undefined ? o.mtop : eyeY - 1;
    let g = chair(hx, hy, k, o) + desk(hx + 18 * k, dt, (o.dw || 140) * k) + monitor(hx + (o.mx || 56) * k, dt, mtop, k) + kb(hx + 18 * k, dt, k) + `<ellipse cx="${hx + 46 * k}" cy="${dt - 1.5 * k}" rx="${4 * k}" ry="${2 * k}" fill="#37474F"/>`;
    if (o.footrest) g += `<path d="M${hx + 14 * k},${FL} l${4 * k},${-15 * k} h${20 * k} l${4 * k},${15 * k} z" fill="#78909C"/>`;
    g += sitP(hx, hy, Object.assign({ s: k, shirt: o.shirt || '#0E3962', pants: RPA, hand: o.bad ? [28, -13] : [20, -13], elbow: o.bad ? [14, -9] : [4, -12] }, o));
    return g; }
  const eyeLine = (x1, y1, x2, y2, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || '#1565C0'}" stroke-width="2" stroke-dasharray="5 4"/>`;
  const of = () => H.fondo.oficina();

  S.h_re_pvd_puesto = () => Z(of(), station(70, 1.35, { lumbar: true }) + pill(250, 108, 'Postura neutra', '#2E7D32'));
  S.h_re_pvd_pantalla = () => { const k = .95; return Z(of(), station(40, k, { bad: true, mtop: FL - 39 * k, dw: 92 }) + badge(140, 26, false, 13) + divider() + station(196, k, { dw: 92 }) + eyeLine(204, FL - 25 * k - 38.5 * k, 250, FL - 25 * k - 38.5 * k) + badge(300, 26, true, 13)); };
  S.h_re_pvd_distancia = () => { const k = 1.35, hy = FL - 25 * k, ey = hy - 38.5 * k; return Z(of(), station(60, k, { mx: 62 }) + `<path d="M${60 + 10 * k},${ey - 26} h${52 * k} M${60 + 10 * k},${ey - 32} v12 M${60 + 62 * k},${ey - 32} v12" stroke="#1565C0" stroke-width="2.5" fill="none"/>` + pill(60 + 36 * k, ey - 50, '50 a 70 centímetros', '#1565C0', 10) + `<path d="M240,70 l-80,30" stroke="#FFF59D" stroke-width="10" opacity=".5"/>` + pill(264, 100, 'Sin reflejos', '#2E7D32')); };
  S.h_re_pvd_silla = () => { const k = 1.35, hx = 90, hy = FL - 25 * k, ex = hx + 4 * k, ey = hy - 12 * k; return Z(of(), station(hx, k, { lumbar: true }) + `<path d="M${ex},${ey - 12} A12,12 0 0 0 ${ex + 12},${ey}" stroke="#2E7D32" stroke-width="2.5" fill="none"/>` + arr(40, 150, 40, 116, '#1565C0', 2.5) + arr(40, 116, 40, 150, '#1565C0', 2.5) + pill(40, 92, 'Altura', '#1565C0') + pill(150, 20, 'Codos a 90 grados', '#2E7D32') + pill(150, 46, 'Espalda apoyada', '#2E7D32')); };
  S.h_re_pvd_pies = () => { const k = .95; return Z(of(), station(40, k, { feetUp: true, dw: 92 }) + `<path d="M${40 + 18 * k},${FL - 4} h30" stroke="#D7262B" stroke-width="2" stroke-dasharray="4 3"/>` + badge(140, 26, false, 13) + divider() + station(196, k, { feetUp: true, footrest: true, dw: 92 }) + badge(300, 26, true, 13)); };
  S.h_re_pvd_teclado = () => { const mano = (x, y, bent) => `<path d="M${x - 70},${y + 4} L${x},${y + 4}" stroke="#0E3962" stroke-width="16" stroke-linecap="round"/>` + (bent ? `<path d="M${x},${y + 4} L${x + 22},${y - 12} L${x + 40},${y - 8}" stroke="${SK}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` : `<path d="M${x},${y + 4} L${x + 36},${y + 6}" stroke="${SK}" stroke-width="13" stroke-linecap="round" fill="none"/>`);
    return Z(of(), `<rect x="0" y="120" width="320" height="10" fill="#A1887F"/><rect x="66" y="108" width="70" height="12" rx="2" fill="#37474F"/>` + mano(70, 98, true) + badge(140, 26, false, 13) + divider() + `<rect x="230" y="114" width="70" height="6" rx="2" fill="#37474F"/>` + mano(232, 104, false) + `<ellipse cx="302" cy="117" rx="9" ry="4" fill="#37474F"/>` + badge(300, 26, true, 13) + pill(80, 150, 'Muñeca doblada', '#D7262B') + pill(240, 150, 'Muñeca recta', '#2E7D32')); };
  S.h_re_pvd_202020 = () => Z(of(), `<rect x="190" y="20" width="120" height="90" fill="#BBDEFB" stroke="#ECEFF1" stroke-width="5"/>` + H.arbol(250, 106, 70) + clock(54, 60, 30) + pill(54, 100, 'Cada 20 minutos', '#1565C0', 10) + `<g transform="translate(176,64)"><ellipse rx="26" ry="15" fill="#FFFFFF" stroke="#263238" stroke-width="3"/><circle r="9" fill="#5D4037"/><circle r="4" fill="#111"/></g>` + eyeLine(202, 64, 236, 70, '#2E7D32') + pill(176, 100, 'Mira a 6 metros', '#2E7D32', 10) + pill(250, 124, 'Por 20 segundos', '#1565C0', 10));
  S.h_re_pvd_pausas = () => Z(of(), desk(170, 120, 140) + monitor(250, 120, 76) + W(70, 165, R({ pose: 'stop', anim: 'h_co_up' })) + W(130, 165, R({ pose: 'twist', hair: true })) + pill(100, 20, 'Pausa activa cada hora', '#2E7D32'));

  SI_CONT.temas.push({
    id: 'pvd', sec: 'ergo', emp: ['notaria'], title: 'Trabajo con computador: postura, pantalla y pausas', thumb: 'h_re_pvd_puesto', mins: 15,
    learn: [
      { s: 'h_re_pvd_puesto', t: 'Tu puesto con computador', x: 'En la notaría se trabaja muchas horas frente al computador. Eso puede causar <b>dolor de cuello, espalda, hombros y muñecas</b>, y cansancio de la vista. Se previene ajustando tu puesto para trabajar en <b>postura neutra</b>: espalda apoyada, hombros sueltos, codos cerca del cuerpo y pies apoyados. Si algo de tu puesto no se puede ajustar, avísalo a tu jefatura.' },
      { s: 'h_re_pvd_pantalla', t: 'Altura de la pantalla', x: '<ul><li>El <b>borde superior</b> de la pantalla, a la <b>altura de tus ojos</b> o un poco más abajo.</li><li>La pantalla, <b>justo al frente</b>, no girada hacia un lado.</li><li>Si la pantalla está baja, súbela con su ajuste o con un soporte.</li></ul>Una pantalla baja te hace agachar la cabeza todo el día y carga el cuello.' },
      { s: 'h_re_pvd_distancia', t: 'Distancia y reflejos', x: '<ul><li>La pantalla, a unos <b>50 a 70 centímetros</b> de tus ojos: más o menos el largo de tu brazo.</li><li>Ubícala <b>de lado a la ventana</b>, no de frente ni de espalda, para evitar reflejos y encandilamiento.</li><li>Ajusta el brillo y el <b>tamaño de la letra</b> para no tener que acercarte.</li></ul>' },
      { s: 'h_re_pvd_silla', t: 'Silla y espalda', x: '<ul><li>Ajusta la altura de la silla hasta que los <b>codos queden en 90 grados</b>, a la altura del escritorio.</li><li>Antebrazos apoyados y <b>hombros sueltos</b>.</li><li>Siéntate atrás, con la espalda en el respaldo y el <b>apoyo lumbar</b> en la parte baja de la espalda.</li><li>Evita trabajar inclinado hacia la pantalla.</li></ul>Ajusta la silla al llegar, sobre todo si se comparte entre turnos.' },
      { s: 'h_re_pvd_pies', t: 'Pies apoyados', x: 'Los <b>pies van planos en el piso</b>, con las rodillas más o menos en 90 grados.<br>Si al subir la silla los pies quedan colgando, usa un <b>reposapiés</b>. Los pies colgando aprietan los muslos y cansan la espalda. No cruces las piernas por largo rato.' },
      { s: 'h_re_pvd_teclado', t: 'Teclado y mouse', x: '<ul><li>Teclado y mouse <b>cerca</b>, al frente y a la misma altura.</li><li><b>Muñecas rectas</b>, sin doblarlas hacia arriba ni hacia los lados.</li><li>El mouse al lado del teclado, no estirado lejos.</li><li>Teclea suave, sin golpear.</li></ul>Doblar la muñeca por horas puede causar dolor y hormigueo en la mano: si aparece, avísalo.' },
      { s: 'h_re_pvd_202020', t: 'Cuida tu vista: regla 20 20 20', x: 'Cada <b>20 minutos</b>, mira algo que esté a unos <b>6 metros</b> durante <b>20 segundos</b>. Por ejemplo, la calle por la ventana.<br>Frente a la pantalla parpadeamos menos y los ojos se secan y cansan. Parpadea seguido y, si tus ojos se cansan seguido o ves borroso, consúltalo.', k: 'Cada 20 minutos, mira lejos durante 20 segundos.' },
      { s: 'h_re_pvd_pausas', t: 'Pausas activas y trabajo de pie', x: 'Levántate y muévete al menos <b>una vez cada hora</b>: gira suave el cuello y los hombros, estira brazos y muñecas y camina un poco. En el <b>mesón de atención</b>, si atiendes de pie, alterna con sentarte, apoya un pie en alto por momentos y usa calzado cómodo. Las pausas cortas y seguidas previenen mejor que una pausa larga.', k: 'Cada hora, una pausa activa: levántate, estira y camina.' }
    ],
    quiz: [
      { s: 'h_re_pvd_pantalla', v: [
        { q: '¿A qué altura debe quedar el borde superior de la pantalla?', o: ['A la altura de los ojos o un poco más abajo', 'Muy por debajo de la barbilla', 'Bien por encima de la cabeza', 'A la altura del pecho'], w: 'Así miras de frente, sin agachar ni levantar la cabeza.' },
        { q: 'Tu pantalla está baja y pasas el día con la cabeza agachada. ¿Qué haces?', o: ['La subo con su ajuste o con un soporte', 'Me acostumbro con el tiempo', 'Bajo la silla todavía más', 'Giro la pantalla hacia un lado'], w: 'Una pantalla baja carga el cuello: se sube con su ajuste o un soporte.' },
        { q: 'La pantalla debe quedar justo al frente, no girada hacia un lado.', vf: true, w: 'Verdadero. Con la pantalla de lado trabajas con el cuello girado.' } ] },
      { s: 'h_re_pvd_distancia', v: [
        { q: '¿A qué distancia de los ojos debe quedar la pantalla?', o: ['A unos 50 a 70 centímetros, el largo del brazo', 'A unos 10 centímetros', 'A más de 2 metros', 'Pegada a la cara para ver mejor'], w: 'Más o menos el largo de tu brazo.' },
        { q: 'La luz de la ventana se refleja en tu pantalla. ¿Qué haces?', o: ['Ubico la pantalla de lado a la ventana', 'Pongo la pantalla de frente a la ventana', 'Subo el brillo al máximo y sigo igual', 'Me acerco más a la pantalla'], w: 'De lado a la ventana se evitan los reflejos y el encandilamiento.' },
        { q: 'Si la letra se ve muy chica, ¿qué conviene?', o: ['Aumentar el tamaño de la letra en la pantalla', 'Acercar la cara a la pantalla', 'Entrecerrar los ojos', 'Bajar el brillo'], w: 'Agrandar la letra evita que te inclines hacia la pantalla.' } ] },
      { s: 'h_re_pvd_silla', v: [
        { q: '¿Cómo deben quedar los codos al escribir?', o: ['En 90 grados, cerca del cuerpo y a la altura del escritorio', 'Estirados hacia adelante', 'Levantados por sobre el escritorio', 'Colgando bajo el escritorio'], w: 'Codos en 90 grados y hombros sueltos: postura neutra.' },
        { q: 'Compartes la silla con un compañero de otro horario. ¿Qué haces al llegar?', o: ['La ajusto a mi medida antes de empezar', 'La uso como la dejaron', 'Me siento en la punta para no desajustarla', 'Trabajo de pie todo el turno'], w: 'Cada persona ajusta la silla a su medida al empezar.' },
        { q: '¿Cómo te sientas correctamente?', o: ['Atrás, con la espalda apoyada en el respaldo y el apoyo lumbar', 'En la punta de la silla, inclinado hacia la pantalla', 'Con una pierna doblada sobre el asiento', 'Echado hacia atrás, lejos del escritorio'], w: 'La espalda apoyada descansa los músculos y evita dolores.' } ] },
      { s: 'h_re_pvd_pies', v: [
        { q: 'Subiste la silla y tus pies quedaron colgando. ¿Qué haces?', o: ['Uso un reposapiés', 'Los dejo colgando', 'Cruzo las piernas', 'Los apoyo en las ruedas de la silla'], w: 'El reposapiés deja los pies apoyados sin bajar la silla.' },
        { q: '¿Cómo deben quedar los pies al trabajar sentado?', o: ['Planos en el piso o en un reposapiés', 'Colgando, para mover las piernas', 'Cruzados todo el tiempo', 'Sobre la base de la silla'], w: 'Pies planos y rodillas más o menos en 90 grados.' },
        { q: 'Cruzar las piernas por largo rato frente al computador es una postura recomendada.', vf: false, w: 'Falso. Cruzar las piernas por largo rato aprieta los muslos y carga la espalda.' } ] },
      { s: 'h_re_pvd_teclado', v: [
        { q: '¿Cómo deben quedar las muñecas al escribir?', o: ['Rectas, sin doblarlas hacia arriba ni hacia los lados', 'Dobladas hacia arriba', 'Apoyadas en el borde del escritorio', 'Dobladas hacia los lados'], w: 'Doblar la muñeca por horas causa dolor y hormigueo.' },
        { q: '¿Dónde se ubica el mouse?', o: ['Al lado del teclado, cerca y a la misma altura', 'Lejos, al otro extremo del escritorio', 'Sobre una caja, más alto que el teclado', 'En las piernas'], w: 'Cerca y a la misma altura, el brazo no se estira.' },
        { q: 'Sientes hormigueo en la mano después de horas con el mouse. ¿Qué haces?', o: ['Reviso la postura de la muñeca, hago pausas y aviso si sigue', 'Sigo igual hasta que se pase', 'Aprieto más el mouse', 'Escribo con más fuerza'], w: 'El hormigueo es una señal de alerta: corrige la postura, haz pausas y avisa.' } ] },
      { s: 'h_re_pvd_202020', v: [
        { q: '¿En qué consiste la regla 20 20 20?', o: ['Cada 20 minutos, mirar a unos 6 metros durante 20 segundos', 'Trabajar 20 horas y descansar 20 minutos', 'Poner la pantalla a 20 centímetros', 'Parpadear 20 veces por hora'], w: 'Mirar lejos descansa los músculos de los ojos.' },
        { q: 'Tus ojos se sienten secos y cansados frente a la pantalla. ¿Qué ayuda?', o: ['Parpadear seguido y mirar lejos cada 20 minutos', 'Acercarme más a la pantalla', 'Subir el brillo al máximo', 'No pestañear para concentrarme'], w: 'Frente a la pantalla parpadeamos menos: hay que parpadear y mirar lejos.' },
        { q: 'Si ves borroso seguido o te cansas mucho de la vista, conviene consultarlo.', vf: true, w: 'Verdadero. Son señales que conviene revisar.' } ] },
      { s: 'h_re_pvd_pausas', v: [
        { q: '¿Cada cuánto conviene hacer una pausa activa?', o: ['Al menos una vez cada hora', 'Una vez al día', 'Solo al terminar el turno', 'Cuando ya duele la espalda'], w: 'Cada hora, levántate, estira y camina un poco.' },
        { q: '¿Qué previene mejor los dolores?', o: ['Pausas cortas y frecuentes', 'Una sola pausa larga al final', 'Trabajar sin pausas para terminar antes', 'Dormir más el fin de semana'], w: 'Las pausas cortas y seguidas previenen mejor que una larga.' },
        { q: 'Atiendes de pie en el mesón gran parte de la jornada. ¿Qué ayuda?', o: ['Alternar con sentarme y apoyar un pie en alto por momentos', 'Quedarme quieto en la misma postura', 'Usar zapatos de taco', 'Apoyarme con un codo en el mesón todo el turno'], w: 'Cambiar de postura descansa piernas y espalda.' } ] },
      { s: 'h_re_pvd_puesto', v: [
        { q: '¿Qué es trabajar en postura neutra?', o: ['Espalda apoyada, hombros sueltos, codos cerca del cuerpo y pies apoyados', 'Inclinado hacia la pantalla', 'Con los hombros levantados', 'Con las piernas cruzadas y la espalda curva'], w: 'Es la postura que menos carga cuello, espalda y muñecas.' },
        { q: 'Tu silla no se puede ajustar y te duele la espalda. ¿Qué haces?', o: ['Lo aviso a mi jefatura', 'Me aguanto', 'Me siento en una caja', 'Trabajo sentado de lado'], w: 'Si el puesto no se puede ajustar, se avisa para corregirlo.' },
        { q: 'Los dolores de cuello y muñecas por el computador se pueden prevenir ajustando el puesto y haciendo pausas.', vf: true, w: 'Verdadero. Un puesto bien ajustado y las pausas activas los previenen.' } ] }
    ]
  });

  
  // =====================================================================
  // NOTARÍA · manos y muñecas (atención y caja) y cargas livianas
  // =====================================================================
  const NS = '#1B365D', NG = '#B08D57';
  const cajaN = (x, base, w = 36, h = 26, t = 'LIBROS') => `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#C89B5E" stroke="#8D6E63" stroke-width="1.2"/><rect x="${x}" y="${base - h}" width="${w}" height="4" fill="#B5854A"/>` + T(x + w / 2, base - h / 2 + 4, t, 7, '#5D4037');
  const archN = (x, base = FL, w = 34, h = 84) => { let g = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" rx="2" fill="#90A4AE" stroke="#546E7A" stroke-width="1.6"/>`; for (let i = 0; i < Math.floor(h / 21); i++) g += `<rect x="${x + 3}" y="${base - h + 4 + i * 21}" width="${w - 6}" height="17" fill="#B0BEC5" stroke="#607D8B"/><rect x="${x + w / 2 - 6}" y="${base - h + 10 + i * 21}" width="12" height="3" fill="#455A64"/>`; return g; };
  const resmaN = (x, base, w = 30) => `<rect x="${x}" y="${base - 10}" width="${w}" height="10" fill="#fff" stroke="#90A4AE"/><rect x="${x}" y="${base - 6}" width="${w}" height="2" fill="#E57373"/>`;
  const carroN = x => `<rect x="${x}" y="${FL - 12}" width="76" height="5" fill="#546E7A"/>` + [x + 8, x + 66].map(c => `<circle cx="${c}" cy="${FL - 4}" r="4" fill="#263238"/>`).join('') + `<path d="M${x + 4},${FL - 12} v-48 h8" stroke="#546E7A" stroke-width="4" fill="none"/>`;
  const mesonN = (x, w, top = 122) => `<rect x="${x}" y="${top + 6}" width="${w}" height="${FL - top - 6}" fill="#8D6E63" stroke="#5D4037"/><rect x="${x}" y="${top + 14}" width="${w}" height="10" fill="${NS}"/><rect x="${x}" y="${top + 24}" width="${w}" height="2" fill="${NG}"/><rect x="${x - 4}" y="${top}" width="${w + 8}" height="7" rx="1" fill="#5D4037"/>`;
  const manoG = (x, y, c = '#F2C6A0') => `<g transform="translate(${x},${y})"><rect x="-26" y="-10" width="30" height="20" rx="6" fill="${c}" stroke="${OL}" stroke-width="1.4"/><path d="M4,-8 h22 M4,-2 h24 M4,4 h22" stroke="${OL}" stroke-width="5" stroke-linecap="round"/><path d="M4,-8 h22 M4,-2 h24 M4,4 h22" stroke="${c}" stroke-width="3" stroke-linecap="round"/></g>`;
  const muneca = (x, y, bad) => `<g transform="translate(${x},${y})"><rect x="-44" y="-8" width="34" height="16" rx="6" fill="#ECEFF1" stroke="${OL}" stroke-width="1.2"/><g transform="rotate(${bad ? -32 : 0} -10 0)"><rect x="-12" y="-9" width="34" height="18" rx="7" fill="#F2C6A0" stroke="${OL}" stroke-width="1.4"/><path d="M10,-6 h14 M10,0 h15 M10,5 h14" stroke="${OL}" stroke-width="1.2"/></g></g>`;
  const tecl = (x, y, w = 70) => `<rect x="${x}" y="${y}" width="${w}" height="9" rx="2" fill="#37474F"/>` + Array.from({ length: Math.floor(w / 9) }, (_, i) => `<rect x="${x + 3 + i * 9}" y="${y + 2}" width="6" height="2.4" fill="#78909C"/>`).join('');
  const billetes = (x, y) => `<rect x="${x}" y="${y}" width="40" height="18" rx="2" fill="#A5D6A7" stroke="#2E7D32"/><circle cx="${x + 20}" cy="${y + 9}" r="5" fill="#C8E6C9" stroke="#2E7D32"/><rect x="${x + 6}" y="${y - 7}" width="40" height="18" rx="2" fill="#C5E1A5" stroke="#2E7D32" opacity=".9"/>`;
  const sello = (x, y) => `<rect x="${x - 10}" y="${y - 6}" width="20" height="6" rx="2" fill="#37474F"/><rect x="${x - 3}" y="${y - 22}" width="6" height="16" rx="2" fill="#8D6E63"/>`;
  const fE = () => H.fondo.recepcion();
  const fO = () => H.fondo.oficina();

  // ---- MANOS Y MUÑECAS (atención y caja) ----
  S.n_er_manos_inicio = () => Z(fO(), `<rect x="30" y="118" width="260" height="82" fill="#8D6E63"/><rect x="30" y="112" width="260" height="7" fill="#5D4037"/>` + tecl(60, 104, 80) + muneca(220, 100, false) + billetes(160, 102) + pill(160, 26, 'Las manos trabajan todo el día', NS, 11));
  S.n_er_manos_muneca = () => Z(fO(), `<rect x="0" y="118" width="320" height="82" fill="#8D6E63"/><rect x="0" y="112" width="320" height="7" fill="#5D4037"/>` + tecl(20, 103, 90) + muneca(190, 104, true) + badge(120, 50, false, 13) + divider() + tecl(200, 103, 90) + muneca(110 + 160, 104, false) + badge(300, 50, true, 13) + pill(80, 150, 'Muñeca doblada', '#C62828', 9) + pill(240, 150, 'Muñeca recta', '#2E7D32', 9));
  S.n_er_manos_caja = () => Z(fE(), mesonN(40, 150) + `<rect x="60" y="88" width="46" height="34" rx="3" fill="#455A64" stroke="#263238"/><rect x="64" y="92" width="38" height="14" fill="#A5D6A7"/>` + billetes(116, 110) + W(120, 160, R({ hair: true, pose: 'point' })) + W(250, 176, Object.assign({ area: 'general', flip: true, shirt: '#6A1B9A' }, {})) + pill(160, 26, 'Caja: dinero, timbres y teclado', NS, 11));
  S.n_er_manos_micro = () => Z(fO(), `<rect x="0" y="118" width="320" height="82" fill="#8D6E63"/><rect x="0" y="112" width="320" height="7" fill="#5D4037"/>` + sello(80, 112) + `<rect x="120" y="94" width="60" height="18" fill="#fff" stroke="#90A4AE"/>` + clock(250, 56, 24) + pill(250, 90, 'Cada hora', '#2E7D32', 10) + W(60, 176, R({ pose: 'stop', hair: true })) + pill(160, 20, 'Estire manos y muñecas', '#2E7D32', 11));
  S.n_er_manos_apoyo = () => Z(fE(), mesonN(30, 150) + W(100, 160, R({ hair: true, face: 'worried' })) + W(230, 176, Object.assign({ area: 'general', flip: true, shirt: '#C62828', face: 'worried', pose: 'stop' })) + `<rect x="168" y="96" width="60" height="22" rx="4" fill="#fff" stroke="#1B365D"/>` + T(198, 111, 'TURNO', 9, NS) + pill(160, 20, 'Atención de público', NS, 11));
  S.n_er_manos_estira = () => Z(fO(), W(110, 176, R({ pose: 'stop', hair: true, s: 1.2 })) + `<path d="M150,100 q22,-10 40,0" stroke="#2E7D32" stroke-width="3" stroke-dasharray="5 4" fill="none"/>` + arr(150, 100, 192, 98, '#2E7D32', 3) + pill(210, 140, '10 segundos', '#2E7D32', 10) + pill(160, 20, 'Pausa de manos', '#2E7D32', 11));

  SI_CONT.temas.push({
    id: 'manos', sec: 'ergo', emp: ['notaria'], title: 'Manos y muñecas: atención de público y caja', thumb: 'n_er_manos_inicio', mins: 12,
    learn: [
      { s: 'n_er_manos_inicio', t: 'Sus manos trabajan todo el día', x: 'Teclear, usar el mouse, timbrar, firmar, contar dinero y manejar papeles son <b>movimientos repetidos</b>. Hechos por horas pueden causar <b>dolor, hormigueo y cansancio</b> en dedos, muñecas y antebrazos. Se previenen con buena postura, buen ritmo y pausas.' },
      { s: 'n_er_manos_muneca', t: 'Muñeca recta', x: '<ul><li>Teclee y use el mouse con la <b>muñeca recta</b>, sin doblarla hacia arriba ni hacia los lados.</li><li>Teclado y mouse <b>cerca del cuerpo</b> y a la misma altura.</li><li>Teclee suave, <b>sin golpear</b> las teclas.</li><li>Si la muñeca queda doblada, ajuste la altura de la silla o del teclado.</li></ul>' },
      { s: 'n_er_manos_caja', t: 'En la caja', x: 'En la caja se cuenta dinero, se timbra y se teclea sin parar.<ul><li>Todo lo que usa mucho, <b>al alcance</b> y sin estirar el brazo.</li><li>Agarre los timbres y billetes con <b>suavidad</b>, sin apretar de más.</li><li>Alterne tareas cuando pueda: así descansan unas manos mientras trabajan otras.</li></ul>' },
      { s: 'n_er_manos_apoyo', t: 'Atención de público, sentado o de pie', x: 'En el mesón la atención es larga y sin pausas largas.<ul><li>Cambie de postura: <b>siéntese y levántese</b> cuando el flujo lo permita.</li><li>Apoye bien los antebrazos y no deje los hombros subidos.</li><li>Si hay mucha fila o presión, <b>avise a su jefatura</b>: el apoyo también es prevención.</li></ul>' },
      { s: 'n_er_manos_micro', t: 'Micropausas', x: 'Cada <b>hora</b>, haga una micropausa de <b>1 a 2 minutos</b>, aunque haya público: abra y cierre las manos, estire los dedos y gire suave las muñecas. Las pausas cortas y seguidas previenen mejor que una pausa larga.', k: 'Cada hora, una micropausa de manos y muñecas.' },
      { s: 'n_er_manos_estira', t: 'Estiramiento de manos y muñecas', x: '<ol><li>Estire un brazo al frente con la palma hacia arriba.</li><li>Con la otra mano, tire suave los dedos hacia abajo: <b>10 segundos</b>.</li><li>Cambie de mano.</li><li>Abra y cierre los puños 10 veces.</li></ol>Si el dolor o el hormigueo no se pasan, <b>avise y consulte</b>.' }
    ],
    quiz: [
      { s: 'n_er_manos_muneca', v: [
        { q: '¿Cómo debe quedar la muñeca al teclear?', o: ['Recta, sin doblarla', 'Doblada hacia arriba', 'Doblada hacia el lado', 'Apoyada en el borde duro'], w: 'Una muñeca recta carga menos los tendones.' },
        { q: '¿Dónde van el teclado y el mouse?', o: ['Cerca del cuerpo y a la misma altura', 'Lejos, estirando el brazo', 'Más arriba que el codo', 'Sobre una pila de libros'], w: 'Cerca y a la misma altura: el brazo no se estira.' },
        { q: 'Teclear golpeando las teclas con fuerza no importa si uno es rápido.', vf: false, w: 'Falso. Se teclea suave: golpear fatiga los dedos y las muñecas.' }] },
      { s: 'n_er_manos_caja', v: [
        { q: 'En la caja, ¿cómo se ubican las cosas que más usa?', o: ['Al alcance, sin estirar el brazo', 'Lejos, para estirarse', 'Bajo el mesón', 'Detrás de usted'], w: 'Lo que más usa va al alcance de la mano.' },
        { q: 'Al timbrar o contar billetes, ¿cómo agarra?', o: ['Con suavidad, sin apretar de más', 'Apretando fuerte siempre', 'Con dos dedos tensos', 'Con la muñeca torcida'], w: 'Apretar de más cansa mano y antebrazo.' },
        { q: 'Alternar tareas ayuda a que descansen las manos.', vf: true, w: 'Verdadero. Mientras unas manos o músculos trabajan, otros descansan.' }] },
      { s: 'n_er_manos_apoyo', v: [
        { q: 'Atiende mucho público. ¿Qué ayuda a su cuerpo?', o: ['Cambiar de postura, sentarse y levantarse', 'Quedarme quieto toda la jornada', 'Apoyarme con un solo codo', 'Subir los hombros'], w: 'Cambiar de postura descansa piernas, espalda y manos.' },
        { q: 'Hay mucha fila y se siente sobrepasado. ¿Qué hace?', o: ['Aviso a mi jefatura para pedir apoyo', 'Me aguanto sin avisar', 'Trabajo más rápido sin pausas', 'Dejo de atender'], w: 'Pedir apoyo a tiempo también es prevención.' },
        { q: 'Conviene dejar los hombros subidos y tensos al atender.', vf: false, w: 'Falso. Los hombros van sueltos.' }] },
      { s: 'n_er_manos_micro', v: [
        { q: '¿Cada cuánto conviene una micropausa de manos?', o: ['Cada hora', 'Una vez al día', 'Solo al final del turno', 'Cuando ya duele'], w: 'Cada hora, 1 a 2 minutos.' },
        { q: '¿Qué ejercicio sirve en una micropausa?', o: ['Abrir y cerrar las manos y estirar los dedos', 'Apretar fuerte el mouse', 'Teclear más rápido', 'Cruzar los brazos'], w: 'Abrir, cerrar y estirar suelta los tendones.' },
        { q: 'Siente hormigueo seguido en la mano. ¿Qué hace?', o: ['Aviso y consulto', 'Lo ignoro', 'Aprieto más', 'Espero que se me pase por sí solo'], w: 'El hormigueo seguido es una señal de alerta: se avisa y se consulta.' }] },
      { s: 'n_er_manos_estira', v: [
        { q: 'En el estiramiento de muñeca, ¿cuánto se mantiene la postura?', o: ['Unos 10 segundos', '1 segundo', '10 minutos', 'Hasta que duela'], w: 'Unos 10 segundos, suave, sin dolor.' },
        { q: 'El estiramiento debe sentirse...', o: ['Suave, sin dolor', 'Con mucho dolor', 'Con rebotes', 'Con el brazo flojo'], w: 'Estirar es suave, sin dolor y sin rebotes.' },
        { q: 'Estirar manos y muñecas ayuda a prevenir molestias.', vf: true, w: 'Verdadero.' }] }
    ]
  });

  // ---- CARGAS LIVIANAS: libros, protocolos, archivadores y resmas ----
  S.n_er_car_inicio = () => Z(fO(), archN(220, FL, 34, 84) + archN(256, FL, 34, 84) + cajaN(40, FL, 36, 26) + cajaN(76, FL, 36, 26) + resmaN(150, FL, 30) + resmaN(150, FL - 10, 30) + W(130, 176, { area: 'escrituras', pose: 'carry' }) + pill(160, 20, 'Libros, protocolos, archivadores y resmas', NS, 10));
  S.n_er_car_pesos = () => Z(fO(), cajaN(30, FL, 36, 26, '10 kg') + cajaN(90, FL, 36, 28, '25 kg') + `<rect x="150" y="${FL - 50}" width="40" height="50" fill="#C89B5E" stroke="#8D6E63"/>` + T(170, FL - 22, '+25', 12, '#C62828') + prohibido(206, FL - 60, 14) + W(260, 176, { area: 'escrituras', hair: true, pose: 'stop' }) + pill(100, 20, 'Máximo: 25 kg (mujeres: 20 kg)', NS, 11));
  S.n_er_car_tecnica = () => Z(fO(), W(60, 165, { area: 'escrituras', pose: 'bend', face: 'pain' }) + cajaN(84, FL, 34, 26) + badge(130, 32, false, 14) + divider() + GA(W(225, 165, { area: 'escrituras', pose: 'squat' }) + cajaN(231, FL, 34, 26)) + badge(296, 32, true, 14) + T(80, 194, 'Espalda doblada', 11, '#C62828') + T(240, 194, 'Piernas flectadas', 11, '#2E7D32'));
  S.n_er_car_carro = () => Z(fO(), carroN(60) + cajaN(72, FL - 12, 34, 24) + cajaN(104, FL - 12, 30, 20) + W(40, 176, { area: 'escrituras', pose: 'point' }) + W(250, 176, { area: 'escrituras', pose: 'bend', face: 'pain', flip: true }) + cajaN(200, FL, 40, 30, 'PESADO') + badge(150, 40, true, 14) + badge(250, 40, false, 14) + pill(100, 20, 'Con carro', '#2E7D32', 10));
  S.n_er_car_alto = () => Z(fO(), archN(200, FL, 34, 100) + archN(236, FL, 34, 100) + `<rect x="196" y="40" width="80" height="6" fill="#78909C"/>` + cajaN(206, 40, 34, 22, 'ARCH.') + `<path d="M100,${FL} l22,-100 M146,${FL} l-22,-100" stroke="#90A4AE" stroke-width="5"/>` + [0, 1, 2, 3].map(i => `<line x1="${106 + i * 4}" y1="${FL - 20 - i * 22}" x2="${142 - i * 4}" y2="${FL - 20 - i * 22}" stroke="#607D8B" stroke-width="3"/>`).join('') + W(60, 176, { area: 'escrituras', pose: 'stop' }) + pill(100, 20, 'Lo alto, con escala firme', '#2E7D32', 10));
  S.n_er_car_giro = () => Z(fO(), W(95, 165, { area: 'escrituras', pose: 'twist', face: 'pain' }) + cajaN(40, FL - 4, 30, 22) + badge(135, 32, false, 14) + divider() + W(240, 165, { area: 'escrituras', pose: 'walk', flip: true }) + cajaN(200, FL - 40, 30, 22) + GA(`<path d="M222,184 a20,8 0 1 0 38,0" stroke="#1565C0" stroke-width="3" fill="none"/>`) + badge(296, 32, true, 14) + T(240, 60, 'Gire con los pies', 11, '#1565C0'));
  S.n_er_car_resmas = () => Z(fO(), `<rect x="20" y="${FL - 8}" width="110" height="8" fill="#A1887F"/>` + [0, 1, 2, 3, 4].map(i => resmaN(30 + (i % 3) * 32, FL - 8 - Math.floor(i / 3) * 10, 30)).join('') + W(190, 176, { area: 'escrituras', hair: true, pose: 'carry' }) + resmaN(196, 118, 28) + pill(120, 20, 'Una o dos resmas por viaje', NS, 10));

  SI_CONT.temas.push({
    id: 'cargas', sec: 'ergo', emp: ['notaria'], title: 'Manejo manual de cargas livianas: libros, archivadores y resmas', thumb: 'n_er_car_inicio', mins: 12,
    learn: [
      { s: 'n_er_car_inicio', t: 'Carga liviana, pero hay que cuidar la espalda', x: 'En la notaría se mueven <b>libros, protocolos, archivadores y resmas de papel</b>. Una resma pesa poco, pero <b>muchas veces al día</b> y con mala postura carga la espalda, los hombros y las muñecas. Aquí la regla es: <b>menos peso, mejor postura y pedir ayuda</b>.' },
      { s: 'n_er_car_pesos', t: 'Cuánto se puede levantar (Ley 20.949)', x: '<ul><li>Máximo <b>25 kg</b> por persona adulta.</li><li>Mujeres y menores de 18 años: máximo <b>20 kg</b>.</li><li>Las <b>embarazadas</b> no manipulan carga.</li></ul>Si pesa mucho o no sabe cuánto, <b>no la levante sola</b>: divídala en partes o pida ayuda.' },
      { s: 'n_er_car_tecnica', t: 'Técnica para levantar', x: '<ol><li>Acérquese a la carga y apoye bien los dos pies.</li><li><b>Flecte las rodillas</b> y mantenga la espalda recta.</li><li>Tome la carga y <b>péguela al cuerpo</b>.</li><li>Levántese con las piernas.</li></ol>Nunca levante con la espalda doblada ni con los brazos estirados.' },
      { s: 'n_er_car_giro', t: 'Sin giros con carga', x: 'Girar el tronco con carga en las manos es la forma más fácil de lesionar la espalda. <b>Gire con los pies</b>: mueva todo el cuerpo hacia donde va a dejar la carga.', k: 'Con carga en las manos, gire con los pies, no con la espalda.' },
      { s: 'n_er_car_carro', t: 'Carro y ayuda', x: '<ul><li>Para varias cajas o archivadores, use el <b>carro</b>.</li><li>Si la carga es grande o pesada, <b>pida ayuda</b>.</li><li>Ordene la carga: <b>lo pesado, abajo</b> en el carro.</li><li>Antes de mover, revise que el camino esté despejado.</li></ul>' },
      { s: 'n_er_car_alto', t: 'Cargas en lo alto o en lo bajo', x: '<ul><li>Lo <b>pesado</b> y lo que más se usa, entre la cintura y los hombros.</li><li>Para alcanzar lo alto use una <b>escala firme</b>, nunca una silla ni una caja.</li><li>Para lo bajo, agáchese flectando las rodillas.</li></ul>' },
      { s: 'n_er_car_resmas', t: 'Resmas de papel', x: 'Una resma pesa unos <b>2,5 kg</b>, pero una caja de resmas pesa mucho más. Lleve <b>una o dos resmas</b> por viaje, pegadas al cuerpo, o use el carro para la caja completa.' }
    ],
    quiz: [
      { s: 'n_er_car_pesos', v: [
        { q: '¿Cuál es el máximo de carga para un trabajador adulto?', o: ['25 kg', '50 kg', '40 kg', '60 kg'], w: 'Máximo 25 kg por persona adulta, según la Ley 20.949.' },
        { q: '¿Cuál es el máximo para mujeres y menores de 18 años?', o: ['20 kg', '25 kg', '35 kg', '40 kg'], w: 'Mujeres y menores de 18 años: máximo 20 kg.' },
        { q: 'Las embarazadas pueden manipular carga si es liviana.', vf: false, w: 'Falso. Las embarazadas no manipulan carga.' }] },
      { s: 'n_er_car_tecnica', v: [
        { q: '¿Cómo se levanta una caja con libros?', o: ['Flectando las rodillas y con la espalda recta', 'Doblando la espalda con las piernas rectas', 'Girando el tronco', 'Con los brazos estirados'], w: 'Rodillas flectadas, espalda recta y la carga pegada al cuerpo.' },
        { q: '¿Dónde se lleva la carga?', o: ['Pegada al cuerpo', 'Lejos, con los brazos estirados', 'Sobre la cabeza', 'Sobre un hombro girado'], w: 'Cerca del cuerpo se carga menos la espalda.' },
        { q: 'Con la carga en las manos, ¿cómo cambia de dirección?', o: ['Girando con los pies', 'Girando el tronco', 'Estirando el brazo', 'Saltando'], w: 'Se gira con los pies, no con la espalda.' }] },
      { s: 'n_er_car_carro', v: [
        { q: 'Debe mover varias cajas de libros. ¿Qué usa?', o: ['El carro', 'Las llevo todas apiladas en brazos', 'Las arrastro por el piso', 'Las lanzo de a una'], w: 'Con varias cajas se usa el carro.' },
        { q: 'La carga es grande y no sabe cuánto pesa. ¿Qué hace?', o: ['Pido ayuda o la divido', 'La levanto sola', 'La levanto rápido', 'La subo a una silla'], w: 'Ante la duda, se pide ayuda o se divide la carga.' },
        { q: 'En el carro, lo pesado va abajo.', vf: true, w: 'Verdadero. Así el carro es estable.' }] },
      { s: 'n_er_car_alto', v: [
        { q: 'Necesita un archivador de la repisa más alta. ¿Qué usa?', o: ['Una escala firme', 'Una silla con ruedas', 'Una caja de libros', 'Me estiro en la punta de los pies'], w: 'Nunca una silla: se usa una escala firme.' },
        { q: '¿Dónde conviene guardar lo más pesado y lo que más se usa?', o: ['Entre la cintura y los hombros', 'En lo más alto', 'En el piso, bajo todo', 'En el borde de la repisa'], w: 'A esa altura se levanta con menos esfuerzo.' },
        { q: 'Para tomar algo del piso, ¿cómo se agacha?', o: ['Flectando las rodillas', 'Doblando la espalda', 'Con las piernas rectas', 'Girando el tronco'], w: 'Siempre con las rodillas flectadas.' }] }
    ]
  });

})();
