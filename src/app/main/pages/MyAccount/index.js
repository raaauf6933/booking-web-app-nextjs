'use client';
import { useRouter } from 'next/navigation';
import MainContainer from '../../components/MainContainer';
import { useNotification } from '../../context/notification/context';
import usePost from '../../../hooks/usePost';
import useFetch from '../../../hooks/useFetch';
import { Button, Card, Col, Divider, Input, Row } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useClientAuth } from '../../context/auth/context';

const MyAccount = () => {
  const { user } = useClientAuth();
  const navigate = useRouter();
  const { notif } = useNotification();

  const { response } = useFetch(
    {
      method: 'GET',
      url: '/customers/customer',
      params: {
        id: user?._id,
      },
    },
    {
      skip: !user?._id,
    },
  );

  const [editCustomer, editCustomerOpts] = usePost({
    onComplete: () => {
      notif['success']({
        message: 'Success Edit',
      });
      navigate.push('/main/my_account/bookings');
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

  const { control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });

  const handleSubmitCustomer = (data) => {
    editCustomer({
      method: 'POST',
      url: '/customers/edit_customer',
      data: {
        ...data,
        id: user?._id,
      },
    });
  };

  useEffect(() => {
    if (response?.data && user?._id) {
      setValue('first_name', response?.data?.first_name);
      setValue('last_name', response?.data?.last_name);
      setValue('email', response?.data?.email);
      setValue('contact_number', response?.data?.contact_number);
      setValue('address', response?.data?.address?.address);
      setValue('city', response?.data?.address?.city);
    }
  }, [response]);

  return (
    <>
      <MainContainer>
        <div>
          <form onSubmit={handleSubmit(handleSubmitCustomer)}>
            <Card
              title="My Account"
              actions={[
                <div className="flex justify-end px-6">
                  <Button
                    htmlType="submit"
                    size="large"
                    loading={editCustomerOpts.loading}
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
                    name="contact_number"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Contact No."
                        size="large"
                        required
                      />
                    )}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Street Address"
                        size="large"
                        required
                      />
                    )}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="City"
                        size="large"
                        required
                      />
                    )}
                  />
                </Col>
                <Divider>Authentication</Divider>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Email"
                        size="large"
                        disabled={true}
                        required
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
                      />
                    )}
                  />
                </Col>
              </Row>
            </Card>
          </form>
        </div>
      </MainContainer>
    </>
  );
};

export default MyAccount;
