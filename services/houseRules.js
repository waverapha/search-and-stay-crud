export default ($axios) => {
  return {
    index: async () => await $axios.get('/house_rules'),
    show: async (id) => await $axios.get(`/house_rules/${id}`),
    create: async (body) => await $axios.post('house_rules', body),
    update: async (id, body) => await $axios.put('house_rules', body),
    destroy: async (id) => await $axios.delete('house_rules')
  }
}