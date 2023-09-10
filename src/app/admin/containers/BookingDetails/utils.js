import { getToken } from "../../context/auth/utils";

export const UpdateBookingStatus = (updateBooking, booking, paymentAmount) => {
  switch (booking?.status) {
    case 'PENDING':
      updateBooking({
        method: 'POST',
        url: '/booking/update_booking_status',
        data: {
          id: booking._id,
          status: booking?.status,
          paymentAmount,
        },
      },
      getToken()
      );
      break;
    case 'CONFIRMED':
      updateBooking({
        method: 'POST',
        url: '/booking/update_booking_status',
        data: {
          id: booking._id,
          status: booking?.status,
          paymentAmount,
        },
      },
      getToken()
      );
      case 'CHECK_IN':
        updateBooking({
          method: 'POST',
          url: '/booking/update_booking_status',
          data: {
            id: booking._id,
            status: booking?.status,
            paymentAmount,
          },
        },
        getToken()
        );
    default:
      break;
  }
};
