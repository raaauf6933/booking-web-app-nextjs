'use client';
import MainContainer from '@main_components/MainContainer';
import { Card, Divider, Table, List, Button, Tag, Upload , message} from 'antd';
import { useParams } from 'next/navigation';
import useFetch from '../../../hooks/useFetch';
import StatusTag from '../../../admin/components/StatusTag';
import History from '../../../admin/components/BookingDetails/History';
import usePost from '../../../hooks/usePost';

const columns = [
  {
    title: 'Room',
    dataIndex: 'room_name',
    key: 'room_name',
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
  const params = useParams();

  const { response, refetch, loading } = useFetch({
    method: 'POST',
    url: '/booking/booking',
    data: {
      id: params?.id,
    },
  });

  const [uploadReceipt, uploadReceiptOpts] = usePost();

  const booking = response?.data;

  const handleGetNoNights = () => {
    const date1 = new Date(booking?.check_in);
    const date2 = new Date(booking?.check_out);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const getNoQuantity = (roomtype_id) => {
    return booking?.rooms?.filter((obj) => obj.roomtype_id === roomtype_id)
      .length;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const handleGetRooms = () => {
    const removeDuplicates = booking?.rooms?.filter(
      (v, i, a) => a.findIndex((t) => t.roomtype_id === v.roomtype_id) === i,
    );

    const countRooms = removeDuplicates?.map((e) => {
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
    handleGetRooms()?.map((e) => (total += e.amount));
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

  const amount_paid = () => {
    let payment_amount = 0;

    if (booking?.payment.length !== 0) {
      booking?.payment?.map((e) => (payment_amount += e.payment_amount));
    }
    return payment_amount;
  };

  const handleUpload = (data) => {
    // uploadReceipt({
    //   method: "POST",
    //   url: "/booking/upload_receipt",
    // })
  };

  return (
    <>
      <MainContainer>
        <Card
          title={
            <>
              <div className="flex justify-between">
                <div>
                  <span>Booking Summary </span>
                  <span className="font-light">
                    - {booking?.booking_reference}
                  </span>
                </div>
                <StatusTag
                  className="text-xl"
                  type="BOOKING"
                  status={booking?.status}
                />
              </div>
            </>
          }
        >
          <Table
            columns={columns}
            pagination={false}
            dataSource={handleGetRooms()?.map((e) => ({
              ...e,
            }))}
          />
          <div className="mt-2">
            <div className="flex justify-between">
              <span className="font-bold text-lg">Sub-total</span>
              <span className="text-lg">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(getSubTotal())}{' '}
                X {handleGetNoNights()} (Nights)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">Vatable Sale </span>
              <span className="text-lg">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(handleVat().vatable_sales)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">VAT</span>
              <span className="text-lg">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(handleVat().vat)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="text-lg font-semibold">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(getTotalAmount())}
              </span>
            </div>
            <Divider />
            <span className="text-lg font-bold">Payment Details</span>
            <div>
              <div className="flex justify-between">
                <span className="text-lg">Paid Amount</span>
                <span className="text-lg font-semibold">
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(amount_paid())}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Total Balance</span>
                <span className="text-lg font-semibold">
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(getTotalAmount() - amount_paid())}
                </span>
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
            <Divider>
              <span>Booking History</span>
            </Divider>
            <div className="block px-3 py-5 max-h-48 overflow-x-auto">
              <History booking={booking} />
            </div>
            <div>
              {/* <Divider />
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
              /> */}
              {booking?.status === 'PENDING' ? (
                <>
                  <Divider />
                  <div className="flex flex-row justify-between">
                    <Upload
                      // showUploadList={false}
                      progress={{
                        strokeColor: {
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        },
                        strokeWidth: 3,
                        format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
                      
                      }}
                     onChange={(info)=> {
                      if (info.file.status === 'done') {
                      
                        message.success(`${info.file.name} file uploaded successfully`);
                        refetch();
                      }
                     }}
                      disabled={loading}
                      action={`${process.env.NEXT_PUBLIC_API_URL}/booking/upload_receipt`}
                      data={{
                        data: JSON.stringify({
                          id: params?.id,
                        }),
                      }}
                      beforeUpload={(file) => {
                        const isImage =
                          file.type === 'image/png' ||
                          file.type === 'image/jpg' ||
                          file.type === 'image/jpeg';
                        if (!isImage) {
                          message.error(
                            `${file.name} is not an image file, must be in png, jpg, jpeg only`,
                          );
                        }
                        return isImage || Upload.LIST_IGNORE;
                      }}
                    >
                      <Button htmlType='button'>
                        <span>Upload Receipt</span>
                      </Button>
                    </Upload>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </Card>
      </MainContainer>
    </>
  );
};

export default MyBookingDetails;
