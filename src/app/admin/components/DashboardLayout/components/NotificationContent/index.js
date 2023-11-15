import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const NotificationContent = ({ notifications }) => {
  console.log(notifications);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState(notifications || []);
  useEffect(() => {
    //   fetch(fakeDataUrl)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       setInitLoading(false);
    //       setData(res.results);
    //       setList(res.results);
    //     });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    //   setList(
    //     data.concat(
    //       [...new Array(count)].map(() => ({
    //         loading: true,
    //         name: {},
    //         picture: {},
    //       })),
    //     ),
    //   );
    //   fetch(fakeDataUrl)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       const newData = data.concat(res.results);
    //       setData(newData);
    //       setList(newData);
    //       setLoading(false);
    //       // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //       // In real scene, you can using public method of react-virtualized:
    //       // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //       window.dispatchEvent(new Event('resize'));
    //     });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <div className="overflow-auto max-h-72">
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <span>
                  {item.guest?.first_name} -{' '}
                  <Link
                    className="text-info"
                    href={`/admin/bookings/${item.id}`}
                  >
                    {item.booking_reference}
                  </Link>
                </span>
              }
              description={item.message}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationContent;
