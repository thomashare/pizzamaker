export const state = () => ({
  selection: 'custom',
  amount: 28,
  steps: [],
  saltPercent: 0.04,
  oilPercent: 3.22,
  pepperPercent: 0.04,
  garlicPercent: 0.38,
  freshBasilPercent: 0.31,
  basilSprigCount: 0,
  freshOreganoPercent: 0.77,
  dryOreganoPercent: 0.06,
  sugarPercent: 0.79,
  butterPercent: 0,
  unsaltedButterPercent: 0,
  redPepperFlakesPercent: 0,
  yellowOnionCount: 0
})

export const mutations = {
  SET_SELECTION(state, payload) {
    state.selection = payload
  },
  SET_AMOUNT(state, payload) {
    state.amount = parseFloat(payload)
  },
  SET_STEPS(state, payload) {
    state.steps = payload
  },
  SET_SALT_PERCENT(state, payload) {
    state.saltPercent = parseFloat(payload)
  },
  SET_OIL_PERCENT(state, payload) {
    state.oilPercent = parseFloat(payload)
  },
  SET_PEPPER_PERCENT(state, payload) {
    state.pepperPercent = parseFloat(payload)
  },
  SET_GARLIC_PERCENT(state, payload) {
    state.garlicPercent = parseFloat(payload)
  },
  SET_FRESH_BASIL_PERCENT(state, payload) {
    state.freshBasilPercent = parseFloat(payload)
  },
  SET_BASIL_SPRIG_COUNT(state, payload) {
    state.basilSprigCount = parseFloat(payload)
  },
  SET_FRESH_OREGANO_PERCENT(state, payload) {
    state.freshOreganoPercent = parseFloat(payload)
  },
  SET_DRY_OREGANO_PERCENT(state, payload) {
    state.dryOreganoPercent = parseFloat(payload)
  },
  SET_SUGAR_PERCENT(state, payload) {
    state.sugarPercent = parseFloat(payload)
  },
  SET_BUTTER_PERCENT(state, payload) {
    state.butterPercent = parseFloat(payload)
  },
  SET_UNSALTED_BUTTER_PERCENT(state, payload) {
    state.unsaltedButterPercent = parseFloat(payload)
  },
  SET_RED_PEPPER_FLAKES_PERCENT(state, payload) {
    state.redPepperFlakesPercent = parseFloat(payload)
  },
  SET_YELLOW_ONION_COUNT(state, payload) {
    state.yellowOnionCount = parseFloat(payload)
  }
}