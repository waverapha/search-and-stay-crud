export default function ({ $axios, store, redirect }) {
  $axios.onResponseError(async (error) => {
    if (error.response.status === 409) {
      store.commit('auth/SET_TOKEN', null)

      await redirect('/')
    }

    return Promise.reject(error)
  })
}