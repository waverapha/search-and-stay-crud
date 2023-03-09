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
    const response = await this.$services.auth.login({
      login: body
    })

    commit('SET_TOKEN', response.data.data.result.access_token)

    return response
  }
}