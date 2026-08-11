/**
 * js/settings.js
 * Módulo exclusivo de Ajustes del Sistema.
 */
import { AppStorage } from './storage.js';

export const Settings = {
    async render() {
        let perfil = AppStorage.getData('perfil');
        if (!perfil) perfil = await fetch('json/perfil.json').then(res => res.json()).catch(() => null);
        
        const conf = perfil ? perfil.ajustes : { notificaciones_email: true, alertas_stock: true };

        return `
            <div class="mb-4 fade-in">
                <h2 class="fw-bold text-dark mb-1">Ajustes del Sistema</h2>
                <p class="text-muted fs-7">Configura las preferencias globales de tu aplicación.</p>
            </div>

            <div class="row fade-in">
                <div class="col-md-8 col-lg-6">
                    <div class="pro-card">
                        <h5 class="h6 fw-bold mb-4 text-success"><i class="bi bi-sliders me-2"></i> Preferencias</h5>
                        
                        <div class="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded border border-light">
                            <div>
                                <span class="d-block fw-bold fs-7">Notificaciones por Correo</span>
                                <small class="text-muted fs-8">Recibir reportes financieros semanales.</small>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input fs-5" type="checkbox" role="switch" ${conf.notificaciones_email ? 'checked' : ''}>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded border border-light">
                            <div>
                                <span class="d-block fw-bold fs-7">Alertas de Stock</span>
                                <small class="text-muted fs-8">Avisar cuando queden menos de 5 unidades.</small>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input fs-5" type="checkbox" role="switch" ${conf.alertas_stock ? 'checked' : ''}>
                            </div>
                        </div>

                        <hr class="my-4">
                        
                        <h5 class="h6 fw-bold mb-3 text-danger"><i class="bi bi-shield-lock me-2"></i> Cuenta y Seguridad</h5>
                        <button type="button" class="btn btn-outline-danger rounded-pill px-4 fw-bold w-100 text-start">
                            <i class="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};