const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  outputDir: 'music',
  configureWebpack: {
    devServer: {
      open: true,
      proxy: {
        '/netease-api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/netease-api': '' },
          changeOrigin: true,
          secure: false,
        },
      },
      port: 8888,
    },
    externals: process.env.NODE_ENV === 'production' ? {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
    }: {},
    plugins: [
      new WorkboxPlugin.GenerateSW()
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/style/variables.scss";
          @import "~@/style/mixin.scss";
        `,
      },
    },
  },
}
