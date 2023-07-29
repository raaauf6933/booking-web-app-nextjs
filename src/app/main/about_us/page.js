import MainAboutUs from '@components/MainAboutUs';
import MainContainer from '@components/MainContainer';
import MainHeader from '@components/MainHeader';

export const metadata = {
  title: 'About Us',
  description: '...',
};

function AboutUsPage(params) {
  return (
    <>
      <MainHeader title="About Us" />
      <MainContainer>
        <MainAboutUs />
      </MainContainer>
    </>
  );
}

export default AboutUsPage;
