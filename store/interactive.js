export const state = () => ({
  showPrintDialog: false,
  printDialog: null,
  recipeToggle: 'dough'
})

export const mutations = {
  SET_SHOW_PRINT_DIALOG(state, payload) {
    state.showPrintDialog = payload

    if (payload === true) document.body.classList.add('fullscreen')
    else document.body.classList.remove('fullscreen')
  },
  SET_PRINT_DIALOG(state, payload) {
    state.printDialog = payload
  },
  SET_RECIPE_TOGGLE(state, payload) {
    state.recipeToggle = payload
  }
}

export const actions = {
  setPrintDialog({ state, commit }, payload) {
    commit('SET_SHOW_PRINT_DIALOG', !state.showPrintDialog)
    commit('SET_PRINT_DIALOG', payload)
  }
}