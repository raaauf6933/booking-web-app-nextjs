'use client';
import React, { Suspense } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Layout as AntDLayout, Button, Dropdown, Menu, Spin } from 'antd';
import { AdminRoutes } from './../../(dashboard)/constant';
import ProtectedPage from '../ProtectedPage';
import Link from 'next/link';
import { CaretDownOutlined } from '@ant-design/icons';
import { useAdminAuth } from '../../context/auth/context';

const { Header, Content, Footer, Sider } = AntDLayout;

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user, logout } = useAdminAuth()
  const navigate = useRouter();

  return (
    <ProtectedPage>
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
            <div className="flex justify-between w-full">
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
              <div className="flex items-end mr-5">
                <Dropdown
                  menu={{
                    items: [
                      // {
                      //   key: 1,
                      //   label: <Link href="/main/my_account">My Account</Link>,
                      // },
                      // {
                      //   key: 2,
                      //   label: (
                      //     <Link href="/main/my_account/bookings">Bookings</Link>
                      //   ),
                      // },
                      // {
                      //   type: 'divider',
                      // },
                      {
                        key: 3,
                        label: (
                          <button type="button">
                            <span className="text-danger">Sign out</span>
                          </button>
                        ),
                        onClick:logout
                      },
                    ],
                  }}
                  placement="bottomCenter"
                >
                  <button
                    // type="button"
                    class="bg-warning text-white bg-blue-700 hover:bg-warning hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                      {user?.first_name} {user?.last_name}
                      </span>{' '}
                      <CaretDownOutlined />
                    </div>
                  </button>
                </Dropdown>
              </div>
            </div>
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
    </ProtectedPage>
  );
}

export default DashboardLayout;
