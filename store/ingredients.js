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

export const getters = {
  flour(state, getters, rootState, rootGetters) {
    // if measureSwitch is set to diameter, calculate by diameter measurement
    if (rootState.sizing.measureSwitch === 'diameter') {
      const diameter = Math.PI * (rootState.sizing.size/5 + rootState.sizing.size/5)
      return Math.round(diameter * (rootState.sizing.crustThickness * rootState.sizing.count) * 21 / 10) * 10
    }

    // else if measureSwitch is set to weight, calculate flour by weight.
    const totalIngredientPercentages = 100 + rootState.ratios.hydration + rootState.ratios.oilPercent + rootState.ratios.saltPercent + rootState.ratios.sugarPercent + rootState.ratios.yeastPercent

    return Math.round(rootState.sizing.doughBallWeight / (totalIngredientPercentages/100) * rootState.sizing.count * 10) / 10
  }
}