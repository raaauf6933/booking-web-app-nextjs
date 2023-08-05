import { Button, Input } from 'antd';
import Link from 'next/link';

const Login = () => {
  return (
    <>
      <div className="flex flex-wrap flex-row ">
        <div className="bg-black flex h-screen flex-1">
          <div className="w-2/4 mx-auto  my-auto">
            <div className="text-3xl text-warning mb-5 text-center">
              <span>Welcome to Grand Villa Hotel</span>
            </div>
            <div className="pb-5">
              <label className="text-white">Enter Username/Email</label>
              <Input
                className="p-3 text-md"
                placeholder="Username or Email.."
              />
            </div>
            <div className="pb-5">
              <label className="text-white">Enter Password</label>
              <Input className="p-3 text-md" placeholder="Password..." />
            </div>
            <div className="w-full">
              <Button className="bg-warning border-black w-full py-3 h-1/6">
                <span className="text-white">Login</span>
              </Button>
            </div>

            <div className="mt-5 text-center">
              <span className="text-white mr-2">Don't have an account?</span>{' '}
              <Link href="/login" className="text-warning">
                Create New
              </Link>
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

export default Login;
