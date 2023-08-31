import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"
import Navigation from "@/components/Navigation"

export default function Home() {
  return (
    <>
      {/* <Header label="Home" /> */}
      <Form placeholder="What do you want to talk about?" />
      <PostFeed />
    </>
  )
}
