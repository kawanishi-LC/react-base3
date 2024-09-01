import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./login.css";

//API の BaseURL : railway.bookreview.techtrain.dev

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSignIn = () => {
    axios
      .post(`https://railway.bookreview.techtrain.dev/signin`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setCookie("token", res.data.token);
        console.log(res.data);
      })
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <main className="signin">
          <h2>ログイン</h2>
          <p className="error-message">{errorMessage}</p>
          <form className="signin-form">
            <label className="email-label">メールアドレス</label>
            <br />
            <input
              type="email"
              className="email-input"
              onChange={handleEmailChange}
            />
            <br />
            <label className="password-label">パスワード</label>
            <br />
            <input
              type="password"
              className="password-input"
              onChange={handlePasswordChange}
            />
            <br />
            <button type="button" className="signin-button" onClick={onSignIn}>
              ログイン
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Signin;
