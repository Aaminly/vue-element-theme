const campus = {
  state: {
    campusStatus: ''
  },
  mutations: {
    SET_CAMPUS_STATUS(state, list) {
      state.campusStatus = list
    }
  },
  actions: {
    getCampusStatus({ commit }, params) {
      commit('SET_CAMPUS_STATUS', params)
    }
  }
}

export default campus
