const initialState = {
  token: null
}

export const state = () => JSON.parse(JSON.stringify(initialState))

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export const actions = {
  async login({ commit }, body) {
    const response = await this.$services.auth.login(body)

    const token = response.data.data.result.access_token
    commit('SET_TOKEN', token)
    this.$axios.setToken(token, 'Bearer')

    return response
  }
}