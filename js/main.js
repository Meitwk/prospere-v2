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
import { FinanceModule } from './finanzas.js';
import { Catalog } from './catalog.js';
import { Inventory } from './inventory.js';


document.addEventListener('DOMContentLoaded', async () => {
  const viewContainer = document.getElementById('view-container');
  const navButtons = document.querySelectorAll('.nav-btn');
  const userNameDisplay = document.getElementById('user-name-display');

// 1. Inicializar Base de Datos (Cargar JSONs a LocalStorage)
  await AppStorage.init();

// --- RESTAURAR PREFERENCIAS DE TEMA Y APARIENCIA ---
const savedTheme = localStorage.getItem('app-theme') || 'dark';
  const savedColor = localStorage.getItem('app-color') || 'emerald';

  document.body.setAttribute('data-theme', savedTheme);

  // Si el color es un Hexadecimal (#) de la rueda de color, lo aplicamos a CSS directamente
  if (savedColor.startsWith('#')) {
    document.body.setAttribute('data-color', 'custom');
    document.documentElement.style.setProperty('--primary-color', savedColor);
  } else {
    document.body.setAttribute('data-color', savedColor);
  }

  if (localStorage.getItem('app-compact') === 'true') {
    document.body.classList.add('compact-mode');
  }

  // 2. Actualizar Nombre de Usuario en el Header superior
  const dashData = AppStorage.getData('dashboard');
  if (dashData && dashData.usuario) {
    userNameDisplay.textContent = dashData.usuario.nombre.split(' ')[0];
  }

  // 3. Sistema de Notificaciones
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
    if (!document.getElementById('offcanvasNotifications')) {
      const offcanvasHTML = `
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNotifications" aria-labelledby="offcanvasNotificationsLabel">
          <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title fw-bold" id="offcanvasNotificationsLabel">Notificaciones</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            ${notis.length > 0 ? notis.map(n => `
              <div class="p-2 mb-2 border-bottom">
                <h6 class="mb-1 fw-bold fs-7">${n.titulo}</h6>
                <p class="mb-1 text-muted small">${n.mensaje}</p>
                <small class="text-body-tertiary" style="font-size:0.75rem;">${n.tiempo}</small>
              </div>
            `).join('') : '<p class="text-muted small">No tienes notificaciones nuevas.</p>'}
          </div>
        </div>
      `;
      const modalContainer = document.getElementById('modal-container');
      if (modalContainer) modalContainer.innerHTML += offcanvasHTML;
    }
  };
  await renderNotificationsPanel();

  // 4. Sistema de Enrutamiento y Renderizado (Router)
  const loadView = (viewName) => {
    viewContainer.innerHTML = `<div class="p-4 text-center text-muted">Cargando...</div>`;

    setTimeout(() => {
      switch (viewName) {
        /* --- Módulos Principales --- */
        case 'dashboard':
          viewContainer.innerHTML = Dashboard.render();
          Dashboard.initEvents();
          break;

        case 'academy':
        viewContainer.innerHTML = Academy.render();
        Academy.initEvents(); // <-- ¡ESTO HACE QUE LOS BOTONES FUNCIONEN!
        break;

case 'ia': // <-- SOLO AGREGA ESTA LÍNEA
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

        case 'inventario':
          Inventory.render().then(html => {
            viewContainer.innerHTML = html;
            Inventory.initEvents();
          });
          break;

        /* --- Módulos de Sistema y Usuario --- */
        case 'panel':
          viewContainer.innerHTML = ControlPanel.render();
          break;

        case 'perfil':
          Profile.render().then(html => viewContainer.innerHTML = html);
          break;

        case 'ajustes':
          Settings.render().then(html => {
            viewContainer.innerHTML = html;
            Settings.initEvents(); // <-- AGREGA ESTA LÍNEA AQUÍ
          });
          break;

        /* --- Módulos en Construcción --- */
        case 'finanzas':
        viewContainer.innerHTML = FinanceModule.render();
        FinanceModule.initEvents();
        break;

        case 'catalogo':
            Catalog.render().then(html => {
            viewContainer.innerHTML = html;
            Catalog.initEvents();
          });
        break;

        default:
          viewContainer.innerHTML = `<div class="p-4">La vista "${viewName}" no existe o está en mantenimiento.</div>`;
      }
    }, 150);
  };

  // 5. Escuchar clics directos de la Navegación (Sidebar)
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetView = e.currentTarget.getAttribute('data-view');
      window.dispatchEvent(new CustomEvent('cambiarVista', { detail: targetView }));
    });
  });

  // 6. Bus Global de Navegación
  window.addEventListener('cambiarVista', (e) => {
    const viewToLoad = e.detail;
    navButtons.forEach(b => b.classList.remove('active'));
    const relatedNavBtn = document.querySelector(`.nav-btn[data-view="${viewToLoad}"]`);
    if (relatedNavBtn) relatedNavBtn.classList.add('active');

    loadView(viewToLoad);
  });

  // 7. Eventos de los Botones Estáticos
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

  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'perfil' }));
    });
  }

  const configBtn = document.getElementById('btn-sidebar-ajustes');
  if (configBtn) {
    configBtn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'ajustes' }));
    });
  }

  // 8. Cargar Dashboard por defecto
  loadView('dashboard');
});


// Ejemplo en tu app.js al cambiar de módulo o cargar el panel:
const app = document.getElementById('app');
app.innerHTML = ControlPanel.render();
ControlPanel.initEvents(); // <-- ¡Llama a esta función para activar los clics de los desplegables!