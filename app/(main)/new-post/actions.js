"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SavePost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error, data } = await supabase.from("posts").insert({ title, content, user_id: user.id }).select().single();

  if (error) {
    console.log(error);
  } else {
    console.log(data);
    redirect(`/posts/${data.id}`);
  }
}

export async function addCommentFormAction(prevState, formData) {
  const comment = formData.get("comment");
  const postId = Number(formData.get("postId"));
  console.log(typeof postId);
  const supabase = createClient();
  if (!comment) {
    return {
      errors: {
        comment: "yorum alanı boş olmaz",
      },
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error, data } = await supabase
    .from("comments")
    .insert({ content: comment, is_active: true, user_id: user.id, post_id: postId })
    .select()
    .single();

  revalidatePath(`/posts/${postId}`, "layout");
}
