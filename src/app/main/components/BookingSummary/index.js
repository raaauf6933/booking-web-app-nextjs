import { Card, Divider } from 'antd';
import BookingContext from '../../context/booking/bookingContext';
import { useContext } from 'react';

const BookingSummary = () => {
  const { bookingState, bookingDispatch } = useContext(BookingContext);

  const handleGetNoNights = () => {
    const date1 = new Date(bookingState.check_in);
    const date2 = new Date(bookingState.check_out);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const getNoQuantity = (roomtype_id) => {
    return bookingState.room_details.filter(
      (obj) => obj.roomtype_id === roomtype_id,
    ).length;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const handleGetRooms = () => {
    const removeDuplicates = bookingState.room_details.filter(
      (v, i, a) => a.findIndex((t) => t.roomtype_id === v.roomtype_id) === i,
    );

    const countRooms = removeDuplicates.map((e) => {
      return {
        room_name: e.roomtype_name,
        rate: e.room_amount,
        qty: getNoQuantity(e.roomtype_id),
        amount: getRoomAmount(e.roomtype_id, e.room_amount),
      };
    });

    return countRooms;
  };

  const getSubTotal = () => {
    let total = 0;
    handleGetRooms().map((e) => (total += e.amount));
    return total;
  };

  const getTotalAmount = () => {
    return getSubTotal() * handleGetNoNights();
  };

  const handleVat = () => {
    const vatable_sales = getTotalAmount() / 1.12;
    const vat = getTotalAmount() - vatable_sales;

    return {
      vatable_sales,
      vat,
    };
  };

  return (
    <Card title="Booking Summary" foo>
      <div className="flex flex-col">
        <span className="font-bold ">Check-in:</span>
        <span>{new Date(bookingState.check_in).toDateString()} - 2:00PM</span>
        <span className="font-bold ">Check-out:</span>
        <span>
          {new Date(bookingState.check_out).toDateString()} - 11:00AM (
          {handleGetNoNights()} Nights)
        </span>
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
              {bookingState.room_details.map((e) => (
                <>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {e.roomtype_name}
                    </th>
                    <td class="px-6 py-4">1</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {' '}
                      {new Intl.NumberFormat('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(e.room_amount)}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Divider />
        <div className="flex flex-col">
          <span className="font-bold">Breakdown</span>
          <div className="flex justify-between">
            <span className=" ">Sub-Total</span>
            <span>
              {new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(getSubTotal())}{' '}
              X {handleGetNoNights()} (Nights)
            </span>
          </div>
          <div className="flex justify-between">
            <span className=" ">Vatable Sale</span>
            <span>
              {' '}
              {new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(handleVat().vatable_sales)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className=" ">VAT Amount</span>
            <span>
              {new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(handleVat().vat)}
            </span>
          </div>
        </div>
      </div>
      <Divider />
      <div className="text-center mt-3 flex flex-col text-xl">
        <span className="font-bold">BOOKING TOTAL</span>
        <span>
          {new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
          }).format(getTotalAmount())}
        </span>
      </div>
    </Card>
  );
};

export default BookingSummary;
