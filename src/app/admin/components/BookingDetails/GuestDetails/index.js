import { Card } from 'antd';

const GuestDetails = () => {
  return (
    <Card title="Guest Details">
      <div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Name:</span>
          <span>Stephen Curry</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Phone Number:</span>
          <span>09066000801</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Email:</span>
          <span>stephen.curry@gmail.com</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Address:</span>
          <span>#32 Fairlane</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Check-in:</span>
          <span>May 7, 2023 (Sun)</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Check-out:</span>
          <span>May 10, 2023 (Wed)</span>
        </div>
      </div>
    </Card>
  );
};

export default GuestDetails;
