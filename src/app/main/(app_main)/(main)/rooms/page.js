import MainContainer from '../../components/MainContainer';
import MainHeader from '../../components/MainHeader';
import MainRoomCard from '../../components/MainRoomCard';

export const metadata = {
  title: 'Rooms',
  description: '...',
};

const SelectRoomPage = () => {
  return (
    <>
      <MainHeader title="Our Room" />
      <MainContainer>
        <div className="pb-8">
          <MainRoomCard image="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690474564/sut3gag8cjhwqajjxpts.jpg" />
        </div>
        <div className="pb-8">
          <MainRoomCard image="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690474563/pxroawxg7ktfu3ccfbpq.jpg" />
        </div>
        <div className="pb-8">
          <MainRoomCard image="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690474563/qmptobbacpb8quoc9ury.jpg" />
        </div>
        <div className="pb-8">
          <MainRoomCard image="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690474563/e3qiwrmbmtk8flbztltg.jpg" />
        </div>
        <div className="pb-8">
          <MainRoomCard image="https://res.cloudinary.com/dwnnnqffb/image/upload/v1690474563/sxbfhdstmtok6cmswajc.jpg" />
        </div>
      </MainContainer>
    </>
  );
};

export default SelectRoomPage;
