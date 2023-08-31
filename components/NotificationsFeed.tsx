import { BsLinkedin } from "react-icons/bs";
import docnexus from '@/public/images/docnexus.png'

import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import Image from "next/image";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-gray-200">
          <div className="bg-white rounded-full p-2 border">
            <Image src={docnexus} alt="DocNexus" className="w-6 h-6" />
          </div>
          {/* color="black" size={32} */}
          <p className="text-black">
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotificationsFeed;