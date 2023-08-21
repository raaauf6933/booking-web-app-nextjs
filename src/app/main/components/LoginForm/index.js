"use client";
import { Button, Input } from 'antd';
import Link from 'next/link';


const LoginForm = ({onLogin}) => {
  return (
    <>
      <div className="text-3xl text-warning mb-5 text-center">
        <span>Welcome to Grand Villa Hotel</span>
      </div>
      <div className="pb-5">
        <label className="text-white">Enter Username/Email</label>
        <Input className="p-3 text-md" placeholder="Username or Email.." />
      </div>
      <div className="pb-5">
        <label className="text-white">Enter Password</label>
        <Input className="p-3 text-md" placeholder="Password..." />
      </div>
      <div className="w-full">
        <Button
          className="bg-warning border-black w-full py-3 h-1/6"
          onClick={onLogin}
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
    </>
  );
};

export default LoginForm;
