import { createStitches } from '@stitches/react';

import { defaultTheme } from '../../styles/theme';

const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  theme,
  config: configTheme,
} = createStitches({
  prefix: 'app',
  theme: defaultTheme,
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)',
  },
});

export {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  theme,
  configTheme,
};
