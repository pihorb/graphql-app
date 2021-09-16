module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  env: {
    test: {
      presets: ['@babel/preset-typescript', '@babel/preset-env'],
    },
  },
}
