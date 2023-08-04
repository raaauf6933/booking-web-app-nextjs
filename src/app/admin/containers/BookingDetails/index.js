import { Button, Card, Col, Divider, Row } from 'antd';
import PaymentDetails from '../../components/BookingDetails/PaymentDetails';
import RoomDetails from '../../components/BookingDetails/RoomDetails';
import GuestDetails from '../../components/BookingDetails/GuestDetails';
import StatusTag from '../../components/StatusTag';
import History from '../../components/BookingDetails/History';

const BookingDetails = () => {
  return (
    <>
      <div className="block relative">
        <div>
          <StatusTag
            type="BOOKING"
            status="PENDING"
            className="text-2xl mb-5 px-4 py-1 rounded-3xl"
          />
          <Row gutter={[12, 12]}>
            <Col sm={24} md={16} lg={16}>
              <Row gutter={[12, 12]}>
                <Col md={24} lg={24}>
                  <RoomDetails />
                </Col>
                <Col md={24} lg={24}>
                  <PaymentDetails />
                </Col>
                <Col md={24} lg={24}>
                  <History />
                </Col>
              </Row>
            </Col>
            <Col sm={24} md={8} lg={8}>
              <Row gutter={[12, 12]}>
                <Col md={24} lg={24}>
                  <GuestDetails />
                </Col>
                <Col md={24} lg={24}>
                  <Card title="Additionals"></Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="fixed bottom-0">
          <div className="bg-white shadow-2xl drop-shadow-2xl shadow-black p-4 w-screen max-w-xs md:max-w-7xl">
            <div className="flex justify-between">
              <Button className="bg-white text-black" type="default">
                BACK
              </Button>
              <Button className="bg-info text-white" type="primary">
                CONFIRMED
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
