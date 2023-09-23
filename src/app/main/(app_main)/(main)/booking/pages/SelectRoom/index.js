'use client';
import { Button, Card, Col, Divider, Row } from 'antd';
import MainRoomCard from '../../../../../components/MainRoomCard';
import BookingSummary from '../../../../../components/BookingSummary';
import useFetch from '../../../../../../hooks/useFetch';
import { useContext, useEffect } from 'react';
import BookingContext from '../../../../../context/booking/bookingContext';
import { useRouter } from 'next/navigation';

const SelectRoom = () => {
  const navigate = useRouter();
  const { bookingState } = useContext(BookingContext);

  const { response } = useFetch({
    url: '/room_types/available_rooms',
    method: 'POST',
    data: {
      checkIn: bookingState.check_in,
      checkOut: bookingState.check_out,
    },
  });

  useEffect(() => {
    if (!bookingState.check_in || !bookingState.check_out) {
      navigate.push('/main');
    }
  }, []);

  return (
    <div className="mt-7">
      <Row gutter={[23]}>
        <Col sm={24} md={18} lg={18}>
          <Card>
            <div className="p-5 overflow-y-scroll max-h-screen">
              {response?.data?.map((room) => (
                <div className="mb-5">
                  <MainRoomCard
                    type="SELECT_ROOM"
                    data={room}
                    image={room.images.map((e) => e.url)}
                  />
                </div>
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
            <Button
              disabled={bookingState?.room_details?.length < 1}
              className="w-full bg-warning"
              size="large"
              onClick={() => navigate.push('/main/booking/review')}
            >
              <span className="text-white text-lg">Proceed</span>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SelectRoom;
