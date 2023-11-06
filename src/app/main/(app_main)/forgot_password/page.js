import { Button, Input } from 'antd';
import React from 'react';

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="flex flex-wrap flex-row ">
        <div className="bg-black flex h-screen flex-1">
          <div className="w-2/4 mx-auto  my-auto">
            <div className="text-3xl text-warning mb-1 text-left">
              <span>Forgot Password</span>
            </div>
            <div></div>
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
              />
            </div>
            <div className="w-full">
              <Button
                className="bg-warning border-black w-full py-3 h-1/6"
                htmlType="submit"
              >
                <span className="text-white">Send</span>
              </Button>
            </div>
          </div>
        </div>
        <div
          className="bg-white flex h-screen flex-1"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,166,0,1) 13%, rgba(114,74,0,1) 39%, rgba(0,0,0,1) 88%)',
          }}
        >
          <div className="w-2/4 mx-auto  my-auto">
            <div className="flex flex-col text-white opacity-70">
              <span className="text-3xl mb-6">
                We are more than just a Resort
              </span>
              <span className="text-md leading-7">
                Escape to a serene paradise at Grand Villa Resort, where
                simplicity and natural beauty intertwine. Our charming resort
                offers a peaceful retreat, perfect for those seeking a tranquil
                getaway amidst breathtaking landscapes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
