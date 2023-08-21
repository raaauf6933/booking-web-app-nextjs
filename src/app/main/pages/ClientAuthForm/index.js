

"use client";
import LoginForm from '@main_components/LoginForm';
import { useClientAuth } from '../../context/auth/context';
import RegistartionForm from '@main_components/RegistrationForm';

const ClientAuthForm = (props) => {
  const {type} = props;
  const {login} = useClientAuth()

  const handleLogin = () => {
    login({
      email:"",
      password:""
    })
  }

  return (
    <>
      <div className="flex flex-wrap flex-row ">
        <div className="bg-black flex h-screen flex-1">
          <div className="w-2/4 mx-auto  my-auto">
            {type === "LOGIN" ? <LoginForm onLogin={handleLogin}/> : <RegistartionForm/>}
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

export default ClientAuthForm;
