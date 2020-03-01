export const state = () => ({
  hydration: 56,
  oilPercent: 7,
  saltPercent: 1.75,
  sugarPercent: 4,
  yeastPercent: 0.14,
  recipeYeastPercent: 0.14
})

export const mutations = {
  SET_HYDRATION(state, payload) {
    state.hydration = parseFloat(payload)
  },
  SET_OIL_PERCENT(state, payload) {
    state.oilPercent = parseFloat(payload)
  },
  SET_SALT_PERCENT(state, payload) {
    state.saltPercent = parseFloat(payload)
  },
  SET_SUGAR_PERCENT(state, payload) {
    state.sugarPercent = parseFloat(payload)
  },
  SET_YEAST_PERCENT(state, payload) {
    state.yeastPercent = parseFloat(payload)
  },
  SET_RECIPE_YEAST_PERCENT(state, payload) {
    state.recipeYeastPercent = parseFloat(payload)
  }
}