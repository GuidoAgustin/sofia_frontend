import { createStore } from 'vuex'
import loader from './_loader'
import auth from './_auth'
import products from './_products'

export default createStore({
  modules: {
    auth,
    loader,
    products
  }
})
