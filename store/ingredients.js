export const state = () => ({
  recipeYeastType: 'ADY',
  yeastType: 'ADY',
  sugarType: 'sugar'
})

export const mutations = {
  SET_RECIPE_YEAST_TYPE(state, payload) {
    state.recipeYeastType = payload
  },
  SET_YEAST_TYPE(state, payload) {
    state.yeastType = payload
  },
  SET_SUGAR_TYPE(state, payload) {
    state.sugarType = payload
  }
}