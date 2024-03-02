const WorkboxPlugin = require("workbox-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  outputDir: "music",
  configureWebpack: {
    devtool: isProd ? false : "source-map",
    devServer: {
      open: true,
      proxy: {
        "/netease-api": {
          target: "http://localhost:3000",
          pathRewrite: { "^/netease-api": "" },
          changeOrigin: true,
          secure: false,
        },
      },
      port: 8888,
    },
    externals: isProd
      ? {
          vue: "Vue",
          "vue-router": "VueRouter",
          vuex: "Vuex",
          axios: "axios",
        }
      : {},
    plugins: [
      new WorkboxPlugin.GenerateSW({
        skipWaiting: true,
        clientsClaim: true,
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        data: `
          @import "~@/style/variables.scss";
          @import "~@/style/mixin.scss";
        `,
      },
    },
  },
};
