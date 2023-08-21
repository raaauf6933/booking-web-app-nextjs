'use client';
import { Button, Input } from 'antd';
import Link from 'next/link';

const RegistartionForm = () => {
  return (
    <>
    <div className="text-3xl text-warning mb-3 text-center">
        <span>Sign up</span>
      </div>
      <div className="pb-3">
        <label className="text-white">First Name:</label>
        <Input className="p-3 text-md" placeholder="Ex. Juan" />
      </div>
      <div className="pb-3">
        <label className="text-white">Last Name:</label>
        <Input className="p-3 text-md" placeholder="Ex. Dela Cruz" />
      </div>
      <div className="pb-3">
        <label className="text-white">Email:</label>
        <Input className="p-3 text-md" placeholder="Ex. my-email@hotmail.com" />
      </div>
      <div className="pb-3">
        <label className="text-white">Address:</label>
        <Input className="p-3 text-md" placeholder="Enter your Street Address" />
      </div>
      <div className="pb-3">
        <label className="text-white">City:</label>
        <Input className="p-3 text-md" placeholder="Enter your city" />
      </div>
      <div className="pb-3">
        <label className="text-white">Contact Number:</label>
        <Input className="p-3 text-md" placeholder="Enter your phone or telephone number" />
      </div>
      <div className="pb-3">
        <label className="text-white">Enter Password:</label>
        <Input className="p-3 text-md" placeholder="Password..." />
      </div>
      <div className="pb-3 mb-4">
        <label className="text-white">Confirm Password:</label>
        <Input className="p-3 text-md" placeholder="Confirm Password..." status='error'  />
      </div>
      <div className="w-full">
        <Button className="bg-warning border-black w-full py-3 h-1/6">
          <span className="text-white">Sign up</span>
        </Button>
      </div>
      <div className="mt-4 text-center">
        <span className="text-white mr-2">Already have an account?</span>{' '}
        <Link href="/main/login" className="text-warning">
         Login
        </Link>
      </div>
    </>
  );
};

export default RegistartionForm;
