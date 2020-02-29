export const state = () => ({
  recipeYeastType: 'ADY',
  yeastType: 'ADY'
})

export const mutations = {
  SET_RECIPE_YEAST_TYPE(state, payload) {
    state.recipeYeastType = payload
  },
  SET_YEAST_TYPE(state, payload) {
    state.yeastType = payload
  }
}