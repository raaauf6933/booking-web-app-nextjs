'use client';
import { Button, Col, Image, Row } from 'antd';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Barlow_Condensed } from 'next/font/google';
import BookingContext from '../../context/booking/bookingContext';
import { useContext } from 'react';
const inter = Barlow_Condensed({ weight: '100', subsets: ['latin'] });

const MainRoomCard = (props) => {
  const { image, size, type, data } = props;
  const { bookingState, bookingDispatch } = useContext(BookingContext);

  const handleAddRoom = () => {
    bookingDispatch({
      type: "ADD_ROOM",
      payload: {
        room_id: data.rooms.find(()=> true)._id,
        roomtype_id: data._id,
        room_amount: data.room_rate,
        roomtype_name: data.name,
        room_num: data.rooms.find(()=> true).room_number,
        no_person: data.details.no_person,
      },
    });
  }

  const ActionComponent = () => {
    if (type !== 'SELECT_ROOM') {
      return <></>;
    } else if(data.rooms.length === 0){
        return <><span className='text-2xl font-bold '>No Available Room</span></>
    }else {
      return (
        <Button className="text-base w-auto pb-7" onClick={handleAddRoom} disabled={bookingState.room_details.some((e)=> e.room_id === data.rooms.find(()=> true)._id)}>
          <div className="flex justify-center items-center">
            <span>Book This Room</span>
            <MdKeyboardArrowRight className="text-xl" />
          </div>{' '}
        </Button>
      );
    }
  };

  return (
    <>
      <Row gutter={[0,26]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="pb-5">
            {' '}
            <Image.PreviewGroup
            items={image}
            >
              <Image
                style={{
                  width: '30em',
                }}
                src={
                  image[0]
                    ? image[0]
                    : 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'
                }
                loading="eager"
              />
            </Image.PreviewGroup>{' '}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="flex flex-col justify-center w-full"
            style={inter.style}
          >
            <span className="text-5xl font-bold pb-3">{data?.name}</span>
            <div className="pb-4">
              <span className="text-3xl font-extrabold text-warning">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(data.room_rate)}
              </span>
              <span className="text-xl "> / Night</span>
            </div>
            <div className="pb-2 font-bold">
              <span className="text-2xl ">Capacity</span>
              <span className="text-2xl ">
                {' '}
                : Max Person {data.details.no_person}
              </span>
            </div>
            <div className=" h-28 overflow-y-scroll mb-7">
              <p className="text-lg">
                {data.details.description}
                {/* Sink into the plush, king-sized bed, adorned with premium-quality
              linens that guarantee a restful night's sleep. The thoughtful
              touches extend to a selection of fluffy pillows, ensuring your
              utmost comfort throughout your stay. For added convenience, the
              bedside table features accessible charging ports, so your devices
              are always ready to use. */}
              </p>
            </div>
            <div>
              {ActionComponent()}
              {/* <Button className="text-base w-auto pb-7">
              <div className="flex justify-center items-center">
                <span>Book Now</span>
                <MdKeyboardArrowRight className="text-xl" />
              </div>{' '}
            </Button> */}
            </div>
          </div>
        </Col>
      </Row>
      {/* <div className="flex flex-col md:flex-row w-fit" style={inter.style}>
        <div className="main-room-card flex-grow w-full mr-10">
          <Image.PreviewGroup
          // items={[
          //     imge1.src,
          //     imge2.src,
          //     imge3.src,
          //     imge4.src,
          //     imge5.src,
          // ]}
          >
            <Image src={image ? image : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} loading="eager" />
          </Image.PreviewGroup>{' '}
        </div>
        <div className="flex flex-col justify-center w-full">
          <span className="text-5xl font-bold pb-3">{data?.name}</span>
          <div className="pb-4">
            <span className="text-3xl font-extrabold text-warning">
              {new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(data.room_rate)}
            </span>
            <span className="text-xl "> / Night</span>
          </div>
          <div className="pb-2 font-bold">
            <span className="text-2xl ">Capacity</span>
            <span className="text-2xl "> : Max Person {data.details.no_person}</span>
          </div>
          <div className="pb-3 h-28 overflow-y-scroll mb-7">
            <p className="text-lg">
              {data.details.description}
               Sink into the plush, king-sized bed, adorned with premium-quality
              linens that guarantee a restful night's sleep. The thoughtful
              touches extend to a selection of fluffy pillows, ensuring your
              utmost comfort throughout your stay. For added convenience, the
              bedside table features accessible charging ports, so your devices
              are always ready to use. 
            </p>
          </div>
          <div>
            {ActionComponent()}
             <Button className="text-base w-auto pb-7">
              <div className="flex justify-center items-center">
                <span>Book Now</span>
                <MdKeyboardArrowRight className="text-xl" />
              </div>{' '}
            </Button> 
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MainRoomCard;
