module.exports = {
  lintOnSave: false,
  devServer: {
    // proxy:"http://120.27.241.94:50682",
    // port: '8080'
    proxy:{
      '/api': {
        target: 'http://120.27.241.94:50682',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/', // rewrite path
        },
      },
    }
  }
}
