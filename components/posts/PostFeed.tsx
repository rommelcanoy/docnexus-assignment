import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';
import { useEffect, useState } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';

interface PostFeedProps {
  userId?: string;
  type?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, type }) => {
  const { data: posts = [] } = usePosts(userId);
  const { data: currentUser } = useCurrentUser();
  const [formattedPosts, setFormattedPosts] = useState(posts);

  useEffect(() => {

    if (type === 'following') {
      const filteredPosts = posts.filter((post: any) => currentUser?.followingIds.includes(post.userId));
      // console.log('currentUser?.followingIds', currentUser?.followingIds);
      // console.log('posts', posts);
      setFormattedPosts(filteredPosts);

    } else {
      setFormattedPosts(posts);
    }

  }, [posts, type, userId, currentUser])


  return (
    <div className='flex flex-col gap-4'>
      {
        formattedPosts && formattedPosts.length > 0 ?
          formattedPosts.map((post: Record<string, any>,) => (
            <PostItem userId={userId} key={post.id} data={post} />
          ))
          :
          <div className='text-center'>No posts yet</div>
      }

    </div>
  );
};

export default PostFeed;
