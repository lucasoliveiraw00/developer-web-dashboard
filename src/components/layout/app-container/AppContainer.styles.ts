import { Layout } from 'antd';

import { styled } from '@/theme';

const StyledLayout = styled(Layout, {
  minHeight: '100vh',
  height: '100%',
  '.logo': {
    height: '32px',
    margin: '16px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
  '.site-layout .site-layout-background': { background: '#fff' },
  '[data-theme="dark"] .site-layout .site-layout-background': {
    background: '#141414',
  },
});

export { StyledLayout };
