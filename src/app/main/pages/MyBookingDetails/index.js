'use client';
import MainContainer from '@main_components/MainContainer';
import { Card, Divider, Table, List, Button, Tag } from 'antd';

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

const MyBookingDetails = () => {
  return (
    <>
      <MainContainer>
        <Card
          title={
            <>
              <div className="flex justify-between">
                <div>
                  <span>Booking Summary </span>
                  <span className="font-light">- #4232532</span>
                </div>
                <Tag color="warning" className="text-xl">
                  PENDING
                </Tag>
              </div>
            </>
          }
        >
          <Table columns={columns} pagination={false} />
          <div className="mt-2">
            <div className="flex justify-between">
              <span className="font-bold text-lg">Sub-total</span>
              <span className="text-lg">PHP 1,798.00 X 1 (Nights)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">Vatable Sale </span>
              <span className="text-lg">PHP 1,605.36</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">VAT</span>
              <span className="text-lg">PHP 192.64</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="text-lg font-semibold">PHP 192.64</span>
            </div>
            <Divider />
            <span className="text-lg font-bold">Payment Details</span>
            <div>
              <div className="flex justify-between">
                <span className="text-lg">Paid Amount</span>
                <span className="text-lg font-semibold">PHP 0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Total Balance</span>
                <span className="text-lg font-semibold">PHP 0.00</span>
              </div>
            </div>
            <Divider />
            <div>
              <div>
                <span className="text-lg">
                  <b>How to Pay?</b>
                </span>
                <ul>
                  <li>
                    Kindly deposit your payment to our selected bank account or
                    Gcash
                  </li>
                  <li>
                    Upload your Bank/Gcash Receipt and wait for Email
                    confirmation
                  </li>
                </ul>
                <span className="text-lg">
                  <b>Mode of Payment</b>
                </span>
                <ul>
                  <li>Gcash - 09352335202 | Grand Villa Resort</li>
                  <li>BPI - 75544452 | Grand Villa Resort</li>
                  <li>BDO - 23564343 43112 | Grand Villa Resort</li>
                </ul>
                <span className="text-lg">
                  <b>Cancellation &amp; Rebooking</b>
                </span>
                <ul>
                  <li>
                    Cancellation of booking is not allowed if the booking is
                    reserved
                  </li>
                  <li>
                    Rebooking/Modifying of booking is not allowed if the booking
                    is reserved
                  </li>
                  <li>No Refund</li>
                </ul>
              </div>
            </div>
            <div>
              <Divider />
              <List.Item>
                <div className="flex justify-between w-full">
                  <span className=" text-lg font-bold">Uploaded File</span>
                  <span className=" text-lg font-bold">Uploaded Date</span>
                </div>
              </List.Item>
              <List
                dataSource={[
                  {
                    name: 'bank_receipt_1',
                    link: 'https://facebook.com',
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex justify-between w-full">
                      <a
                        href={item.link}
                        target="_blank"
                        className="text-info text-lg"
                      >
                        {item.name}
                      </a>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </List.Item>
                )}
              />
              <Divider />
              <div className="flex flex-row justify-between">
                <Button>
                  <span>Upload Receipt</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </MainContainer>
    </>
  );
};

export default MyBookingDetails;
