module.exports = {
  entry: [
    "./src/index.js"
  ],

  output: {
    path: __dirname,
    filename: "app/js/bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
}
