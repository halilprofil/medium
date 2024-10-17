import { SavePost } from "./actions";
import { createClient } from "@/utils/supabase/server";

export default async function NewPost() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user.user_metadata.userName);
  return (
    <div className="new-text">
      <form action={SavePost}>
        <input type="hidden" name="userName" value={user.user_metadata.userName}></input>
        <input type="text" name="title" placeholder="Yazı Başlığı" />
        <br />
        <textarea name="content" id="" placeholder="Yazı içeriği"></textarea>
        <br />
        <button>Yazıyı paylaş</button>
      </form>
    </div>
  );
}
