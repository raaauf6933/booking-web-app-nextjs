'use client';
import React, { useEffect, useState } from 'react';
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
  message
} from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from 'antd';
import Link from 'next/link';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { useParams, useRouter } from 'next/navigation';
import useFetch from '../../../hooks/useFetch';
import usePost from '../../../hooks/usePost';
import Header from '../../../admin/components/Header';
import BookingSummary from '../../../admin/containers/BookingCreate/BookingSummary';
import RoomSelection from '../../../admin/containers/BookingCreate/RoomSelection';
import MainContainer from '@main_components/MainContainer';
import { useClientAuth } from '../../context/auth/context';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const RebookingPage = () => {
  const navigate = useRouter();
  const params = useParams();
  const { user } = useClientAuth();
  const [totalAmount, setTotalAmount] = useState()
  const { control, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      dates: [dayjs().startOf('day'), dayjs().add(1, 'days').startOf('day')],
      room_details: [],
      customer: user?._id,
      no_guest: 1,
    },
  });

  const booking = watch();

  const { response:currentBookingResponse} = useFetch({
    method: "POST",
    url: "/booking/booking",
    data: {
        id:params?.id
    }
  })

  const currentBooking = currentBookingResponse?.data


  const { response, loading: loadingRooms, refetch: refetchRooms } = useFetch(
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
        noGuest: currentBooking?.guest?.no_guest
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

  const [createBooking, createBookingOpts] = usePost({
    onComplete: () => {
      message.success("Booking has been successfully Modified!");
      navigate.push(`/main/my_account/bookings/${params.id}`)
      
    },
    onError: () => {
      message.error("Something went wrong..");
    },
  });

  const onSubmit = (e) => {
    const data = {
      ...e,
      check_in: dayjs(e.dates[0]).format('YYYY-MM-DD'),
      check_out: dayjs(e.dates[1]).format('YYYY-MM-DD'),
      rooms: e.room_details,
      totalAmount,
      id: params?.id
    };

    console.log(data)
    createBooking({
      method: 'POST',
      url: '/booking/guest_modify_booking',
      data:data
    });
  };


  useEffect(()=> {
    if(currentBooking){
        setValue("dates", [dayjs(currentBooking?.check_in), dayjs(currentBooking?.check_out)])
    }
    refetchRooms()
  },[currentBooking])
  
  return (
    <div>
            <MainContainer>
      <Header title="Booking Form" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <Card className="">
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={24} lg={24}>
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
              </Row>
              <div className="mt-10 shadow p-5 overflow-y-scroll max-h-screen">
                {rooms && !loadingRooms && rooms.length > 0 ? (
                  rooms?.filter((e)=> e.rooms?.length >= 1)?.map((room) => (
                    <div className="mb-5">
                      <RoomSelection
                        booking={booking}
                        type="SELECT_ROOM"
                        setRoomDetails={(val) => setValue('room_details', val)}
                        data={room}
                        image={room.images.map((e) => e.url)}
                        variant="guest"
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
            <BookingSummary booking={booking} setTotalAmount={setTotalAmount} variant="guest" />
            <div className="mt-4">
              <Button
                disabled={
                  booking?.room_details?.length < 1 ||
                  !booking?.customer ||
                  !booking.dates ||
                  booking.dates.length !== 2 ||
                  !booking.no_guest ||
                  createBookingOpts.loading
                }
                className="w-full bg-warning"
                size="large"
                htmlType="submit"
              >
                <span className="text-white text-lg">Confirm</span>
              </Button>
            </div>
          </Col>
        </Row>
      </form>
      </MainContainer>
    </div>
  );
};

export default RebookingPage;
