import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

interface UserSideProfileProps {
  userId: string;
}

const UserSideProfile: React.FC<UserSideProfileProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  // const { data: fetchedUser } = useUser(userId);

  return (
    <div className="border-b-[1px] border-gray-200 pb-4 w-[250px]">
      <div className="mt-8 px-4">
        <div className="flex flex-col text-center">
          <p className="text-black text-base font-semibold">
            {currentUser?.name}
          </p>
          <p className="text-xs text-neutral-500">
            {currentUser?.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSideProfile;