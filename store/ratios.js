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
    let val = parseFloat(payload)

    state.hydration = val
  },
  SET_OIL_PERCENT(state, payload) {
    let val = parseFloat(payload)

    state.oilPercent = val
  },
  SET_SALT_PERCENT(state, payload) {
    let val = parseFloat(payload)

    state.saltPercent = val
  },
  SET_SUGAR_PERCENT(state, payload) {
    let val = parseFloat(payload)

    state.sugarPercent = val
  },
  SET_YEAST_PERCENT(state, payload) {
    let val = parseFloat(payload)

    state.yeastPercent = val
  },
  SET_RECIPE_YEAST_PERCENT(state, payload) {
    let val = parseFloat(payload)
    
    state.recipeYeastPercent = val
  }
}