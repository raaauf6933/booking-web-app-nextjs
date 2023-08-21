'use client';
import { Row, Col, Table, Button, Divider, Radio } from 'antd';

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
                dataSource={dataSource}
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
                <span className="text-md">PHP 1,798.00 X 1 (Nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-md">Vatable Sale </span>
                <span className="text-md">PHP 1,605.36</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-md">VAT</span>
                <span className="text-md">PHP 192.64</span>
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
              <span>DOWNPAYMENT</span>
              <span className="text-white">PHP 899.00</span>
            </div>
            <div className="flex flex-col items-center whitespace-nowrap w-full bg-warning text-4xl p-2">
              <span>TOTAL AMOUNT</span>
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
