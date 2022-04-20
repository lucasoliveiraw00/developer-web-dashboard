import { QueryClient, QueryClientProvider } from 'react-query';

import { Content, Header } from 'antd/lib/layout/layout';
import { StyledContentLayout } from '../src/components/layout/app-container';

import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export const decorators = [
  (Story, args) => {
    const storyContainer = args.parameters?.storyContainer ?? true;

    if (!storyContainer) {
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    }

    return (
      <QueryClientProvider client={queryClient}>
        <StyledContentLayout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ marginBottom: 16 }}
          />
          <Content className="site-layout-content">
            <div
              className="site-layout-container"
              style={{ backgroundColor: '#fff' }}
            >
              <Story />
            </div>
          </Content>
        </StyledContentLayout>
      </QueryClientProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
