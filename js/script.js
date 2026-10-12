document.addEventListener("DOMContentLoaded", () => {
  fetch("js/productos.json")   // 👈 apunta a la carpeta js
    .then(res => res.json())
    .then(data => mostrarProductos(data));
});

function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos.forEach((prod, index) => {
    let precioNum = parseFloat(prod.precio.replace(/[^0-9.]/g, ""));
    let precioFormateado = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(precioNum);

    const card = document.createElement("div");
    card.className = "col-md-3";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-header text-center fw-bold">
          ${prod.nombreProducto}
        </div>
        <div class="card-body text-center">
          <img src="${prod.srcImagenPeq}" class="img-fluid mb-2" alt="${prod.nombreProducto}">
          <p class="text-dark fw-semibold mb-0">${precioFormateado}</p>
        </div>
        <div class="card-footer text-center">
          <button class="btn btn-outline-primary btn-sm" onclick="abrirModal(${index})">Leer más</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function abrirModal(index) {
  fetch("js/productos.json")   // 👈 misma ruta que arriba
    .then(res => res.json())
    .then(productos => {
      const prod = productos[index];
      document.getElementById("modalNombre").textContent = prod.nombreProducto;
      document.getElementById("modalImagen").src = prod.srcImagenAmplia;
      document.getElementById("modalDescripcion").textContent = prod.descripcion;
      document.getElementById("modalPrecio").textContent = prod.precio;
      document.getElementById("modalEnlace").href = prod.enlaceTutorial;
      new bootstrap.Modal(document.getElementById("productoModal")).show();
    });
}
