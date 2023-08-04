'use client';
import { Card, Table } from 'antd';

const dataSource = [
  {
    key: '1',
    room: 'Deluxe Room',
    rate: 32,
  },
  {
    key: '2',
    room: 'Superior Room',
    rate: 32,
  },
];

const columns = [
  {
    title: 'Room',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Rate',
    render: (_, record) => (
      <>
        {new Intl.NumberFormat('en-PH', {
          style: 'currency',
          currency: 'PHP',
        }).format(record.rate)}
      </>
    ),
    key: 'rate',
  },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   key: 'address',
  // },
];

const RoomDetails = () => {
  return (
    <Card title="Room Details">
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Card>
  );
};

export default RoomDetails;
