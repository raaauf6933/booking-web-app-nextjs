import { Barlow_Condensed } from 'next/font/google';
import classNames from 'classnames';

const inter = Barlow_Condensed({ weight: '100', subsets: ['latin'] });

const MainContainer = ({ children }) => {
  return (
    <main
      className={classNames(
        'flex flex-col px-10 lg:px-64 py-10 ',
        inter.className,
      )}
    >
      {children}
    </main>
  );
};

export default MainContainer;
