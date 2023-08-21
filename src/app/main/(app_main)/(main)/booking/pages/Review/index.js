'use client';
import { Row, Col, Table, Button, Divider, Radio } from 'antd';
import { useContext, useEffect } from 'react';
import BookingContext from '../../../../../context/booking/bookingContext';
import { useRouter } from 'next/navigation';

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
  const { bookingState } = useContext(BookingContext);
  const navigate = useRouter();

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
                      <span>Stephen Curry</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Mobile Number:</span>
                      <span>09066000801</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Email:</span>
                      <span>stephen.curry@gmail.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Address:</span>
                      <span>Taguig City</span>
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
                      <span>Aug 13, 2023 02:00PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">Check-Out:</span>
                      <span>Aug 14, 2023 12:00PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">No. Night(s)</span>
                      <span>1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold mb-2">No. Guest</span>
                      <span>1</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="mt-5">
              <Table
                className="overflow-x-scroll"
                dataSource={bookingState.room_details.map((e, index) => ({
                  key: index,
                  room: e.roomtype_name,
                  rate: new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(e.room_amount),
                  qty: 1,
                  amount: new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(e.room_amount),
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
                <span className="text-md"> {new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(getSubTotal())}{' '}
              X {handleGetNoNights()} (Nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-md">Vatable Sale </span>
                <span className="text-md">{new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(handleVat().vatable_sales)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-md">VAT</span>
                <span className="text-md">{new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(handleVat().vat)}</span>
              </div>
            </div>
            <Divider orientation="center">
              <span className="font-semibold">Payment Type</span>
            </Divider>
            <div>
              <Radio.Group>
                <Radio value="DOWNPAYMENT">Downpayment (50%)</Radio>
                <Radio value="FULL_PAYMENT">Full-Payment</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row lg:flex-row">
            <div className="flex flex-col items-center w-full bg-warning text-4xl p-2 border-r-2 border-r-light">
              <span className="opacity-70">DOWNPAYMENT</span>
              <span className="text-white">PHP 899.00</span>
            </div>
            <div className="flex flex-col items-center whitespace-nowrap w-full bg-warning text-4xl p-2">
              <span className="opacity-70">TOTAL AMOUNT</span>
              <span className="text-white">PHP 1,798.00</span>
            </div>
          </div>
        </div>
        <div className="mt-10 mx-auto w-fit">
          <Button size="large" className="mr-3">
            <span>Back</span>
          </Button>
          <Button size="large">
            <span>Confirm</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Review;
