'use client';
import { Row, Col, Table, Button, Divider, Radio } from 'antd';
import { useContext, useEffect, useState } from 'react';
import BookingContext from '../../../../../context/booking/bookingContext';
import { useRouter } from 'next/navigation';
import useFetch from '../../../../../../hooks/useFetch';
import { useClientAuth } from '../../../../../context/auth/context';
import usePost from '../../../../../../hooks/usePost';
import { useNotification } from '../../../../../context/notification/context';

const columns = [
  {
    title: 'Room',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];

const dataSource = [
  {
    key: '1',
    room: 'Standard',
    rate: 'PHP 300.00',
    qty: 1,
    amount: 'PHP 300.00',
  },
];

const Review = () => {
  const { bookingState, bookingDispatch } = useContext(BookingContext);
  const navigate = useRouter();
  const { user, isAuthenticated } = useClientAuth();
  const [paymentType, setPaymentType] = useState(null);
  const { notif } = useNotification();

  const { response } = useFetch({
    method: 'GET',
    url: '/customers/customer',
    params: {
      id: user?._id,
    },
  });

  const customer = response?.data;

  const [createBooking, createBookingOpts] = usePost({
    onComplete: (e) => {
      bookingDispatch({
        type: 'SET_BOOKING_SUCCESS',
        payload: e?.data?.booking_reference,
      });

      notif['success']({
        message:
          'Booking Success, We have sent you an email. Thank you for booking with us',
      });

      navigate.push('/main');
    },
    onError: (error) => {
      if (error?.data?.code === 'ROOM_TAKEN') {
        notif['info']({
          message: 'Some of the rooms you have selected was already taken',
        });

        navigate.push('/main');
      } else {
        notif['error']({
          message: 'Internal Server Error',
        });
        navigate.push('/main');
      }
    },
  });

  const handleSave = async () => {
    const data = {
      ...bookingState,
      check_in: bookingState.check_in,
      check_out: bookingState.check_out,
      rooms: bookingState.room_details,
      totalAmount: getTotalAmount(),
      guest: {
        customer_id: customer?._id,
        first_name: customer?.first_name,
        last_name: customer?.last_name,
        email: customer?.email,
        contact_number: customer?.contact_number,
        no_guest: bookingState?.guest?.no_guest,
        street_address: customer?.address?.address,
        province: '',
        city: customer?.address?.city,
      },
      payment_type: paymentType,
    };

    await createBooking({
      method: 'POST',
      url: '/booking/create_booking',
      data,
    });
  };

  const handleGetNoNights = () => {
    const date1 = new Date(bookingState.check_in);
    const date2 = new Date(bookingState.check_out);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const getNoQuantity = (roomtype_id) => {
    return bookingState.room_details.filter(
      (obj) => obj.roomtype_id === roomtype_id,
    ).length;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const handleGetRooms = () => {
    const removeDuplicates = bookingState.room_details.filter(
      (v, i, a) => a.findIndex((t) => t.roomtype_id === v.roomtype_id) === i,
    );

    const countRooms = removeDuplicates.map((e) => {
      return {
        room_name: e.roomtype_name,
        rate: e.room_amount,
        qty: getNoQuantity(e.roomtype_id),
        amount: getRoomAmount(e.roomtype_id, e.room_amount),
      };
    });

    return countRooms;
  };

  const getSubTotal = () => {
    let total = 0;
    handleGetRooms().map((e) => (total += e.amount));
    return total;
  };

  const getTotalAmount = () => {
    return getSubTotal() * handleGetNoNights();
  };

  const handleVat = () => {
    const vatable_sales = getTotalAmount() / 1.12;
    const vat = getTotalAmount() - vatable_sales;

    return {
      vatable_sales,
      vat,
    };
  };

  useEffect(() => {
    if (!isAuthenticated) {
      notif['info']({
        message: 'Login first',
      });

      navigate.push('/main/login');

      return;
    }

    if (bookingState.room_details.length < 1) {
      navigate.push('/main');
    }
  }, []);

  return (
    <>
      <div className="my-20 mx-5 w-full ">
        <div className="bg-white shadow-lg">
          <div className=" p-10">
            <Row gutter={[48, 48]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div>
                  <span className="text-2xl">Guest Details</span>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Name:</span>
                      <span>
                        {customer?.first_name} {customer?.last_name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Contact Number:</span>
                      <span>{customer?.contact_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Email:</span>
                      <span>{customer?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Address:</span>
                      <span>
                        {customer?.address?.address} {customer?.address?.city}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div>
                  <span className="text-2xl">Booking Details</span>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Check-in:</span>
                      <span>
                        {new Date(bookingState.check_in).toDateString()} 02:00PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Check-Out:</span>
                      <span>
                        {new Date(bookingState.check_out).toDateString()}{' '}
                        12:00PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">No. Night(s)</span>
                      <span>{handleGetNoNights()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">No. Guest</span>
                      <span>{bookingState?.guest?.no_guest}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="mt-5">
              <Table
                className="overflow-x-scroll"
                dataSource={handleGetRooms().map((e, index) => ({
                  key: index,
                  room: e.room_name,
                  rate: new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(e.rate),
                  qty: e.qty,
                  amount: new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(e.amount),
                }))}
                columns={columns}
                pagination={false}
                //   rootClassName='o'
              />
            </div>
            <Divider orientation="center">
              <span className="font-semibold">Breakdown</span>
            </Divider>
            <div className="mt-2">
              <div className="flex justify-between">
                <span className="font-bold text-md">Sub-total</span>
                <span className="text-md">
                  {' '}
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(getSubTotal())}{' '}
                  X {handleGetNoNights()} (Nights)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-md">Vatable Sale </span>
                <span className="text-md">
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(handleVat().vatable_sales)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-md">VAT</span>
                <span className="text-md">
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(handleVat().vat)}
                </span>
              </div>
            </div>
            <Divider orientation="center">
              <span className="font-semibold">Payment Type</span>
            </Divider>
            <div>
              <Radio.Group onChange={(e) => setPaymentType(e.target.value)}>
                <Radio value="DOWNPAYMENT">Downpayment (50%)</Radio>
                <Radio value="FULL_PAYMENT">Full-Payment</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row lg:flex-row">
            <div className="flex flex-col items-center w-full bg-warning text-4xl p-2 border-r-2 border-r-light">
              <span className="opacity-70">DOWNPAYMENT</span>
              <span className="text-white">
                {paymentType === 'DOWNPAYMENT'
                  ? new Intl.NumberFormat('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(getTotalAmount() / 2)
                  : '--'}
              </span>
            </div>
            <div className="flex flex-col items-center whitespace-nowrap w-full bg-warning text-4xl p-2">
              <span className="opacity-70">TOTAL AMOUNT</span>
              <span className="text-white">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(getTotalAmount())}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 mx-auto w-fit">
          <Button
            size="large"
            onClick={() => navigate('/main/booking/select_room')}
            className="mr-3"
          >
            <span>Back</span>
          </Button>
          <Button
            size="large"
            disabled={!paymentType || createBookingOpts.loading}
            onClick={handleSave}
          >
            <span>Confirm</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Review;
