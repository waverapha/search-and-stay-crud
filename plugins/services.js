import services from '@/services'

export default ({ $axios }, inject) => {
  const servicesToInject = {}

  Object.entries(services).forEach(([key, value]) => {
    servicesToInject[key] = value($axios)
  })

  inject('services', servicesToInject)
}