export const state = () => ({
  hydration: 56,
  oilPercent: 7,
  saltPercent: 1.75,
  sugarPercent: 4,
  yeastPercent: 0.14,
  recipeYeast: 0.14
})

export const mutations = {
  SET_HYDRATION(state, payload) {
    state.hydration = payload
  },
  SET_OIL_PERCENT(state, payload) {
    state.oilPercent = payload
  },
  SET_SALT_PERCENT(state, payload) {
    state.saltPercent = payload
  },
  SET_SUGAR_PERCENT(state, payload) {
    state.sugarPercent = payload
  },
  SET_YEAST_PERCENT(state, payload) {
    state.yeastPercent = payload
  },
  SET_RECIPE_YEAST(state, payload) {
    state.recipeYeast = payload
  }
}