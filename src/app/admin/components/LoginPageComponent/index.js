'use client';
import { Button, Card, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAdminAuth } from '../../context/auth/context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


function LoginPageComponent(params) {

  const navigate = useRouter().push
  const [form,setForm] = useState({
    username:"",
    password:""
  })

  const { login, isAuthenticated } = useAdminAuth()
  const handleSubmit = async () => {

    login({
      username:form.username,
      password:form.password
    })
  };

  useEffect(()=> {
    if(isAuthenticated){
      navigate("/admin/bookings")
    }
  },[])

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
              onChange={(e)=> setForm(prevState => ({...prevState, username: e.target.value}))}
              required
            />
            <Input
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
              onChange={(e)=> setForm(prevState => ({...prevState, password: e.target.value}))}
              required
              type='password'
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
