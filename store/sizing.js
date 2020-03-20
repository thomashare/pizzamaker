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
    let val = parseFloat(payload)

    state.doughBallWeight = val
  },
  SET_COUNT(state, payload) {
    let val = parseFloat(payload)

    state.count = val
  },
  SET_SIZE(state, payload) {
    let val = parseFloat(payload)

    state.size = val
  },
  SET_CRUST_THICKNESS(state, payload) {
    let val = Math.round(parseFloat(payload) * 20) / 20

    state.crustThickness = val
  }
}