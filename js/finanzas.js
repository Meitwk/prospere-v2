/**
 * js/finanzas.js
 * Calculadora Financiera, Diagnóstico de Cobro Justo y Conexión con Catálogo
 */
import { AppStorage } from './storage.js';

export const FinanceModule = {
    render() {
        // Cargar productos desde AppStorage (localStorage / JSON)
        const productosData = AppStorage.getData('productos') || [];
        const listaProductos = Array.isArray(productosData) ? productosData : (productosData.productos || []);

        // Generar las opciones del menú desplegable
        const opcionesProductos = listaProductos.map(p => {
            const costoProd = p.costo || Math.round(p.precio * 0.5); // Fallback si no tiene costo asignado
            return `<option value="${p.id}" data-materiales="${costoProd}" data-precio="${p.precio}">${p.nombre} (Precio actual: $${p.precio})</option>`;
        }).join('');

        return `
            <div class="d-flex flex-column gap-4 fade-in">
                
                <!-- GUÍA DESPLEGABLE DE USO -->
                <div class="accordion" id="accordionGuiaFinanzas">
                    <div class="accordion-item border-0 pro-card p-0 overflow-hidden">
                        <h2 class="accordion-header" id="headingGuia">
                            <button class="accordion-button collapsed bg-white text-dark fw-bold fs-7 py-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGuia" aria-expanded="false" aria-controls="collapseGuia">
                                <i class="bi bi-journal-bookmark-fill text-success me-2 fs-6"></i>
                                ¿Cómo usar esta herramienta para valorar tu trabajo? (Guía rápida)
                            </button>
                        </h2>
                        <div id="collapseGuia" class="accordion-collapse collapse" aria-labelledby="headingGuia" data-bs-parent="#accordionGuiaFinanzas">
                            <div class="accordion-body bg-light text-muted fs-7 border-top">
                                <ul class="mb-0 ps-3 d-flex flex-column gap-2">
                                    <li><strong>Selecciona de tu Catálogo:</strong> Puedes elegir un producto que ya tengas guardado para analizar su precio automáticamente.</li>
                                    <li><strong>Valora tu mano de obra:</strong> Tu trabajo vale. Asigna siempre un monto justo a la elaboración del producto además de los materiales.</li>
                                    <li><strong>Calculadora Clásica:</strong> Úsala cuando conoces tus costos fijos y quieres calcular rápido el IVA y un porcentaje de ganancia.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 1. CALCULADORA FINANCIERA TRADICIONAL -->
                <div class="pro-card">
                    <h4 class="text-success mb-2">
                        <i class="bi bi-calculator me-2"></i>Calculadora Financiera
                    </h4>
                    <p class="text-muted fs-7 mb-4">
                        Calcula precios sugeridos, IVA y margen de ganancia estándar para tu negocio.
                    </p>

                    <form id="finances-form" class="row g-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label fw-bold text-secondary fs-7">Costo Directo del Producto ($)</label>
                            <input type="number" id="fin-costo" class="form-control" placeholder="Ej: 5000" required>
                        </div>

                        <div class="col-6 col-md-3">
                            <label class="form-label fw-bold text-secondary fs-7">Margen (%)</label>
                            <input type="number" id="fin-margen" class="form-control" value="30" required>
                        </div>

                        <div class="col-6 col-md-3">
                            <label class="form-label fw-bold text-secondary fs-7">Impuesto</label>
                            <select id="fin-iva" class="form-select">
                                <option value="19">IVA (19%)</option>
                                <option value="0">Exento (0%)</option>
                            </select>
                        </div>

                        <div class="col-12 mt-3">
                            <button type="submit" class="btn btn-success fw-bold w-100 py-2">
                                Calcular Precio y Ganancia
                            </button>
                        </div>
                    </form>

                    <div id="fin-results" class="d-none mt-4 p-3 bg-light rounded-3 border">
                        <div class="d-flex justify-content-between mb-2 fs-7">
                            <span>Precio Neto:</span>
                            <strong id="res-neto" class="text-dark">$0</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-2 fs-7">
                            <span>IVA (19%):</span>
                            <strong id="res-iva" class="text-muted">$0</strong>
                        </div>
                        <hr class="my-2 border-top border-secondary opacity-25">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="fw-bold">Precio Final Venta:</span>
                            <strong id="res-total" class="text-success fs-6">$0</strong>
                        </div>
                        <div class="d-flex justify-content-between p-2 bg-success bg-opacity-10 text-success rounded-2 mt-2 fs-7">
                            <span>Ganancia Neta Estimada:</span>
                            <strong id="res-ganancia">$0</strong>
                        </div>
                    </div>
                </div>

                <!-- 2. DIAGNÓSTICO DE COBRO JUSTO CONECTADO AL CATÁLOGO -->
                <div class="pro-card border-start border-4 border-success">
                    <h4 class="text-success mb-2">
                        <i class="bi bi-heart-pulse me-2"></i>Diagnóstico: ¿Estoy cobrando lo justo?
                    </h4>
                    <p class="text-muted fs-7 mb-4">
                        Elige un producto de tu catálogo o ingresa los datos a mano para evaluar si tu precio es sostenible.
                    </p>

                    <form id="diag-form" class="row g-3">
                        <!-- SELECTOR DE PRODUCTOS DEL CATÁLOGO -->
                        <div class="col-12">
                            <label class="form-label fw-bold text-success fs-7">
                                <i class="bi bi-bag-check me-1"></i> Seleccionar de mi Catálogo (Opcional)
                            </label>
                            <select id="diag-select-producto" class="form-select border-success opacity-75">
                                <option value="">-- Cargar datos desde un producto existente --</option>
                                ${opcionesProductos}
                            </select>
                        </div>

                        <div class="col-12 col-md-4">
                            <label class="form-label fw-bold text-secondary fs-7">Gasto en Materiales ($)</label>
                            <input type="number" id="diag-materiales" class="form-control" placeholder="Ej: 3000" required>
                        </div>

                        <div class="col-12 col-md-4">
                            <label class="form-label fw-bold text-secondary fs-7">Pago por tu trabajo ($)</label>
                            <input type="number" id="diag-mano-obra" class="form-control" placeholder="Ej: 4000" required>
                        </div>

                        <div class="col-12 col-md-4">
                            <label class="form-label fw-bold text-secondary fs-7">Precio de Venta Actual ($)</label>
                            <input type="number" id="diag-precio-actual" class="form-control" placeholder="Ej: 10000" required>
                        </div>

                        <div class="col-12 mt-3">
                            <button type="submit" class="btn btn-outline-success fw-bold w-100 py-2">
                                Evaluar Mi Precio
                            </button>
                        </div>
                    </form>

                    <!-- RESULTADO DEL DIAGNÓSTICO -->
                    <div id="diag-results" class="d-none mt-4 p-3 rounded-3 border bg-light">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i id="diag-badge-icon" class="fs-5"></i>
                            <h6 id="diag-badge-title" class="fw-bold mb-0 text-dark"></h6>
                        </div>
                        <p id="diag-feedback" class="fs-7 text-muted mb-3"></p>
                        
                        <div class="bg-white p-3 rounded-2 border fs-7">
                            <div class="d-flex justify-content-between mb-1">
                                <span>Costo Total (Materiales + Mano de Obra):</span>
                                <strong id="diag-costo-total" class="text-dark">$0</strong>
                            </div>
                            <div class="d-flex justify-content-between mb-1">
                                <span>Tu Precio de Venta:</span>
                                <strong id="diag-precio-venta" class="text-dark">$0</strong>
                            </div>
                            <hr class="my-2 opacity-25">
                            <div class="d-flex justify-content-between p-2 bg-success bg-opacity-10 text-success rounded-2">
                                <span class="fw-bold">Ganancia Limpia Sobrante:</span>
                                <strong id="diag-utilidad" class="fs-6">$0</strong>
                            </div>
                        </div>

                        <div class="mt-3 p-2 bg-white rounded-2 border fs-8 d-flex align-items-center justify-content-between">
                            <span class="text-muted"><i class="bi bi-mortarboard-fill text-success me-1"></i> ¿Quieres aprender a calcular mejor tus costos?</span>
                            <a href="#" id="btn-ir-academy" class="fw-bold text-success text-decoration-none">Ver Cursos</a>
                        </div>
                    </div>
                </div>

            </div>
        `;
    },

    initEvents() {
        // --- 1. Eventos Calculadora Tradicional ---
        const formCalc = document.getElementById('finances-form');
        if (formCalc) {
            formCalc.addEventListener('submit', (e) => {
                e.preventDefault();
                const costo = parseFloat(document.getElementById('fin-costo').value) || 0;
                const margen = parseFloat(document.getElementById('fin-margen').value) || 0;
                const tasaIva = parseFloat(document.getElementById('fin-iva').value) || 0;

                if (costo <= 0) return;

                const neto = costo * (1 + (margen / 100));
                const iva = neto * (tasaIva / 100);
                const total = neto + iva;
                const ganancia = neto - costo;

                const fmt = (v) => '$' + Math.round(v).toLocaleString('es-CL');

                document.getElementById('res-neto').innerText = fmt(neto);
                document.getElementById('res-iva').innerText = fmt(iva);
                document.getElementById('res-total').innerText = fmt(total);
                document.getElementById('res-ganancia').innerText = fmt(ganancia);

                document.getElementById('fin-results').classList.remove('d-none');
            });
        }

        // --- 2. Eventos Diagnóstico y Autocompletado del Catálogo ---
        const selectProd = document.getElementById('diag-select-producto');
        const inputMat = document.getElementById('diag-materiales');
        const inputPrecio = document.getElementById('diag-precio-actual');

        if (selectProd && inputMat && inputPrecio) {
            selectProd.addEventListener('change', () => {
                const opt = selectProd.options[selectProd.selectedIndex];
                if (opt && opt.value) {
                    inputMat.value = opt.getAttribute('data-materiales') || '';
                    inputPrecio.value = opt.getAttribute('data-precio') || '';
                }
            });
        }

        const formDiag = document.getElementById('diag-form');
        if (formDiag) {
            formDiag.addEventListener('submit', (e) => {
                e.preventDefault();

                const materiales = parseFloat(inputMat.value) || 0;
                const manoObra = parseFloat(document.getElementById('diag-mano-obra').value) || 0;
                const precioVenta = parseFloat(inputPrecio.value) || 0;

                const costoTotal = materiales + manoObra;
                const gananciaLimpia = precioVenta - costoTotal;
                const margenMinimoSeguridad = costoTotal * 0.15; // 15% mínimo realista

                const fmt = (v) => '$' + Math.round(v).toLocaleString('es-CL');

                const resBox = document.getElementById('diag-results');
                const badgeIcon = document.getElementById('diag-badge-icon');
                const badgeTitle = document.getElementById('diag-badge-title');
                const feedbackText = document.getElementById('diag-feedback');

                // Lógica realista de evaluación
                if (precioVenta < costoTotal) {
                    badgeIcon.className = 'bi bi-info-circle-fill text-secondary';
                    badgeTitle.innerText = 'Atención: Tu precio no alcanza a cubrir tus costos';
                    feedbackText.innerText = `Para cubrir los materiales (${fmt(materiales)}) y pagar tu trabajo (${fmt(manoObra)}), el costo base es de ${fmt(costoTotal)}. Actualmente estás perdiendo ${fmt(Math.abs(gananciaLimpia))}.`;
                } else if (gananciaLimpia < margenMinimoSeguridad) {
                    badgeIcon.className = 'bi bi-info-circle-fill text-secondary';
                    badgeTitle.innerText = 'Margen muy bajo: Ganancia poco sostenible';
                    feedbackText.innerText = `Aunque cubres tu costo base (${fmt(costoTotal)}), una ganancia de solo ${fmt(gananciaLimpia)} es insuficiente para absorber imprevistos o hacer crecer tu negocio. Te sugerimos un precio de al menos ${fmt(costoTotal + margenMinimoSeguridad)}.`;
                } else {
                    badgeIcon.className = 'bi bi-check-circle-fill text-success';
                    badgeTitle.innerText = '¡Excelente! Precio Sostenible y Rentable';
                    feedbackText.innerText = `Cubres tus materiales, pagas justamente tu trabajo (${fmt(manoObra)}) y te quedan ${fmt(gananciaLimpia)} de utilidad sobrante para ahorrar e invertir en tu negocio.`;
                }

                document.getElementById('diag-costo-total').innerText = fmt(costoTotal);
                document.getElementById('diag-precio-venta').innerText = fmt(precioVenta);
                document.getElementById('diag-utilidad').innerText = fmt(gananciaLimpia);

                resBox.classList.remove('d-none');
            });

            const btnAcademy = document.getElementById('btn-ir-academy');
            if (btnAcademy) {
                btnAcademy.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'academy' }));
                });
            }
        }
    }
};
