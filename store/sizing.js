export const state = () => ({
  count: 1,
  size: 12,
  crustThickness: 0.35,
})

export const mutations = {
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_SIZE(state, payload) {
    state.size = payload
  },
  SET_CRUST_THICKNESS(state, payload) {
    state.crustThickness = Math.ceil(payload * 20) / 20
  }
}