import { Card, Divider } from 'antd';

const PaymentDetails = () => {
  return (
    <Card title="Payment Details">
      <div>
        <div className="flex justify-between">
          <span>Sub-Total (rooms)</span>
          <span>PHP 1,200.00 X 3 night(s)</span>
        </div>
        <div className="flex justify-between">
          <span>Additional Amount</span>
          <span>PHP 1,200.00</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>PHP 0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span>PHP 3,600.00</span>
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
