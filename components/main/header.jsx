import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOut } from "@/app/login/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export default async function MainHeader() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  return (
    <header>
      <div className="Header">
        <div className="header-left-content">
          <p>Medium</p>
          <input type="text" placeholder="🔍 Search" />
        </div>
        <div className="header-right-content">
          <div>
            <Link href="/new-post"> <FontAwesomeIcon icon={faPenToSquare} width={40} height={40} /></Link>
            <p>Write</p>
          </div>
          <p>
            <FontAwesomeIcon icon={faBell} width={40} height={40} />
          </p>
          <button>P</button>
        </div>
      </div>

      {user ? (
        <ul>
          <li> Hoşgeldin {user.email} </li>
          <li>
            <form action={signOut}>
              <button>Çıkış yap</button>
            </form>
          </li>
        </ul>
      ) : (
        <ul>
          <Link href={"/login"}> Giriş yap </Link>
          <Link href={"/sign-up"}> Kayıt ol </Link>
        </ul>
      )}
    </header>
  );
}
