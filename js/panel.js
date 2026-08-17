/**
 * js/panel.js
 * Módulo del Panel de Control (Simulación IoT y Estado del Sistema)
 */
import { AppStorage } from './storage.js';
import { formatCurrency } from './utils.js';

export const ControlPanel = {
    render() {
        const hoy = new Date();
        const mesActual = hoy.getMonth();
        const añoActual = hoy.getFullYear();

        // 1. Catálogo real extraído de la imagen
        const catalogoReal = [
            { id: 'prod_piano_01', nombre: 'Teclado Piano Digital de 61 Teclas', precio: 45990 },
            { id: 'prod_lapices_02', nombre: 'Set de Lápices de Colores Profesionales (48 Piezas)', precio: 12990 },
            { id: 'prod_pusheen_03', nombre: 'Peluche de Pusheen Original 25cm', precio: 18990 },
            { id: 'prod_cubiertos_04', nombre: 'Set de Cucharas y Tenedores de Acero Inoxidable', precio: 9990 },
            { id: 'prod_lego_05', nombre: 'Set de Figuras Coleccionables Lego', precio: 24990 },
            { id: 'prod_limbus_06', nombre: 'Peluche de Limbus Company (Mercancía Oficial)', precio: 22990 },
            { id: 'prod_parlante_07', nombre: 'Parlante Pequeño Bluetooth Portátil', precio: 15990 },
            { id: 'prod_audifonos_08', nombre: 'Audífonos Inalámbricos Bluetooth TWS', precio: 29990 },
            { id: 'prod_jjba_09', nombre: 'Peluche Coleccionable JoJo\'s Bizarre Adventure (JJBA)', precio: 21990 }
        ];

        let transacciones = AppStorage.getData('transacciones');

        // Regeneramos el historial con la lista actualizada y x4 más transacciones
        if (!transacciones || transacciones.length < 15) {
            const mesFormateado = String(mesActual + 1).padStart(2, '0');
            transacciones = [
                // --- 13 DE AGOSTO (GANANCIA NETAS EXACTAS: $45.500 -> Ventas: $55.490 | Pérdida: -$9.990) ---
                { id: 1, tipo: 'venta', concepto: 'Venta: Audífonos Inalámbricos Bluetooth TWS', monto: 29990, fecha: `${añoActual}-${mesFormateado}-13` },
                { id: 2, tipo: 'venta', concepto: 'Venta: Parlante Pequeño Bluetooth Portátil', monto: 15990, fecha: `${añoActual}-${mesFormateado}-13` },
                { id: 3, tipo: 'venta', concepto: 'Venta: Set de Cucharas y Tenedores de Acero Inoxidable', monto: 9990, fecha: `${añoActual}-${mesFormateado}-13` },
                { id: 4, tipo: 'perdida', concepto: 'Pérdida (Caja dañada en envío): Set de Cucharas y Tenedores', monto: 9990, fecha: `${añoActual}-${mesFormateado}-13` },

                // --- DÍA 12 DE AGOSTO ---
                { id: 5, tipo: 'venta', concepto: 'Venta: Teclado Piano Digital de 61 Teclas', monto: 45990, fecha: `${añoActual}-${mesFormateado}-12` },
                { id: 6, tipo: 'venta', concepto: 'Venta: Peluche de Limbus Company (Mercancía Oficial)', monto: 22990, fecha: `${añoActual}-${mesFormateado}-12` },
                { id: 7, tipo: 'venta', concepto: 'Venta: Set de Figuras Coleccionables Lego', monto: 24990, fecha: `${añoActual}-${mesFormateado}-12` },
                { id: 8, tipo: 'venta', concepto: 'Venta: Peluche Coleccionable JoJo\'s Bizarre Adventure', monto: 21990, fecha: `${añoActual}-${mesFormateado}-12` },
                { id: 9, tipo: 'perdida', concepto: 'Pérdida (Costura defectuosa): Peluche de Pusheen Original 25cm', monto: 5000, fecha: `${añoActual}-${mesFormateado}-12` },

                // --- DÍA 10 DE AGOSTO ---
                { id: 10, tipo: 'venta', concepto: 'Venta: Set de Lápices de Colores Profesionales (48 Piezas)', monto: 12990, fecha: `${añoActual}-${mesFormateado}-10` },
                { id: 11, tipo: 'venta', concepto: 'Venta: Peluche de Pusheen Original 25cm', monto: 18990, fecha: `${añoActual}-${mesFormateado}-10` },
                { id: 12, tipo: 'venta', concepto: 'Venta: Audífonos Inalámbricos Bluetooth TWS', monto: 29990, fecha: `${añoActual}-${mesFormateado}-10` },
                { id: 13, tipo: 'venta', concepto: 'Venta: Parlante Pequeño Bluetooth Portátil', monto: 15990, fecha: `${añoActual}-${mesFormateado}-10` },
                { id: 14, tipo: 'venta', concepto: 'Venta: Set de Figuras Coleccionables Lego', monto: 24990, fecha: `${añoActual}-${mesFormateado}-10` },

                // --- DÍA 08 DE AGOSTO ---
                { id: 15, tipo: 'venta', concepto: 'Venta: Teclado Piano Digital de 61 Teclas', monto: 45990, fecha: `${añoActual}-${mesFormateado}-08` },
                { id: 16, tipo: 'venta', concepto: 'Venta: Peluche Coleccionable JoJo\'s Bizarre Adventure', monto: 21990, fecha: `${añoActual}-${mesFormateado}-08` },
                { id: 17, tipo: 'venta', concepto: 'Venta: Peluche de Limbus Company (Mercancía Oficial)', monto: 22990, fecha: `${añoActual}-${mesFormateado}-08` },
                { id: 18, tipo: 'perdida', concepto: 'Pérdida (Falla de fábrica en Bluetooth): Audífonos TWS', monto: 12000, fecha: `${añoActual}-${mesFormateado}-08` },

                // --- DÍA 05 DE AGOSTO ---
                { id: 19, tipo: 'venta', concepto: 'Venta: Set de Cucharas y Tenedores de Acero Inoxidable', monto: 9990, fecha: `${añoActual}-${mesFormateado}-05` },
                { id: 20, tipo: 'venta', concepto: 'Venta: Set de Lápices de Colores Profesionales (48 Piezas)', monto: 12990, fecha: `${añoActual}-${mesFormateado}-05` },
                { id: 21, tipo: 'venta', concepto: 'Venta: Peluche de Pusheen Original 25cm', monto: 18990, fecha: `${añoActual}-${mesFormateado}-05` },
                { id: 22, tipo: 'venta', concepto: 'Venta: Set de Figuras Coleccionables Lego', monto: 24990, fecha: `${añoActual}-${mesFormateado}-05` },

                // --- DÍA 02 DE AGOSTO ---
                { id: 23, tipo: 'venta', concepto: 'Venta: Teclado Piano Digital de 61 Teclas', monto: 45990, fecha: `${añoActual}-${mesFormateado}-02` },
                { id: 24, tipo: 'venta', concepto: 'Venta: Audífonos Inalámbricos Bluetooth TWS', monto: 29990, fecha: `${añoActual}-${mesFormateado}-02` },
                { id: 25, tipo: 'venta', concepto: 'Venta: Parlante Pequeño Bluetooth Portátil', monto: 15990, fecha: `${añoActual}-${mesFormateado}-02` },
                { id: 26, tipo: 'perdida', concepto: 'Pérdida (Caja dañada en traslado): Piano Digital', monto: 15000, fecha: `${añoActual}-${mesFormateado}-02` }
            ];

            AppStorage.saveData('transacciones', transacciones);
        }

        // 2. Filtrar transacciones del mes en curso
        const transaccionesMes = transacciones.filter(t => {
            const f = new Date(t.fecha);
            return f.getMonth() === mesActual && f.getFullYear() === añoActual;
        });

        const totalVentasMes = transaccionesMes
            .filter(t => t.tipo === 'venta')
            .reduce((acc, t) => acc + (Number(t.monto) || 0), 0);

        const totalPerdidasMes = transaccionesMes
            .filter(t => t.tipo === 'perdida')
            .reduce((acc, t) => acc + (Number(t.monto) || 0), 0);

        const balanceNetoMes = totalVentasMes - totalPerdidasMes;

        // 3. Agrupar por día
        const transaccionesPorDia = transaccionesMes.reduce((acc, t) => {
            if (!acc[t.fecha]) acc[t.fecha] = [];
            acc[t.fecha].push(t);
            return acc;
        }, {});

        const diasOrdenados = Object.keys(transaccionesPorDia).sort((a, b) => new Date(b) - new Date(a));

        // 4. HTML de los desplegables por días
        const desplegableDiasHTML = diasOrdenados.length === 0 
            ? `<div class="p-3 text-center text-muted fs-7">No hay transacciones registradas este mes.</div>`
            : diasOrdenados.map(fecha => {
                const movs = transaccionesPorDia[fecha];
                const ventasDia = movs.filter(t => t.tipo === 'venta').reduce((acc, t) => acc + (Number(t.monto) || 0), 0);
                const perdidasDia = movs.filter(t => t.tipo === 'perdida').reduce((acc, t) => acc + (Number(t.monto) || 0), 0);
                const netoDia = ventasDia - perdidasDia;

                const fechaObj = new Date(`${fecha}T00:00:00`);
                const fechaTexto = fechaObj.toLocaleDateString('es-CL', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                });

                const filasDetalle = movs.map(t => `
                    <tr>
                        <td class="align-middle fs-7 fw-semibold text-dark ps-3">
                            <i class="bi ${t.tipo === 'venta' ? 'bi-bag-check-fill text-success' : 'bi-exclamation-triangle-fill text-danger'} me-2"></i>
                            ${t.concepto}
                        </td>
                        <td class="align-middle">
                            <span class="pro-badge ${t.tipo === 'venta' ? 'badge-success' : 'badge-danger'} fs-8">
                                ${t.tipo === 'venta' ? 'Venta' : 'Pérdida'}
                            </span>
                        </td>
                        <td class="align-middle text-end pe-3 fs-7 fw-bold ${t.tipo === 'venta' ? 'text-success' : 'text-danger'}">
                            ${t.tipo === 'venta' ? '+' : '-'}${formatCurrency(t.monto)}
                        </td>
                    </tr>
                `).join('');

                return `
                    <details class="border-bottom">
                        <summary class="btn btn-light w-100 text-start py-2 px-3 d-flex justify-content-between align-items-center rounded-0 shadow-none border-0 user-select-none" style="cursor: pointer;">
                            <span class="fw-bold text-dark fs-7 text-capitalize">
                                <i class="bi bi-calendar-event me-2 text-primary"></i>${fechaTexto}
                            </span>
                            <div class="d-flex gap-3 fs-7 align-items-center">
                                <span class="text-success fw-bold">+${formatCurrency(ventasDia)}</span>
                                <span class="text-danger fw-bold">-${formatCurrency(perdidasDia)}</span>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle ms-2">Neto: ${formatCurrency(netoDia)}</span>
                            </div>
                        </summary>
                        <div class="bg-white border-top">
                            <table class="table table-sm table-hover align-middle mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fs-8 text-muted ps-3">Producto / Motivo</th>
                                        <th class="fs-8 text-muted">Tipo</th>
                                        <th class="fs-8 text-muted text-end pe-3">Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filasDetalle}
                                </tbody>
                            </table>
                        </div>
                    </details>
                `;
            }).join('');

        return `
            <div class="mb-4 fade-in">
                <h2 class="fw-bold text-dark mb-1">Panel de Control</h2>
                <p class="text-muted fs-7">Estado de los servicios integrados y dispositivos IoT.</p>
            </div>

            <div class="row g-4 fade-in mb-4">
                <!-- Cámara -->
                <div class="col-md-6 col-lg-3">
                    <div class="pro-card h-100 border-top border-success border-3">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="bg-light p-2 rounded text-muted"><i class="bi bi-camera-video fs-5"></i></div>
                            <span class="d-flex align-items-center gap-2 text-success fw-bold fs-7">
                                <i class="bi bi-circle-fill" style="font-size: 8px;"></i> Online
                            </span>
                        </div>
                        <h5 class="fw-bold mb-1 fs-6">Cámara CCTV</h5>
                        <p class="text-muted fs-7 mb-0">Transmisión activa</p>
                    </div>
                </div>

                <!-- Inventario -->
                <div class="col-md-6 col-lg-3">
                    <div class="pro-card h-100 border-top border-success border-3">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="bg-light p-2 rounded text-muted"><i class="bi bi-box-seam fs-5"></i></div>
                            <span class="d-flex align-items-center gap-2 text-success fw-bold fs-7">
                                <i class="bi bi-circle-fill" style="font-size: 8px;"></i> Sincronizado
                            </span>
                        </div>
                        <h5 class="fw-bold mb-1 fs-6">Base de Datos</h5>
                        <p class="text-muted fs-7 mb-0">Inventario actualizado</p>
                    </div>
                </div>

                <!-- IA -->
                <div class="col-md-6 col-lg-3">
                    <div class="pro-card h-100 border-top border-success border-3">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="bg-light p-2 rounded text-muted"><i class="bi bi-robot fs-5"></i></div>
                            <span class="d-flex align-items-center gap-2 text-success fw-bold fs-7">
                                <i class="bi bi-circle-fill" style="font-size: 8px;"></i> Disponible
                            </span>
                        </div>
                        <h5 class="fw-bold mb-1 fs-6">Motor IA Gemini</h5>
                        <p class="text-muted fs-7 mb-0">Latencia: 42ms</p>
                    </div>
                </div>

                <!-- Smart Scan -->
                <div class="col-md-6 col-lg-3">
                    <div class="pro-card h-100 border-top border-success border-3">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="bg-light p-2 rounded text-muted"><i class="bi bi-upc-scan fs-5"></i></div>
                            <span class="d-flex align-items-center gap-2 text-success fw-bold fs-7">
                                <i class="bi bi-circle-fill" style="font-size: 8px;"></i> Activo
                            </span>
                        </div>
                        <h5 class="fw-bold mb-1 fs-6">Lente Smart Scan</h5>
                        <p class="text-muted fs-7 mb-0">En espera de objetos</p>
                    </div>
                </div>
            </div>

            <!-- MENÚ PRINCIPAL DESPLEGABLE CON DETALLES DE BALANCE -->
            <details class="pro-card p-0 overflow-hidden mb-4 fade-in" open>
                <summary class="btn btn-white w-100 p-3 text-start border-0 d-flex flex-wrap justify-content-between align-items-center gap-2 user-select-none shadow-none" style="cursor: pointer;">
                    <div>
                        <h5 class="fw-bold text-dark mb-0 fs-6">
                            <i class="bi bi-pie-chart-fill me-2 text-primary"></i>Balance Mensual y Movimientos
                        </h5>
                        <small class="text-muted fs-8">Haz clic para abrir o cerrar el desglose</small>
                    </div>
                    <div class="d-flex gap-3 text-end align-items-center">
                        <div>
                            <span class="text-muted d-block fs-8">Ventas</span>
                            <span class="fw-bold text-success fs-7">+${formatCurrency(totalVentasMes)}</span>
                        </div>
                        <div>
                            <span class="text-muted d-block fs-8">Pérdidas</span>
                            <span class="fw-bold text-danger fs-7">-${formatCurrency(totalPerdidasMes)}</span>
                        </div>
                        <div>
                            <span class="text-muted d-block fs-8">Neto</span>
                            <span class="fw-bold ${balanceNetoMes >= 0 ? 'text-primary' : 'text-danger'} fs-7">
                                ${formatCurrency(balanceNetoMes)}
                            </span>
                        </div>
                    </div>
                </summary>

                <!-- CONTENIDO DESPLEGABLE CON LOS DÍAS -->
                <div class="border-top">
                    ${desplegableDiasHTML}
                </div>
            </details>
        `;
    }
};