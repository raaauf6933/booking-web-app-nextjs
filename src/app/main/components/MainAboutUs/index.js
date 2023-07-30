import { Col, Row } from 'antd';
import Img from 'next/image';
import React from 'react';

const MainAboutUs = () => {
  return (
    <>
      <Row>
        <Col sm={24} md={12} lg={12}>
          <div className="h-100 bg-center bg-no-repeat bg-cover overflow-hidden pr-10 flex-auto">
            <img
              className="rounded-2xl "
              src="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690520960/t44uxmoatq5psgrwrhfa.jpg"
              loading="eager"
            />
          </div>
        </Col>
        <Col sm={24} md={12} lg={12}>
          <div className="p-4 flex flex-col justify-center flex-auto">
            <span className="text-5xl text-warning font-bold py-4 pb-5">
              TESTIMONIALS
            </span>
            <p className="text-xl p-2">
              Nestled in the heart of nature, Grand Villa Resort offers a
              tranquil escape from the bustling city life. Our simple resort is
              designed to immerse you in the beauty of the surrounding
              landscape, providing a haven of peace and relaxation for every
              guest.
            </p>
            <span className="p-2 text-xl font-semibold">Our Vision</span>
            <p className="text-xl p-2">
              Our Vision At Grand Villa Resort, our vision is to create a serene
              paradise where guests can unwind, rejuvenate, and connect with
              nature. We believe in offering genuine hospitality and
              personalized service, ensuring that every visitor leaves with
              cherished memories of their stay.
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MainAboutUs;
