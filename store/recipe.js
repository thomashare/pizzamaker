export const state = () => ({
  selection: 'custom',
  steps: [],
  fermentation: 'custom'
})

export const mutations = {
  SET_SELECTION(state, payload) {
    state.selection = payload

    if (payload === 'custom') state.fermentation = 'custom'
    else state.fermentation = 'recipe'
  },
  SET_STEPS(state, payload) {
    state.steps = payload
  },
  SET_FERMENTATION(state, payload) {
    state.fermentation = payload
  }
}