'use client';
import { Col, Row } from 'antd';

function MainAmenities(params) {
  return (
    <>
      <div>
        <Row gutter={[48, 48]}>
          <Col sm={24} md={8} lg={8}>
            <div className="relative inline-block">
              <div className="h-60 bg-center bg-no-repeat bg-cover overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690474563/e3qiwrmbmtk8flbztltg.jpg"
                  className="h-72"
                />
              </div>
              <div className="overlay"></div>
              <div className="flex absolute top-0 bottom-0 justify-center items-center w-full">
                <span className="text-2xl font-semibold text-warning">
                  COMFORT ROOM
                </span>
              </div>
            </div>
          </Col>
          <Col sm={24} md={8} lg={8}>
            <div className="relative inline-block">
              <div className="h-60 bg-center bg-no-repeat bg-cover overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690475693/uuuorrkzahjlopdw8eis.jpg"
                  className="h-72"
                />
              </div>
              <div className="overlay"></div>
              <div className="flex absolute top-0 bottom-0 justify-center items-center w-full">
                <span className="text-2xl font-semibold   text-warning">
                  POOL
                </span>
              </div>
            </div>
          </Col>
          <Col sm={24} md={8} lg={8}>
            <div className="relative inline-block">
              <div className="h-60 bg-center bg-no-repeat bg-cover overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690475693/wraavgncflq2jggsi60g.jpg"
                  className="h-72"
                />
              </div>
              <div className="overlay"></div>
              <div className="flex absolute top-0 bottom-0 justify-center items-center w-full">
                <span className="text-2xl font-semibold   text-warning">
                  RESTAURANT
                </span>
              </div>
            </div>
          </Col>
          <Col sm={24} md={8} lg={8}>
            <div className="relative inline-block">
              <div className="h-60 bg-center bg-no-repeat bg-cover overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690475693/agsqvj9r4blauatvopgy.jpg"
                  className="h-72"
                />
              </div>
              <div className="overlay"></div>
              <div className="flex absolute top-0 bottom-0 justify-center items-center w-full">
                <span className="text-2xl font-semibold   text-warning">
                  EVENTS PLACE
                </span>
              </div>
            </div>
          </Col>
          <Col sm={24} md={8} lg={8}>
            <div className="relative inline-block">
              <div className="h-60 bg-center bg-no-repeat bg-cover overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690475693/ildhcn1mxvb8d9dwpyi5.jpg"
                  className="h-72"
                />
              </div>
              <div className="overlay"></div>
              <div className="flex absolute top-0 bottom-0 justify-center items-center w-full">
                <span className="text-2xl font-semibold   text-warning">
                  TRANQUIL GARDEN
                </span>
              </div>
            </div>
          </Col>
          <Col sm={24} md={8} lg={8}>
            <div className="relative inline-block">
              <div className="h-60 bg-center bg-no-repeat bg-cover overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690474563/e3qiwrmbmtk8flbztltg.jpg"
                  className="h-72"
                />
              </div>
              <div className="overlay"></div>
              <div className="flex absolute top-0 bottom-0 justify-center items-center w-full">
                <span className="text-2xl font-semibold   text-warning">
                  COMFORT ROOM
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MainAmenities;
