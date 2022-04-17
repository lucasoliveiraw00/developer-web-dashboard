import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Row,
  Col,
  Space,
  Typography,
  Form,
  Input,
  Button,
  FormInstance,
  Spin,
} from 'antd';

import { CheckOutlined, CloseOutlined, LeftOutlined } from '@ant-design/icons';

import { toast } from 'react-toastify';

import slugify from 'slugify';

import { AppContainer } from '@components/layout/app-container';

import { useQueryBase } from '@hooks/useQuery';

import { CONFIG_SLUGIFY } from '../../constants';

import { updateLevel } from '../../data';

import { UpdateLevel } from '../../data/types';

import { LevelData } from './types';

import { showErrorMessage } from '@utils/error';

const { Title, Paragraph } = Typography;

const EditPage = () => {
  const [loading, setLoading] = useState(false);

  const refForm = useRef<FormInstance | null>();

  const router = useRouter();

  const {
    data: levelData,
    isLoading: isLoadingLevel,
    status: statusLevel,
    error: errorDeveloper,
  } = useQueryBase<LevelData>(`/level/${router.query.id}`, {
    optionsQuery: {
      enabled: !!router.query.id,
    },
  });

  const loadingLevel =
    ['idle', 'loading'].includes(statusLevel) || isLoadingLevel;

  useEffect(() => {
    if (levelData) refForm.current?.setFieldsValue(levelData);
  }, [levelData, refForm]);

  function handleOnHistoryBack() {
    router.back();
  }

  async function handleOnFinish(values: LevelData) {
    setLoading(true);
    try {
      const formData: UpdateLevel = {
        ...levelData,
        ...values,
      };
      const update = updateLevel(formData);
      toast.promise(update, {
        pending: `Editando dados`,
        success: 'Editado com sucesso.',
      });
      await update;
      handleOnHistoryBack();
    } catch (error) {
      showErrorMessage(error);
    }
    setLoading(false);
  }

  function handleOnReset() {
    refForm.current?.resetFields();
  }

  function handleOnLevel(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    const slug = slugify(value, CONFIG_SLUGIFY);
    refForm.current?.setFieldsValue({ slug });
  }

  if (errorDeveloper) {
    showErrorMessage(errorDeveloper);
    router.replace('/nivel');
  }

  return (
    <AppContainer
      title="Nível / Editar"
      breadcrumb={[{ name: 'Nível', href: '/nivel' }, { name: 'Editar' }]}
    >
      <Spin size="large" tip="Carregando..." spinning={loadingLevel}>
        <Space direction="vertical" size={20} style={{ display: 'flex' }}>
          <Row>
            <Col span={24}>
              <Title level={3}>Editar</Title>
              <Paragraph>Editar nível</Paragraph>
            </Col>
          </Row>
          <Form
            name="edit-level"
            autoComplete="off"
            size="middle"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            onFinish={handleOnFinish}
            ref={ref => {
              refForm.current = ref;
            }}
          >
            <Row justify="center">
              <Col span={24}>
                <Form.Item
                  label="Nível"
                  name="level"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Preencher" onChange={handleOnLevel} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Slug" name="slug">
                  <Input placeholder="Slug nível" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end" align="middle">
              <Col
                span={24}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Form.Item>
                  <Space align="center" direction="horizontal">
                    <Button
                      htmlType="button"
                      loading={loading}
                      icon={<LeftOutlined />}
                      onClick={handleOnHistoryBack}
                    >
                      Voltar
                    </Button>
                    <Button
                      htmlType="button"
                      loading={loading}
                      icon={<CloseOutlined />}
                      onClick={handleOnReset}
                    >
                      Limpar
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={loading}
                      icon={<CheckOutlined />}
                    >
                      Editar
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Space>
      </Spin>
    </AppContainer>
  );
};

export { EditPage };
