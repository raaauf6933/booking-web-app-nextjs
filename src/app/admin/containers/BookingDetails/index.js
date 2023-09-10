'use client';
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Modal,
  Row,
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
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getToken } from '../../context/auth/utils';
const { confirm } = Modal;

const BookingDetails = () => {
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const { notif } = useNotification();
  const navigate = useRouter().push
  const { response, refetch, error } = useFetch({
    method: 'POST',
    url: '/booking/booking',
    data: {
      id: params?.id,
    },
  });

  if(error){
    navigate("/404")
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

  const handleUpdateStatus = () =>
    UpdateBookingStatus(updateBooking, booking, paymentAmount);

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
      okButtonProps:{
       className: 'bg-info'
      },
      okText: "Yes",
      onOk() {
        updateBooking({
          method: 'POST',
          url: '/booking/update_booking_status',
          data: {
            id: booking._id,
            status: "CANCELLED",
          },
        },
        getToken()
        );
      },
    });
  };

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
                  <RoomDetails booking={booking} />
                </Col>
                <Col md={24} lg={24}>
                  <PaymentDetails booking={booking} />
                </Col>
                <Col md={24} lg={24}>
                  <History booking={booking} />
                </Col>
              </Row>
            </Col>
            <Col sm={24} md={8} lg={8}>
              <Row gutter={[12, 12]}>
                <Col md={24} lg={24}>
                  <GuestDetails booking={booking} showConfirmCancel={showConfirmCancel} />
                </Col>
                <Col md={24} lg={24}>
                  <Card title="Additionals"></Card>
                </Col>
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
              placeholder='Enter Payment Amount'
              onChangeCapture={(e) =>
                setPaymentAmount((prevState) =>
                  isNaN(parseInt(e.currentTarget.value))
                    ? prevState
                    : parseInt(e.currentTarget.value),
                )
              }
              onKeyUp={(e) => {
                console.log(e.keyCode);
                if (e.keyCode === 13) {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
            />
          </div>
        </Modal>
        <ActionBar
          okLabel={okLabel()}
          onCancel={()=> navigate("/admin/bookings")}
          disabled={updateBookingOpts.loading}
          hideOk={["CHECK_OUT","CANCELLED"].includes(booking?.status)}
          onOk={() => setOpenModal(true)}
        />
      </div>
    </>
  );
};

export default BookingDetails;
