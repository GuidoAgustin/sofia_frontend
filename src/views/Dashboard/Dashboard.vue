<template>
  <div class="container">
    <!-- Tarjeta de bienvenida -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">Bienvenido a la Plataforma de Gestión de Despensa Sofía</div>
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

    <!-- Botones de navegación -->
    <div class="row mt-2">
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

    <!-- Sección para los gráficos -->
    <div class="card p-4">
      <div class="row mt-3">
        <div class="row">
          <!-- Donut: Ganancias del día -->
          <div class="col-md-4 mb-3 d-flex flex-column align-items-center">
            <apexchart
              type="donut"
              :options="donutChartOptions1"
              :series="donutChartSeries1"
              width="100%"
              height="200"
            ></apexchart>
            <p class="text-center mt-2">
              Ganancias del día:
              <span v-if="totalDia > 0">{{ formatoMoneda(totalDia) }}</span>
              <span v-else>No se vendió nada</span>
            </p>
          </div>

          <!-- Donut: Ganancias de la semana -->
          <div class="col-md-4 mb-3 d-flex flex-column align-items-center">
            <apexchart
              type="donut"
              :options="donutChartOptions2"
              :series="donutChartSeries2"
              width="100%"
              height="200"
            ></apexchart>
            <p class="text-center mt-2">
              Ganancias de la semana:
              <span v-if="totalSemana > 0">{{ formatoMoneda(totalSemana) }}</span>
              <span v-else>No se vendió nada</span>
            </p>
          </div>

          <!-- Donut: Ganancias del mes -->
          <div class="col-md-4 mb-3 d-flex flex-column align-items-center">
            <apexchart
              type="donut"
              :options="donutChartOptions3"
              :series="donutChartSeries3"
              width="100%"
              height="200"
            ></apexchart>
            <p class="text-center mt-2">
              Ganancias del mes:
              <span v-if="totalMes > 0">{{ formatoMoneda(totalMes) }}</span>
              <span v-else>No se vendió nada</span>
            </p>
          </div>

          <!-- 1er Gráfico de barras: Productos más vendidos del mes (Top 5) -->
          <div class="col-md-4 mb-3 d-flex flex-column align-items-center">
            <apexchart
              type="bar"
              :options="barChartOptions1"
              :series="barChartSeries1"
              width="100%"
              height="200"
            ></apexchart>
            <p class="text-center mt-2">Productos más vendido del mes</p>
          </div>

          <!-- 2do Gráfico de barras: Cantidad de ventas por mes (año actual) -->
          <div class="col-md-7 mb-3 d-flex flex-column align-items-center">
            <apexchart
              type="bar"
              :options="barChartOptions2"
              :series="barChartSeries2"
              width="250%"
              height="200"
            ></apexchart>
            <p class="text-center mt-2">Ventas por mes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ApexChart from 'vue3-apexcharts'

