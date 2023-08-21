import MainBody from '../../components/MainBody';
import MainContainer from '../../components/MainContainer';
import MainDatePicker from '../../components/MainDatePicker';
import MainHeader from '../../components/MainHeader';

export const metadata = {
  title: 'Home',
  description: '...',
};

export default function Home() {
  return (
    <>
      <MainHeader primary />
      <MainContainer>
        <MainDatePicker />
        <MainBody />
      </MainContainer>
    </>
  );
}
