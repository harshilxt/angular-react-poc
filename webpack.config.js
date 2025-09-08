const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './client/src/react-mf.js',
    output: {
      path: path.resolve(__dirname, 'dist-mf'),
      filename: 'react-mf.js',
      libraryTarget: 'system',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'client/src'),
      },
    },
    externals: ['react', 'react-dom'],
    devServer: {
      port: 8080,
      hot: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'dist-mf'),
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        filename: 'index.html',
      }),
    ],
  };
};