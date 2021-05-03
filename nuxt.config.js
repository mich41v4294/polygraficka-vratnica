export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,
  target: 'static', // default is 'server'

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Vrátnica - Polygrafická',
    htmlAttrs: {
      lang: 'sk'
    },
    meta: [
      { charset: 'utf-8' },
      { theme_color: '#009EE2' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-cookies.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/toast',
  ],
  
  toast: {
    theme: "outline",
    position: 'top-center',
    duration: 5000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
