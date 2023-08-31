import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"
import Navigation from "@/components/Navigation"
import Button from "@/components/Button"
import { useCallback, useState } from "react"
import useCurrentUser from "@/hooks/useCurrentUser"

export default function Home() {
  const [following, setFollowing] = useState(false);
  const { data: currentUser } = useCurrentUser();

  const handleToggle = useCallback((type: string) => {
    if ('following') {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, []);

  return (
    <>
      {/* <Header label="Home" /> */}
      <Form placeholder="What do you want to talk about?" />
      <div className="flex justify-center mb-4">
        <div className="flex gap-2 mx-auto py-1 px-2 rounded bg-white">
          {
            currentUser ? <button className={`${following ? 'bg-gray-200' : null} py-1 px-2 rounded`} onClick={() => setFollowing(true)}>Following</button> : null
          }
          <button className={`${!following ? 'bg-gray-200' : null} py-1 px-2 rounded`} onClick={() => setFollowing(false)}>Global</button>
        </div>
      </div>
      <div>
        {
          following ?
            <PostFeed type="following" /> :
            <PostFeed />
        }
      </div>
    </>
  )
}
