'use client';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import usePost from '../../../hooks/usePost';
import jwtDecode from 'jwt-decode';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const params = useParams();
  const customer = jwtDecode(params?.id);

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
    if(password !== confirmPassword)
        return message.error('password and confirm password not match')
    requestPasswordReset({
      method: 'POST',
      url: '/auth/customer/reset-password',
      data: {
        id: customer._id,
        password,
      },
    });
  };

  return (
    <div className="bg-black flex h-screen flex-1">
      <div className="w-2/4 mx-auto  my-auto">
        <div className="text-3xl text-warning mb-1 text-left">
          <span>Reset Password</span>
        </div>
        <div></div>
        {isSuccess ? (
          <div className="mb-5">
            <span className="text-white">
              Your password has been successfully changed,{" "}
            </span>
            <span className='text-warning'>
            <Link href="/main/login">Go to Login?</Link>
            </span>
          </div>
        ) : (
          <>
            {' '}
            <div className="mb-5">
              <span className="text-white">Enter your new password.</span>
            </div>
            <div className="pb-2">
              <label className="text-white">New Password:</label>
              <Input
                className="p-3 text-md"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="pb-5">
              <label className="text-white">Confirm Password:</label>
              <Input
                className="p-3 text-md"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="w-full">
              <Button
                className="bg-warning border-black w-full py-3 h-1/6"
                onClick={onSubmit}
                disabled={!password || !confirmPassword}
              >
                <span className="text-white">Submit</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
