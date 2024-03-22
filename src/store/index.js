import { createStore } from 'vuex'
import { auth } from "./modules/public/auth.module.js";
export default createStore({
  modules: {
    auth,
  }
})
