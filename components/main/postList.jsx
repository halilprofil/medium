"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import AddComment from "./addComment";
import { likeAction } from "@/app/(main)/new-post/actions";
import { useFormState } from "react-dom";
import PostLikes from "./PostLikes";

export default function PostList() {
  const supabase = createClient();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [user, setUser] = useState(null);
  const [state, action] = useFormState(likeAction, {
    errors: {
      comment: null,
    }
  });

  
  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }

    fetchUser();

    // Oturum değişikliklerini dinle
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user); // Kullanıcı oturum açtı
      } else if (event === 'SIGNED_OUT') {
        setUser(null); // Kullanıcı oturum kapattı
      }
    });

    // Temizlik işlemi (event listener'ı kaldır)
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
            {posts &&
              posts.map((post) => (
                <div
                  className="post-item"
                  key={post.id}
                >
                  {post.content}
                  <form action={action}>
                    <input type="hidden" name="postId" value={post.id} />
                    <button type="submit">Beğen</button>
                    <PostLikes state={state} postId={post.id} />
                  </form>
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
