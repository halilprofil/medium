"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import AddComment from "./addComment";
import { likeAction } from "@/app/(main)/new-post/actions";
import { useFormState } from "react-dom";
import PostLikes from "./PostLikes";
import PostComments from "./postComments";
import Link from "next/link";

export default function PostList() {
  const supabase = createClient();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [user, setUser] = useState(null);
  const [state, action] = useFormState(likeAction, {
    errors: {
      comment: null,
    },
  });

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function getPosts() {
      const response = await supabase.from("posts").select("*");
      setPosts([...response.data]);
    }

    getPosts();
  }, [state]);

  if (posts.length <= 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? (
        <div>
          <div className="post-container">
            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                 {/* Post Yazar Bilgisi */}
                 <p className="post-author">
                  {user.email ? `By ${user.email}` : "Unknown Author"}
                </p>


                {/* Post Kartı Başlığı */}
                <h2 className="post-title">{post.title || "Untitled Post"}</h2>

               

                {/* Post İçeriği */}
                <p className="post-content">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>

                {/* Beğeni Butonu ve Sayısı ve Yorum */}
                <form action={action} className="post-actions">
                  <input type="hidden" name="postId" value={post.id} />
                  <button type="submit" className="like-button">
                    Beğen
                  </button>
                  <PostLikes state={state} postId={post.id} />
                </form>
                <Link  href={`/posts/${post.id}`}><PostComments postId={post.id}/></Link>
              </div>
               
            ))}
           
          </div>

          

          {selectedPost && (
            <div>
              <dialog open={!!selectedPost}>
                <button onClick={() => setSelectedPost(null)}>X</button>
                <AddComment postId={selectedPost.id} />
                <p>{selectedPost.title ? selectedPost.title : "No title"}</p>
                <p>{selectedPost.content ? selectedPost.content : "No Content"}</p>
              </dialog>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
