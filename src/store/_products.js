import axios from 'axios'

const baseUrl = import.meta.env.VITE_BACKEND_URL

export default {
  actions: {
    allProducts({ commit, getters }, params) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .get(baseUrl + 'products', {
            headers: {
              Authorization: `Bearer ${getters.token}`
            },
            params
          })
          .then(({ data }) => {
            resolve(data.data)
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },
    addProduct({ getters }, form) {
      return new Promise((resolve) => {
        console.log(baseUrl + 'addProducts')
        axios
          .post(baseUrl + 'addProducts', form, {
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
    scan({ commit, getters }, codigo) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .get(baseUrl + `products/scan:${codigo}`, {
            headers: {
              Authorization: `Bearer ${getters.token}`
            }
          })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },
    oneProduct({ commit, getters }, id) {
      console.log('Llamando a la acción oneProduct con id:', id)
      return new Promise((resolve, reject) => {
        commit('SHOW_LOADER')
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
    updateProduct({ commit, getters }, {id ,form}) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .put(
            baseUrl + 'products/' + id, form,{
              headers:{
                Authorization: `Bearer ${getters.token}`
              }
            }
          )
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
      console.log('Llamando a onDelete en _auth.js con productId:', productId)
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .delete(`${baseUrl}products/${productId}`, {
            headers: {
              Authorization: `Bearer ${getters.token}`
            }
          })
          .then(({data}) => {
            this.$toast.success(data.data)
            resolve()
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    }
  }
}
