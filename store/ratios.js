export const state = () => ({
  hydration: 65,
  oilPercent: 1.3,
  saltPercent: 2.61,
  sugarPercent: 0,
  yeastPercent: 0.65,
  recipeYeastPercent: 0.65,
  diastaticMaltPercent: 0,
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
  },
  SET_DIASTATIC_MALT_PERCENT(state, payload) {
    let val = parseFloat(payload)
    
    state.diastaticMaltPercent = val
  }
}

export const actions = {
  setHydration({ commit }, payload) {
    commit('SET_HYDRATION', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { dough: 'custom', hydration: payload } })
  },
  setOilPercent({ commit }, payload) {
    commit('SET_OIL_PERCENT', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { dough: 'custom', oil: payload } })
  },
  setSaltPercent({ commit }, payload) {
    commit('SET_SALT_PERCENT', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { dough: 'custom', salt: payload } })
  },
  setSugarPercent({ commit }, payload) {
    commit('SET_SUGAR_PERCENT', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { dough: 'custom', sugar: payload } })
  },
  setYeastPercent({ commit }, payload) {
    commit('SET_YEAST_PERCENT', payload)
    $nuxt.$router.push({ path: $nuxt.$route.fullPath, query: { dough: 'custom', yeast: payload } })
  },
  setRecipeYeastPercent({ commit }, payload) {
    commit('SET_RECIPE_YEAST_PERCENT', payload)
  },
  setDiastaticMaltPercent({ commit }, payload) {
    commit('SET_DIASTATIC_MALT_PERCENT', payload)
  }
}

export const getters = {
  sugarPercent(state, getters, rootState, rootGetters) {
    // if sugarType is molasses, convert the sugar percentage to grams of molasses
    if (rootState.ingredients.sugarType === 'molasses') {
      return state.sugarPercent * 1.33
    }

    // if sugarType is honey, convert the sugar percentage to grams of honey
    else if (rootState.ingredients.sugarType === 'honey') {
      return state.sugarPercent * 0.66
    }

    else return state.sugarPercent
  }
}