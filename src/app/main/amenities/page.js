import MainAmenities from '@components/MainAmenities';
import MainContainer from '@components/MainContainer';
import MainHeader from '@components/MainHeader';

export const metadata = {
  title: 'Amenities',
  description: '...',
};

function AmenitiesPage(params) {
  return (
    <>
      <MainHeader title="Our Amenities" />
      <MainContainer>
        <div className="text-center mb-10">
          <span className="text-3xl text-center">
            Welcome to our charming and cozy accommodations, where we offer a
            range of delightful amenities to make your stay enjoyable and
            comfortable.
          </span>
        </div>

        <MainAmenities />
      </MainContainer>
    </>
  );
}

export default AmenitiesPage;
