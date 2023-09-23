'use client';
import { Button, Input } from 'antd';
import Link from 'next/link';
import usePost from '../../../hooks/usePost';
import { Controller, useForm } from 'react-hook-form';
import { useRouter as navgiationRouter } from 'next/navigation';
import { useNotification } from '../../context/notification/context';

const RegistartionForm = () => {
  const { notif } = useNotification();
  const navigate = navgiationRouter();
  const [createCustomer, createCustomerOpts] = usePost({
    onComplete: () => {
      notif['success']({
        message: 'Success Create',
      });
      navigate.push('/main/login');
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
  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  const handleSubmitCustomer = (data) => {
    createCustomer({
      method: 'POST',
      url: '/customers/register',
      data,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitCustomer)}>
        <div className="text-3xl text-warning mb-3 text-center">
          <span>Sign up</span>
        </div>
        <div className="pb-3">
          <label className="text-white">First Name:</label>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-3 text-md"
                placeholder="Ex. Juan"
                required
              />
            )}
          />
        </div>
        <div className="pb-3">
          <label className="text-white">Last Name:</label>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-3 text-md"
                placeholder="Ex. Dela Cruz"
                required
              />
            )}
          />
        </div>
        <div className="pb-3">
          <label className="text-white">Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-3 text-md"
                placeholder="Ex. my-email@hotmail.com"
                required
                type="email"
              />
            )}
          />
        </div>
        <div className="pb-3">
          <label className="text-white">Address:</label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-3 text-md"
                placeholder="Enter your Street Address"
                required
              />
            )}
          />
        </div>
        <div className="pb-3">
          <label className="text-white">City:</label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-3 text-md"
                placeholder="Enter your city"
                required
              />
            )}
          />
        </div>
        <div className="pb-3">
          <label className="text-white">Contact Number:</label>
          <Controller
            name="contact_number"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-3 text-md"
                placeholder="Enter your phone or telephone number"
                required
              />
            )}
          />
        </div>
        <div className="pb-3">
          <label className="text-white">Enter Password:</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                minLength={6}
                type="password"
                className="p-3 text-md"
                placeholder="Password..."
                required
              />
            )}
          />
        </div>
        <div className="pb-3 mb-4">
          <label className="text-white">Confirm Password:</label>
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                minLength={6}
                type="password"
                className="p-3 text-md"
                placeholder="Confirm Password..."
                required
              />
            )}
          />
        </div>
        <div className="w-full">
          <Button
            className="bg-warning border-black w-full py-3 h-1/6"
            htmlType="submit"
            disabled={createCustomerOpts.loading}
          >
            <span className="text-white">Sign up</span>
          </Button>
        </div>
        <div className="mt-4 text-center">
          <span className="text-white mr-2">Already have an account?</span>{' '}
          <Link href="/main/login" className="text-warning">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegistartionForm;
