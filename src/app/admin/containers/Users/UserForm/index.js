'use client';
import { useParams, useRouter } from 'next/navigation';
import useFetch from '../../../../hooks/useFetch';
import { Button, Card, Col, Divider, Input, Row, Select } from 'antd';
import Header from '../../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import usePost from '../../../../hooks/usePost';
import { useNotification } from '../../../../main/context/notification/context';
import { useEffect } from 'react';

const UserForm = () => {
  const params = useParams();
  const navigate = useRouter();
  const { notif } = useNotification();

  const isEdit = params?.id;

  const { response } = useFetch(
    {
      method: 'POST',
      url: '/user',
      data: {
        id: params?.id,
      },
    },
    {
      skip: !params?.id,
    },
  );

  const [createUser, createUserOpts] = usePost({
    onComplete: () => {
      notif['success']({
        message: 'Success Create',
      });
      navigate.push('/admin/users');
    },
    onError: (e) => {
      if (e?.response?.data?.message) {
        notif['error']({
          message: e.response.data.message,
        });
      } else {
        notif['error']({
          message: 'Internal Server Error',
        });
      }
    },
  });

  const [editUser, editUserOpts] = usePost({
    onComplete: () => {
      notif['success']({
        message: 'Success Edit',
      });
      navigate.push('/admin/users');
    },
    onError: (e) => {
      if (e?.response?.data?.message) {
        notif['error']({
          message: e.response.data.message,
        });
      } else {
        notif['error']({
          message: 'Internal Server Error',
        });
      }
    },
  });

  const { control, handleSubmit, setValue, getFieldState } = useForm();

  const handleSubmitUser = (data) => {
    if (!isEdit) {
      createUser({
        method: 'POST',
        url: '/user/create_user',
        data,
      });
    } else {
      editUser({
        method: 'POST',
        url: '/user/edit_user',
        data:{
            ...data,
            id: params?.id
        }
      });
    }
  };

  useEffect(() => {
    if (response?.data && params?.id) {
      setValue('first_name', response?.data?.first_name);
      setValue('last_name', response?.data?.last_name);
      setValue('email', response?.data?.email);
      setValue('user_type', response?.data?.user_type);
      setValue('username', response?.data?.username);
    }
  }, [response]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitUser)}>
        <Card
          title={isEdit ? `Edit User` : 'Create User'}
          actions={[
            <div className="flex justify-end px-6">
              <Button
                htmlType="submit"
                size="large"
                loading={createUserOpts.loading || editUserOpts.loading}
              >
                Save
              </Button>
            </div>,
          ]}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="First Name"
                    size="large"
                    required
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Last Name"
                    size="large"
                    required
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Controller
                name="user_type"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: 'ADMIN', label: 'ADMIN' },
                      { value: 'FRONT_DESK', label: 'FRONT DESK' },
                    ]}
                    size="large"
                    className="w-full"
                    placeholder="Role"
                    status={
                      getFieldState('user_type')?.error?.type === 'required'
                        ? 'error'
                        : null
                    }
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Email" size="large" />
                )}
              />
            </Col>
            <Divider>Authentication</Divider>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Username"
                    size="large"
                    disabled={isEdit}
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Password"
                    size="large"
                    required
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Confirm Password"
                    size="large"
                    required
                    htmlType="password"
                  />
                )}
              />
            </Col>
          </Row>
        </Card>
      </form>
    </div>
  );
};

export default UserForm;
