'use client';
import { FaWifi, FaSwimmingPool, FaWineGlassAlt } from 'react-icons/fa';
import { IoRestaurant } from 'react-icons/io5';
import React, { useContext, useEffect } from 'react';
import img1 from '@assets/image/main_img_1.jpeg';
import img2 from '@assets/image/main_img_2.jpeg';
import { CommentOutlined } from '@ant-design/icons';
import { Carousel, Col, Divider, Empty, Rate, Row } from 'antd';
import BookingContext from '../../context/booking/bookingContext';
import classNames from 'classnames';
import { Barlow_Condensed } from 'next/font/google';
import useFetch from '../../../hooks/useFetch';
const inter = Barlow_Condensed({ weight: '400', subsets: ['latin'] });

const MainBody = () => {
  const { bookingDispatch } = useContext(BookingContext);

  const { response: feedbacks_response} = useFetch({
    method: "GET",
    url:"/booking/feedbacks"
  })

  const feedbacks= feedbacks_response?.data ?  feedbacks_response?.data : [] ;

  useEffect(() => {
    bookingDispatch({
      type: 'RESET',
    });
  }, []);

  return (
    <div>
      <Row gutter={[48, 24]} className="pb-16">
        <Col xs={24} sm={24} md={12}>
          <div className="flex flex-col">
            <span className="text-warning font-normal text-2xl pb-5">
              ABOUT US
            </span>
            <span className="text-4xl font-normal pb-6">
              Welcome Grand Villa Resort
            </span>
            <div className="text-lg">
              <p className="pb-8">
                We believe in creating experiences that leave a lasting
                impression. Whether you're traveling with family, friends, or
                seeking a romantic escape, our hotel and resort offer a haven of
                luxury and serenity.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
              </p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <div className="flex">
            <div className="main-content-image">
              <img src={img1.src} />
            </div>
            <div className="main-content-image p-6">
              <img src={img2.src} />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[48, 48]} className="pb-20">
        <Col xs={24} sm={24} md={12}>
          <div className="flex flex-col justify-center items-center pb-5">
            <div className="text-warning text-8xl">
              <FaWifi />
            </div>
            <span className="text-4xl font-normal">Free Wi-Fi</span>
          </div>
          <span className="text-lg">
            The massive investment in a hotel or resort requires constant
            reviews and control in order to make it a successful investment.
          </span>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <div className="flex flex-col justify-center items-center pb-5">
            <div className="text-warning text-8xl">
              <FaSwimmingPool />
            </div>
            <span className="text-4xl font-normal">Premium Pool</span>
          </div>
          <span className="text-lg">
            The massive investment in a hotel or resort requires constant
            reviews and control in order to make it a successful investment.
          </span>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <div className="flex flex-col justify-center items-center pb-5">
            <div className="text-warning text-8xl">
              <FaWineGlassAlt />
            </div>
            <span className="text-4xl font-normal">Events</span>
          </div>
          <span className="text-lg leading-7">
            If you're planning a special event or dream wedding, our elegant
            event spaces provide the perfect backdrop for creating cherished
            memories. Our dedicated events team will work with you to tailor
            every detail, ensuring that your celebration is flawless and
            unforgettable.
          </span>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <div className="flex flex-col justify-center items-center pb-5">
            <div className="text-warning text-8xl">
              <IoRestaurant />
            </div>
            <span className="text-4xl font-normal">Restaurant</span>
          </div>
          <span className="text-lg">
            The massive investment in a hotel or resort requires constant
            reviews and control in order to make it a successful investment.
          </span>
        </Col>
      </Row>
      <Divider />
      <div className="text-center mb-14">
        <span
          className={classNames(
            'text-6xl font-bold text-black text-center',
            inter.className,
          )}
        >
          Testimonials
        </span>
      </div>
      <Row gutter={[48, 48]} className="pb-20">
        <Col span={24}>
          {feedbacks?.length > 0 ?   <Carousel autoplay autoplaySpeed={2000}>
            {feedbacks?.map((e)=> ( <div className="p-10">
              <div class="rounded-xl bg-white p-6 text-center shadow-xl">
                <div class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-info shadow-lg shadow-teal-500/40">
                  <CommentOutlined className="text-white text-2xl" />
                </div>

                <p class="px-4 text-xl">{e?.feedback?.feedback}</p>
                <Rate value={e?.feedback?.rate} />
                <h1 class="text-grey2 italic mb-3 text-xl font-medium lg:px-14">
                  - {e?.guest?.first_name} {e?.guest?.last_name}
                </h1>
              </div>
            </div>))}
           
          </Carousel>: <Empty/>}
        
        </Col>
      </Row>
    </div>
  );
};

export default MainBody;
