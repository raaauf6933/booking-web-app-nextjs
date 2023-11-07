'use client';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import usePost from '../../../hooks/usePost';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [requestPasswordReset] = usePost({
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
      url: '/auth/customer/request-reset-password',
      data: {
        email,
      },
    });
  };

  return (
    <div className="bg-black flex h-screen flex-1">
      <div className="w-2/4 mx-auto  my-auto">
        <div className="text-3xl text-warning mb-1 text-left">
          <span>Forgot Password</span>
        </div>
        <div></div>
        {isSuccess ? (
          <div className="mb-5">
            <span className="text-white">
                We have sent you an email with link to reset your password. Thank you!
            </span>
          </div>
        ) : (
          <>
            {' '}
            <div className="mb-5">
              <span className="text-white">
                Enter your email to receive an email to reset your password.
              </span>
            </div>
            <div className="pb-5">
              <label className="text-white">Email:</label>
              <Input
                className="p-3 text-md"
                placeholder="ex. juandelacruz@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Button
                className="bg-warning border-black w-full py-3 h-1/6"
                onClick={onSubmit}
              >
                <span className="text-white">Send</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
