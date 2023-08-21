import { Barlow_Condensed } from 'next/font/google';
import classNames from 'classnames';

const inter = {
  style: null,
};
//Barlow_Condensed({ weight: '100', subsets: ['latin'] });

const MainContainer = ({ children, size }) => {
  return (
    <main
      className={classNames(
        'flex flex-col px-10 py-10  h-fit',
        inter.className,
        {
          ['lg:px-64']: size === 'lg' || !size,
          ['lg:px-32']: size === 'sm',
        },
      )}
    >
      {children}
    </main>
  );
};

export default MainContainer;
