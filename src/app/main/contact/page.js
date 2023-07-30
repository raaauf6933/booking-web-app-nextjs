import MainContact from '../components/MainContact';
import MainContainer from '../components/MainContainer';
import MainHeader from '../components/MainHeader';

export const metadata = {
  title: 'Contact',
  description: '...',
};

function ContactPage(params) {
  return (
    <>
      <MainHeader title="Contact" />
      <MainContainer>
        <MainContact />
      </MainContainer>
    </>
  );
}

export default ContactPage;
