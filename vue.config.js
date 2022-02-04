module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        // modify the options...
        return options;
      });
  },
  configureWebpack: {
    resolve: {
      // 别名配置
      alias: {
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
        plugins: "@/plugins",
        image: "@/assets/image",
        scss: "@/assets/scss",
        node: "/node_modules",
      },
    },
  },

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: "./server",
    },
  },
};
