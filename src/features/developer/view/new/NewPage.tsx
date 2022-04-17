import React, { useRef, useState } from 'react';

import {
  Row,
  Col,
  Space,
  Typography,
  Form,
  Input,
  Select,
  Button,
  FormInstance,
  DatePicker,
} from 'antd';

import { CheckOutlined, CloseOutlined, LeftOutlined } from '@ant-design/icons';

import { nanoid } from 'nanoid';
import moment from 'moment';

import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { AppContainer } from '@components/layout/app-container';

import { useQueryBase } from '@hooks/useQuery';

import { createDeveloper } from '../../data';

import { CreateDeveloper } from '../../data/types';

import { LevelData } from './types';

import { showErrorMessage } from '@utils/error';

const { Title, Paragraph } = Typography;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const sexes = [
  {
    name: 'Masculino',
    slug: 'masculino',
  },
  {
    name: 'Feminino',
    slug: 'feminino',
  },
  {
    name: 'Não prefiro informar',
    slug: '',
  },
];

const NewPage = () => {
  const [loading, setLoading] = useState(false);

  const refForm = useRef<FormInstance | null>();

  const router = useRouter();

  const { data: levelsData, isLoading: isLoadingLevelsData } =
    useQueryBase<LevelData[]>('/level/list');

  function handleOnHistoryBack() {
    router.back();
  }

  async function handleOnFinish(values: CreateDeveloper) {
    setLoading(true);
    try {
      const formData = values;
      const create = createDeveloper(formData);
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

  function handleDisabledDate(current: moment.Moment) {
    return current && current > moment().subtract(10, 'years');
  }

  return (
    <AppContainer
      title="Desenvolvedor / Novo"
      breadcrumb={[
        { name: 'Desenvolvedor', href: '/desenvolvedor' },
        { name: 'Novo' },
      ]}
    >
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row>
          <Col span={24}>
            <Title level={3}>Novo</Title>
            <Paragraph>Novo desenvolvedor</Paragraph>
          </Col>
        </Row>
        <Form
          name="new-developer"
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
                label="Nome"
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Preencher" />
              </Form.Item>
              <Form.Item label="Sexo" name="sex">
                <Select placeholder="Selecioner">
                  {sexes?.map(({ name, slug }) => (
                    <Select.Option key={nanoid(21)} value={slug}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Data nascimento"
                name="birth_date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  size="middle"
                  format={dateFormatList}
                  defaultPickerValue={moment().subtract(10, 'years')}
                  disabledDate={handleDisabledDate}
                />
              </Form.Item>
              <Form.Item
                label="Idade"
                name="age"
                rules={[
                  {
                    required: true,
                    type: 'number',
                    transform: value => Number(value),
                    max: 90,
                    min: 10,
                  },
                ]}
              >
                <Input type="number" placeholder="Preencher" />
              </Form.Item>
              <Form.Item
                label="Passatempo"
                name="hobby"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea placeholder="Preencher" />
              </Form.Item>
              <Form.Item
                label="Nível"
                name="level_id"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Selecioner"
                  loading={isLoadingLevelsData}
                >
                  {levelsData?.map(({ id, level }) => (
                    <Select.Option key={nanoid(21)} value={id}>
                      {level}
                    </Select.Option>
                  ))}
                </Select>
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
