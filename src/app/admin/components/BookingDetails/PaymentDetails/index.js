'use client';
import { Button, Card, Divider } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';

const PaymentDetails = ({ booking, setOpenModalDiscount }) => {
  const billing = booking?.billing;

  const handleGetNoNights = () => {
    const date1 = new Date(booking?.check_in);
    const date2 = new Date(booking?.check_out);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };


  return (
    <Card
      title="Payment Details"
      extra={
        (booking?.status === 'PENDING' || booking?.status === 'CONFIRMED') && (
          <Button
            disabled={billing?.discount?.amount}
            onClick={() => setOpenModalDiscount(true)}
          >
            {billing?.discount?.amount ? (
              <>
                <CheckOutlined /> Discount Applied
              </>
            ) : (
              <>
                <PlusOutlined /> Discount
              </>
            )}
          </Button>
        )
      }
    >
      <div>
        <div className="flex justify-between">
          <span>Sub-Total (rooms)</span>
          <span>
            {' '}
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(billing?.sub_total)}{' '}
            X {handleGetNoNights()} night(s)
          </span>
        </div>
        <div className="flex justify-between">
          <span>Additional Amount</span>
          <span>
            {' '}
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(billing?.additional_total)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>
            {' '}
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(billing?.discount?.amount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span>
            {' '}
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(billing?.total_amount)}
          </span>
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="font-bold">Captured Amount</span>
          <span>
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(booking?.payment_amount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Oustanding Balance</span>
          <span>
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(billing?.total_amount - booking?.payment_amount)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PaymentDetails;
