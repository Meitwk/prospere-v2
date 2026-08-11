/**
 * js/main.js
 * Controlador principal y Orquestador de la Single Page Application (SPA).
 */
import { AppStorage } from './storage.js';
import { Dashboard } from './dashboard.js';
import { ChatAI } from './chat.js';
import { Academy } from './academy.js';
import { SmartScan } from './scanner.js';
import { ControlPanel } from './panel.js';
import { Profile } from './profile.js';
import { Settings } from './settings.js';

document.addEventListener('DOMContentLoaded', async () => {
    const viewContainer = document.getElementById('view-container');
    const navButtons = document.querySelectorAll('.nav-btn');
    const userNameDisplay = document.getElementById('user-name-display');

    // 1. Inicializar Base de Datos (Cargar JSONs a LocalStorage)
    await AppStorage.init();

    // 2. Actualizar Nombre de Usuario en el Header superior
    const dashData = AppStorage.getData('dashboard');
    if (dashData && dashData.usuario) {
        // Muestra solo el primer nombre para mantener el diseño limpio
        userNameDisplay.textContent = dashData.usuario.nombre.split(' ')[0];
    }

    // 3. Sistema de Notificaciones (Inyectar Offcanvas oculto dinámicamente)
    const renderNotificationsPanel = async () => {
        let perfilData = AppStorage.getData('perfil');
        if (!perfilData) {
            try {
                perfilData = await fetch('json/perfil.json').then(res => res.json());
            } catch (e) {
                console.warn('Advertencia: No se pudo cargar perfil.json');
                perfilData = { notificaciones: [] };
            }
        }
        
        const notis = perfilData.notificaciones || [];
        
        if(!document.getElementById('offcanvasNotifications')) {
            const offcanvasHTML = `
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNotifications" aria-labelledby="offcanvasNotificationsLabel">
                    <div class="offcanvas-header border-bottom">
                        <h5 class="offcanvas-title fw-bold" id="offcanvasNotificationsLabel">Notificaciones</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                    </div>
                    <div class="offcanvas-body p-0">
                        <div class="list-group list-group-flush">
                            ${notis.length > 0 ? notis.map(n => `
                                <div class="list-group-item list-group-item-action p-3">
                                    <div class="d-flex gap-3">
                                        <div class="text-${n.tipo} fs-4"><i class="bi ${n.icono}"></i></div>
                                        <div>
                                            <h6 class="mb-1 fw-bold fs-7">${n.titulo}</h6>
                                            <p class="mb-1 text-muted fs-7">${n.mensaje}</p>
                                            <small class="text-muted fs-8">${n.tiempo}</small>
                                        </div>
                                    </div>
                                </div>
                            `).join('') : '<div class="p-4 text-center text-muted">No tienes notificaciones nuevas.</div>'}
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('modal-container').innerHTML += offcanvasHTML;
        }
    };
    await renderNotificationsPanel();

    // 4. Sistema de Enrutamiento y Renderizado (Router)
    const loadView = (viewName) => {
        // Efecto visual de carga muy breve para mejorar la percepción de velocidad
        viewContainer.innerHTML = `
            <div class="text-center py-5 text-muted fade-in">
                <div class="spinner-border spinner-border-sm text-success me-2" role="status"></div>
                <span>Cargando...</span>
            </div>
        `;

        setTimeout(() => {
            switch (viewName) {
                /* --- Módulos Principales --- */
                case 'dashboard':
                    viewContainer.innerHTML = Dashboard.render();
                    Dashboard.initEvents();
                    break;
                case 'academy':
                    viewContainer.innerHTML = Academy.render();
                    break;
                case 'ai':
                    ChatAI.render().then(html => {
                        viewContainer.innerHTML = html;
                        ChatAI.initEvents();
                    });
                    break;
                case 'smartscan':
                    viewContainer.innerHTML = SmartScan.render();
                    SmartScan.initEvents();
                    break;
                
                /* --- Módulos de Sistema y Usuario --- */
                case 'panel':
                    viewContainer.innerHTML = ControlPanel.render();
                    break;
                case 'perfil':
                    Profile.render().then(html => viewContainer.innerHTML = html);
                    break;
                case 'ajustes':
                    Settings.render().then(html => viewContainer.innerHTML = html);
                    break;

                /* --- Módulos en Construcción (Desde Accesos Rápidos) --- */
                case 'canvas':
                    viewContainer.innerHTML = `<div class="pro-card fade-in"><h4 class="text-success"><i class="bi bi-grid-1x2 me-2"></i>Business Model Canvas</h4><p class="text-muted">Módulo de modelo de negocios en desarrollo...</p></div>`;
                    break;
                case 'finanzas':
                    viewContainer.innerHTML = `<div class="pro-card fade-in"><h4 class="text-primary"><i class="bi bi-calculator me-2"></i>Calculadora Financiera</h4><p class="text-muted">Módulo de márgenes e impuestos en desarrollo...</p></div>`;
                    break;
                case 'inventario':
                    viewContainer.innerHTML = `<div class="pro-card fade-in"><h4 class="text-warning"><i class="bi bi-box-seam me-2"></i>Gestión de Inventario</h4><p class="text-muted">Módulo de control de stock en desarrollo...</p></div>`;
                    break;
                case 'catalogo':
                    viewContainer.innerHTML = `<div class="pro-card fade-in"><h4 class="text-purple"><i class="bi bi-bag me-2"></i>Catálogo de Productos</h4><p class="text-muted">Módulo de vitrina virtual en desarrollo...</p></div>`;
                    break;
                
                /* --- Fallback de Seguridad --- */
                default:
                    viewContainer.innerHTML = `<div class="alert alert-warning">La vista "${viewName}" no existe o está en mantenimiento.</div>`;
            }
        }, 150); // 150ms de latencia simulada
    };

    // 5. Escuchar clics directos de la Navegación (Sidebar)
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetView = e.currentTarget.getAttribute('data-view');
            window.dispatchEvent(new CustomEvent('cambiarVista', { detail: targetView }));
        });
    });

    // 6. Bus Global de Navegación (Reacciona cuando otro módulo pide cambiar de pantalla)
    window.addEventListener('cambiarVista', (e) => {
        const viewToLoad = e.detail;
        
        // 6.1 Actualizar visualmente el menú activo (si el botón existe ahí)
        navButtons.forEach(b => b.classList.remove('active'));
        const relatedNavBtn = document.querySelector(`.nav-btn[data-view="${viewToLoad}"]`);
        if (relatedNavBtn) relatedNavBtn.classList.add('active');
        
        // 6.2 Cargar la vista en el contenedor central
        loadView(viewToLoad);
    });

    // 7. Eventos de los Botones Estáticos del Sistema
    
    // 7.1 Botón de Campana (Notificaciones)
    const bellBtn = document.querySelector('button[aria-label="Notificaciones"]');
    if (bellBtn) {
        bellBtn.addEventListener('click', () => {
            const offcanvasEl = document.getElementById('offcanvasNotifications');
            if (offcanvasEl && typeof bootstrap !== 'undefined') {
                const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
                bsOffcanvas.show();
            }
        });
    }

    // 7.2 Botón de Nombre (Perfil)
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'perfil' }));
        });
    }

    // 7.3 Botón de Engranaje (Ajustes) - Ubicado al final del menú lateral
    const configBtn = document.getElementById('btn-sidebar-ajustes');
    if (configBtn) {
        configBtn.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'ajustes' }));
        });
    }

    // 8. Inicialización: Arrancar la aplicación cargando el Dashboard por defecto
    loadView('dashboard');
});