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
    redirect("posts/");
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

export async function likeAction(prevState, formData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const postId = Number(formData.get("postId"));

  // Check if the user has already liked the post
  const { data: existingLike, error: fetchError } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", user.id)
    .eq("post_id", postId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.log(fetchError);
    return;
  }

  let result;  // Placeholder to return the data to update state

  if (existingLike) {
    // If the like exists, remove it
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", user.id)
      .eq("post_id", postId);

    if (deleteError) {
      console.log(deleteError);
      return { errors: { message: "Failed to remove like" } };
    } else {
      console.log("Like removed");
      result = { message: "Like removed", postId };  // Data to return
    }
  } else {
    // If the like doesn't exist, add it
    const { error: insertError, data: insertData } = await supabase
      .from("likes")
      .insert({ user_id: user.id, post_id: postId })
      .select()
      .single();

    if (insertError) {
      console.log(insertError);
      return { errors: { message: "Failed to add like" } };
    } else {
      console.log("Like added");
      result = { message: "Like added", postId, likeData: insertData };  // Data to return
    }
  }

  // Ensure the page is revalidated or updated
  revalidatePath(`/posts`, "layout");

  return result;  // Return the data you want
}



  
  
  

 

