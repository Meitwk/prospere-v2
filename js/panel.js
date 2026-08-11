/**
 * js/panel.js
 * Módulo del Panel de Control (Simulación IoT y Estado del Sistema)
 */
export const ControlPanel = {
    render() {
        return `
            <div class="mb-4 fade-in">
                <h2 class="fw-bold text-dark mb-1">Panel de Control</h2>
                <p class="text-muted fs-7">Estado de los servicios integrados y dispositivos IoT.</p>
            </div>

            <div class="row g-4 fade-in">
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
        `;
    }
};