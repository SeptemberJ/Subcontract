import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  useName: 'liubai',
  userInfo: null,
  contractId: null,
  filterProjectCode: '',
  filterConstructionTeam: '',
  filterCompanyName: ''
}

const actions = {
  updateContractId ({commit, state}, ContractId) {
    commit('setContractId', ContractId)
  }
}

const mutations = {
  setContractId (state, ContractId) {
    state.contractId = ContractId
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})
