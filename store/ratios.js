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
  }
}