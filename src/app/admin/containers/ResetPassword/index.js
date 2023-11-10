'use client';
import { Button, Card, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import usePost from '../../../hooks/usePost';
import { useParams } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const params = useParams();
  const user = jwtDecode(params?.id);


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
      url: '/auth/admin/reset-password',
      data: {
        id:user._id,
        password,
      },
    });
  };

  return (
    <div className="flex flex-1 bg-light">
      <div className="w-1/3 mx-auto my-auto shadow-lg rounded-lg">
        <Card>
          <div className="text-left mb-1">
            <span className="text-2xl">Reset Password</span>
          </div>
          <div className="mb-5">
            {isSuccess ? (
              <>
                {' '}
                <span className="text-black">
                  Your password has been successfully changed,{' '}
                </span>
                <span className="text-info">
                  <Link href="/admin/login">Go to Login?</Link>
                </span>
              </>
            ) : (
              <span className="text-base">Enter your new password.</span>
            )}
          </div>
          {isSuccess ? (
            <>
             
            </>
          ) : (
            <>
              {' '}
              <div className="flex flex-col justify-center items-center space-y-7">
                <Input
                  size="large"
                  placeholder="New Password"
                  prefix={<LockOutlined />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                />
                <Input
                  size="large"
                  placeholder="Confirm Password"
                  prefix={<LockOutlined />}
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  required
                  type="password"
                />
                <Button
                  size="large"
                  onClick={onSubmit}
                  disabled={!confirmedPassword || !password}
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

export default ResetPassword;
