'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown } from 'antd';
import { useClientAuth } from '../../context/auth/context';
import logo from "@assets/image/resort_logo.png"

const inter = {
  style: null,
};
// Barlow_Condensed({
//   weight: ['100', '200', '300', '400', '700'],
//   subsets: ['latin'],
// });

const Navbar = () => {
  const pathname = usePathname();

  const { user, logout } = useClientAuth();

  return (
    <nav className="bg-black text-white border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="bg-black max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <a href="https://grandvillaresortandrestaurant.com/main" className="flex items-center">
          <img
            src={logo.src}
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
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
          {user ? (
            <>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 1,
                      label: <Link href="/main/my_account">My Account</Link>,
                    },
                    {
                      key: 2,
                      label: (
                        <Link href="/main/my_account/bookings">Bookings</Link>
                      ),
                    },
                    {
                      type: 'divider',
                    },
                    {
                      key: 3,
                      label: (
                        <button type="button">
                          <span className="text-danger">Sign out</span>
                        </button>
                      ),
                      onClick: logout,
                    },
                  ],
                }}
                placement="bottomCenter"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                  <button
                    type="button"
                    class="bg-warning text-white bg-blue-700 hover:bg-warning hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        {user?.first_name} {user?.last_name}
                      </span>{' '}
                      <CaretDownOutlined />
                    </div>
                  </button>
                </ul>
              </Dropdown>
            </>
          ) : (
            <>
              <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                <li>
                  <Link
                    href="/main/login"
                    className="bg-black bg-blue-700 hover:bg-blue-800 rounded-lg block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <div className="bg-warning text-white bg-blue-700 hover:bg-warning hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <li>
                    <Link
                      href="/main/register"
                      className=" bg-blue-700 hover:bg-blue-800 rounded-lg block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign Up
                    </Link>
                  </li>
                </div>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
