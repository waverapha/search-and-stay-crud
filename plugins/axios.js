export default function ({ $axios, redirect }) {
  $axios.onError(async (error) => {
    if (error.response && error.response.status === 409) {
      await redirect('/')
    }
  })
}