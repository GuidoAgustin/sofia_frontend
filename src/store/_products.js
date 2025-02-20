import axios from 'axios'

const baseUrl = import.meta.env.VITE_BACKEND_URL

export default {
  actions: {
    scanSimple({ getters }, codigo) {
      return new Promise((resolve, reject) => {
        // <-- Importante: Añade reject
        axios
          .get(baseUrl + `products/scan/simple/${codigo}`, {
            headers: {
              Authorization: `Bearer ${getters.token}`
            }
          })
          .then(({ data }) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error) // <-- Importante: Rechaza la promesa en caso de error
          })
      })
    },
    allProducts({ getters }, params) {
      return new Promise((resolve, reject) => {
        // <-- Importante: Añade reject
        axios
          .get(baseUrl + 'products', {
            headers: {
              Authorization: `Bearer ${getters.token}`
            },
            params
          })
          .then(({ data }) => {
            resolve(data.data) // Resuelve con data.data
          })
          .catch((error) => {
            reject(error) // <-- Importante: Rechaza la promesa en caso de error
          })
      })
    },

    scan({ commit, getters }, codigo) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .get(baseUrl + `products/scan/${codigo}`, {
            headers: {
              Authorization: `Bearer ${getters.token}`
            }
          })
          .then(({ data }) => {
            resolve(data) // Resuelve con data
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    addProduct({ getters }, form) {
      return new Promise((resolve) => {
        axios
          .post(baseUrl + 'products', form, {
            headers: {
              Authorization: `Bearer ${getters.token}`
            }
          })
          .then(({ data }) => {
            resolve(data.data)
          })
          .catch(this.$errorHandler)
      })
    },

    oneProduct({ commit, getters }, id) {
      commit('SHOW_LOADER')
      return new Promise((resolve, reject) => {
        axios
          .get(baseUrl + `products/` + id, {
            headers: {
              Authorization: `Bearer ${getters.token}`
            }
          })
          .then(({ data }) => {
            resolve(data.data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    updateProduct({ commit, getters }, { id, form }) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .put(baseUrl + 'products/' + id, form, {
            headers: {
              Authorization: `Bearer ${getters.token}`
            }
          })
          .then(() => {
            this.$toast.success('Producto editado con exito')
            resolve()
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    onDelete({ commit, getters }, productId) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .delete(`${baseUrl}products/${productId}`, {
            headers: {
              Authorization: `Bearer ${getters.token}`
            }
          })
          .then(({ data }) => {
            this.$toast.success(data.data)
            resolve()
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    updatePrices({ commit, getters }, nuevosPrecios) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .put(
            baseUrl + 'products/batch/price_update',
            { productos: nuevosPrecios },
            {
              headers: {
                Authorization: `Bearer ${getters.token}`
              }
            }
          )
          .then(() => {
            this.$toast.success('Precios actualizados con éxito')
            resolve()
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    toggleFavorite({ commit, getters }, productId) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .put(
            `${baseUrl}products/${productId}/fecha_corta`,
            {},
            {
              headers: {
                Authorization: `Bearer ${getters.token}`
              }
            }
          )
          .then(({ data }) => {
            this.$toast.success('Estado actualizado')
            resolve(data.data)
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },
    guardarVenta({ commit, getters }, venta) {
      commit('SHOW_LOADER') // Opcional: mostrar un indicador de carga

      return new Promise((resolve, reject) => {
        console.log('URL completa:', baseUrl + 'ventas')
        axios
          .post(baseUrl + 'ventas', venta, {
            // <-- Ruta y datos
            headers: {
              Authorization: `Bearer ${getters.token}` // Si usas autenticación
            }
          })
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            commit('HIDE_LOADER') // Opcional: ocultar el indicador de carga
          })
      })
    }
  }
}
