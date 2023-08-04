import { Card, Col, Divider, Row } from 'antd';

const BookingDetails = () => {
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col sm={24} md={16} lg={16}>
          <Row gutter={[12, 12]}>
            <Col md={24} lg={24}>
              <Card title="Room Details"></Card>
            </Col>
            <Col md={24} lg={24}>
              <Card title="Payment Details">
                <div>
                  <div className="flex justify-between">
                    <span>Sub-Total (rooms)</span>
                    <span>PHP 1,200.00 X 3 night(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional Amount</span>
                    <span>PHP 1,200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>PHP 0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className='font-bold'>Total Amount</span>
                    <span>PHP 3,600.00</span>
                  </div>
                  <Divider/>
                  <div className="flex justify-between">
                    <span className='font-bold'>Captured Amount</span>
                    <span>PHP 0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oustanding Balance</span>
                    <span>PHP 0.00</span>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md={24} lg={24}>
              <Card title="Booking History"></Card>
            </Col>
          </Row>
        </Col>
        <Col sm={24} md={8} lg={8}>
          <Row gutter={[12, 12]}>
            <Col md={24} lg={24}>
              <Card title="Guest Details">
                
              </Card>
            </Col>
            <Col md={24} lg={24}>
              <Card title="Additionals"></Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BookingDetails;
