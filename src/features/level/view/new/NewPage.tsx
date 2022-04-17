import React, { useRef, useState } from 'react';

import {
  Row,
  Col,
  Space,
  Typography,
  Form,
  Input,
  Button,
  FormInstance,
} from 'antd';

import { CheckOutlined, CloseOutlined, LeftOutlined } from '@ant-design/icons';

import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import slugify from 'slugify';

import { AppContainer } from '@components/layout/app-container';

import { CONFIG_SLUGIFY } from '../../constants';

import { createLevel } from '../../data';

import { CreateLevel } from '../../data/types';

import { showErrorMessage } from '@utils/error';

const { Title, Paragraph } = Typography;

const NewPage = () => {
  const [loading, setLoading] = useState(false);

  const refForm = useRef<FormInstance | null>();

  const router = useRouter();

  function handleOnHistoryBack() {
    router.back();
  }

  async function handleOnFinish(values: CreateLevel) {
    setLoading(true);
    try {
      const formData: CreateLevel = values;
      const create = createLevel(formData);
      toast.promise(create, {
        pending: `Salvando dados`,
        success: 'Salvo com sucesso.',
      });
      await create;
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

  return (
    <AppContainer
      title="Nível / Novo"
      breadcrumb={[{ name: 'Nível', href: '/nivel' }, { name: 'Novo' }]}
    >
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row>
          <Col span={24}>
            <Title level={3}>Novo</Title>
            <Paragraph>Novo nível</Paragraph>
          </Col>
        </Row>
        <Form
          name="new-level"
          autoComplete="off"
          size="middle"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
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
                    Salvar
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </AppContainer>
  );
};

export { NewPage };
