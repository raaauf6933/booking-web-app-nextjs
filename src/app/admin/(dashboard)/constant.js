import { LuLayoutDashboard } from 'react-icons/lu';
import { FaBed } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';
import { RiListSettingsLine } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import {BsFileEarmarkSpreadsheet} from "react-icons/bs"
export const AdminRoutes = [
  {
    label: 'Dashboard',
    icon: <LuLayoutDashboard />,
    url: '/admin',
    user_roles: ['ADMIN', 'FRONT_DESK'],
  },
  {
    label: 'Bookings',
    icon: <CiBookmark />,
    url: '/admin/bookings',
    user_roles: ['ADMIN', 'FRONT_DESK'],
  },
  {
    label: 'Rooms Management',
    icon: <FaBed />,
    url: '/admin/rooms_management',
    user_roles: ['ADMIN'],
  },
  {
    label: 'Customers',
    icon: <FiUsers />,
    url: '/admin/customers',
    user_roles: ['ADMIN'],
  },
  {
    label: 'Users Management',
    icon: <FiUsers />,
    url: '/admin/users',
    user_roles: ['ADMIN'],
  },
  {
    label: 'Reports',
    icon: <BsFileEarmarkSpreadsheet />,
    url: '/admin/reports',
    user_roles: ['ADMIN'],
  },
  {
    label: 'Configuration',
    icon: <RiListSettingsLine />,
    url: '/admin/configuration',
    user_roles: ['ADMIN'],
  },
];
