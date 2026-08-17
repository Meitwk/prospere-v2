/**
 * js/storage.js
 * Módulo de gestión de datos y persistencia utilizando LocalStorage.
 * Actúa como una base de datos local (Mock DB) para el MVP.
 */

const PROSPERE_PREFIX = 'prospere_app_';

export const AppStorage = {
    /**
     * Inicializa la base de datos local.
     * Carga los JSON por defecto si es la primera vez.
     */
    async init() {
        try {
            if (!localStorage.getItem(`${PROSPERE_PREFIX}initialized`)) {
                console.info('🚀 Inicializando entorno de datos de PROSPERE...');

                const resources = [
                    { key: 'dashboard', path: 'json/dashboard.json' },
                    { key: 'cursos', path: 'json/cursos.json' },
                    { key: 'productos', path: 'json/productos.json' },
                    { key: 'perfil', path: 'json/perfil.json' }
                ];

                for (const res of resources) {
                    try {
                        const response = await fetch(res.path);
                        if (!response.ok) throw new Error(`HTTP ${response.status}`);
                        const data = await response.json();
                        this.saveData(res.key, data);
                    } catch (fetchError) {
                        console.warn(`⚠️ No se pudo cargar ${res.path}, inicializando objeto vacío.`, fetchError);
                        // Fallback seguro para evitar que la app se trabe
                        this.saveData(res.key, {});
                    }
                }

                localStorage.setItem(`${PROSPERE_PREFIX}initialized`, 'true');
                console.info('✅ Datos base procesados en LocalStorage.');
            }
        } catch (error) {
            console.error('❌ Error crítico inicializando almacenamiento:', error);
        }
    },

    /**
     * Obtiene un dato desde LocalStorage.
     */
    getData(key) {
        try {
            // Revisa si existe con el prefijo o como clave directa por compatibilidad
            const data = localStorage.getItem(`${PROSPERE_PREFIX}${key}`) || localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error(`Error leyendo ${key}:`, err);
            return null;
        }
    },

    /**
     * Guarda un objeto en LocalStorage convirtiéndolo a JSON String.
     */
    saveData(key, data) {
        try {
            localStorage.setItem(`${PROSPERE_PREFIX}${key}`, JSON.stringify(data));
        } catch (err) {
            console.error(`Error guardando ${key}:`, err);
        }
    },

    /**
     * Limpia la base de datos de la app.
     */
    clearAll() {
        localStorage.clear();
        console.warn('⚠️ Base de datos local formateada.');
    },

    /**
     * Utilidad CRUD para actualizar elementos en Arrays
     */
    updateItemInArray(storageKey, idKey, idValue, newData) {
        const items = this.getData(storageKey);
        if (Array.isArray(items)) {
            const index = items.findIndex(item => item[idKey] === idValue);
            if (index !== -1) {
                items[index] = { ...items[index], ...newData };
                this.saveData(storageKey, items);
                return true;
            }
        }
        return false;
    }
};

// Funciones Helper por si algún script las importa de forma individual
export const getStorageData = (key) => AppStorage.getData(key);
export const setStorageData = (key, data) => AppStorage.saveData(key, data);