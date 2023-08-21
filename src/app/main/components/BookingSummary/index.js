import { Card, Divider } from 'antd';

const BookingSummary = () => {
  return (
    <Card title="Booking Summary" foo>
      <div className="flex flex-col">
        <span className="font-bold ">Check-in:</span>
        <span>8 August 2023, Tue - 2:00PM</span>
        <span className="font-bold ">Check-out:</span>
        <span>9 August 2023, Wed - 11:00AM (1 Nights)</span>
        <Divider />
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Room
                </th>
                <th scope="col" class="px-6 py-3">
                  Qty
                </th>
                <th scope="col" class="px-6 py-3">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Deluxe Room
                </th>
                <td class="px-6 py-4">1</td>
                <td class="px-6 py-4 whitespace-nowrap">PHP 799.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Divider />
        <div className="flex flex-col">
          <span className="font-bold">Breakdown</span>
          <div className="flex justify-between">
            <span className=" ">Sub-Total</span>
            <span>PHP 1,898.00 X 1 (Nights)</span>
          </div>
          <div className="flex justify-between">
            <span className=" ">Vatable Sale</span>
            <span>PHP 1,694.64</span>
          </div>
          <div className="flex justify-between">
            <span className=" ">VAT Amount</span>
            <span>PHP 203.36</span>
          </div>
        </div>
      </div>
      <Divider />
      <div className="text-center mt-3 flex flex-col text-xl">
        <span className="font-bold">BOOKING TOTAL</span>
        <span>PHP 1,898.00</span>
      </div>
    </Card>
  );
};

export default BookingSummary;
