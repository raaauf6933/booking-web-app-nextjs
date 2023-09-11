'use client';
import { useParams, useRouter } from 'next/navigation';
import useFetch from '../../../../hooks/useFetch';
import { Button, Card, Col, Divider, Input, Row } from 'antd';
import Header from '../../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import usePost from '../../../../hooks/usePost';
import { useNotification } from '../../../../main/context/notification/context';
import { useEffect } from 'react';

const CustomersForm = () => {
  const params = useParams();
  const navigate = useRouter();
  const { notif } = useNotification();

  const isEdit = params?.id;

  const { response } = useFetch(
    {
      method: 'GET',
      url: '/customers/customer',
      params: {
        id: params?.id,
      },
    },
    {
      skip: !params?.id,
    },
  );

  const [createCustomer, createCustomerOpts] = usePost({
    onComplete: () => {
      notif['success']({
        message: 'Success Create',
      });
      navigate.push('/admin/customers');
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


  const [editCustomer, editCustomerOpts] = usePost({
    onComplete: () => {
      notif['success']({
        message: 'Success Edit',
      });
      navigate.push('/admin/customers');
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
    if (!isEdit) {
      createCustomer({
        method: 'POST',
        url: '/customers/register',
        data,
      });
    }else{
      editCustomer({
        method: 'POST',
        url: '/customers/edit_customer',
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
      setValue('contact_number', response?.data?.contact_number);
      setValue('address', response?.data?.address?.address);
      setValue('city', response?.data?.address?.city);
    }
  }, [response]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitCustomer)}>
        <Card
          title={isEdit ? `Edit Customer` : "Create Customer"}
          actions={[
            <div className="flex justify-end px-6">
              <Button
                htmlType="submit"
                size="large"
                loading={createCustomerOpts.loading || editCustomerOpts.loading}
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
                  <Input {...field} placeholder="First Name" size="large" required />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Last Name" size="large" required />
                )}
              />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24}>
              <Controller
                name="contact_number"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Contact No." size="large" required />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Street Address" size="large" required />
                )}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="City" size="large"  required/>
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
                    disabled={isEdit}
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
                  <Input.Password {...field} placeholder="Password" size="large" required />
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
  );
};

export default CustomersForm;
