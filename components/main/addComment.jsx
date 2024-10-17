"use client";
import { addCommentFormAction } from "@/app/(main)/new-post/actions";

import { useFormState } from "react-dom";

export default function AddComment({ postId }) {
  const [state, action] = useFormState(addCommentFormAction, {
    errors: {
      comment: null,
    },
  });
  return (
    <div>
      <form action={action}>
        <textarea name="comment" id=""></textarea>
        <input type="hidden" value={postId} name="postId"></input>
        {state && state.errors && <p>{state.errors.comment}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
