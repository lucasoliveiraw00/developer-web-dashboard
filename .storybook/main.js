const path = require('path');

module.exports = {
  staticDirs: ['../public'],
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components'),
      '@features': path.resolve(__dirname, '../src/features'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@utils/': path.resolve(__dirname, '../src/utils'),
      '@': path.resolve(__dirname, '../src'),
    };

    return config;
  },
};
