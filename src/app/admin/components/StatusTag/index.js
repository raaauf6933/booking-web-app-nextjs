import { Tag } from 'antd';

const StatusTag = (props) => {
  const { status, type, className } = props;

  if (type === 'BOOKING') {
    switch (status) {
      case 'PENDING':
        return (
          <Tag className={className} color="warning">
            PENDING
          </Tag>
        );
      case 'CONFIRMED':
        return (
          <Tag className={className} color="cyan">
            CONFIRMED
          </Tag>
        );
      case 'CHECK_IN':
        return (
          <Tag className={className} color="success">
            CHECK-IN
          </Tag>
        );
      case 'CHECK_OUT':
        return (
          <Tag className={className} color="volcano">
            CHECK-OUT
          </Tag>
        );
      case 'CANCELLED':
        return (
          <Tag className={className} color="orange">
            CANCELLED
          </Tag>
        );
      case 'EXPIRED':
        return (
          <Tag className={className} color="error">
            EXPIRED
          </Tag>
        );

      default:
        return <Tag className={className}></Tag>;
    }
  } else {
    switch (status) {
      case 'ACTIVE':
        return (
          <Tag className={className} color="success">
            ACTIVE
          </Tag>
        );
      case 'ACT':
        return (
          <Tag className={className} color="success">
            ACTIVE
          </Tag>
        );
      case 'INACTIVE':
        return (
          <Tag className={className} color="error">
            IN-ACTIVE
          </Tag>
        );
      default:
        return <Tag className={className}></Tag>;
    }
  }
};

export default StatusTag;
