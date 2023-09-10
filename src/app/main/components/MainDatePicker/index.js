'use client';
import Card from '../AntD/card';
import DatePicker from '../AntD/datepicker';
import { Button, Col, Row } from 'antd';
import React, { useContext } from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/navigation';
import BookingContext from '../../context/booking/bookingContext';
import { hasNull } from '../../../utils/hasNull';
import { useNotification } from '../../context/notification/context';
import { useClientAuth } from '../../context/auth/context';
dayjs.extend(customParseFormat);

const MainDatePicker = () => {
  const navigate = useRouter();
  const { notif } = useNotification();
  const { bookingState, bookingDispatch } = useContext(BookingContext);
  const [dates, setDates] = React.useState({
    check_in: '' || bookingState.check_in,
    check_out: '' || bookingState.check_out,
  });

  const { isAuthenticated } = useClientAuth()


  const onChangeCheckIn = (date, dateString) => {
    setDates((prevState) => ({ ...prevState, check_in: dateString }));

    if (
      dates.check_out &&
      new Date(dates.check_in) < new Date(dates.check_out)
    ) {
      setDates((prevState) => ({ ...prevState, check_out: '' }));
    }
  };

  const onChangeCheckOut = (date, dateString) => {
    setDates((prevState) => ({ ...prevState, check_out: dateString }));
  };

  const handleSubmitDate = () => {

    if (!hasNull(dates)) {
      bookingDispatch({
        type: 'SET_DATES',
        payload: dates,
      });

      navigate.push('/main/booking/select_room');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative bottom-28 lg:w-full w-full lg:px-16 ">
        <Card className="shadow-xl p-4">
          <Row gutter={[16, 24]} justify="center" align="bottom">
            <Col xs={24} sm={24} md={8} xl={8}>
              <div className="w-full">
                <div className="px-2 pb-2 font-bold opacity-50">
                  <label>CHECK-IN</label>
                </div>
                <DatePicker
                  value={
                    dates.check_in ? dayjs(dates.check_in, 'YYYY-MM-DD') : null
                  }
                  disabledDate={(current) => current && current.$d < new Date()}
                  onChange={onChangeCheckIn}
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
                  value={
                    dates.check_out
                      ? dayjs(dates.check_out, 'YYYY-MM-DD')
                      : null
                  }
                  disabled={!dates.check_in}
                  disabledDate={(current) =>
                    current &&
                    current.$d < new Date(dates.check_in).setHours(24)
                  }
                  onChange={onChangeCheckOut}
                  className="h-16 w-full"
                  showToday={false}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} xl={8}>
              <Button
                className="w-full bg-warning border-white focus:border-white outline-none  h-16"
                type="default"
                onClick={() => handleSubmitDate()}
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
