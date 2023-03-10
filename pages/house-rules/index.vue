<template>
  <b-container fluid="md" class="mt-4">
    <h1 class="mb-3">House Rules - Page {{ pagination.current }}</h1>

    <b-row>
      <b-col>
        <b-list-group v-if="isLoading">
          <b-list-group-item
            v-for="item in pagination.total"
            :key="item"
          >
            <b-skeleton animation="fade" width="100%"></b-skeleton>
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item
            v-for="houseRule in houseRules"
            :key="houseRule.id"
            :to="{ path: `/house-rules/${houseRule.id}` }"
          >
            {{ houseRule.name }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>

    <div class="d-flex justify-content-center align-items-center">
      <b-pagination
        v-model="pagination.current"
        :total-rows="pagination.total"
        :per-page="pagination.perPage"
        class="mt-3"
        @input="handlePageChange"
      ></b-pagination>
    </div>
  </b-container>
</template>

<script>
export default {
  async asyncData({ $services }) {
    const pageData = {
      houseRules: [],
      isLoading: false,
      pagination: {
        current: 1,
        total: 1,
        perPage: 10
      },
    }

    try {
      const response = await $services.houseRules.index()

      const { pagination, entities } = response.data.data

      pageData.pagination.perPage = pagination.per_page
      pageData.pagination.total = pagination.total
      pageData.houseRules = entities
    } catch(e) {
      console.error(e)
    }

    return pageData
  },

  methods: {
    async handlePageChange (page) {
      this.pagination.current = page

      try {
        this.isLoading = true
        const response = await this.$services.houseRules.index(this.pagination.current)
        const { entities, pagination } = response.data.data
    
        this.pagination.total = pagination.total
        this.houseRules = entities ?? []
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>