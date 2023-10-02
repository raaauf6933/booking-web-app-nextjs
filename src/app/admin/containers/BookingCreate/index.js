'use client';
import React from 'react';
import Header from '../../components/Header';
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  Skeleton,
  Table,
  Tooltip,
} from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from 'antd';
import Link from 'next/link';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import BookingSummary from './BookingSummary';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useFetch from '../../../hooks/useFetch';
import RoomSelection from './RoomSelection';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const BookingCreate = () => {
  const { control, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      dates: [dayjs().startOf('day'), dayjs().add(1, 'days').startOf('day')],
      room_details: [],
      customer: null,
      no_guest: 1,
    },
  });

  const booking = watch();

  const { response: customerResponse } = useFetch({
    method: 'GET',
    url: '/customers',
  });

  const customers = customerResponse?.data
    ? customerResponse?.data?.map((e) => ({
        ...e,
        label: `${e.first_name} ${e.last_name}`,
        value: e._id,
      }))
    : [];

  const { response, loading: loadingRooms } = useFetch(
    {
      url: '/room_types/available_rooms',
      method: 'POST',
      data: {
        checkIn: dayjs(
          booking.dates ? booking.dates[0] : dayjs().startOf('day'),
          'YYYY-MM-DD',
        ).format('YYYY-MM-DD'),
        checkOut: dayjs(
          booking.dates
            ? booking.dates[1]
            : dayjs().add(1, 'days').startOf('day'),
          'YYYY-MM-DD',
        ).format('YYYY-MM-DD'),
      },
    },
    {
      skip: !booking.dates || !booking.dates[0] || !booking.dates[1],
    },
  );

  const rooms =
    response?.data &&
    !(!booking.dates || !booking.dates[0] || !booking.dates[1])
      ? response?.data.map((e) => ({ ...e, no_available: e?.rooms?.length }))
      : [];

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day');
  };

  return (
    <div>
      <Header title="Booking Form" />
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={16} lg={16}>
          <Card className="">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="mb-1">
                  <span className="opacity-70 font-semibold text-base">
                    Customer
                  </span>
                </div>
                <Controller
                  name="customer"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      size="large"
                      className="w-full"
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      // onChange={onChange}
                      // onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={customers}
                    />
                  )}
                />
                <div className="mt-1">
                  <span className="opacity-70 text-xs">
                    First time guest?{' '}
                    <Link href="/admin/customers/create" className="text-info">
                      Create Profile here
                    </Link>
                  </span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div className="mb-1">
                  <span className="opacity-70 font-semibold text-base">
                    Check-in & Check-out
                  </span>
                </div>

                <Controller
                  name="dates"
                  control={control}
                  render={({ field }) => (
                    <RangePicker
                      {...field}
                      size="large"
                      disabledDate={disabledDate}
                      className="w-full"
                    />
                  )}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div className="mb-1">
                  <span className="opacity-70 font-semibold text-base">
                    No. Guest
                  </span>
                </div>
                <Controller
                  name="no_guest"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      size="large"
                      className="w-full"
                      min={1}
                      max={10}
                      //   onChange={(e) =>
                      //     setNoGuest((prevState) =>
                      //       isNaN(parseInt(e)) ? prevState : parseInt(e),
                      //     )
                      //   }
                      onKeyUp={(e) => {
                        e.preventDefault();
                        e.target.blur();
                      }}
                      type="number"
                    />
                  )}
                />
              </Col>
            </Row>
            <div className="mt-10 shadow p-5 overflow-y-scroll max-h-screen">
              {rooms && !loadingRooms && rooms.length > 0 ? (
                rooms?.map((room) => (
                  <div className="mb-5">
                    <RoomSelection
                      booking={booking}
                      type="SELECT_ROOM"
                      setRoomDetails={(val) => setValue('room_details', val)}
                      data={room}
                      image={room.images.map((e) => e.url)}
                    />
                  </div>
                ))
              ) : (
                <>
                  <Skeleton active />
                </>
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <BookingSummary booking={booking} />
          <div className="mt-4">
            <Button
              disabled={
                booking?.room_details?.length < 1 ||
                !booking?.customer ||
                !booking.dates ||
                booking.dates.length !== 2 ||
                !booking.no_guest
              }
              className="w-full bg-info"
              size="large"
              // onClick={() => navigate.push('/main/booking/review')}
            >
              <span className="text-white text-lg">Confirm</span>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookingCreate;
