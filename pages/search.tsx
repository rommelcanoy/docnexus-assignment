import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";
import useUsers from "@/hooks/useUsers";
import Fuse from "fuse.js";
import router, { useRouter } from "next/router";
import { useCallback, useState } from "react";

const categories = ['Name', 'Title', 'City', 'State']

const Search = () => {
  const { data: users = [] } = useUsers();
  const [input, setInput] = useState<any>(users);
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const editModal = useEditModal();
  const [userId, setUserId] = useState('');
  // const { isFollowing, toggleFollow } = useFollow(userId);

  // const handleFollow = useCallback((userId: any) => {
  //   console.log('userId', userId);
  //   setUserId(userId);
  //   toggleFollow();

  // }, [toggleFollow]);

  const handleSearch = (event: any) => {
    const { value } = event.target;
    if (value.length === 0) {
      setInput(users);
      return;
    }

    const fuse = new Fuse(users, {
      keys: ['name', 'title', 'city', 'state'],
    });

    const results = fuse.search(value);
    const items: any = results.map((result) => result.item);
    setInput(items);
  };

  const onClick = useCallback((event: any, userId: any) => {
    event.stopPropagation();

    const url = `/users/${userId}`;

    router.push(url);
  }, [router]);

  return (
    <>
      <Header label="Search" />

      <div className="flex mb-5">
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only">Your Email</label>
        {/* <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900
           bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none
            focus:ring-gray-100" type="button">All categories <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg></button>
        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            {
              categories.map((category, index) => (
                <li key={index}>
                  <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">{category}</button>
                </li>
              ))
            }
          </ul>
        </div> */}
        <div className="relative w-full">
          {/* <input type="search" id="search-dropdown" onChange={handleSearch} className="outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search users" required /> */}
          <input type="search" id="search-dropdown" onChange={handleSearch} className="outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-l-lg" placeholder="Search users" required />
          <button type="button" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-500 rounded-r-lg border border-blue-600 hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {input?.map((user: any) => (
          <div key={user.id} className="flex flex-row gap-4 bg-white p-3 rounded-xl border hover:bg-gray-50 cursor-pointer transition" onClick={(e) => onClick(e, user.id)}>
            <Avatar userId={user.id} />
            <div className="flex flex-col">
              <p className="text-black font-semibold text-base">{user.name}</p>
              <p className="text-neutral-700 text-sm">{user.title ? user.title : `@${user.username}`}</p>
              {
                (user?.city || user?.state) ?
                  <p className="text-neutral-400 text-sm">{user.city}, {user.state}</p> : null
              }
            </div>
            {/* <div className="flex justify-end p-2">
              {currentUser?.id === user.id ? (
                <Button secondary label="Edit" onClick={editModal.onOpen} />
              ) : (
                <Button
                  onClick={() => handleFollow(user.id)}
                  label={isFollowing ? 'Unfollow' : 'Follow'}
                  secondary={!isFollowing}
                />
                // outline={isFollowing}
              )}
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;