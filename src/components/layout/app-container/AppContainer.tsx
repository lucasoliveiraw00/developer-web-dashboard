import React, { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { nanoid } from 'nanoid';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  TeamOutlined,
  GoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import { useRouter } from 'next/router';

import { StyledLayout } from './AppContainer.styles';

import { AppContainerProps, DataPathsProps } from './types';

const { Header, Content, Footer, Sider } = Layout;

const AppContainer = (props: AppContainerProps) => {
  const { title, breadcrumb, layout, children } = props;

  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  function handleOnCollapse() {
    setCollapsed(!collapsed);
  }

  const isArray = Array.isArray(breadcrumb);
  let arrayDataPaths: DataPathsProps[] = [];
  let endDataPath: DataPathsProps | undefined;

  if (isArray) {
    arrayDataPaths = [...breadcrumb];
    endDataPath = arrayDataPaths.pop();
  }

  const pathNames = router.pathname?.split('/').filter(path => !!path) || [];

  return (
    <>
      <Head>
        <title>{title || 'Developer WEB Dashboard'}</title>
      </Head>
      <StyledLayout className="layout" hasSider>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleOnCollapse}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Link href="/dashboard">
            <a>
              <div className="logo" />
            </a>
          </Link>
          <Menu theme="dark" defaultSelectedKeys={pathNames} mode="inline">
            <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="desenvolvedor" icon={<TeamOutlined />}>
              <Link href="/desenvolvedor">
                <a>Desenvolvedor</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="nivel" icon={<GoldOutlined />}>
              <Link href="/nivel">
                <a>Nível</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
            overflowY: 'auto',
            height: 'min-content',
            minHeight: '100vh',
          }}
        >
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {arrayDataPaths.length > 0 && (
                <>
                  {arrayDataPaths.map((item: DataPathsProps) => (
                    <React.Fragment key={nanoid(33)}>
                      {item.href && (
                        <Breadcrumb.Item key={nanoid(33)}>
                          <Link href={item.href}>
                            <a>{item.name}</a>
                          </Link>
                        </Breadcrumb.Item>
                      )}
                      {!item.href && item.name && (
                        <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                      )}
                    </React.Fragment>
                  ))}
                  <Breadcrumb.Item>{endDataPath?.name || ''}</Breadcrumb.Item>
                </>
              )}
              {arrayDataPaths.length === 0 && (
                <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              )}
            </Breadcrumb>
            {layout === 'container' && (
              <div className="site-layout-background" style={{ padding: 24 }}>
                {children}
              </div>
            )}
            {layout === 'full' && children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Developer WEB Dashboard ©2022
          </Footer>
        </Layout>
      </StyledLayout>
    </>
  );
};

AppContainer.defaultProps = {
  layout: 'container',
};

export { AppContainer };
