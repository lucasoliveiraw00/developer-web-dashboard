import React, { useMemo, useRef } from 'react';

import { Row, Col, Space, Typography, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import Link from 'next/link';

import { AppContainer } from '@components/layout/app-container';

import { TableServerSide } from '@components/data-display/table';

import {
  RefTableServerSideProps,
  TableColumnProps,
} from '@components/data-display/table/types';

import { Actions } from './sections/actions';

import { LevelData } from './types';

const { Title, Paragraph } = Typography;

const ListPage = () => {
  const refTable = useRef<RefTableServerSideProps | undefined>();

  const columns = useMemo<TableColumnProps<LevelData>[]>(
    () => [
      {
        title: 'Nível',
        dataIndex: 'level',
        sorter: true,
      },
      {
        title: 'Slug',
        dataIndex: 'slug',
      },
      {
        title: 'Qtd. Desenvolvedores',
        sorter: true,
        dataIndex: 'qtd_developers',
      },
      {
        title: 'Ações',
        render: (data: LevelData) => (
          <Actions
            id={data.id}
            refetchTableData={() => {
              refTable.current?.refetchTableData();
            }}
          />
        ),
      },
    ],
    [refTable],
  );

  return (
    <AppContainer title="Nível" breadcrumb="Nível">
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row align="middle">
          <Col span={12}>
            <Row align="middle">
              <Col span={24}>
                <Title level={3}>Listagem</Title>
                <Paragraph>Listagem de níveis</Paragraph>
              </Col>
            </Row>
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Row align="middle">
              <Col span={24}>
                <Link href="/nivel/novo">
                  <a>
                    <Button
                      type="primary"
                      size="middle"
                      block
                      icon={<PlusOutlined />}
                    >
                      Novo Nível
                    </Button>
                  </a>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TableServerSide
              urlFetch="/level"
              columns={columns}
              refTable={ref => {
                refTable.current = ref;
              }}
            />
          </Col>
        </Row>
      </Space>
    </AppContainer>
  );
};

export { ListPage };
