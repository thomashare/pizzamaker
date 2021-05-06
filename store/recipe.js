export const state = () => ({
  selection: 'custom',
  steps: [],
  fermentation: 'custom',
  credits: {},
  mode: 'basic',
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
  },
  SET_CREDITS(state, payload) {
    state.credits.site = payload[0]
    state.credits.href = payload[1]
  },
  SET_MODE(state, payload) {
    state.mode = payload
  },
}