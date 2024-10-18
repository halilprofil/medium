"use client";
import { addCommentFormAction } from "@/app/(main)/new-post/actions";
import { createClient } from "@/utils/supabase/client";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";

export default function AddComment({ postId }) {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [state, action] = useFormState(addCommentFormAction, {
    errors: {
      comment: null,
    },
  });

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    fetchUser();
  }, []);

  return (
    <div>
      <form action={action}>
        <textarea name="comment" id=""></textarea>
        <input type="hidden" value={postId} name="postId" />
        {/* user_metadata mevcut olup olmadığını kontrol et */}
        {user && user.user_metadata && (
          <input
            type="hidden"
            value={user.user_metadata.userName || "Unknown"}
            name="userName"
          />
        )}
        {state && state.errors && <p>{state.errors.comment}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
