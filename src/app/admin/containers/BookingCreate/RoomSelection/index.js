'use client';
import React from 'react';
import { Button, Col, Image, Row, Tooltip } from 'antd';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Barlow_Condensed } from 'next/font/google';
// import BookingContext from '../../context/booking/bookingContext';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';

const RoomSelection = (props) => {
  const { image, size, type, data, booking, setRoomDetails, variant } = props;

  const bookingState = booking;
  const { room_details: roomContext } = bookingState;

  const bookingDispatch = (payload) => {
    if (payload.type === 'ADD_ROOM') {
      const tempState = bookingState.room_details;
      tempState.push({ ...payload.payload });
      setRoomDetails(tempState);
    }

    if (payload.type === 'REMOVE_ROOM') {
      const tempRemove = bookingState.room_details.filter(
        (e) => payload.payload.room_id !== e.room_id,
      );
      setRoomDetails(tempRemove);
    }
  };

  const initialQty = () => {
    const roomContextData =
      roomContext &&
      roomContext.filter(({ roomtype_id }) => roomtype_id === data._id);
    return roomContextData.length ? roomContextData.length : 0;
  };

  const [qty, setQty] = useState(initialQty());
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableRemove, setDisableRemove] = useState(false);

  const handleAddRoom = () => {
    setQty((prevState) => (disableAdd ? prevState : prevState + 1));
    if (!disableAdd) {
      bookingDispatch({
        type: 'ADD_ROOM',
        payload: {
          room_id: data.rooms[qty]._id,
          roomtype_id: data._id,
          room_amount: data.room_rate,
          roomtype_name: data.name,
          room_num: data.rooms[qty].room_number,
          no_person: data.details.no_person,
        },
      });
    }
  };

  const handleRemoveRoom = () => {
    setQty((prevState) => (disableRemove ? prevState : prevState - 1));
    if (!disableRemove) {
      bookingDispatch({
        type: 'REMOVE_ROOM',
        payload: {
          room_id: data?.rooms[qty - 1]._id,
        },
      });
    }
  };

  const disableButtons = () => {
    setDisableAdd(false);
    setDisableRemove(false);

    if (data?.rooms.length !== 1) {
      if (qty < data?.rooms.length && qty !== 0) {
        setDisableAdd(false);
        setDisableRemove(false);
      } else if (qty === 0) {
        setDisableRemove(true);
      } else if (qty === data?.rooms.length) {
        setDisableAdd(true);
      }
    } else {
      setDisableRemove(true);
      setDisableAdd(true);
      if (qty === 1) {
        setDisableAdd(true);
        setDisableRemove(false);
      } else {
        setDisableRemove(true);
        setDisableAdd(false);
      }
    }

    if (data?.rooms.length === 0) {
      setDisableRemove(true);
      setDisableAdd(true);
    }
  };

  React.useEffect(() => {
    setQty(initialQty());
    disableButtons();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, data, roomContext]);

  React.useEffect(() => {
    disableButtons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, roomContext]);

  const ActionComponent = () => {
    if (type !== 'SELECT_ROOM') {
      return <></>;
    } else if (data.rooms.length === 0) {
      return (
        <>
          <span className="text-sm ">No Available Room</span>
        </>
      );
    } else {
      return (
        <div className="flex flex-row justify-between">
          <div>
            <span className="text-sm">
              Available Rooms: {data?.rooms.length}
            </span>
          </div>
          <div>
            <Tooltip title="remove">
              <Button
                disabled={disableRemove}
                onClick={handleRemoveRoom}
                shape="circle"
                icon={<MinusOutlined />}
              />
            </Tooltip>
            <span className="text-sm px-5">{qty}</span>
            <Tooltip title="add">
              <Button
                disabled={disableAdd}
                onClick={handleAddRoom}
                shape="circle"
                icon={<PlusOutlined />}
              />
            </Tooltip>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Row gutter={[24, 26]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="pb-5">
            {' '}
            <Image.PreviewGroup items={image}>
              <Image
                style={{
                  width: '30em',
                }}
                src={
                  image[0]
                    ? image[0]
                    : 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'
                }
                loading="eager"
              />
            </Image.PreviewGroup>{' '}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="flex flex-col justify-center w-full"
            //   style={inter.style}
          >
            <span className="text-base font-bold pb-3">{data?.name}</span>
            <div className="pb-4">
              <span className={`text-base font-extrabold ${variant ==="guest" ? 'text-warning': 'text-info'}`}>
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(data?.room_rate)}
              </span>
              <span className="text-base "> / Night</span>
            </div>
            <div className="pb-2 font-bold">
              <span className="text-sm ">Capacity</span>
              <span className="text-sm ">
                {' '}
                : Max Person {data?.details.no_person}
              </span>
            </div>
            <div className=" h-28 overflow-y-scroll mb-7">
              <p className="text-sm">{data?.details.description}</p>
            </div>
            <div>{ActionComponent()}</div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default RoomSelection;
