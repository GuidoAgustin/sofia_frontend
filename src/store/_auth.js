import axios from "axios";
import $router from "../router";

const baseUrl = process.env.VUE_APP_BACKEND_URL;

export default {
  state: () => ({
    token: null,
    user: null,
  }),
  mutations: {
    SET_TOKEN(state, value) {
      localStorage.setItem("token", value);
      state.token = value;
    },
    SET_USER(state, value) {
      localStorage.setItem("user", JSON.stringify(value));
      state.user = value;
    },
  },
  actions: {
    setCredentials({ commit }) {
      commit("SET_TOKEN", JSON.parse(localStorage.getItem("token")));
      commit("SET_USER", JSON.parse(localStorage.getItem("user")));
    },
    login({ commit }, form) {
      commit("SHOW_LOADER");
      return new Promise((resolve, reject) => {
        axios
          .post(baseUrl + "login", form)
          .then(({ data }) => {
            if (form.remember) {
              localStorage.setItem("default_email", form.email);
              localStorage.setItem("default_pw", form.password);
            } else {
              localStorage.removeItem("default_email");
              localStorage.removeItem("default_pw");
            }
            commit("SET_TOKEN", data.data.token);
            commit("SET_USER", data.data.user);
            resolve();
          })
          .catch((err) => {
            console.log(err.response.data);
            reject(err.response.data.message);
          })
          .finally(() => {
            commit("HIDE_LOADER");
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
        $router.push("/login");
        resolve();
      });
    },

    register({ commit }, form) {
      commit("SHOW_LOADER");
      return new Promise((resolve, reject) => {
        axios
          .post(baseUrl + "register", form)
          .then(({ data }) => {
            resolve(data.data);
          })
          .catch((err) => {
            console.log(err.response.data);
            reject(err.response.data.message);
          })
          .finally(() => {
            commit("HIDE_LOADER");
          });
      });
    },

    forgetPassword({ commit }, form) {
      commit("SHOW_LOADER");
      return new Promise((resolve, reject) => {
        axios
          .post(baseUrl + "forget_password", form)
          .then(({ data }) => {
            resolve(data.data);
          })
          .catch((err) => {
            console.log(err.response.data);
            reject(err.response.data.message);
          })
          .finally(() => {
            commit("HIDE_LOADER");
          });
      });
    },

    resetPassword({ commit }, form) {
      commit("SHOW_LOADER");
      return new Promise((resolve, reject) => {
        axios
          .post(baseUrl + "reset_password", form)
          .then(({ data }) => {
            resolve(data.data);
          })
          .catch((err) => {
            console.log(err.response.data);
            reject(err.response.data.message);
          })
          .finally(() => {
            commit("HIDE_LOADER");
          });
      });
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null;
    },
    token(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
  },
};
