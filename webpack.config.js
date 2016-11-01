var path = require('path');

module.exports = {
    entry: {
      grafarso: './src/grafarso.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name].js",
        library: "grafarso",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
      loaders: [{ test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] }, }],
    },
}
