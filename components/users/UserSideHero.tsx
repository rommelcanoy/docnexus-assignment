import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar"

interface UserSideHeroProps {
  userId: string;
}

const UserSideHero: React.FC<UserSideHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-16 relative w-full">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }} />
        )}
        <div className="absolute -bottom-[1.4rem] left-1/2 transform -translate-x-1/2">
          <Avatar userId={userId} hasBorder />
        </div>
      </div>
    </div>
  );
}

export default UserSideHero;