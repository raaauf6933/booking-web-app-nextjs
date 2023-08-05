import { Tag } from 'antd';

const StatusTag = (props) => {
  const { status, type, className } = props;

  if (type === 'BOOKING') {
    switch (status) {
      case 'PENDING':
        return (
          <Tag className={className} color="warning">
            Pending
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