export default ($axios) => {
  return {
    index: async (page = 1) => {
      const query = new URLSearchParams({ page })

      return await $axios.get(`/house_rules?${query}`)
    },
    show: async (id) => await $axios.get(`/house_rules/${id}`),
    create: async (body) => await $axios.post('house_rules', body),
    update: async (id, body) => await $axios.put('house_rules', body),
    destroy: async (id) => await $axios.delete('house_rules')
  }
}