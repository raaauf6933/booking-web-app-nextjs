'use client';
import { Steps } from 'antd';
import MainContainer from '../../../components/MainContainer';
import { useRouter, usePathname } from 'next/navigation';

const description = 'This is a description.';

export default function Layout({ children }) {
  const router = usePathname();

  const getCurrentStep = () => {
    switch (router) {
      case '/main/booking/select_room':
        return 1;
      case '/main/booking/review':
        return 2;
      default:
        break;
    }
  };
  return (
    <>
      <MainContainer size="sm">
        <Steps
          current={getCurrentStep()}
          items={[
            {
              title: 'Pick Date',
              // description: "Choose Check-in an",
            },
            {
              title: 'Room Selection',
              //   description,
            },
            {
              title: 'Review',
              //   description,
            },
            {
              title: 'Confirmation',
              // description,
            },
          ]}
        />

        {children}
      </MainContainer>
    </>
  );
}
