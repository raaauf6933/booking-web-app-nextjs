'use client';
import { Button, Image } from 'antd';
import { MdKeyboardArrowRight } from 'react-icons/md';

const MainRoomCard = (props) => {
  const { image } = props;
  return (
    <>
      <div className="flex flex-col md:flex-row ">
        <div className="main-room-card  mr-10">
          <Image.PreviewGroup
          // items={[
          //     imge1.src,
          //     imge2.src,
          //     imge3.src,
          //     imge4.src,
          //     imge5.src,
          // ]}
          >
            <Image src={image} loading="eager" />
          </Image.PreviewGroup>{' '}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-5xl font-bold pb-3">Deluxe Room</span>
          <div className="pb-4">
            <span className="text-3xl font-extrabold text-warning">
              3,000.00 PHP
            </span>
            <span className="text-xl "> / Night</span>
          </div>
          <div className="pb-2 font-bold">
            <span className="text-2xl ">Capacity</span>
            <span className="text-2xl "> : Max Person 4</span>
          </div>
          <div className="pb-3">
            <p className="text-lg">
              Sink into the plush, king-sized bed, adorned with premium-quality
              linens that guarantee a restful night's sleep. The thoughtful
              touches extend to a selection of fluffy pillows, ensuring your
              utmost comfort throughout your stay. For added convenience, the
              bedside table features accessible charging ports, so your devices
              are always ready to use.
            </p>
          </div>
          <div>
            <Button className="text-base w-auto pb-7">
              <div className="flex justify-center items-center">
                <span>Book Now</span>
                <MdKeyboardArrowRight className="text-xl" />
              </div>{' '}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRoomCard;
