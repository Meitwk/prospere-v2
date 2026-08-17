/**
 * js/academy.js
 * Módulo de Educación interactivo con guardado y re-render garantizado
 */
import { AppStorage } from './storage.js';

export const Academy = {
    coursesLessons: {
        'c_canvas_01': [
            {
                numero: 1,
                titulo: '1. Los Bloques Centrales del Canvas',
                duracion: '5 min',
                objetivos: ['Identificar la Propuesta de Valor', 'Conocer la Segmentación de Clientes'],
                teoria: `<p class="fs-7">El Business Model Canvas organiza la estrategia en 9 bloques. Los dos pilares de inicio son la <strong>Propuesta de Valor</strong> (qué problema resuelves) y el <strong>Segmento de Clientes</strong> (a quién ayudas).</p>`,
                pregunta: '¿Cuál es el punto de partida fundamental al diseñar un Canvas?',
                opciones: ['Definir la Propuesta de Valor y el Cliente', 'Escribir la política de privacidad', 'Comprar el dominio web'],
                correcta: 0
            },
            {
                numero: 2,
                titulo: '2. Canales y Relación con Clientes',
                duracion: '5 min',
                objetivos: ['Diferenciar canales directos e indirectos', 'Diseñar la estrategia de retención'],
                teoria: `<p class="fs-7">Los <strong>Canales</strong> definen cómo entregas tu producto. La <strong>Relación</strong> define cómo interactúas con los clientes.</p>`,
                pregunta: '¿Qué bloque determina la forma en que el producto llega al comprador?',
                opciones: ['Estructura de Costos', 'Canales de Distribución', 'Socios Clave'],
                correcta: 1
            },
            {
                numero: 3,
                titulo: '3. Viabilidad Financiera (Costos e Ingresos)',
                duracion: '6 min',
                objetivos: ['Estructurar las fuentes de ingreso', 'Mapear la estructura de costos fijos y variables'],
                teoria: `<p class="fs-7">La parte inferior del Canvas balancea los <strong>Flujos de Ingreso</strong> contra la <strong>Estructura de Costos</strong>.</p>`,
                pregunta: '¿Qué garantiza que el modelo sea financieramente sostenible?',
                opciones: ['Que los ingresos superen la estructura de costos', 'Tener muchos seguidores en redes', 'Tener un logo llamativo'],
                correcta: 0
            }
        ],
        'c_finanzas_02': [
            {
                numero: 1,
                titulo: '1. Introducción al Flujo de Caja',
                duracion: '5 min',
                objetivos: ['Entender la liquidez real', 'Diferenciar facturación de cobro'],
                teoria: `<p class="fs-7">El Flujo de Caja mide el dinero líquido disponible. Facturar no es lo mismo que tener el dinero cobrado en cuenta.</p>`,
                pregunta: '¿Qué representa el Flujo de Caja en la Pyme?',
                opciones: ['El dinero efectivo y disponible en cuentas', 'La proyección de ventas teóricas del año', 'El inventario acumulado'],
                correcta: 0
            },
            {
                numero: 2,
                titulo: '2. Control de Egresos Operativos',
                duracion: '5 min',
                objetivos: ['Clasificar costos fijos y variables', 'Optimizar compras'],
                teoria: `<p class="fs-7">Identificar egresos críticos ayuda a recortar gastos superfluos antes de tener problemas de liquidez.</p>`,
                pregunta: '¿Cuál es un ejemplo de costo fijo operativo?',
                opciones: ['El alquiler del local comercial', 'Comisiones por ventas variables', 'Envíos por paquetería'],
                correcta: 0
            },
            {
                numero: 3,
                titulo: '3. El Fondo de Reserva Financiero',
                duracion: '5 min',
                objetivos: ['Calcular el colchón de seguridad', 'Proteger el negocio ante crisis'],
                teoria: `<p class="fs-7">Se recomienda contar con al menos 3 a 6 meses de costos fijos operacionales guardados como reserva de emergencia.</p>`,
                pregunta: '¿De cuánto debería ser idealmente la reserva mínima de emergencia?',
                opciones: ['De 3 a 6 meses de costos fijos', 'De 1 semana de ventas', 'No se requiere reserva'],
                correcta: 0
            }
        ],
        'c_web_03': [
            {
                numero: 1,
                titulo: '1. La Propuesta de Valor en el Hero Section',
                duracion: '4 min',
                objetivos: ['Diseñar encabezados de impacto', 'Captar la atención en 3 segundos'],
                teoria: `<p class="fs-7">El primer bloque de tu web debe comunicar de inmediato qué problema resuelves sin rodeos.</p>`,
                pregunta: '¿En cuántos segundos decide un usuario si quedarse o salir de tu sitio web?',
                opciones: ['En menos de 5 segundos', 'En 15 minutos', 'En 1 hora'],
                correcta: 0
            },
            {
                numero: 2,
                titulo: '2. Elementos de Conversión (CTAs)',
                duracion: '5 min',
                objetivos: ['Crear botones de acción efectivos', 'Reducir la fricción del usuario'],
                teoria: `<p class="fs-7">El Call To Action (CTA) debe guiar al usuario a la compra o registro con un mensaje claro.</p>`,
                pregunta: '¿Cuál de los siguientes es un llamado a la acción (CTA) directo?',
                opciones: ['Comprar Ahora con 20% Dcto', 'Información variada', 'Derechos reservados'],
                correcta: 0
            },
            {
                numero: 3,
                titulo: '3. Prueba Social y Confianza',
                duracion: '5 min',
                objetivos: ['Integrar testimonios', 'Mostrar insignias de seguridad'],
                teoria: `<p class="fs-7">Los testimonios reales y calificaciones eliminan la desconfianza del comprador por primera vez.</p>`,
                pregunta: '¿Qué elemento genera mayor confianza en un cliente nuevo?',
                opciones: ['Testimonios y reseñas de clientes reales', 'Animaciones complejas', 'Música de fondo'],
                correcta: 0
            }
        ],
        'c_python_04': [
            {
                numero: 1,
                titulo: '1. Variables y Automatización de Datos',
                duracion: '6 min',
                objetivos: ['Manejo de variables en Python', 'Lectura de archivos CSV/Excel'],
                teoria: `<p class="fs-7">Python permite manipular grandes volúmenes de datos de inventario en segundos.</p>`,
                pregunta: '¿Qué ventaja ofrece usar Python en la gestión de datos?',
                opciones: ['Procesar listas de productos sin intervención manual', 'Reemplazar las reuniones presenciales', 'Diseñar el logotipo de la empresa'],
                correcta: 0
            },
            {
                numero: 2,
                titulo: '2. Lógica con Bucles e Iteraciones',
                duracion: '6 min',
                objetivos: ['Uso de ciclos For/While', 'Filtrar registros automáticos'],
                teoria: `<p class="fs-7">Con los bucles puedes revisar fila por fila tu inventario y detectar productos con stock crítico.</p>`,
                pregunta: '¿Qué estructura lógica recorre una lista de elementos uno por uno?',
                opciones: ['Un bucle (Loop)', 'Una imagen estática', 'Un estilo CSS'],
                correcta: 0
            },
            {
                numero: 3,
                titulo: '3. Alertas Automáticas por Email/API',
                duracion: '6 min',
                objetivos: ['Enviar notificaciones al detectar stock crítico', 'Conectar APIs'],
                teoria: `<p class="fs-7">Al integrar librerías de notificaciones, Python te avisa al celular cuando un producto está por agotarse.</p>`,
                pregunta: '¿Qué acción automatizada previene el quiebre de stock?',
                opciones: ['Alertas automáticas al superar el límite mínimo', 'Borrar la base de datos', 'Apagar el servidor'],
                correcta: 0
            }
        ],
        'c_ventas_05': [
            {
                numero: 1,
                titulo: '1. Concepto de Precio por Valor Percibido',
                duracion: '5 min',
                objetivos: ['Desvincular el costo de fabricación del precio', 'Analizar disposición a pagar'],
                teoria: `<p class="fs-7">El precio se determina por el beneficio e impacto que recibe el cliente, no solo por sumar costos directos.</p>`,
                pregunta: '¿En qué se basa el Pricing por Valor?',
                opciones: ['En la utilidad y transformación que siente el cliente', 'Únicamente en el costo de la materia prima', 'En el azar'],
                correcta: 0
            },
            {
                numero: 2,
                titulo: '2. Estrategia de Paquetes (Tiered Pricing)',
                duracion: '5 min',
                objetivos: ['Diseñar planes Básico, Pro y Premium', 'Capturar diferentes segmentos'],
                teoria: `<p class="fs-7">Ofrecer 3 alternativas de precio permite atender tanto al cliente austero como al premium.</p>`,
                pregunta: '¿Por qué es efectivo ofrecer 3 niveles de precios?',
                opciones: ['Captura diferentes presupuestos de clientes', 'Confunde al comprador', 'Sube los impuestos'],
                correcta: 0
            },
            {
                numero: 3,
                titulo: '3. Psicología del Precio y Descuentos',
                duracion: '5 min',
                objetivos: ['Evitar la guerra de precios por abajo', 'Anclaje de precio'],
                teoria: `<p class="fs-7">Bajar precios sin estrategia devalúa tu marca. Es preferible agregar valor percibido extra.</p>`,
                pregunta: '¿Qué peligro tiene competir únicamente bajando precios?',
                opciones: ['Reducir el margen hasta la insolvencia', 'Atraer clientes hiper-fieles', 'Mejorar la reputación'],
                correcta: 0
            }
        ],
        'c_iot_06': [
            {
                numero: 1,
                titulo: '1. Sensores en el Punto de Venta',
                duracion: '4 min',
                objetivos: ['Conocer tecnología RFID', 'Sensores de peso e infrarrojos'],
                teoria: `<p class="fs-7">Los sensores IoT leen la presencia de productos en tiempo real sin intervención humana.</p>`,
                pregunta: '¿Qué hace un sensor RFID en tienda física?',
                opciones: ['Detectar el paso o remoción de un producto', 'Emitir facturas físicas', 'Cobrar con tarjeta'],
                correcta: 0
            },
            {
                numero: 2,
                titulo: '2. Comunicación de Datos en Tiempo Real',
                duracion: '4 min',
                objetivos: ['Entender el protocolo MQTT', 'Transmisión nube-tienda'],
                teoria: `<p class="fs-7">Los datos viajan de la estantería a la base de datos central en milisegundos.</p>`,
                pregunta: '¿Qué ventaja tiene la transmisión en tiempo real?',
                opciones: ['Conocer el stock exacto al instante', 'Reducir el consumo de luz', 'Cambiar la música del local'],
                correcta: 0
            },
            {
                numero: 3,
                titulo: '3. Integración con el Dashboard de Inventario',
                duracion: '5 min',
                objetivos: ['Sincronizar IoT con el panel web', 'Automatización de reposición'],
                teoria: `<p class="fs-7">Cuando el sensor detecta pocas unidades en percha, genera automáticamente una orden de reabastecimiento.</p>`,
                pregunta: '¿Cuál es el resultado final de la integración IoT?',
                opciones: ['Reposición de stock automatizada y sin quiebres', 'Cierre de la tienda online', 'Generación de SPAM'],
                correcta: 0
            }
        ]
    },

    currentSelectedOption: null,
    activeCourseId: null,
    currentLessonIndex: 0,
    shouldRefreshViewOnClose: false,

    getCourses() {
        return AppStorage.getData('cursos') || [];
    },

    /**
     * Guarda el progreso asegurando coincidencia de tipos (String / Number)
     */
    saveCourseProgress(courseId, newPercentage) {
        const cursos = this.getCourses();
        const index = cursos.findIndex(c => String(c.id) === String(courseId));

        if (index !== -1) {
            const porcentajePrevio = Number(cursos[index].progreso_porcentaje) || 0;
            const porcentajeFinal = Math.max(porcentajePrevio, newPercentage);

            const esCompletado = porcentajeFinal === 100;
            
            cursos[index].progreso_porcentaje = porcentajeFinal;
            cursos[index].estado = esCompletado ? 'Completado' : 'En progreso';
            cursos[index].tiempo_restante = esCompletado ? '0 min' : `${Math.max(0, 15 - Math.round(porcentajeFinal * 0.15))} min`;

            AppStorage.saveData('cursos', cursos);
            return true;
        }
        return false;
    },

    render() {
        const cursos = this.getCourses();
        const activos = cursos.filter(c => c.estado !== 'Completado');
        const completados = cursos.filter(c => c.estado === 'Completado');

        return `
            <div class="mb-4 fade-in d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="fw-bold mb-1">Academia Tech</h2>
                    <p class="text-secondary fs-7 mb-0">Ruta de aprendizaje guiada para optimizar las operaciones de tu Pyme.</p>
                </div>
            </div>

            <!-- Cursos Activos -->
            <h4 class="h6 fw-bold mb-3 fade-in mt-4">Cursos en Cursado (${activos.length})</h4>
            ${activos.length > 0 ? `
                <div class="row g-4 mb-5 fade-in" id="active-courses-grid">
                    ${activos.map(curso => this.buildCourseCard(curso)).join('')}
                </div>
            ` : `
                <div class="alert alert-dark border border-secondary text-secondary fs-7 mb-4">No tienes cursos pendientes. ¡Has completado todas las clases!</div>
            `}

            <!-- Cursos Completados -->
            ${completados.length > 0 ? `
                <h4 class="h6 fw-bold mb-3 fade-in">Cursos Completados (${completados.length})</h4>
                <div class="row g-4 fade-in opacity-75" id="completed-courses-grid">
                    ${completados.map(curso => this.buildCourseCard(curso)).join('')}
                </div>
            ` : ''}

            <!-- Modal Interactivo -->
            <div class="modal fade" id="courseModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content border-secondary shadow-lg">
                        
                        <div class="modal-header border-bottom border-secondary py-3 px-4">
                            <div>
                                <span id="modalCategory" class="badge bg-primary bg-opacity-10 text-primary fw-semibold px-2 py-1 fs-8 mb-1"></span>
                                <h5 class="modal-title h6 fw-bold mb-0" id="courseModalTitle">Cargando...</h5>
                            </div>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div class="modal-body p-4">
                            <!-- NAVEGADOR DE LECCIONES -->
                            <div class="d-flex align-items-center justify-content-between p-2 mb-4 rounded border border-secondary bg-body-tertiary">
                                <div class="btn-group w-100 me-3" id="lessonTabsNav" role="group">
                                    <button type="button" class="btn btn-sm btn-outline-primary active" data-lesson="0">Lección 1</button>
                                    <button type="button" class="btn btn-sm btn-outline-primary" data-lesson="1">Lección 2</button>
                                    <button type="button" class="btn btn-sm btn-outline-primary" data-lesson="2">Lección 3</button>
                                </div>
                                <span id="modalDuracion" class="text-secondary fs-8 text-nowrap"><i class="bi bi-clock me-1"></i>5 min</span>
                            </div>

                            <h6 id="lessonSubTitle" class="fw-bold fs-6 mb-3 text-success">...</h6>

                            <div class="mb-3">
                                <h6 class="fw-bold fs-8 text-uppercase text-secondary mb-2">Objetivos</h6>
                                <ul id="modalObjetivos" class="fs-7 text-secondary ps-3 mb-0"></ul>
                            </div>

                            <hr class="my-3 border-secondary opacity-25">

                            <div class="mb-4">
                                <h6 class="fw-bold fs-8 text-uppercase text-secondary mb-2">Teoría</h6>
                                <div id="modalLessonContent" class="lh-relaxed fs-7"></div>
                            </div>

                            <hr class="my-4 border-secondary opacity-25">

                            <div id="quizSection" class="p-3 rounded border border-secondary bg-body-tertiary">
                                <div class="d-flex align-items-center justify-content-between mb-3">
                                    <h6 class="fw-bold fs-7 mb-0"><i class="bi bi-patch-check-fill text-warning me-2"></i>Minitarea de Validación</h6>
                                    <a href="https://youtube.com" target="_blank" class="btn btn-sm btn-link text-danger text-decoration-none p-0 fs-8">
                                        <i class="bi bi-youtube me-1"></i> Ver Video
                                    </a>
                                </div>
                                
                                <p id="quizQuestion" class="fw-semibold fs-7 mb-3"></p>
                                
                                <div id="quizOptions" class="d-flex flex-column gap-2"></div>
                                <div id="quizFeedback" class="mt-3 fs-7 d-none"></div>
                            </div>
                        </div>

                        <div class="modal-footer border-top border-secondary py-2 px-4 justify-content-between">
                            <button id="btnPrevLesson" class="btn btn-sm btn-outline-secondary rounded-pill px-3" disabled>&larr; Anterior</button>
                            <button id="btnCompleteCourse" class="btn btn-sm btn-success rounded-pill px-4 fw-bold" disabled>
                                Validar y Continuar &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    buildCourseCard(curso) {
        const isCompleted = curso.estado === 'Completado';
        const pct = Number(curso.progreso_porcentaje) || 0;
        let btnText = 'Comenzar';
        if (isCompleted) btnText = 'Repasar';
        else if (pct > 0) btnText = 'Continuar';

        return `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="pro-card h-100 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="pro-badge border border-secondary text-body">
                            <i class="bi bi-tag-fill me-1 opacity-50"></i> ${curso.categoria}
                        </span>
                        <div class="p-2 rounded-3 fs-5 ${curso.color_icono}">
                            <i class="bi ${curso.icono}"></i>
                        </div>
                    </div>
                    
                    <h5 class="fw-bold mb-2">${curso.titulo}</h5>
                    <p class="text-secondary fs-7 flex-grow-1">${curso.descripcion}</p>
                    
                    <div class="mt-auto pt-3">
                        <div class="d-flex justify-content-between fs-7 mb-2 fw-medium">
                            <span class="${isCompleted ? 'text-success fw-bold' : 'text-secondary'}">
                                ${curso.estado}
                            </span>
                            <span class="text-secondary fw-bold">${pct}%</span>
                        </div>
                        
                        <div class="progress pro-progress mb-3" style="height: 8px; background-color: rgba(255,255,255,0.1);">
                            <div class="progress-bar bg-success" 
                                 role="progressbar" 
                                 style="width: ${pct}%; height: 100%; transition: width 0.4s ease;" 
                                 aria-valuenow="${pct}" 
                                 aria-valuemin="0" 
                                 aria-valuemax="100">
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-secondary fs-8">
                                <i class="bi bi-clock me-1"></i> ${curso.tiempo_restante || '15 min'}
                            </span>
                            <button class="btn btn-sm ${isCompleted ? 'btn-outline-success' : 'btn-success'} rounded-pill px-3 fw-bold btn-play-course"
                                    data-id="${curso.id}"
                                    data-title="${curso.titulo}"
                                    data-categoria="${curso.categoria}">
                                ${btnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    initEvents() {
        const modalEl = document.getElementById('courseModal');
        if (!modalEl) return;

        const courseModal = new bootstrap.Modal(modalEl);

        // Evento que se ejecuta exactamente al terminar de ocultar el modal
        modalEl.addEventListener('hidden.bs.modal', () => {
            if (this.shouldRefreshViewOnClose) {
                this.shouldRefreshViewOnClose = false;
                const mainContainer = document.getElementById('main-content') || document.querySelector('.content-body');
                if (mainContainer) {
                    mainContainer.innerHTML = Academy.render();
                    Academy.initEvents();
                }
            }
        });

        // Abrir curso
        document.querySelectorAll('.btn-play-course').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const title = btn.getAttribute('data-title');
                const categoria = btn.getAttribute('data-categoria');

                this.activeCourseId = id;
                const cursos = this.getCourses();
                const cursoActual = cursos.find(c => String(c.id) === String(id));

                const progreso = cursoActual ? (Number(cursoActual.progreso_porcentaje) || 0) : 0;
                
                if (progreso >= 66) this.currentLessonIndex = 2;
                else if (progreso >= 33) this.currentLessonIndex = 1;
                else this.currentLessonIndex = 0;

                document.getElementById('courseModalTitle').innerText = title;
                document.getElementById('modalCategory').innerText = categoria;

                this.loadLesson(this.activeCourseId, this.currentLessonIndex);
                courseModal.show();
            });
        });

        // Botón Lección Anterior
        document.getElementById('btnPrevLesson')?.addEventListener('click', () => {
            if (this.currentLessonIndex > 0) {
                this.currentLessonIndex--;
                this.loadLesson(this.activeCourseId, this.currentLessonIndex);
            }
        });

        // Navegación por Pestañas / Lecciones Directas
        document.getElementById('lessonTabsNav')?.querySelectorAll('button').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetIdx = parseInt(e.target.getAttribute('data-lesson'));
                this.currentLessonIndex = targetIdx;
                this.loadLesson(this.activeCourseId, targetIdx);
            });
        });

        // Validar / Siguiente
        const validateBtn = document.getElementById('btnCompleteCourse');
        validateBtn?.replaceWith(validateBtn.cloneNode(true));
        
        const newValidateBtn = document.getElementById('btnCompleteCourse');
        newValidateBtn?.addEventListener('click', () => {
            const lessons = this.coursesLessons[this.activeCourseId] || [];
            const lesson = lessons[this.currentLessonIndex];
            const feedback = document.getElementById('quizFeedback');

            if (this.currentSelectedOption === lesson.correcta) {
                feedback.className = 'alert alert-success p-2 mb-0 mt-3 fs-7';
                
                let newPercentage = 33;
                if (this.currentLessonIndex === 1) newPercentage = 66;
                if (this.currentLessonIndex === 2) newPercentage = 100;

                // Guardar en LocalStorage y activar bandera de refresco
                this.saveCourseProgress(this.activeCourseId, newPercentage);
                this.shouldRefreshViewOnClose = true;

                if (this.currentLessonIndex < 2) {
                    feedback.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><b>¡Correcto!</b> Avanzando a la siguiente lección...';
                    setTimeout(() => {
                        this.currentLessonIndex++;
                        this.loadLesson(this.activeCourseId, this.currentLessonIndex);
                    }, 800);
                } else {
                    feedback.innerHTML = '<i class="bi bi-trophy-fill me-2"></i><b>¡Felicidades!</b> Has completado el curso al 100%.';
                    newValidateBtn.innerText = 'Curso Completado ✓';
                    newValidateBtn.disabled = true;

                    setTimeout(() => {
                        courseModal.hide(); // Al ocultarse se disparará 'hidden.bs.modal'
                    }, 1000);
                }

            } else {
                feedback.className = 'alert alert-danger p-2 mb-0 mt-3 fs-7';
                feedback.innerHTML = '<i class="bi bi-x-circle-fill me-2"></i><b>Incorrecto.</b> Revisa la teoría e inténtalo de nuevo.';
            }
        });
    },

    loadLesson(courseId, lessonIndex) {
        const lessons = this.coursesLessons[courseId] || [];
        const lesson = lessons[lessonIndex] || lessons[0];

        this.currentSelectedOption = null;

        // Actualizar pestañas activas
        const tabs = document.querySelectorAll('#lessonTabsNav button');
        tabs.forEach((tab, idx) => {
            if (idx === lessonIndex) {
                tab.classList.add('active', 'btn-primary');
                tab.classList.remove('btn-outline-primary');
            } else {
                tab.classList.remove('active', 'btn-primary');
                tab.classList.add('btn-outline-primary');
            }
        });

        // Activar/desactivar botón Anterior
        const btnPrev = document.getElementById('btnPrevLesson');
        if (btnPrev) btnPrev.disabled = (lessonIndex === 0);

        document.getElementById('modalDuracion').innerHTML = `<i class="bi bi-clock me-1"></i>${lesson.duracion}`;
        document.getElementById('lessonSubTitle').innerText = lesson.titulo;
        document.getElementById('modalLessonContent').innerHTML = lesson.teoria;

        // Objetivos
        const objContainer = document.getElementById('modalObjetivos');
        objContainer.innerHTML = (lesson.objetivos || []).map(o => `<li>${o}</li>`).join('');

        // Pregunta
        document.getElementById('quizQuestion').innerText = lesson.pregunta;

        // Opciones
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        const validateBtn = document.getElementById('btnCompleteCourse');
        validateBtn.disabled = true;
        validateBtn.innerText = lessonIndex === 2 ? 'Finalizar Curso' : 'Validar y Continuar →';

        const feedback = document.getElementById('quizFeedback');
        feedback.className = 'mt-3 fs-7 d-none';

        lesson.opciones.forEach((opcion, index) => {
            const label = document.createElement('label');
            label.className = 'd-flex align-items-center p-3 border border-secondary rounded option-card bg-body-tertiary';
            label.style.cursor = 'pointer';
            
            label.innerHTML = `
                <input type="radio" name="quiz_option" value="${index}" class="form-check-input me-3 mt-0">
                <span class="fs-7">${opcion}</span>
            `;

            const radioInput = label.querySelector('input');

            label.addEventListener('click', () => {
                optionsContainer.querySelectorAll('.option-card').forEach(card => {
                    card.classList.remove('border-primary', 'bg-primary', 'bg-opacity-10', 'fw-bold');
                });

                radioInput.checked = true;
                label.classList.add('border-primary', 'bg-primary', 'bg-opacity-10', 'fw-bold');

                this.currentSelectedOption = index;
                validateBtn.disabled = false;
            });

            optionsContainer.appendChild(label);
        });
    }
};