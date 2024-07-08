module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios/.*)',
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
    },
  };
  