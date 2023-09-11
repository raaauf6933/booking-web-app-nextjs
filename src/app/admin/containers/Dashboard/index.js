'use client';

import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import { FaPesoSign, FaPeopleLine } from "react-icons/fa6"
import {BsFillBookmarkFill, BsFillBookmarkCheckFill } from "react-icons/bs"
import useFetch from '../../../hooks/useFetch';

const Dashboard = () => {

  const { response } = useFetch({
    method: "GET",
    url: "/reports/dashboard"
  });

  const dashboard = response?.data

  return (
    <>
      <Row gutter={[24,24]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic prefix={<BsFillBookmarkFill/>} title="Bookings Today" value={dashboard?.new_booking} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic  prefix={<BsFillBookmarkFill/>} title="Pending Bookings" value={dashboard?.pending_booking} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic prefix={<BsFillBookmarkCheckFill/>}  title="Confirmed Bookings" value={dashboard?.confirmed_booking} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic prefix={<FaPeopleLine/>} title="Check In's" value={dashboard?.check_ins} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card>
            <Statistic prefix={<FaPesoSign/>} title="Sales Today" value={dashboard?.sales_today} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
