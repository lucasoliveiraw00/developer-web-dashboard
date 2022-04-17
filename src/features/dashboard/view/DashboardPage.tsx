import { Card, Col, Result, Row, Statistic } from 'antd';

import Link from 'next/link';

import { GoldOutlined, SmileOutlined, TeamOutlined } from '@ant-design/icons';

import { AppContainer } from '@components/layout/app-container';

import { useQueryBase } from '@hooks/useQuery';

import { DashboardData } from './types';

const DashboardPage = () => {
  const { data: dashboardData } = useQueryBase<DashboardData>('/dashboard');

  return (
    <AppContainer title="Dashboard" breadcrumb="Dashboard" layout="full">
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Link href="/nivel">
                <a>
                  <Statistic
                    title="Nível"
                    value={dashboardData?.qtd_levels || 0}
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<GoldOutlined />}
                  />
                </a>
              </Link>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Link href="/desenvolvedor">
                <a>
                  <Statistic
                    title="Desenvolvedor"
                    value={dashboardData?.qtd_developers || 0}
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<TeamOutlined />}
                  />
                </a>
              </Link>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Col span={24}>
            <Card>
              <Result icon={<SmileOutlined />} title="Seja bem vindo(a)!" />
            </Card>
          </Col>
        </Row>
      </div>
    </AppContainer>
  );
};

export { DashboardPage };
