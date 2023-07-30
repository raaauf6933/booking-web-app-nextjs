'use client';
import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout as AntDLayout, Button, Menu } from 'antd';
import { AdminRoutes } from './constant';
const { Header, Content, Footer, Sider } = AntDLayout;
import './../../globals.css';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);

  const navigate = useRouter();

  return (
    <main className="flex min-h-screen flex-col">
      <AntDLayout>
        <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
          <div className="h-8 m-4 bg-grey1 rounded-sm"></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
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
              className="bg-white"
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }} className="bg-white">
            Created with Ant Design ©2023
          </Footer>
        </AntDLayout>
      </AntDLayout>{' '}
    </main>
  );
  return <main className="flex min-h-screen flex-col p-24">{children}</main>;
}
