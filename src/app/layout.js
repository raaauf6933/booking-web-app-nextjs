import './globals.css';

export const metadata = {
  title: 'Grand Villa Resort',
  description: '...',
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en" className="">
      <body>{children}</body>
    </html>
  );
};

export default MainLayout;
