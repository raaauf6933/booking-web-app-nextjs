import { Table } from 'antd';
import MainContainer from '../../components/MainContainer';

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
    dataIndex: 'status',
    key: 'status',
  },
];

const MyBookings = () => {
  return (
    <>
      <MainContainer>
        <div className="pb-52">
          <div className="mb-5">
            <span className="text-4xl"> My Bookings</span>
          </div>

          <Table columns={columns} />
        </div>
      </MainContainer>
    </>
  );
};

export default MyBookings;
