export const state = () => ({
  nightMode: true
})

export const mutations = {
  SET_NIGHT_MODE(state, payload) {
    state.nightMode = payload
  }
}

export const actions = {
  setNightMode({ state, commit }, payload) {
    commit('SET_NIGHT_MODE', payload)
    
    // set local storage variable
    localStorage.nightMode = payload

    if (state.nightMode === true) document.body.classList.add('night-mode')
    else document.body.classList.remove('night-mode')
  }
}