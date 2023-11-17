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
        {response?.data?.length >= 1 || response?.data?.filter((e)=> e?.rooms?.length >= 1)?.length >=1  ? (
          response?.data?.filter((e)=> e?.rooms?.length >= 1)?.sort((a,b)=> parseInt(a.room_rate) - parseInt(b.room_rate)).map((room) =>  {
            return (
              <div className="pb-8">
                <MainRoomCard
                  image={room?.images?.map((e) => e.url)}
                  data={{
                    room_rate: room.room_rate,
                    ...room,
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
