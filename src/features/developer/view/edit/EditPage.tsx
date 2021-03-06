import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

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
  Spin,
} from 'antd';

import { CheckOutlined, CloseOutlined, LeftOutlined } from '@ant-design/icons';

import { nanoid } from 'nanoid';
import moment from 'moment';

import { toast } from 'react-toastify';

import { AppContainer } from '@components/layout/app-container';

import { useQueryBase } from '@hooks/useQuery';

import { updateDeveloper } from '../../data';

import { UpdateDeveloper } from '../../data/types';

import { DeveloperData, LevelData } from './types';

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
    slug: null,
  },
];

const EditPage = () => {
  const [loading, setLoading] = useState(false);

  const refForm = useRef<FormInstance | null>();

  const router = useRouter();

  const {
    data: developerData,
    isLoading: isLoadingDeveloper,
    status: statusDeveloper,
    error: errorDeveloper,
  } = useQueryBase<DeveloperData>(`/developer/${router.query.id}`, {
    optionsQuery: {
      enabled: !!router.query.id,
    },
  });

  const loadingDeveloper =
    ['idle', 'loading'].includes(statusDeveloper) || isLoadingDeveloper;

  const { data: levels, isLoading: isLoadingLevels } =
    useQueryBase<LevelData[]>('/level/list');

  useEffect(() => {
    if (developerData)
      refForm.current?.setFieldsValue({
        ...developerData,
        age: developerData?.age,
        birth_date: moment(developerData?.birth_date),
      });
  }, [developerData, refForm]);

  function handleOnHistoryBack() {
    router.back();
  }

  async function handleOnFinish(values: UpdateDeveloper) {
    setLoading(true);
    try {
      const formData: UpdateDeveloper = {
        ...developerData,
        ...values,
      };
      const update = updateDeveloper(formData);
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

  function handleDisabledDate(current: moment.Moment) {
    return current && current > moment().subtract(10, 'years');
  }

  if (errorDeveloper) {
    showErrorMessage(errorDeveloper);
    router.replace('/desenvolvedor');
  }

  return (
    <AppContainer
      title="Desenvolvedor / Editar"
      breadcrumb={[
        { name: 'Desenvolvedor', href: '/desenvolvedor' },
        { name: 'Editar' },
      ]}
    >
      <Spin size="large" tip="Carregando..." spinning={loadingDeveloper}>
        <Space direction="vertical" size={20} style={{ display: 'flex' }}>
          <Row>
            <Col span={24}>
              <Title level={3}>Editar</Title>
              <Paragraph>Editar desenvolvedor</Paragraph>
            </Col>
          </Row>
          <Form
            name="edit-developer"
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
                      type: 'number',
                      transform: value => Number(value),
                      max: 90,
                      min: 10,
                    },
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input max={90} maxLength={2} placeholder="Ex: 20" />
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
                    loading={isLoadingLevels}
                  >
                    {levels?.map(({ id, level }) => (
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
