/**
 * js/catalog.js
 * Módulo del Catálogo de Ventas de Productos.
 */
import { AppStorage } from './storage.js';
import { formatCurrency } from './utils.js';

export const Catalog = {
  // Estado local para tamaño de vista (medium o large)
    currentViewSize: 'medium',

    async render() {
    // Cargar productos del LocalStorage o fallback de JSON
    let productos = AppStorage.getData('productos');
    if (!productos || productos.length === 0) {
        try {
        const res = await fetch('json/productos.json');
        if (res.ok) productos = await res.json();
        } catch (e) {
        productos = [];
        }
    }

    const gridClass = this.currentViewSize === 'large' ? 'catalog-grid large-view' : 'catalog-grid';

    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold mb-1">Catálogo de Ventas</h2>
            <p class="text-muted fs-7 mb-0">Explora la vitrina de productos y artículos comercializados.</p>
        </div>
        <!-- Selector de tamaño de vista en íconos/tarjetas -->
        <div class="btn-group" role="group" aria-label="Tamaño de vista">
            <button type="button" class="btn btn-outline-secondary btn-sm ${this.currentViewSize === 'medium' ? 'active' : ''}" id="btn-view-medium" title="Vista Íconos Medianos">
            <i class="bi bi-grid-fill"></i> Medianos
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm ${this.currentViewSize === 'large' ? 'active' : ''}" id="btn-view-large" title="Vista Íconos Grandes">
            <i class="bi bi-grid-3x3-gap-fill"></i> Grandes
            </button>
        </div>
        </div>

        <!-- Contenedor del Catálogo -->
        <div class="${gridClass}" id="catalog-container">
        ${productos.length > 0 
            ? productos.map(prod => this.buildProductCard(prod)).join('') 
            : '<p class="text-muted">No hay productos registrados en el catálogo.</p>'
        }
        </div>

        <!-- Modal de Detalle de Producto -->
        <div class="modal fade" id="productDetailModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg" style="border-radius: var(--radius-lg);">
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold" id="modalProductTitle">Cargando...</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
                <img id="modalProductImg" src="" class="modal-product-img mb-3" alt="Producto">
                <span class="pro-badge badge-success mb-2" id="modalProductCategory">Categoría</span>
                <p class="text-muted fs-7 mb-3" id="modalProductDesc">Descripción del producto</p>

                <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                <div>
                    <small class="text-muted d-block">Precio</small>
                    <span class="fs-4 fw-bold text-success" id="modalProductPrice">$0</span>
                </div>
                <div>
                    <small class="text-muted d-block">Stock Disponible</small>
                    <span class="fw-semibold" id="modalProductStock">0 unidades</span>
                </div>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
        </div>
    `;
    },

    /**
   * Genera el HTML dinámico de cada tarjeta utilizando los datos del JSON
   */
    buildProductCard(prod) {
    const isLarge = this.currentViewSize === 'large' ? 'large-card' : '';
    const imgSrc = prod.imagen || 'https://via.placeholder.com/300x200/f1f5f9/1e293b?text=Producto';

    return `
        <div class="product-card ${isLarge} js-product-item" 
            data-id="${prod.id}"
            data-nombre="${prod.nombre || ''}"
            data-categoria="${prod.categoria || ''}"
            data-precio="${prod.precio || 0}"
            data-stock="${prod.stock || 0}"
            data-descripcion="${prod.descripcion || ''}"
            data-imagen="${imgSrc}">
        <div class="product-img-wrapper">
            <img src="${imgSrc}" class="product-img" alt="${prod.nombre || 'Producto'}" loading="lazy">
        </div>
        <div class="product-body">
            <span class="pro-badge badge-success mb-1 align-self-start">${prod.categoria || 'General'}</span>
            <h5 class="product-title">${prod.nombre || 'Producto'}</h5>
            <p class="product-desc">${prod.descripcion || 'Sin descripción disponible.'}</p>
            <div class="product-footer">
            <span class="fw-bold text-success">${formatCurrency(prod.precio || 0)}</span>
            <small class="text-muted">Stock: ${prod.stock || 0}</small>
            </div>
        </div>
        </div>
    `;
    },

    /**
   * Eventos interactivos: Cambio de vista y apertura del Modal de detalle
   */
    initEvents() {
    // 1. Alternar tamaño de cuadrícula
    const btnMedium = document.getElementById('btn-view-medium');
    const btnLarge = document.getElementById('btn-view-large');

    if (btnMedium && btnLarge) {
        btnMedium.addEventListener('click', () => {
        this.currentViewSize = 'medium';
        window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'catalogo' }));
        });

        btnLarge.addEventListener('click', () => {
        this.currentViewSize = 'large';
        window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'catalogo' }));
        });
    }

    // 2. Abrir Modal al hacer clic sobre un producto
    const productCards = document.querySelectorAll('.js-product-item');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
        const nombre = card.getAttribute('data-nombre');
        const categoria = card.getAttribute('data-categoria');
        const precio = Number(card.getAttribute('data-precio'));
        const stock = card.getAttribute('data-stock');
        const descripcion = card.getAttribute('data-descripcion');
        const imagen = card.getAttribute('data-imagen');

        // Cargar los datos extraídos en la ventana flotante (Modal)
        document.getElementById('modalProductTitle').textContent = nombre;
        document.getElementById('modalProductCategory').textContent = categoria;
        document.getElementById('modalProductDesc').textContent = descripcion;
        document.getElementById('modalProductPrice').textContent = formatCurrency(precio);
        document.getElementById('modalProductStock').textContent = `${stock} unidades disponibles`;
        document.getElementById('modalProductImg').setAttribute('src', imagen);

        // Desplegar Modal con Bootstrap nativo
        const modalEl = document.getElementById('productDetailModal');
        if (modalEl && typeof bootstrap !== 'undefined') {
            const bsModal = new bootstrap.Modal(modalEl);
            bsModal.show();
        }
        });
    });
    }
};