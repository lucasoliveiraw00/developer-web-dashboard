import { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, Bounce } from 'react-toastify';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

import { SentryProvider } from '@/libs/sentry';

import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SentryProvider>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ptBR}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ConfigProvider>
    </QueryClientProvider>
    <ToastContainer limit={5} autoClose={5000} transition={Bounce} icon />
  </SentryProvider>
);

export default MyApp;
