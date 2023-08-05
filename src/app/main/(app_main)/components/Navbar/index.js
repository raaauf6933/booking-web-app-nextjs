import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Barlow_Condensed } from 'next/font/google';

const inter = Barlow_Condensed({
  weight: ['100', '200', '300', '400', '700'],
  subsets: ['latin'],
});

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="bg-black max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <a href="https://flowbite.com/" className="flex items-center">
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          /> */}
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap text-warning c dark:text-white"
            style={inter.style}
          >
            Grand Villa Resort
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="bg-black hidden w-full md:block md:w-auto">
          <ul className="bg-black font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li className="bg-black">
              <Link
                href="/main"
                className={`bg-black block py-2 pl-3 pr-4 ${
                  pathname === '/main' ? 'text-warning' : 'text-white'
                } rounded md:bg-transparent md:text-blue-700 md:p-0 `}
              >
                Home
              </Link>
            </li>
            <li className="bg-black">
              <Link
                href="/main/rooms"
                className={`bg-black block py-2 pl-3 pr-4 ${
                  pathname === '/main/rooms' ? 'text-warning' : 'text-white'
                } rounded md:bg-transparent md:text-blue-700 md:p-0 `}
              >
                Rooms
              </Link>
            </li>
            <li className="bg-black">
              <Link
                href="/main/amenities"
                className={`bg-black block py-2 pl-3 pr-4 ${
                  pathname === '/main/amenities' ? 'text-warning' : 'text-white'
                } rounded md:bg-transparent md:text-blue-700 md:p-0 `}
              >
                Amenities
              </Link>
            </li>
            <li className="bg-black">
              <Link
                href="/main/about_us"
                className={`bg-black block py-2 pl-3 pr-4 ${
                  pathname === '/main/about_us' ? 'text-warning' : 'text-white'
                } rounded md:bg-transparent md:text-blue-700 md:p-0 `}
              >
                About Us
              </Link>
            </li>
            <li className="bg-black">
              <Link
                href="/main/contact"
                className={`bg-black block py-2 pl-3 pr-4 ${
                  pathname === '/main/contact' ? 'text-warning' : 'text-white'
                } rounded md:bg-transparent md:text-blue-700 md:p-0 `}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-black hidden w-full md:block md:w-auto">
          <ul className="bg-black font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                href="/main/client/login"
                className="bg-black bg-blue-700 hover:bg-blue-800 rounded-lg block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
