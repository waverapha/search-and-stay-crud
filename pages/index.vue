<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100">
    <b-form @submit.stop.prevent="handleLogin">
      <b-form-group label="Email">
        <b-form-input
          v-model="form.data.email"
          type="email"
          required
          :state="emailInputValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="emailInputValidation">Must have at least 3 characters</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input
          v-model="form.data.password"
          type="password"
          required
          placeholder="Enter your password"
          :state="passwordInputValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="passwordInputValidation">Must have at least 8 characters</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit">Login</b-button>
    </b-form>

    <b-alert class="mt-3" variant="success" :show="form.success.has">{{ form.success.message }}</b-alert>
    <b-alert class="mt-3" variant="danger" :show="form.error.has">{{ form.error.message }}</b-alert>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const DEFAULT_SUCCESS_MESSAGE = 'Perfect! Redirecting...'
const DEFAULT_ERROR_MESSAGE = 'Error on login'

export default {
  middleware ({ store, redirect }) {
    if (store.state.auth.token) {
    redirect('/house-rules')
    }
  },

  data () {
    return {
      form: {
        data: {
          email: 'task@searchandstay.com',
          password: 'ph37i45K' // ph37i45K
        },
        error: {
          has: false,
          message: DEFAULT_ERROR_MESSAGE
        },
        success: {
          has: false,
          message: DEFAULT_SUCCESS_MESSAGE
        }
      }
    }
  },

  computed: {
    emailInputValidation () {
      return this.form.data.email.length >= 3
    },
    passwordInputValidation () {
      return this.form.data.password.length >= 8
    }
  },

  methods: {
    ...mapActions({
      login: 'auth/login'
    }),

    async handleLogin () {
      this.resetForm()

      try {
        await this.login(this.form.data)

        this.form.success.has = true

        await new Promise(resolve => setTimeout(resolve, 850))

        this.$router.push('/house-rules')
      } catch (e) {
        this.form.error.has = true
        this.form.error.message = e?.response?.data?.data ?? this.form.error.message
      }
    },

    resetForm () {
      this.form.success.has = false
      this.form.success.message = DEFAULT_SUCCESS_MESSAGE

      this.form.error.has = false
      this.form.error.message = DEFAULT_ERROR_MESSAGE
    },
  }
}
</script>