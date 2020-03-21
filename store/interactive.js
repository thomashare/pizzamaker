export const state = () => ({
  showPrintDialog: false
})

export const mutations = {
  SET_SHOW_PRINT_DIALOG(state, payload) {
    state.showPrintDialog = payload

    if (payload === true) document.body.classList.add('fullscreen')
    else document.body.classList.remove('fullscreen')
  }
}