import { Card, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const History = ({ booking }) => {

  const eventType = (event) => {
    switch (event.type) {
      case 'BOOKING_CREATED':
        return {
          children: (
            <div className="flex justify-between">
              <span>Booking Created</span>{' '}
              <span>
                {new Date(event?.created).toDateString()}{' '}
                {new Date(event?.created).toLocaleTimeString()}
              </span>
            </div>
          ),
        };
      case 'UPDATE_EXPIRED':
        return {
          dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
          children: (
            <div className="flex justify-between">
              <span>Booking Expired</span>{' '}
              <span>
                {new Date(event?.created).toDateString()}{' '}
                {new Date(event?.created).toLocaleTimeString()}
              </span>
            </div>
          ),
          color: 'red',
        };
      // case "CANCELLED":
      //   return <TimelineCancelled event={event} date={event.created} />;
      // case "GUEST_IMAGE_UPLOAD":
      //   return (
      //     <TimelineImage
      //       title="Booking Created"
      //       date={event.created}
      //       image={event?.images}
      //       showImage={showReceipt}
      //     />
      //   );
      // case "UPDATE_STATUS":
      //   return <TimelineEventsMessage event={event} date={event.created} />;
      // case "PAYMENT_CAPTURED":
      //   return <TimelinePayment event={event} date={event.created} />;
      // case "ADD_AMENITY":
      //   return <TimelineAdditionals event={event} date={event.created} />;
      // case "ADD_CHARGES":
      //   return <TimelineAdditionals event={event} date={event.created} />;
      // case "ADD_DISCOUNT":
      //   return <TimelineDiscount event={event} date={event.created} />;
      // case "GUEST_MODIFY_BOOKING":
      //   return <TimelineModify event={event} date={event.created} />;
      default:
        break;
    }
  };

  return (
    <Card title="Booking History">
      <Timeline
        items={
          booking?.events
            .slice()
            .reverse()
            .map((event) => {
              return eventType(event);
            })
        }
      />
    </Card>
  );
};

export default History;
