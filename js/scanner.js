/**
 * js/scanner.js
 * Simulación del módulo de Inteligencia Artificial Visual (IoT / Smart Scan)
 */

export const SmartScan = {
    render() {
        return `
            <div class="mb-4 fade-in">
                <h2 class="fw-bold text-dark mb-1">Smart Scan</h2>
                <p class="text-muted fs-7">Control de calidad e inventario asistido por visión artificial.</p>
            </div>

            <div class="row fade-in">
                <div class="col-md-8 mx-auto">
                    <div class="pro-card text-center p-4">
                        
                        <!-- Contenedor del Escáner Simulado -->
                        <div id="scan-viewport" class="scan-container mb-4 shadow-sm border">
                            <i class="bi bi-camera fs-1 text-muted" id="camera-icon"></i>
                            <div class="scan-line" id="scan-line"></div>
                            <div class="pulse-ring d-none" id="pulse-ring"></div>
                        </div>

                        <!-- Panel de Estado -->
                        <h4 class="h5 fw-bold text-dark" id="scan-status">Cámara inactiva</h4>
                        <p class="text-muted fs-7 mb-4" id="scan-subtitle">Posiciona un producto frente al lente para analizarlo.</p>

                        <!-- Botón de Acción -->
                        <button class="btn btn-success rounded-pill px-4 py-2 fw-bold w-100 w-md-auto" id="btn-start-scan">
                            <i class="bi bi-upc-scan me-2"></i> Iniciar Escaneo Automático
                        </button>

                        <!-- Tarjeta de Resultado (Oculta por defecto) -->
                        <div id="scan-result" class="mt-4 text-start d-none animate-fade-up">
                            <hr class="mb-4">
                            <span class="pro-badge badge-success mb-2">Producto Detectado</span>
                            <div class="d-flex align-items-center gap-3 bg-light p-3 rounded-3 border">
                                <div class="bg-white p-3 rounded border text-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-box-seam fs-2 text-success"></i>
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-1">Resma Papel Opalina Especial</h5>
                                    <p class="text-muted fs-7 mb-1">Categoría: Insumos</p>
                                    <div class="d-flex gap-2 mt-2">
                                        <span class="badge bg-success bg-opacity-25 text-success rounded-pill border border-success">
                                            <i class="bi bi-check-circle-fill"></i> Calidad Óptima
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-outline-primary rounded-pill w-100 mt-3 fw-bold">
                                Añadir +1 al Inventario
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    initEvents() {
        const btnScan = document.getElementById('btn-start-scan');
        const viewport = document.getElementById('scan-viewport');
        const statusText = document.getElementById('scan-status');
        const subtitleText = document.getElementById('scan-subtitle');
        const cameraIcon = document.getElementById('camera-icon');
        const pulseRing = document.getElementById('pulse-ring');
        const resultCard = document.getElementById('scan-result');

        if (!btnScan) return;

        btnScan.addEventListener('click', () => {
            // 1. Estado: Iniciando hardware simulado
            btnScan.disabled = true;
            btnScan.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Conectando...';
            statusText.textContent = "Calibrando lente...";
            subtitleText.textContent = "Estableciendo conexión con el servidor IA.";
            
            // 2. Estado: Escaneando (Tras 1 segundo)
            setTimeout(() => {
                viewport.classList.add('scanning');
                cameraIcon.classList.add('text-success');
                cameraIcon.classList.remove('text-muted');
                btnScan.innerHTML = 'Analizando objeto...';
                statusText.textContent = "Reconociendo producto...";
                subtitleText.textContent = "Procesando patrones e identificando modelo en la base de datos.";
            }, 1000);

            // 3. Estado: Procesando calidad (Tras 3 segundos)
            setTimeout(() => {
                viewport.classList.remove('scanning');
                pulseRing.classList.remove('d-none');
                statusText.textContent = "Controlando calidad...";
                subtitleText.textContent = "Evaluando estado físico del producto.";
            }, 3500);

            // 4. Estado: Finalizado (Tras 5 segundos)
            setTimeout(() => {
                pulseRing.classList.add('d-none');
                cameraIcon.classList.remove('text-success');
                cameraIcon.classList.add('text-muted');
                
                statusText.textContent = "Escaneo Completado";
                statusText.classList.add('text-success');
                subtitleText.textContent = "El producto ha sido identificado correctamente.";
                
                btnScan.style.display = 'none'; // Ocultamos el botón
                resultCard.classList.remove('d-none'); // Mostramos el resultado
            }, 5000);
        });
    }
};