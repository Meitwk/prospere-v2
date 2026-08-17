/**
 * js/settings.js
 * Módulo de Ajustes & Experiencia
 */

import { AppStorage } from './storage.js';

export const Settings = {
    async render() {
        const currentTheme = localStorage.getItem('app-theme') || 'dark';
        const currentColor = localStorage.getItem('app-color') || 'emerald';
        const isCompact = localStorage.getItem('app-compact') === 'true';
        const notiCorreo = localStorage.getItem('noti-correo') !== 'false';
        const notiStock = localStorage.getItem('noti-stock') !== 'false';
        const isCustomHex = currentColor.startsWith('#');

        return `
      <div class="container-fluid p-4 fade-in">
        <!-- Encabezado de la Sección -->
        <div class="mb-4">
          <h2 class="fw-bold mb-1" style="color: var(--text-main);">Ajustes & Experiencia</h2>
          <p class="small mb-0" style="color: var(--text-muted);">Personaliza la apariencia y el comportamiento de la interfaz.</p>
        </div>

        <!-- Grid a 2 Columnas -->
        <div class="row g-4">
          
          <!-- COLUMNA IZQUIERDA: Apariencia y Tema -->
          <div class="col-12 col-lg-6">
            <div class="pro-card h-100">
              <div class="d-flex align-items-center gap-2 mb-4" style="color: var(--brand-green);">
                <i class="bi bi-palette fs-5"></i>
                <h5 class="fw-bold mb-0">Apariencia y Tema</h5>
              </div>

              <!-- Modo de Pantalla (Segmented Toggle Control) -->
              <div class="mb-4">
                <label class="form-label fw-semibold small mb-2" style="color: var(--text-main);">Modo de Pantalla</label>
                <div class="btn-group w-100 p-1 rounded-3" style="background-color: var(--bg-app); border: 1px solid var(--border-color);" role="group">
                  <button type="button" 
                          class="btn btn-sm py-2 rounded-2 transition-all ${currentTheme === 'light' ? 'fw-bold shadow-sm' : 'border-0'}" 
                          id="btn-theme-light"
                          style="${currentTheme === 'light' ? 'background-color: var(--bg-card); color: var(--brand-green-dark);' : 'color: var(--text-muted);'}">
                    <i class="bi bi-sun me-1"></i> Claro
                  </button>
                  <button type="button" 
                          class="btn btn-sm py-2 rounded-2 transition-all ${currentTheme === 'dark' ? 'fw-bold shadow-sm' : 'border-0'}" 
                          id="btn-theme-dark"
                          style="${currentTheme === 'dark' ? 'background-color: var(--brand-green); color: #ffffff;' : 'color: var(--text-muted);'}">
                    <i class="bi bi-moon-stars me-1"></i> Oscuro
                  </button>
                </div>
              </div>

              <!-- Color de Acento Principal -->
              <div class="mb-4">
                <label class="form-label fw-semibold small mb-2 d-block" style="color: var(--text-main);">Color de Acento Principal</label>
                <div class="d-flex align-items-center gap-3">
                  <!-- Emerald (Verde Prospere Original #10B981) -->
                  <button type="button" 
                          class="btn btn-color-picker rounded-circle p-0 ${currentColor === 'emerald' ? 'active' : ''}" 
                          data-color="emerald" 
                          title="Verde Prospere"
                          style="background-color: #10B981; width: 36px; height: 36px; border: none;">
                  </button>

                  <!-- Ocean Blue -->
                  <button type="button" 
                          class="btn btn-color-picker rounded-circle p-0 ${currentColor === 'ocean' || currentColor === 'blue' ? 'active' : ''}" 
                          data-color="ocean" 
                          title="Azul Océano"
                          style="background-color: #3b82f6; width: 36px; height: 36px; border: none;">
                  </button>

                  <!-- Violet -->
                  <button type="button" 
                          class="btn btn-color-picker rounded-circle p-0 ${currentColor === 'purple' || currentColor === 'violet' ? 'active' : ''}" 
                          data-color="purple" 
                          title="Púrpura"
                          style="background-color: #8b5cf6; width: 36px; height: 36px; border: none;">
                  </button>

                  <!-- Sunset Amber -->
                  <button type="button" 
                          class="btn btn-color-picker rounded-circle p-0 ${currentColor === 'sunset' || currentColor === 'amber' ? 'active' : ''}" 
                          data-color="sunset" 
                          title="Naranja Atardecer"
                          style="background-color: #f59e0b; width: 36px; height: 36px; border: none;">
                  </button>

                  <!-- Rueda de Color Libre -->
                  <input type="color" 
                         id="custom-color-picker" 
                         class="form-control form-control-color p-0 ms-1" 
                         value="${isCustomHex ? currentColor : '#10B981'}" 
                         title="Elegir tono personalizado" 
                         style="cursor: pointer; width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-color);">
                </div>
              </div>

              <!-- Modo Compacto -->
              <div class="p-3 rounded-3 d-flex align-items-center justify-content-between" style="background-color: var(--bg-app); border: 1px solid var(--border-color);">
                <div>
                  <h6 class="mb-0 fw-semibold fs-7" style="color: var(--text-main);">Modo Compacto</h6>
                  <small style="color: var(--text-muted); font-size: 0.75rem;">Reduce los márgenes para ver más elementos.</small>
                </div>
                <div class="form-check form-switch fs-5 mb-0">
                  <input class="form-check-input" type="checkbox" role="switch" id="compact-toggle" ${isCompact ? 'checked' : ''}>
                </div>
              </div>

            </div>
          </div>

          <!-- COLUMNA DERECHA: Notificaciones & Cuenta -->
          <div class="col-12 col-lg-6 d-flex flex-column gap-4">
            
            <!-- Notificaciones -->
            <div class="pro-card">
              <div class="d-flex align-items-center gap-2 mb-3" style="color: var(--brand-green);">
                <i class="bi bi-sliders fs-5"></i>
                <h5 class="fw-bold mb-0">Notificaciones</h5>
              </div>

              <!-- Notificaciones por Correo -->
              <div class="p-3 rounded-3 d-flex align-items-center justify-content-between mb-3" style="background-color: var(--bg-app); border: 1px solid var(--border-color);">
                <div>
                  <h6 class="mb-0 fw-semibold fs-7" style="color: var(--text-main);">Notificaciones por Correo</h6>
                  <small style="color: var(--text-muted); font-size: 0.75rem;">Recibir reportes financieros semanales.</small>
                </div>
                <div class="form-check form-switch fs-5 mb-0">
                  <input class="form-check-input" type="checkbox" role="switch" id="noti-correo-toggle" ${notiCorreo ? 'checked' : ''}>
                </div>
              </div>

              <!-- Alertas de Stock -->
              <div class="p-3 rounded-3 d-flex align-items-center justify-content-between" style="background-color: var(--bg-app); border: 1px solid var(--border-color);">
                <div>
                  <h6 class="mb-0 fw-semibold fs-7" style="color: var(--text-main);">Alertas de Stock</h6>
                  <small style="color: var(--text-muted); font-size: 0.75rem;">Avisar cuando queden menos de 5 unidades.</small>
                </div>
                <div class="form-check form-switch fs-5 mb-0">
                  <input class="form-check-input" type="checkbox" role="switch" id="noti-stock-toggle" ${notiStock ? 'checked' : ''}>
                </div>
              </div>
            </div>

            <!-- Cuenta y Seguridad -->
            <div class="pro-card">
              <div class="d-flex align-items-center gap-2 mb-3 text-danger">
                <i class="bi bi-shield-lock fs-5"></i>
                <h5 class="fw-bold mb-0">Cuenta y Seguridad</h5>
              </div>

              <button type="button" class="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-pill" id="btn-logout">
                <i class="bi bi-box-arrow-in-right"></i>
                <span>Cerrar Sesión</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    `;
    },

    initEvents() {
        // 1. Selector de Tema Claro / Oscuro
        const btnLight = document.getElementById('btn-theme-light');
        const btnDark = document.getElementById('btn-theme-dark');

        const setTheme = (theme) => {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('app-theme', theme);
            window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'ajustes' }));
        };

        if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));
        if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));

        // 2. Modo Compacto
        const compactToggle = document.getElementById('compact-toggle');
        if (compactToggle) {
            compactToggle.addEventListener('change', (e) => {
                const active = e.target.checked;
                document.body.classList.toggle('compact-mode', active);
                localStorage.setItem('app-compact', active ? 'true' : 'false');
            });
        }

        // 3. Colores de Acento Predeterminados
        const colorBtns = document.querySelectorAll('.btn-color-picker');
        colorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chosenColor = e.currentTarget.getAttribute('data-color');

                // Si elige Emerald, nos aseguramos de limpiar overrides de variables personalizadas
                document.documentElement.style.removeProperty('--primary-color');

                document.body.setAttribute('data-color', chosenColor);
                localStorage.setItem('app-color', chosenColor);

                colorBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // 4. Color Personalizado con Rueda Libre
        const colorPicker = document.getElementById('custom-color-picker');
        if (colorPicker) {
            colorPicker.addEventListener('input', (e) => {
                const hexColor = e.target.value;
                document.documentElement.style.setProperty('--primary-color', hexColor);
                document.body.setAttribute('data-color', 'custom');
                localStorage.setItem('app-color', hexColor);

                colorBtns.forEach(b => b.classList.remove('active'));
            });
        }

        // 5. Preferencias de Notificaciones
        const notiCorreoToggle = document.getElementById('noti-correo-toggle');
        if (notiCorreoToggle) {
            notiCorreoToggle.addEventListener('change', (e) => {
                localStorage.setItem('noti-correo', e.target.checked ? 'true' : 'false');
            });
        }

        const notiStockToggle = document.getElementById('noti-stock-toggle');
        if (notiStockToggle) {
            notiStockToggle.addEventListener('change', (e) => {
                localStorage.setItem('noti-stock', e.target.checked ? 'true' : 'false');
            });
        }

        // 6. Botón para Cerrar Sesión
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                    localStorage.clear();
                    window.location.reload();
                }
            });
        }
    }
};