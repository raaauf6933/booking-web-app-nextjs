'use client';
import { Button, Input, Space, Table, Tooltip, Typography } from 'antd';
import StatusTag from '../../components/StatusTag';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import useFetch from '../../../hooks/useFetch';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import useSearchFilter from '../../../hooks/useSearchFilter';

const Bookings = () => {
  const navigate = useRouter();
  const { getColumnSearchProps } = useSearchFilter();

  const columns = [
    {
      title: 'Booking Reference',
      dataIndex: 'booking_reference',
      key: 'booking_reference',
      ...getColumnSearchProps('booking_reference'),
    },

    {
      title: 'Guest',
      dataIndex: 'guest',
      key: 'guest',
      ...getColumnSearchProps('guest'),
    },
    {
      title: 'Rooms',
      render: (_, record) => {
        return (
          <Tooltip
            title={record?.rooms
              ?.map((e) => `${e?.roomtype_name} (${e.room_num})`)
              .join(',')}
          >
            <span>
              {
                record?.rooms?.map(
                  (e) => `${e?.roomtype_name} (${e.room_num})`,
                )[0]
              }
              ...
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: 'No. Rooms',
      render: (_, record) => {
        return <span>{record.rooms?.length}</span>;
      },
    },
    {
      title: 'Total Amount',
      render: (_, record) => {
        return (
          <span>
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(record?.billing?.total_amount)}
          </span>
        );
      },
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
