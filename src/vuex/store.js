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
  filterCompanyName: '',
  curPage: 1
}

const actions = {
  updateContractId ({commit, state}, ContractId) {
    commit('setContractId', ContractId)
  },
  updateUserInfo ({commit, state}, UserInfo) {
    commit('setUserInfo', UserInfo)
  }
}

const mutations = {
  setContractId (state, ContractId) {
    state.contractId = ContractId
  },
  setUserInfo (state, UserInfo) {
    state.userInfo = UserInfo
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})
