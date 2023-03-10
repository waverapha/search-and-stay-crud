<template>
  <b-container fluid="sm">
    <h1>{{ houseRule.name }}</h1>

    <b-form @submit.stop.prevent="handleEdit">
      <b-form-group label="Name" :disabled="isLoading">
        <b-form-input
          v-model="form.data.name"
          required
          :state="nameInputValidation"
          placeholder="Enter rule name"
          maxlength="75"
        ></b-form-input>
        <b-form-invalid-feedback :state="nameInputValidation">Must have at least 3 characters</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Active" :disabled="isLoading">
        <b-form-radio-group v-model="form.data.active" class="d-flex flex-columm">
          <b-form-radio :value="1">Keep rule activated</b-form-radio>
          <b-form-radio :value="0">Deactivate rule</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <b-button type="submit" :disabled="isLoading" variant="primary">Edit</b-button>
      <b-button type="button" :disabled="isLoading" variant="danger" @click="handleDelete">Delete</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  async asyncData({ $services, params }) {
    const pageData = {
      houseRule: null,
      isLoading: false
    }

    try {
      const response = await $services.houseRules.show(params.id)

      const { data } = response.data

      pageData.houseRule = data
      pageData.form = {
        data: {
          name: pageData.houseRule.name,
          active: pageData.houseRule.active
        }
      }
    } catch(e) {
      console.error(e)
    }

    return pageData
  },

  computed: {
    nameInputValidation () {
      return this.form.data.name.length >= 3
    }
  },

  methods: {
    async handleEdit () {
      try {
        this.isLoading = true

        await this.$services.houseRules.update(this.houseRule.id, this.form.data)

        this.houseRule = {
          ...this.houseRule,
          ...this.form.data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    async handleDelete () {
      try {
        this.isLoading = true

        await this.$services.houseRules.destroy(this.houseRule.id)

        this.$router.push('/house-rules')
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>