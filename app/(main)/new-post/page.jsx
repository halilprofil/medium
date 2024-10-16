import { SavePost } from "./actions";

export default function NewPost() {
  return (
    <div>
      <form action={SavePost}>
        <input type="text" name="title" placeholder="Yazı Başlığı" />
        <br />
        <textarea name="content" id="" placeholder="Yazı içeriği"></textarea>
        <br />
        <button>Yazıyı paylaş</button>
      </form>
    </div>
  );
}
