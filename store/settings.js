export const state = () => ({
  nightMode: false
})

export const mutations = {
  SET_NIGHT_MODE(state, payload) {
    state.nightMode = payload
  }
}

export const actions = {
  setNightMode({ commit }, payload) {
    commit('SET_NIGHT_MODE', payload)
    
    // set local storage variable
    localStorage.nightMode = payload
  }
}