/**
 * js/inventory.js
 * Módulo de Gestión de Inventario para PROSPERE
 */
import { AppStorage } from './storage.js';
import { formatCurrency } from './utils.js';

export const Inventory = {
  async render() {
    let productos = AppStorage.getData('productos');

    if (!productos || productos.length === 0) {
      try {
        const res = await fetch('json/productos.json');
        productos = await res.json();
        AppStorage.saveData('productos', productos);
      } catch (e) {
        productos = [];
      }
    }

    const totalProductos = productos.length;
    const totalStock = productos.reduce((acc, p) => acc + Number(p.stock || 0), 0);
    const valorInventario = productos.reduce((acc, p) => acc + (Number(p.precio || 0) * Number(p.stock || 0)), 0);

    return `
      <div class="fade-in">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 class="h4 fw-bold mb-1">Gestión de Inventario</h2>
            <p class="text-muted small mb-0">Controla tus insumos, productos finales y niveles de stock en tiempo real.</p>
          </div>
          <button class="btn btn-success d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#modalProducto">
            <i class="bi bi-plus-lg"></i> Agregar Producto
          </button>
        </div>

        <!-- Tarjetas de Métricas -->
        <div class="row g-3 mb-4">
          <div class="col-md-4">
            <div class="pro-card p-3 d-flex align-items-center gap-3">
              <div class="quick-icon-wrapper text-success bg-light">
                <i class="bi bi-box-seam"></i>
              </div>
              <div>
                <span class="text-muted small d-block">Variedad de Productos</span>
                <strong id="metric-total-items" class="fs-5">${totalProductos} ítems</strong>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="pro-card p-3 d-flex align-items-center gap-3">
              <div class="quick-icon-wrapper text-primary bg-light">
                <i class="bi bi-layers"></i>
              </div>
              <div>
                <span class="text-muted small d-block">Unidades Totales</span>
                <strong id="metric-total-stock" class="fs-5">${totalStock} unidades</strong>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="pro-card p-3 d-flex align-items-center gap-3">
              <div class="quick-icon-wrapper text-warning bg-light">
                <i class="bi bi-currency-dollar"></i>
              </div>
              <div>
                <span class="text-muted small d-block">Valor Estimado</span>
                <strong id="metric-valor-inventario" class="fs-5">${formatCurrency(valorInventario)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="pro-card p-0 overflow-hidden">
          <div class="p-3 border-bottom d-flex gap-2 justify-content-between align-items-center">
            <div class="input-group input-group-sm w-50">
              <span class="input-group-text bg-transparent border-end-0"><i class="bi bi-search text-muted"></i></span>
              <input type="text" id="inventory-search" class="form-control border-start-0 ps-0" placeholder="Buscar por nombre o categoría...">
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light fs-7 text-muted">
                <tr>
                  <th class="ps-3">Producto</th>
                  <th>Categoría</th>
                  <th>Precio Unitario</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th class="text-end pe-3">Acciones</th>
                </tr>
              </thead>
              <tbody id="inventory-table-body">
                ${this.renderRows(productos)}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal para Agregar Nuevo Producto -->
      <div class="modal fade" id="modalProducto" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-bottom-0">
              <h5 class="modal-title fw-bold">Nuevo Producto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <form id="form-product">
              <div class="modal-body py-0">
                <div class="mb-3">
                  <label class="form-label small fw-semibold">Nombre del producto</label>
                  <input type="text" class="form-control" id="prod-nombre" required placeholder="Ej: Impresora de Resina 3D">
                </div>
                <div class="row g-2 mb-3">
                  <div class="col-6">
                    <label class="form-label small fw-semibold">Categoría</label>
                    <select class="form-select" id="prod-categoria" required>
                      <option value="Equipamiento">Equipamiento</option>
                      <option value="Insumos">Insumos</option>
                      <option value="Audio Profesional">Audio Profesional</option>
                      <option value="Instrumentos">Instrumentos</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div class="col-6">
                    <label class="form-label small fw-semibold">Precio (CLP)</label>
                    <input type="number" class="form-control" id="prod-precio" min="0" required placeholder="15000">
                  </div>
                </div>
                <div class="row g-2 mb-3">
                  <div class="col-6">
                    <label class="form-label small fw-semibold">Stock Inicial</label>
                    <input type="number" class="form-control" id="prod-stock" min="0" required placeholder="10">
                  </div>
                  <div class="col-6">
                    <label class="form-label small fw-semibold">Imagen URL (Opcional)</label>
                    <input type="url" class="form-control" id="prod-imagen" placeholder="https://...">
                  </div>
                </div>
              </div>
              <div class="modal-footer border-top-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-success">Guardar Producto</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  renderRows(productos) {
    if (!productos || productos.length === 0) {
      return `<tr><td colspan="6" class="text-center py-4 text-muted">No hay productos registrados en el inventario.</td></tr>`;
    }

    return productos.map(item => {
      let badgeClass = 'badge-success';
      let estado = item.estado || 'Disponible';

      if (item.stock === 0 || estado === 'Agotado') {
        badgeClass = 'bg-danger-subtle text-danger';
        estado = 'Agotado';
      } else if (item.stock <= 5 || estado === 'Stock Crítico') {
        badgeClass = 'bg-warning-subtle text-warning';
        estado = 'Stock Crítico';
      }

      const imgUrl = item.imagen || 'https://via.placeholder.com/40?text=Prod';

      return `
        <tr data-id="${item.id}">
          <td class="ps-3">
            <div class="d-flex align-items-center gap-2">
              <img src="${imgUrl}" alt="${item.nombre}" width="40" height="40" class="rounded object-fit-cover border">
              <div>
                <strong class="d-block text-dark fs-7">${item.nombre}</strong>
                <span class="text-muted fs-7">ID: ${item.id}</span>
              </div>
            </div>
          </td>
          <td><span class="badge bg-light text-dark border">${item.categoria}</span></td>
          <td class="fw-semibold">${formatCurrency(item.precio)}</td>
          <td>
            <div class="d-flex align-items-center gap-1">
              <button class="btn btn-sm btn-outline-secondary py-0 px-2 btn-stock-adjust" data-id="${item.id}" data-action="dec">-</button>
              <input type="number" class="form-control form-control-sm text-center input-stock border fw-bold p-0" data-id="${item.id}" value="${item.stock}" min="0" style="width: 55px; height: 28px;">
              <button class="btn btn-sm btn-outline-secondary py-0 px-2 btn-stock-adjust" data-id="${item.id}" data-action="inc">+</button>
            </div>
          </td>
          <td><span class="pro-badge badge-estado ${badgeClass}">${estado}</span></td>
          <td class="text-end pe-3">
            <button class="btn btn-sm btn-light border text-danger btn-delete" data-id="${item.id}" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  // Actualiza en tiempo real los contadores globales superiores sin re-renderizar la vista
  updateMetrics() {
    const productos = AppStorage.getData('productos') || [];
    const totalProductos = productos.length;
    const totalStock = productos.reduce((acc, p) => acc + Number(p.stock || 0), 0);
    const valorInventario = productos.reduce((acc, p) => acc + (Number(p.precio || 0) * Number(p.stock || 0)), 0);

    const elTotalItems = document.getElementById('metric-total-items');
    const elTotalStock = document.getElementById('metric-total-stock');
    const elValorInventario = document.getElementById('metric-valor-inventario');

    if (elTotalItems) elTotalItems.textContent = `${totalProductos} ítems`;
    if (elTotalStock) elTotalStock.textContent = `${totalStock} unidades`;
    if (elValorInventario) elValorInventario.textContent = formatCurrency(valorInventario);
  },

  // Modifica el stock de un producto específico directamente en el DOM y LocalStorage
  updateSingleStock(id, newStockValue, rowElement) {
    let productos = AppStorage.getData('productos') || [];
    const prod = productos.find(p => p.id === id);
    if (!prod) return;

    let stockNum = parseInt(newStockValue, 10);
    if (isNaN(stockNum) || stockNum < 0) stockNum = 0;

    prod.stock = stockNum;

    if (prod.stock === 0) prod.estado = 'Agotado';
    else if (prod.stock <= 5) prod.estado = 'Stock Crítico';
    else prod.estado = 'Disponible';

    AppStorage.saveData('productos', productos);

    // Actualizar el valor visual del Input
    const inputEl = rowElement.querySelector('.input-stock');
    if (inputEl && parseInt(inputEl.value, 10) !== prod.stock) {
      inputEl.value = prod.stock;
    }

    // Actualizar la etiqueta (badge) de Estado visualmente
    const badgeEl = rowElement.querySelector('.badge-estado');
    if (badgeEl) {
      let badgeClass = 'badge-success';
      if (prod.stock === 0) badgeClass = 'bg-danger-subtle text-danger';
      else if (prod.stock <= 5) badgeClass = 'bg-warning-subtle text-warning';

      badgeEl.className = `pro-badge badge-estado ${badgeClass}`;
      badgeEl.textContent = prod.estado;
    }

    // Actualizar métricas generales de la cabecera
    this.updateMetrics();
  },

  initEvents() {
    const form = document.getElementById('form-product');
    const searchInput = document.getElementById('inventory-search');
    const tableBody = document.getElementById('inventory-table-body');

    if (!tableBody) return;

    // 1. Agregar Producto
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let productos = AppStorage.getData('productos') || [];

        const id = 'prod_' + Date.now().toString(36);
        const nombre = document.getElementById('prod-nombre').value.trim();
        const categoria = document.getElementById('prod-categoria').value;
        const precio = Number(document.getElementById('prod-precio').value);
        const stock = Number(document.getElementById('prod-stock').value);
        const imagenInput = document.getElementById('prod-imagen').value.trim();
        const imagen = imagenInput || `https://via.placeholder.com/300x200/f1f5f9/1e293b?text=${encodeURIComponent(nombre)}`;

        let estado = 'Disponible';
        if (stock === 0) estado = 'Agotado';
        else if (stock <= 5) estado = 'Stock Crítico';

        productos.unshift({ id, nombre, categoria, precio, stock, estado, imagen });
        AppStorage.saveData('productos', productos);

        const modalEl = document.getElementById('modalProducto');
        if (modalEl && typeof bootstrap !== 'undefined') {
          const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modalInstance.hide();
        }

        form.reset();
        window.dispatchEvent(new CustomEvent('cambiarVista', { detail: 'inventario' }));
      });
    }

    // 2. Buscador en tiempo real
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const productos = AppStorage.getData('productos') || [];
        const filtrados = productos.filter(p =>
          p.nombre.toLowerCase().includes(query) || p.categoria.toLowerCase().includes(query)
        );
        tableBody.innerHTML = this.renderRows(filtrados);
      });
    }

    // 3. Evento Click para Botones (+ / - / Eliminar)
    tableBody.addEventListener('click', (e) => {
      const btnStock = e.target.closest('.btn-stock-adjust');
      const btnDelete = e.target.closest('.btn-delete');

      if (btnStock) {
        const id = btnStock.getAttribute('data-id');
        const action = btnStock.getAttribute('data-action');
        const row = btnStock.closest('tr');
        const inputStock = row.querySelector('.input-stock');
        
        let currentStock = parseInt(inputStock.value, 10) || 0;
        if (action === 'inc') currentStock += 1;
        if (action === 'dec' && currentStock > 0) currentStock -= 1;

        this.updateSingleStock(id, currentStock, row);
      }

      if (btnDelete) {
        const id = btnDelete.getAttribute('data-id');
        if (confirm('¿Deseas eliminar este producto del inventario?')) {
          let productos = AppStorage.getData('productos') || [];
          productos = productos.filter(p => p.id !== id);
          AppStorage.saveData('productos', productos);

          const row = btnDelete.closest('tr');
          if (row) row.remove();

          if (productos.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No hay productos registrados en el inventario.</td></tr>`;
          }

          this.updateMetrics();
        }
      }
    });

    // 4. Edición Directa por Escribir en el Input Numérico
    tableBody.addEventListener('input', (e) => {
      if (e.target.classList.contains('input-stock')) {
        const id = e.target.getAttribute('data-id');
        const row = e.target.closest('tr');
        this.updateSingleStock(id, e.target.value, row);
      }
    });
  }
};