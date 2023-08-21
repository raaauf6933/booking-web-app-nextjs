'use client';
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Table,
  notification,
} from 'antd';
import usePost from '../../../hooks/usePost';
import useFetch from '../../../hooks/useFetch';
import ActionBar from '../../components/ActionBar';
import { useForm, Controller } from 'react-hook-form';
import { useRouter as navgiationRouter, useParams } from 'next/navigation';
import MultipleUpload from '../../components/MultipleUpload';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PlusCircleFilled } from '@ant-design/icons';

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

  const { handleSubmit, control, register, setValue, getValues } = useForm({
    defaultValues: {
      name: room_data?.data?.name || '',
    },
  });

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

  const [EditRoomType] = usePost({
    onComplete: () => {
      api['success']({
        message: 'Room Type Edited',
      });
      navigate.push('/admin/rooms_management');
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
      },
    });
  };

  const handleEdit = (data) => {
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

  return (
    <>
      {contextText}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card title="Room Type">
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
        <ActionBar disabled={uploadLoading || loading} okButtonType="submit" />
      </form>
      {router?.id ? (
        <Card rootClassName="mt-5" title="Rooms">
          <Table
            columns={[
              {
                title: 'Room No.',
                dataIndex: 'room_number',
                key: 'room_number',
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
      ) : null}
    </>
  );
};

export default RoomForm;
