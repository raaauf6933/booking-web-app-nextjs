'use client';
import { Button, Card, Col, Divider, Row } from 'antd';
import MainRoomCard from '../../../../components/MainRoomCard';
import BookingSummary from '../../../../components/BookingSummary';
import useFetch from '../../../../../hooks/useFetch';

const SelectRoom = () => {
  const { response } = useFetch({
    url: '/room_types/available_rooms',
    method: 'POST',
    data: {
      checkIn: new Date(),
      checkOut: new Date(),
    },
  });

  console.log(response);

  return (
    <div className="mt-7">
      <Row gutter={[22]}>
        <Col sm={24} md={18} lg={18}>
          <Card>
            <div className="p-5 overflow-y-scroll max-h-screen">
              {response?.data?.map((room) => (
                <>
                  <MainRoomCard type="SELECT_ROOM" data={room} image={room.images.map((e)=> e.url)} />
                </>
              ))}

              {/* <div className="p-3 mb-5">
                <MainRoomCard
                  type="SELECT_ROOM"
                  image="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690474564/sut3gag8cjhwqajjxpts.jpg"
                />
              </div> */}
            </div>
          </Card>
        </Col>
        <Col sm={24} md={6} lg={6}>
          <BookingSummary />
          <div className="mt-4">
            <Button className="w-full bg-warning" size="large">
              <span className="text-white text-lg">Proceed</span>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SelectRoom;
