'use client';
import { Button, Card, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';

function LoginPageComponent(params) {
  const handleSubmit = async () => {
    const result = await signIn();

    console.log(result);
  };

  return (
    <div className="flex flex-1 bg-light">
      <div className="w-1/3 mx-auto my-auto shadow-lg rounded-lg">
        <Card>
          <div className="text-center mb-5">
            <span className="text-2xl">Login to your account</span>
          </div>
          <div className="flex flex-col justify-center items-center space-y-7 mx-8">
            <Input
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
            />
            <Input
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
            <Button
              size="large"
              onClick={handleSubmit}
              className="w-10/12 bg-info"
              shape="round"
            >
              {' '}
              <span className="text-white text-lg">Login</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LoginPageComponent;
