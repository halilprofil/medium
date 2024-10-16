import AddComment from "@/components/main/addComment";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function PostDetailPage({ params }) {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select().eq("id", params.id).single();
  const { data: commentData, error: commentsError } = await supabase.from("comments").select("*").eq("post_id", params.id);
  if (!data) return notFound();
  return (
    <div>
      <h1>{data.title}</h1>
      <AddComment postId={data.id} />
      <div>
        {commentData.length !== 0
          ? commentData.map((comment) => {
              return (
                <div key={comment.id}>
                  <p>{comment.content}</p>
                </div>
              );
            })
          : "yok"}
      </div>
    </div>
  );
}
