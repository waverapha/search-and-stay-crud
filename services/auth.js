export default ($axios) => {
  return {
    login: async (body) => await $axios.post('/login_json', { login: body })
  }
}