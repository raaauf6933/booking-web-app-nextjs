'use client';
import { Button, Table, Typography } from 'antd';
import StatusTag from '../../components/StatusTag';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import useFetch from '../../../hooks/useFetch';

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

const Bookings = () => {
  const navigate = useRouter();

  const { response } = useFetch({
    method: 'POST',
    url: 'booking/bookings',
    data: {
      status: 'ALL',
    },
  });

  const bookings = response?.data
    ? response?.data?.map((booking) => ({
        ...booking,
        key: booking?._id,
        guest: `${booking?.guest?.first_name} ${booking?.guest?.last_name}`,
        booking_date: new Date(booking?.createdAt).toDateString(),
      }))
    : [];

  return (
    <div>
      <Header
        title="Bookings"
        actions={
          <Button
            onClick={() => navigate.push('/admin/bookings/create')}
            type="primary"
            className="bg-info text-white"
          >
            Create Walk-in
          </Button>
        }
      />
      <Table
        dataSource={bookings}
        columns={columns}
        onRow={(e) => ({
          onClick: () => navigate.push(`/admin/bookings/${e.key}`),
        })}
        rowClassName="cursor-pointer"
      />
    </div>
  );
};

export default Bookings;
