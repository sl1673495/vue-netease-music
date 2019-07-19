module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target:  'http://localhost:3000',
          pathRewrite: { '^/api': '' },
          changeOrigin: true,
          secure: false,
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/style/variables.scss";`
      }
    }
  }
}