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

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const BookingCreate = () => {
  const { control, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      dates: [dayjs().startOf('day'), dayjs().add(1, 'days').startOf('day')],
      room_details: [],
      guest_details: {
        first_name: '',
        last_name: '',
        email: '',
        contact_number: '',
        no_guest: 1,
        street_address: '',
        province: '',
        city: '',
      },
    },
  });

  const booking = watch();

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
                    <Input
                      {...field}
                      placeholder="customer"
                      size="large"
                      required
                    />
                  )}
                />
                <div className="mt-1">
                  <span className="opacity-70 text-xs">
                    First time guess?{' '}
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
                <InputNumber
                  defaultValue={1}
                  size="large"
                  className="w-full"
                  min={1}
                  max={10}
                  //   onChange={(e) =>
                  //     setNoGuest((prevState) =>
                  //       isNaN(parseInt(e)) ? prevState : parseInt(e),
                  //     )
                  //   }
                  // onKeyUp={(e) => {
                  //   e.preventDefault();
                  //   e.target.blur();
                  // }}
                  type="number"
                />
              </Col>
            </Row>
            <Table
              className="mt-5"
              loading={loadingRooms}
              dataSource={rooms}
              columns={[
                {
                  title: 'Room Type',
                  key: 'name',
                  dataIndex: 'name',
                },
                {
                  title: 'Rate',
                  key: 'room_rate',
                  dataIndex: 'room_rate',
                },
                {
                  title: 'No. Available',
                  key: 'no_available',
                  dataIndex: 'no_available',
                },
                {
                  title: 'Action',
                  render: (_, record) => (
                    <>
                      <Tooltip title="remove">
                        <Button
                          // disabled={disableRemove}
                          // onClick={handleRemoveRoom}
                          shape="circle"
                          icon={<MinusOutlined />}
                        />
                      </Tooltip>
                      <span className="text-base px-3">{1}</span>
                      <Tooltip title="add">
                        <Button
                          // disabled={disableAdd}
                          // onClick={handleAddRoom}
                          shape="circle"
                          icon={<PlusOutlined />}
                        />
                      </Tooltip>
                    </>
                  ),
                },
              ]}
            ></Table>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <BookingSummary booking={booking} />
        </Col>
      </Row>
    </div>
  );
};

export default BookingCreate;
