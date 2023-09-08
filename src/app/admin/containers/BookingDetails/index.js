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
import { useParams } from 'next/navigation';
import { useState } from 'react';

const BookingDetails = () => {
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { response } = useFetch({
    method: 'POST',
    url: 'booking/booking',
    data: {
      id: params?.id,
    },
  });

  const booking = response?.data;

  const handleOnOk = () => {
    setOpenModal(true);
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
                  <GuestDetails booking={booking} />
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
              className="bg-info"
              key="submit"
              type="primary"
              loading={false}
            >
              Submit
            </Button>,
          ]}
        >
          <div className='py-2'>
          <InputNumber
            formatter={(value) =>
              `PHP ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            className='w-full'
            size='large'
          />
          </div>
        
        </Modal>
        <ActionBar onOk={handleOnOk} />
      </div>
    </>
  );
};

export default BookingDetails;
