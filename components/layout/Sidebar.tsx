import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarPostButton from './SidebarPostButton';
import UserSideProfile from '../users/UserSideProfile';
import UserSideHero from '../users/UserSideHero';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    // {
    //   icon: BsBellFill,
    //   label: 'Notifications',
    //   href: '/notifications',
    //   auth: true,
    //   alert: currentUser?.hasNotification
    // },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ]

  return (
    <div className="col-span-1 mb-auto mr-4 md:mr-6 bg-white border mt-5 rounded-xl overflow-hidden">
      <div className="hidden md:block">
        {
          currentUser ? <>
            <UserSideHero userId={currentUser.id} />
            <UserSideProfile userId={currentUser.id} />
          </>
            :
            <></>
        }
      </div>
      <div className="">
        <div className="space-y-2 text-black p-5 ">
          {/* <SidebarLogo /> */}
          {items.map((item) => (
            // alert={item.alert}
            <SidebarItem
              key={item.href}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
          <SidebarPostButton />
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
