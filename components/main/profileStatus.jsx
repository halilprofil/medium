"use client"
import { signOut } from "@/app/login/actions"
import { useState } from "react"

export default function ProfileStatus({user}) {
    const [show, setShow] = useState(false)
    return (
        <>
            <button onClick={() => setShow(!show)}>P</button>

            {user ? (
                <dialog className="signOut" open={show}>
                     <ul>
                    <li> Hoşgeldin {user.email} </li>
                    <li>
                        <form action={signOut}>
                            <button>Çıkış yap</button>
                        </form>
                    </li>
                </ul>
                </dialog>
               
            ) : (
               ""
            )}

        </>
    )
}
