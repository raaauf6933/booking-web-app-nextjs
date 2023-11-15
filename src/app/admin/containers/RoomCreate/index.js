'use client';
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Modal,
  notification,
  message,
  DatePicker,
  Checkbox,
} from 'antd';
import usePost from '../../../hooks/usePost';
import useFetch from '../../../hooks/useFetch';
import ActionBar from '../../components/ActionBar';
import { useForm, Controller } from 'react-hook-form';
import { useRouter as navgiationRouter, useParams } from 'next/navigation';
import MultipleUpload from '../../components/MultipleUpload';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  PlusCircleFilled,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import StatusTag from '../../components/StatusTag';
import commaNumber from 'comma-number';
const { confirm } = Modal;

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const RoomForm = () => {
  const navigate = navgiationRouter();
  const router = useParams();
  const [api, contextText] = notification.useNotification();
  const [uploadLoading, setUploadLoading] = useState(false);
  const {
    response: room_data,
    loading,
    error,
    refetch,
  } = useFetch(
    {
      url: '/room_types/room_type',
      method: 'POST',
      data: {
        id: router?.id,
      },
    },
    {
      skip: !router?.id,
    },
  );

  const { handleSubmit, control, register, setValue, getValues, watch } =
    useForm({
      defaultValues: {
        name: room_data?.data?.name || '',
      },
    });

  const roomType = watch();

  const {
    handleSubmit: submitRoom,
    control: controlRoom,
    reset: resetRoom,
  } = useForm();

  const [CreateRoomType] = usePost({
    onComplete: () => {
      api['success']({
        message: 'Room Type Created',
      });
      navigate.push('/admin/rooms_management');
    },
  });

  const [deleteRoomType, deleteRoomTypeOpts] = usePost({
    onComplete: () => {
      message.success('Room Deleted!');
      navigate.push('/admin/rooms_management');
    },
    onError: () => {
      message.error('Something went wrong');
    },
  });

  const [EditRoomType] = usePost({
    onComplete: () => {
      api['success']({
        message: 'Room Type Edited',
      });
      navigate.push('/admin/rooms_management');
    },
  });

  const [updateRoomStatus, updateRoomStatusOpts] = usePost({
    onComplete: () => {
      refetch();
    },
  });

  const [deleteRoom, deleteRoomOpts] = usePost({
    onComplete: () => {
      refetch();
    },
  });

  const [CreateRoom] = usePost({
    onComplete: () => refetch(),
  });

  const handleCreate = (data) => {
    CreateRoomType({
      method: 'POST',
      url: '/room_types/create_room_type',
      data: {
        name: data.name,
        no_bed: 1,
        no_person: data.no_person,
        no_bath: 1,
        isAircon: true,
        isKitchen: true,
        description: data.description,
        room_rate: data.room_rate,
        status: 'ACT',
        images: data.images,
        promo: {
          rate: 0,
          startDate: null,
          endDate: null,
        },
        isActivePromo: false,
      },
    });
  };

  const handleEdit = (data) => {
    if(roomType?.isActivePromo && !roomType?.promo_rate ){
      message.error("Room promo rate is required")
      return
    }else if(roomType?.isActivePromo && roomType.promo_date?.length < 2 ){
      message.error("Room promo period is required")
      return
    }

    EditRoomType({
      method: 'POST',
      url: '/room_types/update_room_type',
      data: {
        id: router?.id,
        data: {
          name: data.name,
          no_bed: 1,
          no_person: data.no_person,
          no_bath: 1,
          isAircon: true,
          isKitchen: true,
          description: data.description,
          room_rate: data.room_rate,
          status: 'ACT',
          images: data.images,
          ...(!router?.id
            ? {
                promo: {
                  rate: 0,
                  startDate: null,
                  endDate: null,
                },
                isActivePromo: false,
              }
            : {
                promo: {
                  rate: parseInt(data.promo_rate),
                  startDate: data.promo_date[0]
                    ? dayjs(data.promo_date[0]).format('YYYY-MM-DD')
                    : null,
                  endDate: data.promo_date[1]
                    ? dayjs(data.promo_date[1]).format('YYYY-MM-DD')
                    : null,
                },
                isActivePromo: data.isActivePromo,
              }),
        },
      },
    });
  };

  const onSubmit = router?.id ? handleEdit : handleCreate;

  useEffect(() => {
    if (room_data?.data && router?.id) {
      setValue('name', room_data?.data?.name);
      setValue('no_person', room_data?.data?.details.no_person);
      setValue('room_rate', room_data?.data?.room_rate);
      setValue('description', room_data?.data?.details.description);
      setValue('images', room_data?.data?.images);
      setValue('promo_rate', room_data?.data?.promo?.rate);
      setValue('isActivePromo', room_data?.data?.isActivePromo);
      setValue('promo_date', [
        dayjs(room_data?.data?.promo?.startDate),
        dayjs(room_data?.data?.promo?.endDate),
      ]);
    }
  }, [room_data]);

  if (error) {
    notFound();
  }

  const handleAddRooms = (data) => {
    CreateRoom({
      url: '/room_types/create_room',
      method: 'POST',
      data: {
        id: router?.id,
        room_number: data.room_number,
      },
    });

    resetRoom();
  };

  const showDeleteRoom = () => {
    confirm({
      title: 'Are you sure you want to delete this room?',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      okButtonProps: {
        className: 'bg-info',
      },
      okText: 'Yes',
      onOk() {
        deleteRoomType(
          {
            method: 'POST',
            url: '/room_types/delete_roomtype',
            data: {
              id: router?.id,
            },
          },
          // getToken(),
        );
      },
    });
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day');
  };

  useEffect(() => {
    if (!roomType?.isActivePromo) {
      setValue('promo_rate', 0);
      setValue('promo_date', []);
    }
  }, [roomType?.isActivePromo]);

  return (
    <>
      {contextText}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          title="Room Type"
          extra={
            <>
              <Button danger onClick={showDeleteRoom}>
                Delete Room
              </Button>
            </>
          }
        >
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="mb-1">
                <span className="text-opacity-70 text-black">
                  Room Type Name
                </span>
              </div>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    disabled={router?.id}
                    {...field}
                    size="large"
                    placeholder="ex. Deluxe Room"
                    required
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="mb-1">
                <span className="">Maximum of No. Person</span>
              </div>
              <Controller
                name="no_person"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    className="w-full"
                    min={1}
                    keyboard
                    {...field}
                    size="large"
                    placeholder="ex. 4"
                    required
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="mb-1">
                <span className="">Room Rate</span>
              </div>
              <Controller
                name="room_rate"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    prefix="PHP"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                    size="large"
                    placeholder="ex. 3,000"
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="mb-1">
                <span className="">Description</span>
              </div>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    rows={6}
                    autoSize={{ minRows: 6, maxRows: 6 }}
                    size="large"
                    multiple
                    placeholder="..."
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className="mb-1">
                <span className="">Images</span>
              </div>
              {loading ? null : (
                <MultipleUpload
                  {...register('images')}
                  name="images"
                  defaultValues={room_data?.data?.images}
                  onChange={(images) => setValue('images', images)}
                  getLoadingStatus={(isLoading) => {
                    setUploadLoading(isLoading);
                  }}
                />
              )}
            </Col>
          </Row>
        </Card>
        {router?.id && (
          <Card title="Room Promo" rootClassName="mt-5">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div className="mb-1">
                  <span className="">Promo Rate</span>
                </div>
                <Controller
                  name="promo_rate"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      disabled={!roomType?.isActivePromo}
                      addonBefore="PHP"
                      placeholder="Promo Rate"
                      size="large"
                      defaultValue={0}
                      formatter={(value) => commaNumber(parseInt(value || 0))}
                      className="w-full"
                    />
                  )}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div className="mb-1">
                  <span className="">Promo Period</span>
                </div>
                <Controller
                  name="promo_date"
                  control={control}
                  render={({ field }) => (
                    <RangePicker
                      {...field}
                      disabled={!roomType?.isActivePromo}
                      size="large"
                      disabledDate={disabledDate}
                      className="w-full"
                    />
                  )}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Controller
                  name="isActivePromo"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={roomType?.isActivePromo}>
                      Active
                    </Checkbox>
                  )}
                />
              </Col>
            </Row>
          </Card>
        )}

        <ActionBar
          okLabel="Save"
          disabled={uploadLoading || loading}
          okButtonType="submit"
        />
      </form>
      {router?.id ? (
        <>
          <Card rootClassName="mt-5" title="Rooms">
            <Table
              columns={[
                {
                  title: 'Room No.',
                  dataIndex: 'room_number',
                  key: 'room_number',
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (_, record) => (
                    <>
                      <Select
                        value={record.status}
                        loading={updateRoomStatusOpts.loading}
                        onChange={(e) => {
                          updateRoomStatus({
                            method: 'POST',
                            url: '/room_types/update_room_status',
                            data: {
                              roomTypeId: router?.id,
                              roomId: record._id,
                              status: e,
                            },
                          });
                        }}
                        placeholder="status"
                        options={[
                          {
                            label: 'Active',
                            value: 'ACT',
                          },
                          {
                            label: 'In-Active',
                            value: 'INACTIVE',
                          },
                        ]}
                      />
                    </>
                  ),
                },
                {
                  title: 'Action',
                  render: (_, record) => {
                    return (
                      <>
                        {' '}
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            deleteRoom({
                              method: 'POST',
                              url: '/room_types/delete_room',
                              data: {
                                id: router?.id,
                                room_id: record._id,
                              },
                            })
                          }
                        />
                      </>
                    );
                  },
                },
              ]}
              dataSource={room_data?.data?.rooms}
              pagination={false}
            />
            <form onSubmit={submitRoom(handleAddRooms)}>
              <div className="mt-4 flex flex-row justify-center items-center ">
                <Controller
                  name="room_number"
                  control={controlRoom}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="mr-5"
                      placeholder="Room Number"
                      size="large"
                      required
                    />
                  )}
                />
                <Button
                  size="large"
                  icon={<PlusCircleFilled />}
                  className="flex items-center"
                  htmlType="submit"
                >
                  Add Room
                </Button>
              </div>
            </form>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default RoomForm;
