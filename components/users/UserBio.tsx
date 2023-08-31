import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  // console.log("🚀 ~ file: UserBio.tsx:19 ~ fetchedUser:", fetchedUser)
  // console.log("🚀 ~ file: UserBio.tsx:19 ~ userId:", userId)

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt])


  return (
    <>
      <div className="pb-4 bg-white mb-4 rounded-b-xl border">
        <div className="flex justify-end p-2">
          {currentUser?.id === userId ? (
            <Button secondary label="Edit" onClick={editModal.onOpen} />
          ) : (
            <Button
              onClick={toggleFollow}
              label={isFollowing ? 'Unfollow' : 'Follow'}
              secondary={!isFollowing}
            />
            // outline={isFollowing}
          )}
        </div>
        <div className="mt-8 px-4">
          <div className="flex flex-col">
            <p className="text-black text-2xl font-semibold">
              {fetchedUser?.name}
            </p>
            <p className="text-md text-neutral-800">
              {fetchedUser?.title}
            </p>

          </div>
          <div className="flex flex-col mt-2">
            {
              (fetchedUser?.city || fetchedUser?.state) ?
                <p className="text-md text-neutral-500 text-sm">{fetchedUser?.city}, {fetchedUser?.state}</p> : null
            }
            <div
              className="
              mt-2
              flex 
              flex-row 
              items-center 
              gap-2 
              text-neutral-500
              text-sm
          ">
              <BiCalendar size={24} />
              <p>
                Joined {createdAt}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center mt-4 gap-6 text-sm">
            <div className="flex flex-row items-center gap-1">
              <p className="text-black">{fetchedUser?.followingIds?.length}</p>
              <p className="text-neutral-500">Following</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <p className="text-black">{fetchedUser?.followersCount || 0}</p>
              <p className="text-neutral-500">Followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mb-5 p-5 rounded-xl border">
        <p className="text-black text-xl font-semibold mb-2">
          Bio
        </p>
        <p className="text-black">
          {fetchedUser?.bio}
        </p>
      </div>
    </>
  );
}

export default UserBio;