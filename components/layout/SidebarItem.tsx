import React, { useCallback } from 'react';
import { IconType } from "react-icons";
import { useRouter } from 'next/router';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center rounded-lg overflow-hidden">
      <div className="
        relative
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        cursor-pointer 
        lg:hidden
        hover:bg-gray-300
        ">
        {/* hover:bg-opacity-10  */}
        {/* hover:bg-slate-300  */}
        <Icon size={28} color="black" />
        {alert ? <BsDot className="text-blue-500 absolute -top-2 -left-2" size={32} /> : null}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-2 
        p-2
        cursor-pointer
        items-center
        w-full
        hover:bg-gray-300
      ">
        {/* hover:bg-opacity-10  */}
        {/* hover:bg-slate-300  */}
        <Icon size={18} color="black" className='' />
        <p className="hidden lg:block text-black text-base">
          {label}
        </p>
        {alert ? <BsDot className="text-blue-500 absolute -top-2 -left-2" size={32} /> : null}
      </div>
    </div>
  );
}

export default SidebarItem;