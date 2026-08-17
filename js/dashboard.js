/**

 * js/dashboard.js

 * Renderiza la vista principal del Panel de Inicio.

 */

import { AppStorage } from './storage.js';

import { formatCurrency } from './utils.js';



export const Dashboard = {

    render() {

        const data = AppStorage.getData('dashboard');



        if (!data) {

            return `<div class="alert alert-danger">Error: No se pudieron cargar los datos del Dashboard.</div>`;

        }

        



        return `

            <!-- Encabezado del Dashboard -->

            <div class="mb-4 fade-in">

                <h2 class="fw-bold text-dark mb-0">Hola, ${data.usuario.nombre} 👋</h2>

                <p class="text-muted fs-7">Emprendimiento: <span class="text-success fw-medium">${data.usuario.emprendimiento}</span></p>

            </div>



            <!-- Tarjeta Principal de Rendimiento -->

            <div class="pro-card mb-4 fade-in">

                <div class="row align-items-center">

                    <div class="col-md-7 border-md-end mb-3 mb-md-0">

                        <div class="d-flex align-items-start gap-3">

                            <div class="bg-success bg-opacity-10 text-success p-3 rounded-4 fs-3">

                                <i class="bi bi-graph-up-arrow"></i>

                            </div>

                            <div>

                                <p class="text-muted mb-1 fs-7">Rendimiento Hoy</p>

                                <h3 class="fw-bold mb-1">+${formatCurrency(data.rendimiento_hoy.ganancia_dia)}</h3>

                                <p class="text-muted fs-7 mb-2">Ganancia Día</p>

                                <span class="pro-badge badge-success">

                                    <i class="bi bi-check-circle-fill"></i> ${data.rendimiento_hoy.estado}

                                </span>

                            </div>

                        </div>

                    </div>

                    <div class="col-md-5 ps-md-4">

                        <p class="text-muted fs-7 fw-medium mb-3">Resumen rápido</p>

                        <div class="d-flex justify-content-between mb-2 fs-7">

                            <span class="text-muted"><i class="bi bi-bag text-success me-2"></i> Ventas Hoy</span>

                            <span class="fw-bold">${formatCurrency(data.rendimiento_hoy.ventas_hoy)}</span>

                        </div>

                        <div class="d-flex justify-content-between mb-2 fs-7">

                            <span class="text-muted"><i class="bi bi-cart3 text-primary me-2"></i> Pedidos</span>

                            <span class="fw-bold">${data.rendimiento_hoy.pedidos}</span>

                        </div>

                        <div class="d-flex justify-content-between fs-7">

                            <span class="text-muted"><i class="bi bi-people text-purple me-2"></i> Clientes</span>

                            <span class="fw-bold">${data.rendimiento_hoy.clientes}</span>

                        </div>

                    </div>

                </div>

            </div>



            <!-- Banner IA -->

            <div class="ai-banner mb-4 fade-in pro-card-interactive" id="btn-quick-ai">

                <div>

                    <h3 class="h5 mb-1"><i class="bi bi-stars me-2"></i>¿Tienes una duda rápida?</h3>

                    <p class="mb-0 fs-7 opacity-75">Pregúntale a tu mentor IA sobre impuestos, precios o estrategias.</p>

                </div>

                <button class="btn btn-light rounded-pill px-3 py-2 text-success fw-bold d-none d-sm-block">

                    <i class="bi bi-chat-dots me-2"></i> Preguntar ahora

                </button>

            </div>



           

            <!-- Accesos Rápidos (Filtrado sin Canvas) -->

            <h4 class="h6 fw-bold mb-3 fade-in">Accesos Rápidos</h4>

            <div class="quick-access-grid mb-4 fade-in">

                ${data.accesos_rapidos

                    .filter(item => item.id !== 'canvas')

                    .map(item => `

                    <button class="quick-btn" data-view="${item.id}">

                        <div class="quick-icon-wrapper">

                            <i class="bi ${item.icono} ${item.color_clase}"></i>

                        </div>

                        <span>${item.nombre}</span>

                    </button>

                `).join('')}

            </div>

           

        `;

    },



    /**

     * Inicializa la interactividad de la vista actual

     */

    initEvents() {

        // 1. Clic en el Banner Verde de la IA

        const btnQuickAi = document.getElementById('btn-quick-ai');

        if (btnQuickAi) {

            btnQuickAi.addEventListener('click', () => {

                const navAiBtn = document.querySelector('.nav-btn[data-view="ai"]');

                if (navAiBtn) navAiBtn.click();

            });

        }



        // 2. Clic en los botones de "Accesos Rápidos"

        const quickBtns = document.querySelectorAll('.quick-btn');

        quickBtns.forEach(btn => {

            btn.addEventListener('click', (e) => {

                const targetView = e.currentTarget.getAttribute('data-view');

               

                // Disparamos un evento global avisando que queremos cambiar de pantalla

                window.dispatchEvent(new CustomEvent('cambiarVista', { detail: targetView }));

            });

        });

    }

}; 

