'use client';
import { Table } from 'antd';
import MainContainer from '../../components/MainContainer';
import useFetch from '../../../hooks/useFetch';
import { useClientAuth } from '../../context/auth/context';
import StatusTag from '../../../admin/components/StatusTag';
import { useRouter } from 'next/navigation';

const columns = [
  {
    title: 'Booking Reference',
    dataIndex: 'booking_reference',
    key: 'booking_reference',
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
    title: 'Total Amount',
    dataIndex: 'total_amount',
    key: 'total_amount',
  },
  {
    title: 'Night(s)',
    dataIndex: 'nights',
    key: 'nights',
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

const MyBookings = () => {
  const { user } = useClientAuth();
  const navigate = useRouter();
  const computeNights = (result) => {
    const date1 = new Date(result.check_in);
    const date2 = new Date(result.check_out);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };
  const { response } = useFetch({
    method: 'GET',
    url: 'booking/guess_booking',
    params: {
      id: user?._id,
    },
  });

  const bookings = response?.data
    ? response?.data?.map((booking) => ({
        ...booking,
        id: booking?._id,
        total_amount: new Intl.NumberFormat('en-PH', {
          style: 'currency',
          currency: 'PHP',
        }).format(booking?.billing?.total_amount),
        nights: computeNights(booking),
      }))
    : [];

  return (
    <>
      <MainContainer>
        <div className="pb-52">
          <div className="mb-5">
            <span className="text-4xl"> My Bookings</span>
          </div>

          <Table
            columns={columns}
            dataSource={bookings}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  navigate.push(`/main/my_account/bookings/${record.id}`);
                }, // click row
              };
            }}
            rowClassName="cursor-pointer"
          />
        </div>
      </MainContainer>
    </>
  );
};

export default MyBookings;
