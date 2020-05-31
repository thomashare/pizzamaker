export const state = () => ({
  recipeYeastType: 'ADY',
  yeastType: 'ADY',
  sugarType: 'sugar'
})

export const mutations = {
  SET_YEAST_TYPE(state, payload) {
    state.yeastType = payload
  },
  SET_RECIPE_YEAST_TYPE(state, payload) {
    state.recipeYeastType = payload
  },
  SET_SUGAR_TYPE(state, payload) {
    state.sugarType = payload
  }
}

export const actions = {
  setYeastType({ commit }, payload) {
    commit('SET_YEAST_TYPE', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { yeastType: payload } })
  },
  setRecipeYeastType({ commit }, payload) {
    commit('SET_RECIPE_YEAST_TYPE', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { recipeYeastType: payload } })
  },
  setSugarType({ commit }, payload) {
    commit('SET_SUGAR_TYPE', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { sugarType: payload } })
  }
}