import { Tag } from 'antd';

const StatusTag = (props) => {
  const { status, type } = props;

  if (type === 'BOOKING') {
    switch (status) {
      case 'PENDING':
        return <Tag color="warning">Pending</Tag>;

      default:
        return <Tag></Tag>;
    }
  } else {
    switch (status) {
      case 'ACTIVE':
        return <Tag color="success">ACTIVE</Tag>;
      case 'INACTIVE':
        return <Tag color="error">IN-ACTIVE</Tag>;
      default:
        return <Tag></Tag>;
    }
  }
};

export default StatusTag;
