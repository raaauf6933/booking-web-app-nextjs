import { LuLayoutDashboard } from 'react-icons/lu';
import { FaBed } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';
import { RiListSettingsLine } from 'react-icons/ri';

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
    label: 'Configuration',
    icon: <RiListSettingsLine />,
    url: '/admin/configuration',
  },
];
