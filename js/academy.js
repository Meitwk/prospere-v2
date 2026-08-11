/**
 * js/academy.js
 * Módulo de Educación. Renderiza la lista de cursos y su progreso.
 */
import { AppStorage } from './storage.js';

export const Academy = {
    render() {
        const cursos = AppStorage.getData('cursos');

        if (!cursos || cursos.length === 0) {
            return `<div class="alert alert-warning">No hay cursos disponibles en este momento.</div>`;
        }

        // Dividimos los cursos en dos secciones: En curso/No iniciados y Completados
        const activos = cursos.filter(c => c.estado !== 'Completado');
        const completados = cursos.filter(c => c.estado === 'Completado');

        return `
            <div class="mb-4 fade-in">
                <h2 class="fw-bold text-dark mb-1">Academia Tech</h2>
                <p class="text-muted fs-7">Sigue tu ruta de aprendizaje y mejora tus habilidades.</p>
            </div>

            <!-- Cursos Activos -->
            <h4 class="h6 fw-bold mb-3 fade-in mt-4">Continuar Aprendiendo</h4>
            <div class="row g-4 mb-5 fade-in">
                ${activos.map(curso => this.buildCourseCard(curso)).join('')}
            </div>

            <!-- Cursos Completados -->
            ${completados.length > 0 ? `
                <h4 class="h6 fw-bold mb-3 fade-in">Completados</h4>
                <div class="row g-4 fade-in opacity-75">
                    ${completados.map(curso => this.buildCourseCard(curso)).join('')}
                </div>
            ` : ''}
        `;
    },

    /**
     * Construye el HTML de una tarjeta de curso individual
     */
    buildCourseCard(curso) {
        const btnText = curso.progreso_porcentaje > 0 ? 'Continuar' : 'Comenzar';
        const isCompleted = curso.estado === 'Completado';
        
        return `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="pro-card h-100 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="pro-badge bg-light text-dark border">
                            <i class="bi bi-tag-fill text-muted me-1"></i> ${curso.categoria}
                        </span>
                        <div class="bg-light p-2 rounded-3 fs-5 ${curso.color_icono}">
                            <i class="bi ${curso.icono}"></i>
                        </div>
                    </div>
                    
                    <h5 class="fw-bold mb-2">${curso.titulo}</h5>
                    <p class="text-muted fs-7 flex-grow-1">${curso.descripcion}</p>
                    
                    <div class="mt-auto pt-3">
                        <div class="d-flex justify-content-between fs-7 mb-2 fw-medium">
                            <span class="${isCompleted ? 'text-success' : 'text-muted'}">
                                ${curso.estado}
                            </span>
                            <span>${curso.progreso_porcentaje}%</span>
                        </div>
                        
                        <!-- Barra de Progreso (Bootstrap customizada en CSS) -->
                        <div class="progress pro-progress mb-3">
                            <div class="progress-bar pro-progress-bar" 
                                 role="progressbar" 
                                 style="width: ${curso.progreso_porcentaje}%;" 
                                 aria-valuenow="${curso.progreso_porcentaje}" 
                                 aria-valuemin="0" 
                                 aria-valuemax="100">
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted fs-8">
                                <i class="bi bi-clock me-1"></i> ${curso.tiempo_restante}
                            </span>
                            <button class="btn btn-sm ${isCompleted ? 'btn-outline-success' : 'btn-success'} rounded-pill px-3 fw-bold">
                                ${isCompleted ? 'Repasar' : btnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};