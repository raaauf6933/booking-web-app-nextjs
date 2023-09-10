import { LuLayoutDashboard } from 'react-icons/lu';
import { FaBed } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';
import { RiListSettingsLine } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';

export const AdminRoutes = [
  {
    label: 'Dashboard',
    icon: <LuLayoutDashboard />,
    url: '/admin',
  },
  {
    label: 'Bookings',
    icon: <CiBookmark />,
    url: '/admin/bookings',
  },
  {
    label: 'Rooms Management',
    icon: <FaBed />,
    url: '/admin/rooms_management',
  },
  {
    label: 'Customers',
    icon: <FiUsers />,
    url: '/admin/customers',
  },
  {
    label: 'Users Management',
    icon: <FiUsers />,
    url: '/admin/users',
  },
  {
    label: 'Configuration',
    icon: <RiListSettingsLine />,
    url: '/admin/configuration',
  },
];
