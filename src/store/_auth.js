import axios from 'axios'
import $router from '../router/index'

const baseUrl = import.meta.env.VITE_BACKEND_URL

export default {
  state: () => ({
    token: null,
    user: null
  }),
  mutations: {
    SET_TOKEN(state, value) {
      if (value) localStorage.setItem('token', value)
      else localStorage.removeItem('token')
      state.token = value
    },
    SET_USER(state, value) {
      if (value) localStorage.setItem('user', JSON.stringify(value))
      else localStorage.removeItem('user')
      state.user = value
    }
  },
  actions: {
    setCredentials({ commit }) {
      commit('SET_TOKEN', localStorage.getItem('token'))
      commit('SET_USER', JSON.parse(localStorage.getItem('user')))
    },
    registrar(_, form) {
      return new Promise((resolve) => {
        console.log(baseUrl + 'registro')
        axios
          .post(baseUrl + 'registro', form)
          .then(({ data }) => {
            resolve(data.data)
          })
          .catch(this.$errorHandler)
      })
    },
    login({ commit }, form) {
      commit('SHOW_LOADER')

      //   commit('SET_TOKEN', 'test')
      //   commit('SET_USER', 'test')
      //   commit('HIDE_LOADER')

      return new Promise((resolve) => {
        axios
          .post(baseUrl + 'login', form)
          .then(({ data }) => {
            if (form.remember) {
              localStorage.setItem('default_email', form.email)
              localStorage.setItem('default_pw', form.password)
            } else {
              localStorage.removeItem('default_email')
              localStorage.removeItem('default_pw')
            }
            commit('SET_TOKEN', data.data.token)
            commit('SET_USER', data.data.user)
            resolve()
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        $router.push('/login')
        resolve()
      })
    },

    register({ commit }, form) {
      commit('SHOW_LOADER')
      return new Promise((resolve, reject) => {
        axios
          .post(baseUrl + 'register', form)
          .then(({ data }) => {
            resolve(data.data)
          })
          .catch((err) => {
            console.log(err.response.data)
            reject(err.response.data.message)
          })
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    forgetPassword({ commit }, form) {
      commit('SHOW_LOADER')
      return new Promise((resolve, reject) => {
        axios
          .post(baseUrl + 'forget_password', form)
          .then(({ data }) => {
            resolve(data.data)
          })
          .catch((err) => {
            console.log(err.response.data)
            reject(err.response.data.message)
          })
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    resetPassword({ commit }, form) {
      commit('SHOW_LOADER')
      return new Promise((resolve, reject) => {
        axios
          .post(baseUrl + 'reset_password', form)
          .then(({ data }) => {
            resolve(data.data)
          })
          .catch((err) => {
            console.log(err.response.data)
            reject(err.response.data.message)
          })
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    updateProfile({ commit, getters, dispatch }, form) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .put(
            baseUrl + 'profile',
            {
              email: getters.user.email,
              ...form
            },
            {
              headers: {
                Authorization: `Bearer ${getters.token}`
              }
            }
          )
          .then(({ data }) => {
            this.$toast.success(data.data)
            dispatch('logout')
            resolve()
          })
          .catch(this.$errorHandler)
          .finally(() => {
            commit('HIDE_LOADER')
          })
      })
    },

    allProducts({ commit, getters }) {
      commit('SHOW_LOADER')
      return new Promise((resolve) => {
        axios
          .get(baseUrl + 'products', {
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
    addProduct({getters}, form) {
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
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null
    },
    token(state) {
      return state.token
    },
    user(state) {
      return state.user
    }
  }
}
