import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';

import Avatar from '../Avatar';
import { toast } from 'react-hot-toast';
// import useUser from '@/hooks/useUser';
import axios from 'axios';
import usePost from '@/hooks/usePost';
import usePosts from '@/hooks/usePosts';
import { FaTrashAlt } from 'react-icons/fa';
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  // const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const { mutate: mutateFetchedPost } = usePost(data.id);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
  const [isLoading, setIsLoading] = useState(false);
  // const [deleteId, setDeleteId] = useState('');

  // console.log('currentUser id', currentUser.id);
  // console.log('data id', data.userId);

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal, currentUser, toggleLike]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  const onDelete = useCallback(async (postId: string) => {

    const confirm = window.confirm("Are you sure you want to delete this post?");

    if (!confirm) {
      return;
    }

    try {
      setIsLoading(true);

      await axios.delete(`/api/posts/${postId}`);
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Deleted post successfully');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [mutateFetchedPost, mutateFetchedPosts]);

  return (
    <div className='relative'>
      {
        currentUser?.id === data.userId ?
          <button className={`absolute right-5 top-5 bg-gray-100 hover:bg-red-500 hover:text-white p-2 rounded text-gray-400 disabled:bg-red-300 disabled:text-white`}
            disabled={isLoading} onClick={() => onDelete(data.id)}>
            <FaTrashAlt className='w-3 h-3' />
          </button> : null
      }

      <div
        onClick={goToPost}
        className="
        p-5 
        cursor-pointer 
        hover:bg-gray-200
        transition
        bg-white
        rounded-xl
        overflow-hidden
        border
      ">
        <div className="flex flex-row items-start gap-3">
          <Avatar userId={data.user.id} />
          <div className='w-full'>
            <div className="flex flex-row items-center gap-2">
              <div className='flex flex-col w-full'>
                <p
                  onClick={goToUser}
                  className="
                text-black 
                font-semibold 
                cursor-pointer 
                hover:underline
                text-sm
            ">
                  {data.user.name}
                </p>
                <span
                  onClick={goToUser}
                  className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
                text-xs
            ">
                  {data.user.title}
                </span>
                <span className="text-neutral-500 text-xs">
                  {createdAt}
                </span>
              </div>

            </div>
            <div className="text-black mt-1">
              {data.body}
            </div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div
                className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-blue-500
            ">
                <AiOutlineMessage size={20} />
                <p>
                  {data.comments?.length || 0}
                </p>
              </div>
              <div
                onClick={onLike}
                className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
                <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
                <p>
                  {data.likedIds.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem;
