import { Button, Card } from 'antd';

const GuestDetails = ({ booking, showConfirmCancel }) => {
  const guest = booking?.guest;

  return (
    <Card
      title="Guest Details"
      extra={
        booking?.status === 'PENDING' ? (
          <Button onClick={showConfirmCancel} danger>
            Cancel Booking
          </Button>
        ) : null
      }
    >
      <div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Name:</span>
          <span>
            {guest?.first_name} {guest?.last_name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Phone Number:</span>
          <span>{guest?.contact_number}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Email:</span>
          <span>{guest?.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Address:</span>
          <span>{guest?.street_address}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Check-in:</span>
          <span>{new Date(booking?.check_in).toDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold mb-2">Check-out:</span>
          <span>{new Date(booking?.check_out).toDateString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default GuestDetails;
