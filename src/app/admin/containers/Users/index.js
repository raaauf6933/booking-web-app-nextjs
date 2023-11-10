'use client';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import useFetch from '../../../hooks/useFetch';
import { Button, Table } from 'antd';
import StatusTag from '../../components/StatusTag';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Role',
    dataIndex: 'user_type',
    key: 'user_type',
  },
  {
    title: 'Status',
    render: (_, record) => (
      <>
        {' '}
        <StatusTag status={record.status} />
      </>
    ),
    key: 'status',
  },
];

const Users = () => {
  const navigate = useRouter();

  const { response } = useFetch({
    method: 'GET',
    url: '/user',
  });

  const users = response?.data?.map((e) => ({
    key: e._id,
    ...e,
  }));

  return (
    <div>
      <Header
        title="Users"
        actions={
          <>
            <Button
              className="bg-info"
              onClick={() => navigate.push('/admin/users/create')}
            >
              <span className="text-white">Create User</span>
            </Button>
          </>
        }
      />
      <Table
        columns={columns}
        dataSource={users}
        onRow={(e) => ({
          onClick: () => navigate.push(`/admin/users/${e.key}`),
        })}
        rowClassName="cursor-pointer"
      />
    </div>
  );
};

export default Users;
