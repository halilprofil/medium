import { login, signup } from "./actions";

export default function LoginPage() {
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
            <button>Get Started</button>
          </div>
        </nav>
      </div>
      <div className="divider"></div>
      <div>
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>
        </form>
      </div>
    </div>
  );
}
