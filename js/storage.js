/**
 * js/storage.js
 * Módulo de gestión de datos y persistencia utilizando LocalStorage.
 * Actúa como una base de datos local (Mock DB) para el MVP.
 */

export const AppStorage = {
    /**
     * Inicializa la base de datos local.
     * Si es la primera vez que se abre la app, carga los JSON por defecto.
     */
    async init() {
        try {
            // Verificamos si la app ya fue inicializada previamente
            if (!localStorage.getItem('prospere_initialized')) {
                console.info('🚀 Inicializando entorno de datos de PROSPERE...');

                // Lista de recursos JSON a cargar
                const resources = [
                    { key: 'dashboard', path: 'json/dashboard.json' },
                    { key: 'cursos', path: 'json/cursos.json' },
                    { key: 'productos', path: 'json/productos.json' },
                    { key: 'canvas', path: 'json/canvas.json' }
                ];

                // Cargamos todos los archivos secuencialmente
                for (const res of resources) {
                    const response = await fetch(res.path);
                    if (!response.ok) throw new Error(`HTTP error al cargar ${res.path}`);
                    
                    const data = await response.json();
                    this.saveData(res.key, data);
                }

                // Marcamos la app como inicializada
                localStorage.setItem('prospere_initialized', 'true');
                console.info('✅ Datos base cargados en LocalStorage correctamente.');
            }
        } catch (error) {
            console.error('❌ Error crítico inicializando el almacenamiento:', error);
            // En un caso de fallo extremo (ej: CORS local), podríamos inyectar un fallback manual aquí.
        }
    },

    /**
     * Obtiene un dato desde el LocalStorage y lo parsea.
     * @param {string} key - Clave del dato a buscar (ej: 'productos')
     * @returns {any} Objeto JSON o null si no existe.
     */
    getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    /**
     * Guarda un objeto en el LocalStorage convirtiéndolo a string.
     * @param {string} key - Clave donde se guardará
     * @param {any} data - Datos a guardar (Objeto o Array)
     */
    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * Limpia toda la base de datos (Útil para pruebas o botón "Reset").
     */
    clearAll() {
        localStorage.clear();
        console.warn('⚠️ Base de datos local formateada.');
    },

    /* ====================================================================
       UTILIDADES CRUD (Para facilitar el desarrollo de los módulos)
       ==================================================================== */

    /**
     * Actualiza un elemento específico dentro de un Array almacenado (Ej: Editar un producto)
     * @param {string} storageKey - Clave del array (ej: 'productos')
     * @param {string} idKey - Nombre de la propiedad ID (ej: 'id')
     * @param {string} idValue - Valor del ID a buscar (ej: 'prod_hw_01')
     * @param {object} newData - Las nuevas propiedades a fusionar
     * @returns {boolean} True si se actualizó correctamente.
     */
    updateItemInArray(storageKey, idKey, idValue, newData) {
        const items = this.getData(storageKey);
        
        if (Array.isArray(items)) {
            const index = items.findIndex(item => item[idKey] === idValue);
            if (index !== -1) {
                // Fusionamos el objeto actual con los nuevos datos
                items[index] = { ...items[index], ...newData };
                this.saveData(storageKey, items);
                return true;
            }
        }
        return false;
    }
};