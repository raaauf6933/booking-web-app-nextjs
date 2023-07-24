'use client';
import Card from '@components/AntD/card';
import DatePicker from '@components/AntD/datepicker';
import { Button, Col, Row } from 'antd';
import React from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const MainDatePicker = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="flex justify-center">
      <div className="relative bottom-20 lg:w-4/6 w-5/6 lg:px-16 ">
        <Card className="shadow-xl p-4">
          <Row gutter={[16, 24]} justify="center" align="bottom">
            <Col xs={24} sm={24} md={8} xl={8}>
              <div className="w-full">
                <div className="px-2 pb-2 font-bold opacity-50">
                  <label>CHECK-IN</label>
                </div>
                <DatePicker
                  disabledDate={(current) => current && current.$d < new Date()}
                  onChange={onChange}
                  className="h-16 w-full"
                  showToday={false}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} xl={8}>
              <div className="w-full">
                <div className="px-2 pb-2  font-bold opacity-50">
                  <label>CHECK-OUT</label>
                </div>
                <DatePicker
                  onChange={onChange}
                  className="h-16 w-full"
                  showToday={false}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} xl={8}>
              <Button
                className="w-full bg-warning border-white focus:border-white outline-none  h-16"
                type="default"
              >
                <span className="text-white text-lg">Check Availability</span>
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default MainDatePicker;
