'use client';
import { Card, Col, Row } from 'antd';
import { MdCategory } from 'react-icons/md';
import { AiFillTags } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import {FileImageOutlined} from "@ant-design/icons"
const Configuration = () => {
  const navigate = useRouter().push;
  return (
    <>
      <div className="w-full">
        <Row gutter={[24, 24]}>
          <Col md={6} lg={6}>
            <Card
              hoverable
              onClick={() => navigate('/admin/configuration/amenities')}
            >
              <div className="flex flex-row items-center justify-center">
                <span className="text-4xl text-info mr-5">
                  <MdCategory />
                </span>
                <div>
                  <span className="text-xl text-info font-semibold">
                    Amenities / Additionals
                  </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={6} lg={6}>
            <Card
              hoverable
              onClick={() => navigate('/admin/configuration/discounts')}
            >
              <div className="flex flex-row items-center justify-center">
                <span className="text-4xl text-info mr-5">
                  <AiFillTags />
                </span>
                <div>
                  <span className="text-xl text-info font-semibold">
                    Discounts
                  </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={6} lg={6}>
            <Card
              hoverable
              onClick={() => navigate('/admin/configuration/carousel')}
            >
              <div className="flex flex-row items-center justify-center">
                <span className="text-4xl text-info mr-5">
                <FileImageOutlined />
                </span>
                <div>
                  <span className="text-xl text-info font-semibold">
                  Carousel
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Configuration;
