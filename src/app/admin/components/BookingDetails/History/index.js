import { Timeline } from 'antd';
import { ClockCircleOutlined, FileImageOutlined } from '@ant-design/icons';

const History = ({ booking }) => {
  const eventType = (event, index) => {
    switch (event.type) {
      case 'BOOKING_CREATED':
        return {
          key: index,
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
      case 'CANCELLED':
        return {
          dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
          children: (
            <div className="flex justify-between">
              <span>
                Booking Canceled by <b>{event?.user}</b>
              </span>{' '}
              <span>
                {new Date(event?.created).toDateString()}{' '}
                {new Date(event?.created).toLocaleTimeString()}
              </span>
            </div>
          ),
          color: 'red',
        };
      case 'GUEST_IMAGE_UPLOAD':
        return {
          dot: <FileImageOutlined style={{ fontSize: '16px' }} />,
          children: (
            <div className="flex justify-between">
              <span>
                Guest uploaded an{' '}
                <a
                  className="text-info"
                  href={event?.images?.src}
                  target="_blank"
                >
                  Image
                </a>{' '}
                (click the image to see)
              </span>{' '}
              <span>
                {new Date(event?.created).toDateString()}{' '}
                {new Date(event?.created).toLocaleTimeString()}
              </span>
            </div>
          ),
          color: 'blue',
        };
      case 'UPDATE_STATUS':
        return {
          children: (
            <div className="flex justify-between">
              <span>{event?.message}</span>{' '}
              <span>
                {new Date(event?.created).toDateString()}{' '}
                {new Date(event?.created).toLocaleTimeString()}
              </span>
            </div>
          ),
        };
      case 'PAYMENT_CAPTURED':
        return {
          children: (
            <div className="flex justify-between">
              <span>
                {event?.message} - Amount:{' '}
                <b>
                  {' '}
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  }).format(event?.amount)}
                </b>
              </span>{' '}
              <span>
                {new Date(event?.created).toDateString()}{' '}
                {new Date(event?.created).toLocaleTimeString()}
              </span>
            </div>
          ),
        };
      case 'ADD_AMENITY':
        return {
          children: (
            <div className="flex justify-between">
              <span>
                {event?.user} added <b>{event?.additional_type}</b>
              </span>{' '}
              <span>
                {new Date(event?.created).toDateString()}{' '}
                {new Date(event?.created).toLocaleTimeString()}
              </span>
            </div>
          ),
        };
      // case "ADD_CHARGES":
      //   return <TimelineAdditionals event={event} date={event.created} />;
      // case "ADD_DISCOUNT":
      //   return <TimelineDiscount event={event} date={event.created} />;
       case "GUEST_MODIFY_BOOKING":
        return {
          children: (
            <div className="flex justify-between">
              <span>
                {event?.message}
              </span>{' '}
              <span>
                {new Date(event?.created).toDateString()}{' '}
                {new Date(event?.created).toLocaleTimeString()}
              </span>
            </div>
          ),
        };
      default:
        break;
    }
  };

  return (
    <Timeline
      items={booking?.events
        .slice()
        .reverse()
        .map((event, index) => {
          return eventType(event, index);
        })}
    />
  );
};

export default History;
