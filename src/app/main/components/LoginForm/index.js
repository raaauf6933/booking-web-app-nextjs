'use client';
import { Button, Input } from 'antd';
import Link from 'next/link';
import { useClientAuth } from '../../context/auth/context';
import { Controller, useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookingContext from '../../context/booking/bookingContext';

const LoginForm = () => {
  const navigate = useRouter();
  const { control, handleSubmit } = useForm();
  const { login, loading, isAuthenticated } = useClientAuth({});
  const { bookingState } = useContext(BookingContext);

  const handleLogin = (data) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isAuthenticated && bookingState?.room_details?.length >= 1) {
      navigate.push('/main/booking/review');
      return () => null;
    }
    if (isAuthenticated) {
      navigate.push('/main/my_account/bookings');

      return;
    }
  }, [isAuthenticated]);

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="text-3xl text-warning mb-5 text-center">
          <span>Welcome to Grand Villa Hotel</span>
        </div>
        <div className="pb-5">
          <label className="text-white">Enter Username/Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-3 text-md"
                placeholder="Email.."
                required
              />
            )}
          />
        </div>
        <div className="pb-5">
          <label className="text-white">Enter Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="p-3 text-md"
                placeholder="Password..."
                type="password"
                required
              />
            )}
          />
        </div>
        <div className="w-full">
          <Button
            className="bg-warning border-black w-full py-3 h-1/6"
            htmlType="submit"
            loading={loading}
          >
            <span className="text-white">Login</span>
          </Button>
        </div>

        <div className="mt-5 text-center">
          <span className="text-white mr-2">Don't have an account?</span>{' '}
          <Link href="/main/register" className="text-warning">
            Create New
          </Link>
        </div>
        <div className="mt-1 text-center">
          <span className="text-white mr-2">Forget Password?</span>{' '}
          <Link href="/main/forgot_password" className="text-warning">
            Reset Password
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
