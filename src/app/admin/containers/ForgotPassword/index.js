'use client';
import React, { useState } from 'react';
import { Button, Card, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import usePost from '../../../hooks/usePost';
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [requestPasswordReset, requestPasswordResetOpts] = usePost({
    onComplete: () => {
      setIsSuccess(true);
    },
    onError: (e) => {
      if (e.response?.data?.code === 'USER_NO_FOUND') {
        message.error('Email not found!');

        return;
      } else {
        message.error('Something went wrong!');
      }
    },
  });
  const onSubmit = () => {
    requestPasswordReset({
      method: 'POST',
      url: '/auth/admin/request-reset-password',
      data: {
        email,
      },
    });
  };

  return (
    <div className="flex flex-1 bg-light">
      <div className="w-1/3 mx-auto my-auto shadow-lg rounded-lg">
        <Card>
          <div className="text-left mb-1">
            <span className="text-2xl">Forgot Password?</span>
          </div>
          <div className="mb-5">
            {isSuccess ? (
              <>
                {' '}
                <div className="text-base">
                  <span>
                    We have sent you an email with link to reset your password.
                    Thank you!
                  </span>
                </div>{' '}
              </>
            ) : (
              <span className="text-base">
                Enter your email to receive an email to reset your password.
              </span>
            )}
          </div>
          {isSuccess ? (
            <>
              <span className="text-dark">
                <Link href="/admin/login">Back to Login?</Link>
              </span>
            </>
          ) : (
            <>
              {' '}
              <div className="flex flex-col justify-center items-center space-y-7">
                <Input
                  size="large"
                  placeholder="Ex. juandelacruz@gmail.com"
                  prefix={<UserOutlined />}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  size="large"
                  onClick={onSubmit}
                  disabled={!email}
                  className="w-10/12 bg-info"
                  shape="round"
                  //   loading={loading}
                >
                  {' '}
                  <span className="text-white text-lg">Submit</span>
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
