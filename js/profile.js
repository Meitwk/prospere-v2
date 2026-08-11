/**
 * js/profile.js
 * Módulo exclusivo del Perfil de Usuario.
 */
import { AppStorage } from './storage.js';

export const Profile = {
    async render() {
        let perfil = AppStorage.getData('perfil');
        if (!perfil) perfil = await fetch('json/perfil.json').then(res => res.json()).catch(() => null);

        if(!perfil) return `<div class="alert alert-danger">Error cargando perfil.</div>`;

        const data = perfil.datos_personales;
        const stats = perfil.estadisticas;

        return `
            <div class="mb-4 fade-in">
                <h2 class="fw-bold text-dark mb-1">Mi Cuenta</h2>
                <p class="text-muted fs-7">Gestiona tu información personal profesional.</p>
            </div>

            <div class="row fade-in">
                <!-- Columna Izquierda: Tarjeta Resumen -->
                <div class="col-md-4 mb-4">
                    <div class="pro-card text-center">
                        <div class="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle mb-3" style="width: 80px; height: 80px; font-size: 2rem;">
                            <b>${data.nombre_completo.charAt(0)}</b>
                        </div>
                        <h4 class="h5 fw-bold mb-1">${data.nombre_completo}</h4>
                        <p class="text-muted fs-7 mb-3">${data.rol}</p>
                        <p class="text-muted fs-7"><i class="bi bi-geo-alt-fill text-danger me-1"></i> ${data.ubicacion}</p>
                        <hr class="my-3">
                        <div class="d-flex justify-content-around text-center">
                            <div>
                                <h5 class="fw-bold text-dark mb-0">${stats.proyectos_activos}</h5>
                                <small class="text-muted fs-8">Proyectos</small>
                            </div>
                            <div>
                                <h5 class="fw-bold text-dark mb-0">${stats.horas_aprendizaje}h</h5>
                                <small class="text-muted fs-8">Aprendizaje</small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Columna Derecha: Formulario -->
                <div class="col-md-8">
                    <div class="pro-card">
                        <h5 class="fw-bold mb-4">Datos Personales</h5>
                        <form id="form-perfil">
                            <div class="mb-3">
                                <label class="form-label text-muted fs-7 fw-bold">Nombre Completo</label>
                                <input type="text" class="form-control bg-light" value="${data.nombre_completo}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-muted fs-7 fw-bold">Correo Electrónico</label>
                                <input type="email" class="form-control bg-light" value="${data.email}">
                            </div>
                            <div class="mb-4">
                                <label class="form-label text-muted fs-7 fw-bold">Biografía</label>
                                <textarea class="form-control bg-light" rows="4">${data.biografia}</textarea>
                            </div>
                            <button type="button" class="btn btn-success rounded-pill px-4 fw-bold w-100 w-md-auto">
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
};