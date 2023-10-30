'use client';

import { Button, Card, Col, Row, Select, Statistic } from 'antd';
import React from 'react';
import { FaPesoSign, FaPeopleLine } from 'react-icons/fa6';
import { BsFillBookmarkFill, BsFillBookmarkCheckFill } from 'react-icons/bs';
import useFetch from '../../../hooks/useFetch';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Controller, useForm } from 'react-hook-form';
import usePost from '../../../hooks/usePost';
import {dd} from "./handlers"
import { message } from 'antd';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { useAdminAuth } from '../../context/auth/context';
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const { response } = useFetch({
    method: 'GET',
    url: '/reports/dashboard',
  });

  const dashboard = response?.data;

  const [fetchReports] = usePost({

  })

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      dates: [dayjs().startOf('day'), dayjs().add(1, 'days').startOf('day')],
      status: 'ALL',
    },
  });

  const reports = watch();

  const { user } = useAdminAuth()

  const onGenerateReports = async (formData) => {

    const result = await fetchReports({
      method: 'POST',
      url: '/reports/extract_report',
      data:{
        status: reports.status,
        from: reports.dates[0].toDate(),
        to: reports.dates[1].toDate()
      },
    })

    if(result?.data?.bookings?.length === 0){

      message.info(
        `No records found`,
      );
      return;
    }

    pdfMake.createPdf(dd(result.data, reports, user)).open();
  };

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic
              prefix={<BsFillBookmarkFill />}
              title="Bookings Today"
              value={dashboard?.new_booking}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic
              prefix={<BsFillBookmarkFill />}
              title="Pending Bookings"
              value={dashboard?.pending_booking}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic
              prefix={<BsFillBookmarkCheckFill />}
              title="Confirmed Bookings"
              value={dashboard?.confirmed_booking}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic
              prefix={<FaPeopleLine />}
              title="Check In's"
              value={dashboard?.check_ins}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card>
            <Statistic
              prefix={<FaPesoSign />}
              title="Sales Today"
              value={dashboard?.sales_today}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card title="Booking Reports">
            <div>
              <form onSubmit={handleSubmit(onGenerateReports)}>
                <div className="flex flex-col">
                  <Controller
                    name="dates"
                    control={control}
                    render={({ field }) => (
                      <RangePicker
                        {...field}
                        size="large"
                        // disabledDate={disabledDate}
                        className="w-full mb-5"
                        allowClear
                      />
                    )}
                  />
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        size="large"
                        {...field}
                        // disabledDate={disabledDate}
                        placeholder="Booking Status"
                        className="w-full"
                        options={[
                          {
                            label: 'All Bookings',
                            value: 'ALL',
                          },
                          {
                            label: 'Pending',
                            value: 'PENDING',
                          },
                          {
                            label: 'Reserved',
                            value: 'RESERVED',
                          },
                          {
                            label: 'Check-In',
                            value: 'CHECK_IN',
                          },
                          {
                            label: 'Checkout',
                            value: 'CHECK_OUT',
                          },
                          {
                            label: 'Cancelled',
                            value: 'CANCELLED',
                          },
                        ]}
                      />
                    )}
                  />
                </div>

                <div className="text-center mt-5">
                  <Button size="large" htmlType="submit">
                    Generate
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
