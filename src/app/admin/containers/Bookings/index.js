'use client';
import { Table } from 'antd';
import StatusTag from '../../components/StatusTag';

const columns = [
  {
    title: 'Booking Reference',
    dataIndex: 'booking_reference',
    key: 'booking_reference',
  },
  {
    title: 'Guest',
    dataIndex: 'guest',
    key: 'guest',
  },
  {
    title: 'Booking Date',
    dataIndex: 'booking_date',
    key: 'booking_date',
  },
  {
    title: 'Check-in',
    dataIndex: 'check_in',
    key: 'check_in',
  },
  {
    title: 'Check-out',
    dataIndex: 'check_out',
    key: 'check_out',
  },
  {
    title: 'Status',
    render: (_, record) => (
      <>
        {' '}
        <StatusTag status={record.status} type="BOOKING" />
      </>
    ),
    key: 'status',
  },
];

const dataSource = [
  {
    key: '1',
    booking_reference: '3AES1',
    guest: 'Stephen Curry',
    booking_date: '10/23/2022',
    check_in: '10/24/2022',
    check_out: '10/25/2022',
    status: 'PENDING',
  },
  {
    key: '1',
    booking_reference: '3AES1',
    guest: 'Stephen Curry',
    booking_date: '10/23/2022',
    check_in: '10/24/2022',
    check_out: '10/25/2022',
    status: 'PENDING',
  },
  {
    key: '1',
    booking_reference: '3AES1',
    guest: 'Stephen Curry',
    booking_date: '10/23/2022',
    check_in: '10/24/2022',
    check_out: '10/25/2022',
    status: 'PENDING',
  },
  {
    key: '1',
    booking_reference: '3AES1',
    guest: 'Stephen Curry',
    booking_date: '10/23/2022',
    check_in: '10/24/2022',
    check_out: '10/25/2022',
    status: 'PENDING',
  },
  {
    key: '1',
    booking_reference: '3AES1',
    guest: 'Stephen Curry',
    booking_date: '10/23/2022',
    check_in: '10/24/2022',
    check_out: '10/25/2022',
    status: 'PENDING',
  },
];

const Bookings = () => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Bookings;
