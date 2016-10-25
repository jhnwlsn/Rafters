module.exports = {
  entry: './source/assets/javascripts/application.js',
  output: {
    path: '/build',
    filename: 'application.js',
    libraryTarget: 'var',
    library: 'NV'
  }
};
