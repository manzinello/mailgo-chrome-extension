const path = require("path");
const babelconfig = require("./babel.config");
const TerserPlugin = require("terser-webpack-plugin");

const mailgoRules = [
  {
    test: /\.tsx?$/,
    include: path.resolve(__dirname, "./src/"),
    use: [{ loader: "babel-loader", options: babelconfig }],
    exclude: /node_modules/,
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      "to-string-loader",
      {
        loader: "css-loader",
        options: {
          esModule: false,
          sourceMap: false,
        },
      },
      "sass-loader",
    ],
  },
];

const mailgoOutputEnvironment = {
  arrowFunction: false,
  bigIntLiteral: false,
  const: false,
  destructuring: false,
  dynamicImport: false,
  forOf: false,
  module: false,
};

const mailgoOptimization = {
  minimize: true,
  minimizer: [new TerserPlugin()],
};

module.exports = [
  {
    mode: "production",
    target: "web",
    devtool: "source-map",
    entry: "./mailgo-chrome-extension.ts",
    context: path.join(__dirname, "src"),
    module: {
      rules: mailgoRules,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    optimization: mailgoOptimization,
    output: {
      filename: "mailgo.chrome.min.js",
      library: "mailgo",
      libraryTarget: "window",
      environment: mailgoOutputEnvironment,
      path: path.resolve(__dirname),
    },
  },
];
