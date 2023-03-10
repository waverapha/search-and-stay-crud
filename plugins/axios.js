export default function ({ $axios, store, redirect }) {
  $axios.onError(async (error) => {
    if (error.response && error.response.status === 409) {
      store.commit('auth/SET_TOKEN', null)

      await redirect('/')
    }
  })
}