'use client';
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  message,
} from 'antd';
import PaymentDetails from '../../components/BookingDetails/PaymentDetails';
import RoomDetails from '../../components/BookingDetails/RoomDetails';
import GuestDetails from '../../components/BookingDetails/GuestDetails';
import StatusTag from '../../components/StatusTag';
import History from '../../components/BookingDetails/History';
import ActionBar from '../../components/ActionBar';
import useFetch from '../../../hooks/useFetch';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { UpdateBookingStatus } from './utils';
import usePost from '../../../hooks/usePost';
import { useNotification } from '../../../main/context/notification/context';
import { ExclamationCircleFilled, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getToken } from '../../context/auth/utils';
import commaNumber from 'comma-number';
const { confirm } = Modal;

const BookingDetails = () => {
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openModalAdditional, setOpenModalAdditional] = useState(false);
  const [openModalDiscount, setOpenModalDiscount] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [openModalSelectRoom, setOpenModalSelectRoom] = useState(false);
  const [amenity, setAmenity] = useState();
  const [noAmenity, setNoAmenity] = useState(1)
  const [discount, setDiscount] = useState();
  const [remarks, setRemakrs] = useState('');
  const { notif } = useNotification();
  const navigate = useRouter().push;
  const { response, refetch, error } = useFetch({
    method: 'POST',
    url: '/booking/booking',
    data: {
      id: params?.id,
    },
  });

  const [saveAmenity, saveAmenityOpts] = usePost({
    onComplete: () => {
      notif['success']({
        message: 'Booking Updated!',
      });

      setOpenModalAdditional(false);

      refetch();
    },
  });

  const [saveDiscount, saveDiscountOpts] = usePost({
    onComplete: () => {
      notif['success']({
        message: 'Booking Updated!',
      });

      setOpenModalDiscount(false);

      refetch();
    },
    onError: (e) => {
      notif['error']({
        message: e?.response?.data?.message,
      });
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

  const { response: discounts } = useFetch({
    method: 'GET',
    url: '/discount',
  });

  const discountsChoices = discounts?.data
    ? discounts?.data.map((e) => ({
        label: e?.name,
        value: e._id,
        discount_rate: e.discount_rate,
        type: e.type,
      }))
    : [];

  if (error) {
    navigate('/404');
  }

  const [updateBooking, updateBookingOpts] = usePost({
    onComplete: () => {
      setOpenModal(false);
      setPaymentAmount(0);
      refetch();
      notif['success']({
        message: 'Booking successfully updated!',
      });
    },
    onError: (err) => {
      console.log(err);
      notif['error']({
        message: err?.response?.data?.message || 'Booking Error!',
      });
    },
  });

  const booking = response?.data;
  const additionals = booking?.additionals?.map((e)=> ({
    ...e,
    rate: e.rate
  }))

  let { response: available_rooms } = useFetch({
    method: 'POST',
    url: '/room_types/available_rooms',
    data: {
      checkIn: booking?.check_in,
      checkOut: booking?.check_out,
    },
  });

  let rooms = [];
  available_rooms = available_rooms?.data?.forEach((room_type) =>
    room_type?.rooms?.forEach((room) => {
      rooms.push({
        room_id: room?._id,
        roomtype_id: room_type?._id,
        room_amount: room_type?.room_rate,
        roomtype_name: room_type?.name,
        room_num: room?.room_number,
        no_person: room_type?.details?.no_person,
      });
    }),
  );

  const roomOptions = rooms.map((e) => ({
    label: `${e.roomtype_name} (${e.room_num}) - ${new Intl.NumberFormat(
      'en-PH',
      {
        style: 'currency',
        currency: 'PHP',
      },
    ).format(e.room_amount)}`,
    value: e.room_id,
  }));

  const handleUpdateStatus = () =>
    UpdateBookingStatus(updateBooking, booking, paymentAmount, remarks);

  const okLabel = () => {
    switch (booking?.status) {
      case 'PENDING':
        return 'CONFIRMED';
      case 'CONFIRMED':
        return 'CHECK-IN';
      case 'CHECK_IN':
        return 'CHECK-OUT';
      default:
        return null;
    }
  };

  const showConfirmCancel = () => {
    confirm({
      title: 'Do you Want to cancel this booking?',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      okButtonProps: {
        className: 'bg-info',
      },
      okText: 'Yes',
      onOk() {
        updateBooking(
          {
            method: 'POST',
            url: '/booking/update_booking_status',
            data: {
              id: booking._id,
              status: 'CANCELLED',
            },
          },
          getToken(),
        );
      },
    });
  };

  const onSaveAdditionals = () => {
    saveAmenity(
      {
        method: 'POST',
        url: '/booking/add_amenity',
        data: {
          id: params?.id,
          amenity_id: JSON.stringify(amenity),
          qty: noAmenity,
        },
      },
      getToken(),
    );
  };

  const onSaveDiscount = () => {
    saveDiscount(
      {
        method: 'POST',
        url: '/booking/add_discount',
        data: {
          id: params?.id,
          discount_type: JSON.stringify(discount),
        },
      },
      getToken(),
    );
  };

  const [changeRoom] = usePost({
    onComplete: () => {
      setOpenModalSelectRoom(false);
      refetch();
    },
  });

  const onSaveChangeRoom = (newroom, old) => {
    const newRoom = rooms.find((e) => e.room_id === newroom.value);
    const oldRoom = {
      room_id: old?.key,
      room_rate: old.rate,
    };
    changeRoom({
      method: 'POST',
      url: '/booking/change_room',
      data: {
        id: params?.id,
        oldRoom,
        newRoom,
      },
    });

    message.success('Saved changes!');
  };

  const [deleteAmenity] = usePost({
    onComplete:()=> refetch()
  })

  return (
    <>
      <div className="block relative">
        <div>
          <StatusTag
            type="BOOKING"
            status={booking?.status}
            className="text-2xl mb-5 px-4 py-1 rounded-3xl"
          />
          <Row gutter={[12, 12]}>
            <Col sm={24} md={16} lg={16}>
              <Row gutter={[12, 12]}>
                <Col md={24} lg={24}>
                  <RoomDetails
                    booking={booking}
                    setOpenModalSelectRoom={setOpenModalSelectRoom}
                    openModalSelectRoom={openModalSelectRoom}
                    roomOptions={roomOptions}
                    onSaveChangeRoom={onSaveChangeRoom}
                  />
                </Col>
                <Col md={24} lg={24}>
                  <PaymentDetails
                    booking={booking}
                    setOpenModalDiscount={setOpenModalDiscount}
                  />
                </Col>
                <Col md={24} lg={24}>
                  <Card title="Booking History">
                    <History booking={booking} />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col sm={24} md={8} lg={8}>
              <Row gutter={[12, 12]}>
                <Col md={24} lg={24}>
                  <GuestDetails
                    booking={booking}
                    showConfirmCancel={showConfirmCancel}
                  />
                </Col>
                <Col md={24} lg={24}>
                  <Card
                    title="Additionals"
                    extra={
                      booking?.status === 'CHECK_IN' && (
                        <Button onClick={() => setOpenModalAdditional(true)}>
                          <PlusOutlined />
                        </Button>
                      )
                    }
                  >
                    <Table
                      dataSource={additionals}
                      columns={[
                        {
                          title: 'Name',
                          dataIndex: 'name',
                        },
                        {
                          title: 'Rate',
                          dataIndex: 'rate',
                        },
                        {
                          title: 'Qty',
                          dataIndex: 'qty',
                        },
                        {
                          title: "Action",
                          render: (_, record) => {
                            return (
                              <>
                                {' '}
                                <Button
                                  danger
                                  disabled={booking?.status !== "CHECK_IN"}
                                  icon={<DeleteOutlined />}
                                  onClick={(e) => {
                                    e.stopPropagation();      
                                    deleteAmenity({
                                      method: 'POST',
                                      url: '/booking//delete_amenity',
                                      data: {
                                        id: params?.id,
                                        additionalId: record?._id
                                      },
                                    },  getToken() )
                                  }
                                  
                                  }
                                />
                              </>
                            );
                          }
                        }
                      ]}
                    />
                    {/* <Empty/> */}
                  </Card>
                </Col>
                {booking?.remarks && (
                  <Col md={24} lg={24}>
                    <Card title="Remarks">
                      <pre
                        className="text-lg"
                        style={{
                          whiteSpace: 'pre-wrap',
                          wordWrap: 'break-word',
                          fontFamily: 'sans-serif',
                        }}
                      >
                        {booking?.remarks}
                      </pre>
                    </Card>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </div>
        <Modal
          open={openModal}
          title="Update Booking"
          onCancel={() => setOpenModal((prevState) => !prevState)}
          footer={[
            <Button
              key="cancel"
              loading={false}
              disabled={updateBookingOpts.loading}
              onClick={() => setOpenModal((prevState) => !prevState)}
            >
              Cancel
            </Button>,
            <Button
              className="bg-info"
              key="submit"
              type="primary"
              loading={false}
              disabled={updateBookingOpts.loading}
              onClick={handleUpdateStatus}
            >
              Submit
            </Button>,
          ]}
          onOk={handleUpdateStatus}
        >
          <div className="py-2">
            <InputNumber
              addonBefore="PHP"
              size="large"
              value={paymentAmount}
              formatter={(value) => commaNumber(parseInt(value))}
              placeholder="Enter Payment Amount"
              onChange={(e) => {
                setPaymentAmount((prevState) =>
                  isNaN(parseInt(e)) ? prevState : parseInt(e),
                );
              }}
              // onChangeCapture={(e) => {
              //   console.log(e.currentTarget.value)
              // }
              // setPaymentAmount((prevState) =>
              //   isNaN(parseInt(e.currentTarget.value))
              //     ? prevState
              //     : parseInt(e.currentTarget.value),
              // )
              // }
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
            />
            {booking?.status === 'CHECK_IN' && (
              <Input.TextArea
                className="mt-2"
                value={remarks}
                onChange={(e) => setRemakrs(e.target.value)}
                placeholder="Remarks"
              />
            )}
          </div>
        </Modal>
        <Modal
          open={openModalAdditional}
          title="Additionals"
          onCancel={() => setOpenModalAdditional((prevState) => !prevState)}
          footer={[
            <Button
              key="cancel"
              loading={false}
              //  disabled={updateBookingOpts.loading}
              onClick={() => setOpenModalAdditional((prevState) => !prevState)}
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
        </Modal>
        {/* <Modal
          open={openModalSelectRoom}
          title="Change Room"
          onCancel={() => setOpenModalSelectRoom((prevState) => !prevState)}
          footer={[
            <Button
              key="cancel"
              loading={false}
              //  disabled={updateBookingOpts.loading}
              onClick={() => setOpenModalSelectRoom((prevState) => !prevState)}
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
            // value={amenity?.id}
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
            options={roomOptions}
          ></Select>
        </Modal> */}
        <Modal
          open={openModalDiscount}
          title="Discounts"
          onCancel={() => setOpenModalDiscount((prevState) => !prevState)}
          footer={[
            <Button
              key="cancel"
              loading={false}
              //  disabled={updateBookingOpts.loading}
              onClick={() => setOpenModalDiscount((prevState) => !prevState)}
            >
              Cancel
            </Button>,
            <Button
              className="bg-info"
              key="submit"
              type="primary"
              loading={false}
              //  disabled={updateBookingOpts.loading}
              onClick={onSaveDiscount}
              disabled={!discount?.id}
            >
              Confirm
            </Button>,
          ]}
        >
          <Select
            value={discount?.id}
            onChange={(id) =>
              setDiscount({
                id: id,
                discount_rate: discountsChoices.find((e) => e.value === id)
                  ?.discount_rate,
                type: discountsChoices.find((e) => e.value === id)?.type,
                name: discountsChoices.find((e) => e.value === id)?.label,
              })
            }
            className="w-full"
            size="large"
            placeholder="Select Items"
            options={discountsChoices}
          ></Select>
        </Modal>
        <ActionBar
          okLabel={okLabel()}
          onCancel={() => navigate('/admin/bookings')}
          disabled={updateBookingOpts.loading}
          hideOk={['CHECK_OUT', 'CANCELLED', 'EXPIRED'].includes(
            booking?.status,
          )}
          onOk={() => setOpenModal(true)}
        />
      </div>
    </>
  );
};

export default BookingDetails;
