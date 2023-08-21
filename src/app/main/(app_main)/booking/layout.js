'use client';
import { Steps } from 'antd';
import MainContainer from '../../components/MainContainer';

const description = 'This is a description.';

export default function Layout({ children }) {
  return (
    <>
      <MainContainer size="sm">
        <Steps
          current={1}
          items={[
            {
              title: 'Pick Date',
              //   description,
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
