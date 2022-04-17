import React, { useState } from 'react';

import { Button, Popconfirm, Space } from 'antd';

import { toast } from 'react-toastify';

import Link from 'next/link';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { deleteLevel } from '../../../../data';

import { ActionsProps } from './types';

import { showErrorMessage } from '@utils/error';

const Actions = ({ id, refetchTableData }: ActionsProps) => {
  const [loading, setLoading] = useState(false);

  async function handleDeleteDeveloper() {
    setLoading(true);
    try {
      const response = deleteLevel(id);
      toast.promise(response, {
        pending: `Excluindo dados`,
        success: 'Excuido com sucesso.',
      });
      await response;
      if (refetchTableData) refetchTableData();
    } catch (error) {
      showErrorMessage(error);
    }
    setLoading(false);
  }

  return (
    <Space>
      <Link href={`/nivel/editar/${id}`}>
        <a>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            size="small"
          />
        </a>
      </Link>
      <Popconfirm
        title="Tem certeza de que deseja excluir este dado?"
        onConfirm={handleDeleteDeveloper}
        okText="Sim"
        cancelText="Não"
      >
        <Button
          danger
          type="primary"
          shape="circle"
          size="small"
          icon={<DeleteOutlined />}
          loading={loading}
        />
      </Popconfirm>
    </Space>
  );
};

export { Actions };
