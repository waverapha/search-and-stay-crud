export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'search-and-stay',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/main'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/services',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  bootstrapVue: {
    components: ['BContainer', 'BRow', 'BCol', 'BForm', 'BFormGroup', 'BFormInvalidFeedback', 'BFormInput', 'BFormRadio', 'BButton', 'BAlert', 'BListGroup', 'BListGroupItem', 'BSkeleton', 'BPagination'],
    componentPlugins: [
      'LayoutPlugin',
      'FormPlugin',
      'FormInputPlugin',
      'FormRadioPlugin'
    ],
    directivePlugins: []
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://sys-dev.searchandstay.com/api/admin',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