export default {
  name: 'Dashboard',
  components: {
    apexchart: ApexChart
  },
  data() {
    return {
      // Donuts: arrancan en 0
      donutChartSeries1: [0, 0, 0], // (Tarjeta, Efectivo, Transfer)
      donutChartOptions1: {
        chart: { type: 'donut' },
        labels: ['Tarjeta', 'Efectivo', 'Transferencia'],
        plotOptions: {
          pie: {
            donut: { size: '70%' }
          }
        },
        legend: { position: 'bottom' }
      },

      donutChartSeries2: [0, 0, 0],
      donutChartOptions2: {
        chart: { type: 'donut' },
        labels: ['Tarjeta', 'Efectivo', 'Transferencia'],
        plotOptions: {
          pie: {
            donut: { size: '70%' }
          }
        },
        legend: { position: 'bottom' }
      },

      donutChartSeries3: [0, 0, 0],
      donutChartOptions3: {
        chart: { type: 'donut' },
        labels: ['Tarjeta', 'Efectivo', 'Transferencia'],
        plotOptions: {
          pie: {
            donut: { size: '70%' }
          }
        },
        legend: { position: 'bottom' }
      },

      // Totales en pesos (día, semana, mes)
      totalDia: 0,
      totalSemana: 0,
      totalMes: 0,

      // 1er Gráfico de barras: Productos más vendidos del mes (Top 5)
      barChartSeries1: [
        {
          name: 'Cantidad',
          data: [0]
        }
      ],
      barChartOptions1: {
        chart: { type: 'bar' },
        xaxis: {
          categories: ['']
        },
        legend: { position: 'bottom' },
        plotOptions: {
          bar: { columnWidth: '90%' }
        },
        // Habilitamos dataLabels y rotación de etiquetas
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        }
      },

      // 2do Gráfico de barras: Cantidad de ventas por mes
      barChartSeries2: [
        {
          name: 'Ventas',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      barChartOptions2: {
        chart: { type: 'bar' },
        xaxis: {
          categories: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ]
        },
        legend: { position: 'bottom' },
        plotOptions: {
          bar: { columnWidth: '90%' }
        }
      }
    }
  },
  mounted() {
    this.cargarVentas()
  },
  methods: {
    ...mapActions(['getVentas']), // acción en el store que obtiene las ventas

    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(valor)
    },

    async cargarVentas() {
      try {
        const ventas = await this.getVentas()

        // Asegurarnos de que 'venta.productos' sea un array (parsear si es string)
        ventas.forEach((venta) => {
          if (typeof venta.productos === 'string') {
            try {
              venta.productos = JSON.parse(venta.productos)
            } catch (err) {
              console.error('Error parseando productos:', err)
              venta.productos = []
            }
          }
          if (!Array.isArray(venta.productos)) {
            venta.productos = []
          }
        })

        const ahora = new Date()

        // Rango del DÍA
        const startOfDay = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 0, 0, 0, 0)
        const endOfDay = new Date(startOfDay)
        endOfDay.setHours(23, 59, 59, 999)

        // Rango de la SEMANA (lunes a domingo)
        const startOfWeek = new Date(ahora)
        startOfWeek.setHours(0, 0, 0, 0)
        let day = startOfWeek.getDay()
        if (day === 0) day = 7
        startOfWeek.setDate(startOfWeek.getDate() - (day - 1))
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(endOfWeek.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)

        // Rango del MES (día 1 al último día)
        const startOfMonth = new Date(ahora.getFullYear(), ahora.getMonth(), 1, 0, 0, 0, 0)
        const endOfMonth = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0, 23, 59, 59, 999)

        let tarjetaDia = 0, efectivoDia = 0, transDia = 0
        let tarjetaSem = 0, efectivoSem = 0, transSem = 0
        let tarjetaMes = 0, efectivoMes = 0, transMes = 0

        // Productos más vendidos del mes
        const productQuantities = {}

        // Cantidad de ventas por mes (año actual)
        const monthlySales = new Array(12).fill(0)
        const currentYear = ahora.getFullYear()

        // Recorrer todas las ventas
        ventas.forEach((venta) => {
          const fechaVenta = new Date(venta.fecha_hora)
          const metodo = (venta.metodo_pago || '').toLowerCase()
          const total = Number(venta.total) || 0

          // Día
          if (fechaVenta >= startOfDay && fechaVenta <= endOfDay) {
            if (metodo === 'tarjeta') tarjetaDia += total
            else if (metodo === 'efectivo') efectivoDia += total
            else transDia += total
          }

          // Semana
          if (fechaVenta >= startOfWeek && fechaVenta <= endOfWeek) {
            if (metodo === 'tarjeta') tarjetaSem += total
            else if (metodo === 'efectivo') efectivoSem += total
            else transSem += total
          }

          // Mes
          if (fechaVenta >= startOfMonth && fechaVenta <= endOfMonth) {
            if (metodo === 'tarjeta') tarjetaMes += total
            else if (metodo === 'efectivo') efectivoMes += total
            else transMes += total

            // Acumular productos vendidos este mes
            venta.productos.forEach((prod) => {
              // Ajusta según tu BD: si usas prod.name_product, prod.name, etc.
              const nombreProd = prod.product || 'Desconocido'
              const cant = Number(prod.cantidad) || 0
              if (!productQuantities[nombreProd]) {
                productQuantities[nombreProd] = 0
              }
              productQuantities[nombreProd] += cant
            })
          }

          // Cantidad de ventas por mes (año actual)
          if (fechaVenta.getFullYear() === currentYear) {
            const saleMonth = fechaVenta.getMonth()
            monthlySales[saleMonth] += total
          }
        })

        // Actualizar las series de los donuts
        this.donutChartSeries1 = [tarjetaDia, efectivoDia, transDia]
        this.donutChartSeries2 = [tarjetaSem, efectivoSem, transSem]
        this.donutChartSeries3 = [tarjetaMes, efectivoMes, transMes]

        this.totalDia = tarjetaDia + efectivoDia + transDia
        this.totalSemana = tarjetaSem + efectivoSem + transSem
        this.totalMes = tarjetaMes + efectivoMes + transMes

        // Determinar los 5 productos más vendidos del mes
        const entries = Object.entries(productQuantities) // [[nombreProd, cantidad], ...]
        // Ordenar de mayor a menor
        entries.sort((a, b) => b[1] - a[1])

        if (entries.length > 0) {
          const top5 = entries.slice(0, 5)
          const top5Names = top5.map(([nombreProd]) => nombreProd)
          const top5Cantidades = top5.map(([, cantidad]) => cantidad)

          // Actualizar primer gráfico de barras con 5 productos
          this.barChartSeries1 = [
            {
              name: 'Cantidad',
              data: top5Cantidades
            }
          ]

          // Para forzar la reactividad y que se re-renderice
          this.barChartOptions1 = {
            ...this.barChartOptions1,
            xaxis: {
              ...this.barChartOptions1.xaxis,
              categories: top5Names,
              labels: {
                rotate: -45,  // rotar etiquetas 45 grados
                show: true
              }
            },
            plotOptions: {
              bar: {
                columnWidth: '90%',
                dataLabels: {
                  position: 'top'
                }
              }
            },
            dataLabels: {
              enabled: true,
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ['#304758']
              }
            }
          }
        } else {
          // Si no hay productos, poner algo por defecto
          this.barChartSeries1 = [
            {
              name: 'Cantidad',
              data: [0]
            }
          ]
          this.barChartOptions1 = {
            ...this.barChartOptions1,
            xaxis: {
              ...this.barChartOptions1.xaxis,
              categories: ['Sin ventas']
            }
          }
        }

        // Actualizar la serie de 'Ventas por mes' con monthlySales
        this.barChartSeries2 = [
          {
            name: 'Ventas',
            data: monthlySales
          }
        ]
      } catch (error) {
        console.error('Error cargando ventas:', error)
      }
    }
  }
}
</script>
