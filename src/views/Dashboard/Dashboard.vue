<template>
  <h1>Panel central</h1>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">Bienvenido a la Plataforma de Gestión de Despensa Sofía</div>
        <div class="card-body">
          <p>
            Aca podrás gestionar tus productos de manera fácil y eficiente, gestionar precios,
            inventario y más. Nuestra plataforma está diseñada para ayudarte a ahorrar tiempo y
            aumentar la productividad.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <button class="btn btn-primary" @click="$router.push('/calculadora')">
        Ir a la calculadora
        <i class="fa-solid fa-calculator"></i>
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <button class="btn btn-primary" @click="$router.push('/products')">
        Ir a la lista de Productos
        <i class="fa-solid fa-table"></i>
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <button class="btn btn-primary" @click="$router.push('/addProducts')">
        Agregar Productos
        <i class="fa-solid fa-store"></i>
      </button>
    </div>
  </div>
  <button class="btn btn-primary" @click="$router.push('/products/scan')">
    Escanear productos <i class="fa-solid fa-barcode"></i>
  </button>
</template>