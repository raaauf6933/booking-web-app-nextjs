'use client';
import { Button, Table } from 'antd';
import useFetch from '../../../hooks/useFetch';
import Header from '../../components/Header';
import StatusTag from '../../components/StatusTag';
import { useRouter } from 'next/navigation';

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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Contact Number',
    dataIndex: 'contact_number',
    key: 'contact_number',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
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

const Customers = () => {
  const navigate = useRouter();

  const { response } = useFetch({
    method: 'GET',
    url: '/customers',
  });

  const customers = response?.data?.map((e) => ({
    ...e,
    key: e?._id,
    address: `${e?.address?.address} ${e?.address.city}`,
  }));

  return (
    <div>
      <Header
        title="Customers"
        actions={
          <>
            <Button
              className="bg-info"
              onClick={() => navigate.push('/admin/customers/create')}
            >
              <span className="text-white">Create Customer</span>
            </Button>
          </>
        }
      />
      <Table
        columns={columns}
        dataSource={customers}
        onRow={(e) => ({
          onClick: () => navigate.push(`/admin/customers/${e.key}`),
        })}
        rowClassName="cursor-pointer"
      />
    </div>
  );
};

export default Customers;
