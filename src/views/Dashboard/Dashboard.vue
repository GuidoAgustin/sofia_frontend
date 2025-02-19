<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            Bienvenido a la Plataforma de Gestión de Despensa Sofía
          </div>
          <div class="card-body">
            <p>
              Acá podrás gestionar tus productos de manera fácil y eficiente, gestionar precios,
              inventario y más. Nuestra plataforma está diseñada para ayudarte a ahorrar tiempo y
              aumentar la productividad.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 d-flex justify-content-between">
        <button class="btn btn-primary" @click="$router.push('/ventas')">
          Ir a la Ventas <i class="fa fa-shopping-basket"></i>
        </button>
        <button class="btn btn-primary" @click="$router.push('/calculadora')">
          Ir a la calculadora <i class="fa-solid fa-calculator"></i>
        </button>
        <button class="btn btn-primary" @click="$router.push('/products')">
          Ir a la lista de Productos <i class="fa-solid fa-table"></i>
        </button>
        <button class="btn btn-primary" @click="$router.push('/addProducts')">
          Agregar Productos <i class="fa-solid fa-store"></i>
        </button>
        <button class="btn btn-primary" @click="$router.push('/products/scan')">
          Escanear productos <i class="fa-solid fa-barcode"></i>
        </button>
      </div>
    </div>
  </div>
</template>