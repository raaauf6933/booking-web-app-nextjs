'use client';
import MainContainer from '@main_components/MainContainer';
import {
  Card,
  Divider,
  Table,
  List,
  Button,
  Tag,
  Upload,
  message,
  Modal,
  Select,
  Input,
  Rate,
  InputNumber,
} from 'antd';
import { useParams, useRouter } from 'next/navigation';
import useFetch from '../../../hooks/useFetch';
import StatusTag from '../../../admin/components/StatusTag';
import History from '../../../admin/components/BookingDetails/History';
import usePost from '../../../hooks/usePost';
import { useState } from 'react';
import { getToken } from '../../context/auth/utils';

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

const additionals_colums = [
  {
    title: 'Item',
    dataIndex: 'name',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
  }]
const MyBookingDetails = () => {
  const params = useParams();
  const [openModalAdditional, setOpenModalAdditional] = useState(false);
  const { response, refetch, loading } = useFetch({
    method: 'POST',
    url: '/booking/booking',
    data: {
      id: params?.id,
    },
  });
  const [amenity, setAmenity] = useState();
  const navigate = useRouter();
  const [openModalRate, setOpenModalRate] = useState(false);
  const [rate, setRate] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [uploadReceipt, uploadReceiptOpts] = usePost();
  const [noAmenity, setNoAmenity] = useState(1);
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


  const additionals = booking?.additionals?.map((e)=> ({
    ...e,
    rate:  new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(e.rate)
  }))


  const getTotalAdditionals = () => {
    return booking?.billing?.additional_total
  }



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
    return (getSubTotal() * handleGetNoNights() ) + getTotalAdditionals();
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

  const [saveAmenity, saveAmenityOpts] = usePost({
    onComplete: () => {
      message.success('Item has been successfully added');

      setOpenModalAdditional(false);

      refetch();
    },
  });

  const { response: amenities } = useFetch({
    method: 'GET',
    url: '/amenity',
    params: {
      isActive: true,
    },
  });

  const amenitiesChoices = amenities?.data
    ? amenities?.data.map((e) => ({
        label: e?.name,
        value: e._id,
        rate: e.rate,
      }))
    : [];

  const onSaveAdditionals = () => {
    saveAmenity(
      {
        method: 'POST',
        url: '/booking/add_amenity',
        data: {
          id: params?.id,
          amenity_id: JSON.stringify(amenity),
          qty: noAmenity,
          type: 'guest',
        },
      },
      getToken(),
    );
  };

  const [saveFeedback] = usePost({
    onComplete: () => {
      setOpenModalRate(false);
      refetch();
      message.success('Feedback has been submitted');
    },
  });

  const onSubmitFeedback = () => {
    saveFeedback({
      method: 'POST',
      url: '/booking/feedback',
      data: {
        id: params?.id,
        feedback,
        rate,
      },
    });
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
              rate: new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(e.rate),
              amount: new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(e.amount),
            }))}
          />
          <Table caption={<div className='text-xl p-5'>Additionals</div>} dataSource={additionals}   columns={additionals_colums} />
          <div className="mt-2">
            <div className="flex justify-between">
              <span className="font-bold text-lg">Sub-total</span>
              <span className="text-lg">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(getSubTotal())}{' '}
                X {handleGetNoNights()} Night(s)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">Additionals</span>
              <span className="text-lg">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(getTotalAdditionals())}
            
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
              {booking?.status === 'PENDING' ||
              booking?.status === 'CHECK_IN' ||
              booking?.status === 'CHECK_OUT' ? (
                <>
                  <Divider />
                  <div className="flex flex-row justify-between">
                    {booking?.status === 'PENDING' && (
                      <Upload
                        // showUploadList={false}
                        progress={{
                          strokeColor: {
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          },
                          strokeWidth: 3,
                          format: (percent) =>
                            percent && `${parseFloat(percent.toFixed(2))}%`,
                        }}
                        onChange={(info) => {
                          if (info.file.status === 'done') {
                            message.success(
                              `${info.file.name} file uploaded successfully`,
                            );
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
                        <Button htmlType="button">
                          <span>Upload Receipt</span>
                        </Button>
                      </Upload>
                    )}

                    <div className="w-full">
                      {booking?.status === 'CHECK_IN' && (
                        <Button
                          className="mr-4"
                          onClick={() => setOpenModalAdditional(true)}
                        >
                          <span>Add Additionals/Amenities</span>
                        </Button>
                      )}

                      {booking?.status === 'PENDING' && (
                        <Button
                          htmlType="button"
                          onClick={() =>
                            navigate.push(
                              `/main/my_account/rebooking/${params.id}`,
                            )
                          }
                        >
                          <span>Rebooking</span>
                        </Button>
                      )}

                      {booking?.status === 'CHECK_OUT' &&
                        !booking?.feedback && (
                          <Button
                            className="w-full"
                            size="large"
                            htmlType="button"
                            onClick={() => setOpenModalRate(true)}
                          >
                            <span>Rate Booking</span>
                          </Button>
                        )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <Modal
            open={openModalAdditional}
            title="Additionals"
            onCancel={() => setOpenModalAdditional((prevState) => !prevState)}
            footer={[
              <Button
                key="cancel"
                loading={false}
                //  disabled={updateBookingOpts.loading}
                onClick={() =>
                  setOpenModalAdditional((prevState) => !prevState)
                }
              >
                Cancel
              </Button>,
              <Button
                className="bg-info"
                key="submit"
                type="primary"
                loading={false}
                //  disabled={updateBookingOpts.loading}
                onClick={onSaveAdditionals}
                disabled={!amenity?.id}
              >
                Confirm
              </Button>,
            ]}
          >
            <Select
              value={amenity?.id}
              onChange={(id) =>
                setAmenity({
                  id: id,
                  rate: amenitiesChoices.find((e) => e.value === id)?.rate,
                  name: amenitiesChoices.find((e) => e.value === id)?.label,
                })
              }
              className="w-full"
              size="large"
              placeholder="Select Items"
              options={amenitiesChoices}
            ></Select>
            <InputNumber
              placeholder="Quantity"
              size="large"
              defaultValue={1}
              value={noAmenity}
              onChange={(e) =>
                setNoAmenity((prevState) =>
                  isNaN(parseInt(e)) ? prevState : parseInt(e),
                )
              }
              className="mt-2 w-full"
              min={0}
              max={5}
              onKeyUp={(e) => {
                e.preventDefault();
                e.target.blur();
              }}
              type="number"
            />
          </Modal>{' '}
          <Modal
            open={openModalRate}
            title="Feedback"
            onCancel={() => setOpenModalRate((prevState) => !prevState)}
            footer={[
              <Button
                key="cancel"
                loading={false}
                //  disabled={updateBookingOpts.loading}
                onClick={() => setOpenModalRate((prevState) => !prevState)}
              >
                Cancel
              </Button>,
              <Button
                className="bg-info"
                key="submit"
                type="primary"
                loading={false}
                //  disabled={updateBookingOpts.loading}
                onClick={onSubmitFeedback}
                disabled={!feedback || !rate}
              >
                Submit
              </Button>,
            ]}
          >
            <div className=" w-full">
              <Input.TextArea
                className="mt-2"
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="mt-4 flex flex-col items-center justify-center">
                <span className="font-semibold mt-2">Leave a Star Rating</span>
                <div>
                  <Rate
                    className="w-full text-3xl"
                    value={rate}
                    onChange={(e) => setRate(e)}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </Card>
      </MainContainer>
    </>
  );
};

export default MyBookingDetails;
