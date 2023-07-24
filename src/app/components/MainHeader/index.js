'use client';
import Navbar from '@components/Navbar';
import { Carousel } from 'antd';
import image1 from '@assets/image/image_1.jpeg';
import image2 from '@assets/image/image_2.jpeg';
import image3 from '@assets/image/image_3.jpg';

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const MainHeader = () => {
  return (
    <div>
      <Navbar />
      <div className="relative block">
        <Carousel autoplay>
          <div>
            <div className="main-image">
              <img className="" src={image1.src} />
            </div>
          </div>
          <div>
            <div className="main-image">
              <img className="" src={image2.src} />
            </div>
          </div>
          <div>
            <div className="main-image">
              <img className="" src={image3.src} />
            </div>
          </div>
        </Carousel>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default MainHeader;
