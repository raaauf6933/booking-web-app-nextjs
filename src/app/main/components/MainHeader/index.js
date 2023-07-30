'use client';
import Navbar from '../Navbar';
import { Carousel } from 'antd';
import image1 from '@assets/image/image_1.jpeg';
import image2 from '@assets/image/image_2.jpeg';
import image3 from '@assets/image/image_3.jpg';
import { Barlow_Condensed } from 'next/font/google';
import classNames from 'classnames';

const inter = Barlow_Condensed({ weight: '400', subsets: ['latin'] });

const MainHeader = (props) => {
  const { primary, title } = props;

  const imgHeight = {
    height: primary ? '600px' : '300px',
  };

  return (
    <div>
      <div className="relative block">
        <Carousel autoplay={primary} dots={false}>
          <div>
            <div className="main-image" style={imgHeight}>
              <img className="" src={image1.src} />
            </div>
          </div>
          <div>
            <div className="main-image" style={imgHeight}>
              <img className="" src={image2.src} />
            </div>
          </div>
          <div>
            <div className="main-image" style={imgHeight}>
              <img className="" src={image3.src} />
            </div>
          </div>
        </Carousel>
        <div className="overlay"></div>
        {title && (
          <div className="flex justify-center">
            <div className="flex items-center top-0 bottom-0 absolute mx-auto my-auto">
              <span
                className={classNames(
                  'text-6xl font-bold text-white',
                  inter.className,
                )}
              >
                {title}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
