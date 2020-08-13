import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const base_url = 'http://localhost:3030'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    UPDATE_USER(state, payload) {
      const user = {
        token: state.user.token,
        _id: state.user._id,
        ...payload
      }
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    LOGOUT() {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    async register({ commit }, payload) {
      try {
        const { data } = await axios.post(`${base_url}/signup`, payload)
        commit('SET_USER_DATA', data)
        commit('SET_ERROR', null)
      }
      catch (error) {
        commit('SET_ERROR', error.response.data.error)
      }
    },
    async login({ commit }, payload) {
      try {
        const { data } = await axios.post(`${base_url}/login`, payload)
        commit('SET_USER_DATA', data)
        commit('SET_ERROR', null)
      }
      catch (error) {
        commit('SET_ERROR', error.response.data.error)
      }
    },
    async update({ commit, state }, payload) {
      let change = false
      for(const key in payload) {
        if(state.user[key] !== payload[key]) {
          change = true
          break
        }
      }
      if(change) {
        try {
          const headers = {
            authorization: 'Bearer ' + state.user.token
          }
          const { data } = await axios.put(`${base_url}/${state.user._id}`, payload, { headers: headers })
          commit('UPDATE_USER', data)
          commit('SET_ERROR', null)
        }
        catch (error) {
          commit('SET_ERROR', error.response.data.error)
        }
      }
      else {
        commit('SET_ERROR', 'Para salvar os dados algum campo deve ser alterado')
      }
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    clearError({ commit }) {
      commit('SET_ERROR', null)
    }
  },
  getters: {
    error: (state) => {
      return state.error
    },
    user: (state) => {
      return state.user
    }
  }
})
