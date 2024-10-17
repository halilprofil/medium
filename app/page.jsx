"use client"
import { useState  } from "react";

import { login,signup } from "./login/actions"; 

export default function Home() {

const [showModal , setShowModal] = useState(false);

  return (
    <div className="loginPage">
    <div>
      <nav className="login-nav">
        <p>Medium</p>
        <div>
          <p>Our Story</p>
          <p>Membership</p>
          <p>Write</p>
          <p>Sign-in</p>
          <button onClick={()=> setShowModal(true)}>Get Started</button>
        </div>
      </nav>
    </div>
    <div className="divider"></div>

    <div className="loginFlexBox">
      <div className="loginFlexBoxPadding">
        <div className="loginTitle">
          <h1>Human</h1>
          <h1>stories & ideas</h1>
        </div>
        <div className="loginMiniTitle">A place to read, write, and deepen your understanding</div>
        <div>
          <button onClick={()=> setShowModal(true)} className="loginButton">Start Reading</button>
        </div>
      </div>
      <div>
        <img width={450} src="/assets/loginimage.webp" alt="" />
      </div>
    </div>
    <div className="divider"></div>
    <div>
      <div className="loginPageFooter">
        <p>Help</p>
        <p>Status</p>
        <p>About</p>
        <p>Careers</p>
        <p>Press</p>
        <p>Blog</p>
        <p>Privacy</p>
        <p>Term</p>
        <p>Text to speech</p>
        <p>Teams</p>
      </div>
      <dialog open={showModal}>
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
        </form>
      <button onClick={()=> setShowModal(false)}>x</button>
      </dialog>
    </div>
  </div>
  
  );
}