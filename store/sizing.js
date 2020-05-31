export const state = () => ({
  measureSwitch: 'diameter',
  doughBallWeight: 250,
  count: 1,
  size: 14,
  crustThickness: 0.4,
})

export const mutations = {
  TOGGLE_MEASURE_SWITCH(state, payload) {
    state.measureSwitch = payload
  },
  SET_DOUGH_BALL_WEIGHT(state, payload) {
    state.doughBallWeight = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_SIZE(state, payload) {
    state.size = payload
  },
  SET_CRUST_THICKNESS(state, payload) {
    state.crustThickness = payload
  }
}

export const actions = {
  toggleMeasureSwitch({ commit }, payload) {
    commit('TOGGLE_MEASURE_SWITCH', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { measure: payload } })
  },
  setDoughBallWeight({ commit }, payload) {
    let val = parseFloat(payload)

    commit('SET_DOUGH_BALL_WEIGHT', val)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { doughBallWeight: val } })
  },
  setCount({ commit }, payload) {
    let val = parseFloat(payload)

    commit('SET_COUNT', val)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { count: val } })
  },
  setSize({ commit }, payload) {
    let val = parseFloat(payload)

    commit('SET_SIZE', val)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { size: val } })
  },
  setCrustThickness({ commit }, payload) {
    let val = Math.round(parseFloat(payload) * 20) / 20

    commit('SET_CRUST_THICKNESS', val)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { crustThickness: val } })
  },
}