'use client';
import { Button, Table } from 'antd';
import StatusTag from '../../components/StatusTag';
import Header from '../../components/Header';
import Link from 'next/link';
import useFetch from '../../../hooks/useFetch';
import { useRouter } from 'next/navigation';

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
  const { response } = useFetch({
    url: '/room_types',
    method: 'GET',
  });

  const data = response?.data
    ? response?.data.map((e) => ({
        id: e._id,
        room_type: e.name,
        rate: e.room_rate,
        rooms: e.rooms.length,
        status: e.status === 'ACT' ? 'ACTIVE' : null,
      }))
    : [];

  const navigate = useRouter();
  return (
    <div>
      <Header
        title="Room Types"
        actions={
          <>
            <Button
              className="bg-info"
              onClick={() => navigate.push('/admin/rooms_management/create')}
            >
              <span className="text-white">Create Room Type</span>
            </Button>
          </>
        }
      />
      <Table
        dataSource={data}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate.push(`/admin/rooms_management/${record.id}`);
            }, // click row
          };
        }}
      />
    </div>
  );
};

export default RoomManagement;
