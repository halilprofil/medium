"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import AddComment from "./addComment";

export default function PostList() {
  const supabase = createClient();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    async function getPosts() {
      const response = await supabase.from("posts").select("*");

      setPosts([...response.data]);
    }

    getPosts();
  }, []);
  if (posts.length <= 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {posts &&
          posts.map((post) => (
            <li
              onClick={() => {
                setSelectedPost(post);
              }}
            >
              {post.content}
            </li>
          ))}
      </ul>
      {selectedPost && (
        <div>
          <dialog open={selectedPost ? true : false}>
            <button onClick={() => setSelectedPost(null)}>X</button>
            <AddComment postId={selectedPost.id} />
            <p>{selectedPost.title ? selectedPost.title : " No title"}</p>
            <p>{selectedPost.content ? selectedPost.content : " No Content"}</p>
          </dialog>
        </div>
      )}
    </div>
  );
}
