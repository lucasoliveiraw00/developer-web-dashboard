import { Button, Result } from 'antd';

import Link from 'next/link';

import { AppContainer } from '@components/layout/app-container';

const NotFundPage = () => (
  <AppContainer breadcrumb="">
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você visitou não existe."
      extra={
        <Link href="/dashboard">
          <a>
            <Button type="primary">Voltar para dashboard</Button>
          </a>
        </Link>
      }
    />
  </AppContainer>
);

export { NotFundPage };
