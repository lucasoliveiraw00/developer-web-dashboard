import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import { Col, Input, Row, Space, Table, TablePaginationConfig } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import { FilterValue } from 'antd/lib/table/interface';

import { useQueryBase } from '@hooks/useQuery';

import { TableServerSideProps, TableData, Params, Sorter } from './types';

let refTimeout: NodeJS.Timeout;

const SectionTableServerSide = (props: TableServerSideProps) => {
  const { columns, urlFetch, refTable } = props;

  const [params, setParams] = useState<Params>({
    page: 1,
    perPage: 10,
  });

  const { data, isLoading, isPreviousData, status, refetch } =
    useQueryBase<TableData>(urlFetch, {
      params,
      optionsQuery: {
        keepPreviousData: true,
      },
    });

  const loading = status === 'loading' || isLoading || isPreviousData;

  useEffect(() => {
    let cleanup = true;

    if (cleanup && refTable) refTable({ refetchTableData: refetch });

    return () => {
      cleanup = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refTable]);

  function handleTableChange(
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: Sorter,
  ) {
    const newParams: Params = {
      page: pagination.current,
      perPage: pagination.pageSize,
      sort: undefined,
      order: undefined,
    };

    if (!Array.isArray(sorter)) {
      newParams.sort = sorter.order === 'ascend' ? 'asc' : 'desc';
      newParams.order = String(sorter.field);
    }

    setParams(newParams);
  }

  function onChangeSearch(event: React.FormEvent<HTMLInputElement>) {
    const search = event.currentTarget.value;
    clearTimeout(refTimeout);
    refTimeout = setTimeout(
      () => setParams(prevState => ({ ...prevState, search })),
      800,
    );
  }

  return (
    <Space direction="vertical" size={20} style={{ display: 'flex' }}>
      <Row>
        <Col span={7}>
          <Input
            allowClear
            size="large"
            placeholder="Pesquisar..."
            prefix={<SearchOutlined />}
            onChange={onChangeSearch}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            size="middle"
            columns={columns}
            rowKey={() => nanoid(54)}
            dataSource={data?.data || []}
            loading={loading}
            onChange={handleTableChange}
            pagination={{
              current: params.page,
              pageSize: params.perPage,
              total: data?.meta.total || 0,
            }}
          />
        </Col>
      </Row>
    </Space>
  );
};

export const TableServerSide = React.memo(SectionTableServerSide);
