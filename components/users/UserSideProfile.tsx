import useCurrentUser from "@/hooks/useCurrentUser";

interface UserSideProfileProps {
  userId: string;
}

const UserSideProfile: React.FC<UserSideProfileProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  // const { data: fetchedUser } = useUser(userId);

  return (
    <div className="border-b-[1px] border-gray-200 pb-4">
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