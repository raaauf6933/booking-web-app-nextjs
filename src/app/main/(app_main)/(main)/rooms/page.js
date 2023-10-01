'use client';
import { Empty } from 'antd';
import useFetch from '../../../../hooks/useFetch';
import MainContainer from '../../../components/MainContainer';
import MainHeader from '../../../components/MainHeader';
import MainRoomCard from '../../../components/MainRoomCard';

const SelectRoomPage = () => {
  const { response } = useFetch({
    method: 'GET',
    url: '/room_types',
  });

  const rooms = response?.data ? response.data : [];

  return (
    <>
      <MainHeader title="Our Room" />
      <MainContainer>
        {rooms && rooms?.length > 0 ? (
          rooms.map((e) => {
            return (
              <div className="pb-8">
                <MainRoomCard
                  image={e?.images?.map((e) => e.url)}
                  data={{
                    room_rate: e.room_rate,
                    ...e,
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="py-10">
            <Empty />
          </div>
        )}
      </MainContainer>
    </>
  );
};

export default SelectRoomPage;
