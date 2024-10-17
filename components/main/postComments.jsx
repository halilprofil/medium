"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function PostComments({ postId, state }) {
  const [comments, setComments] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchComments = async () => {
      const { data: fetchedComments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [postId, state]); // postId ve state değiştiğinde yeniden fetch et

  return (
      <h3>Yorumlar ({comments.length})</h3>
  )}

     
      
