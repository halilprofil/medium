"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";


export default function PostLikes({ postId,state }) {
const [likes , setLikes] = useState([]);
const supabase = createClient();

 useEffect(()=>{
    const handleLike = async () => {
        const { data: existingLike, error: fetchError } = await supabase
          .from('likes')
          .select('*') 
          .eq('post_id', postId)
          console.log(existingLike)
          if(existingLike){
            setLikes([...existingLike]);

          }
          console.log(likes)
    
        }
    handleLike();

 },[state])

 return(
    <>
     {
     likes && <p>{likes.length}</p>
    }
    </>
   
 )



}
