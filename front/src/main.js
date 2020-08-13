import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  created () {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
      if(this._route.params.userName) {
        if(this._route.params.userName !== userData.userName) {
          this.$router.push(`/${userData.userName}`)
        }
      }
      else {
        this.$router.push(`/${userData.userName}`)
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
