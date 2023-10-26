const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BACKEND_API
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue').use('vue-loader')
      .tap(options => ({ ...options,
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("swiper-")
        }
      }))
  }
})
