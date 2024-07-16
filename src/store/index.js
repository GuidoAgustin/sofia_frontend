import { createStore } from 'vuex'
import loader from './_loader'
import auth from './_auth'

export default createStore({
  modules: {
    auth,
    loader
  }
})
