'use client';
import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Layout as AntDLayout, Button, Menu } from 'antd';
import { AdminRoutes } from './../../(dashboard)/constant';

const { Header, Content, Footer, Sider } = AntDLayout;

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);

  const navigate = useRouter();

  return (
    <AntDLayout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
        <div className="h-8 m-4 bg-grey1 rounded-sm"></div>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          items={AdminRoutes.map((e, index) => ({
            ...e,
            key: String(index + 1),
            onClick: () => navigate.push(e.url),
          }))}
        />
      </Sider>
      <AntDLayout>
        <Header
          style={{
            padding: 0,
            // background: colorBgContainer
          }}
          className="bg-white"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
            }}
            // className="bg-white"
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }} className="bg-white">
          Created with Ant Design ©2023
        </Footer>
      </AntDLayout>
    </AntDLayout>
  );
}

export default DashboardLayout;
