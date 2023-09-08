import { Card, Divider } from 'antd';

const PaymentDetails = ({ booking }) => {
  const billing = booking?.billing;

  return (
    <Card title="Payment Details">
      <div>
        <div className="flex justify-between">
          <span>Sub-Total (rooms)</span>
          <span>
            {' '}
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(billing?.sub_total)}{' '}
            X 3 night(s)
          </span>
        </div>
        <div className="flex justify-between">
          <span>Additional Amount</span>
          <span>    {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(billing?.additional_total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>PHP 0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span>  {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(billing?.total_amount)}</span>
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="font-bold">Captured Amount</span>
          <span>PHP 0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Oustanding Balance</span>
          <span>PHP 0.00</span>
        </div>
      </div>
    </Card>
  );
};

export default PaymentDetails;
