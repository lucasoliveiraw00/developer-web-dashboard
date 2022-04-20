import { Layout } from 'antd';

import { styled } from '@/theme';

export const StyledLayout = styled(Layout, {
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

export const StyledContentLayout = styled(Layout, {
  overflowY: 'auto',
  height: 'min-content',
  minHeight: '100vh',
  '.site-layout-background': { padding: 0 },
  '.site-layout-content': { margin: '0 16px' },
  '.site-layout-breadcrumb': { margin: '16px 0' },
  '.site-layout-container': { padding: 24, minHeight: 350 },
  '.site-layout-footer': { textAlign: 'center' },
});
