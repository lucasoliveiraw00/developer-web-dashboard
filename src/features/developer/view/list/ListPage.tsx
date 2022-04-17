import React, { useMemo, useRef } from 'react';

import format from 'date-fns/format';

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

import { DeveloperData } from './types';

const { Title, Paragraph } = Typography;

const ListPage = () => {
  const refTable = useRef<RefTableServerSideProps | undefined>();

  const columns = useMemo<TableColumnProps<DeveloperData>[]>(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: 'Data Nascimento',
        dataIndex: 'birth_date',
        render: (birthDate: string) => {
          const date = new Date(birthDate);
          return format(date, 'dd/MM/yyyy');
        },
      },
      {
        title: 'Idade',
        dataIndex: 'age',
        sorter: true,
      },
      {
        title: 'Nível',
        sorter: true,
        render: (data: DeveloperData) => data.level.level,
      },
      {
        title: 'Ações',
        render: (data: DeveloperData) => (
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
    <AppContainer title="Desenvolvedor" breadcrumb="Desenvolvedor">
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row align="middle">
          <Col span={12}>
            <Row align="middle">
              <Col span={24}>
                <Title level={3}>Listagem</Title>
                <Paragraph>Listagem de desenvolvedores</Paragraph>
              </Col>
            </Row>
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Row align="middle">
              <Col span={24}>
                <Link href="/desenvolvedor/novo">
                  <a>
                    <Button
                      type="primary"
                      size="middle"
                      block
                      icon={<PlusOutlined />}
                    >
                      Novo Desenvolvedor
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
              urlFetch="/developer"
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
