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

import { StyledLayout, StyledContentLayout } from './AppContainer.styles';

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

  const pathNames = router?.pathname?.split('/').filter(path => !!path) || [];

  return (
    <>
      <Head>
        <title>{title || 'Developer WEB Dashboard'}</title>
      </Head>
      <StyledLayout>
        <Sider collapsible collapsed={collapsed} onCollapse={handleOnCollapse}>
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
        <StyledContentLayout className="site-layout">
          <Header className="site-layout-background" />
          <Content className="site-layout-content">
            <Breadcrumb className="site-layout-breadcrumb">
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
              <div className="site-layout-background site-layout-container">
                {children}
              </div>
            )}
            {layout === 'full' && children}
          </Content>
          <Footer className="site-layout-footer">
            Developer WEB Dashboard ©2022
          </Footer>
        </StyledContentLayout>
      </StyledLayout>
    </>
  );
};

AppContainer.defaultProps = {
  layout: 'container',
};

export { AppContainer };
