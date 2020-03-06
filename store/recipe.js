export const state = () => ({
  selection: 'custom',
  steps: []
})

export const mutations = {
  SET_SELECTION(state, payload) {
    state.selection = payload
  },
  SET_STEPS(state, payload) {
    state.steps = payload
  }
}