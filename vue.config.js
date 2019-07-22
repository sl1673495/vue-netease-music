module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/netease-api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/netease-api': '' },
          changeOrigin: true,
          secure: false
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/style/variables.scss";
          @import "~@/style/_mixin.scss";
        `
      }
    }
  }
}
