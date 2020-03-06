export const state = () => ({
  measureSwitch: 'diameter',
  doughBallWeight: 250,
  count: 1,
  size: 14,
  crustThickness: 0.4,
})

export const mutations = {
  TOGGLE_MEASURE_SWITCH(state, payload) {
    if (payload === undefined) state.measureSwitch = (state.measureSwitch === 'diameter') ? 'weight' : 'diameter'
    else state.measureSwitch = payload
  },
  SET_DOUGH_BALL_WEIGHT(state, payload) {
    state.doughBallWeight = parseFloat(payload)
  },
  SET_COUNT(state, payload) {
    state.count = parseFloat(payload)
  },
  SET_SIZE(state, payload) {
    state.size = parseFloat(payload)
  },
  SET_CRUST_THICKNESS(state, payload) {
    state.crustThickness = Math.ceil(parseFloat(payload) * 20) / 20
  }
}