'use client';
import { Table } from 'antd';
import StatusTag from '../../components/StatusTag';

const columns = [
  {
    title: 'Room Type',
    dataIndex: 'room_type',
    key: 'room_type',
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
  {
    title: 'Rooms',
    dataIndex: 'rooms',
    key: 'rooms',
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

const dataSource = [
  {
    key: '1',
    room_type: 'Deluxe Room',
    rate: 300,
    rooms: 2,
    status: 'ACTIVE',
  },
  {
    key: '1',
    room_type: 'Deluxe Room',
    rate: 300,
    rooms: 2,
    status: 'INACTIVE',
  },
  {
    key: '1',
    room_type: 'Deluxe Room',
    rate: 300,
    rooms: 2,
    status: 'ACTIVE',
  },
  {
    key: '1',
    room_type: 'Deluxe Room',
    rate: 300,
    rooms: 2,
    status: 'INACTIVE',
  },
  {
    key: '1',
    room_type: 'Deluxe Room',
    rate: 300,
    rooms: 2,
    status: 'ACTIVE',
  },
];

const RoomManagement = () => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default RoomManagement;
