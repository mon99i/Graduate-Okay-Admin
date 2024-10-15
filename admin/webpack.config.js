import path from 'path';
import webpack from 'webpack'; // webpack 추가
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/index.tsx', // 엔트리 파일 설정
  output: {
    filename: 'bundle.js', // 출력 파일 이름
    path: path.resolve('build'), // 출력 경로
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 파일 확장자 처리
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // JS, TS 파일을 처리하기 위한 규칙
        exclude: /node_modules/,
        use: 'babel-loader', // Babel 로더 사용
      },
      {
        test: /\.css$/, // CSS 파일을 처리하기 위한 규칙
        use: ['style-loader', 'css-loader'], // 로더 설정
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html'), // 수정된 경로
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'), // 브라우저용으로 NODE_ENV 설정
      },
    }),
  ],
  mode: 'production', // 프로덕션 모드로 설정
};
