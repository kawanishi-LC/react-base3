import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../authSlice";
import axios from "axios";
import "./logIn.css";

//API の BaseURL : railway.bookreview.techtrain.dev

export const LogIn = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies();
  const auth = useSelector((state) => state.auth.isLogIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const onSubmit = (data) => {
    axios
      .post(`https://railway.bookreview.techtrain.dev/signin`, data)
      .then((res) => {
        setCookie("token", res.data.token);
        console.log(res.data);

        dispatch(logIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
        console.log(err);
      });

    if (auth) return <Navigate to="/" replace />;
  };

  return (
    <>
      <div>
        <main className="login">
          <h2>ログイン画面</h2>
          <p className="error-message">{errorMessage}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <label className="email-label">メールアドレス</label>
            <br />
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="email-input"
            />
            <br />
            <label className="password-label">パスワード</label>
            <br />
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message: "4文字以上入力してください。",
                },
              })}
              className="password-input"
            />
            <br />
            <button type="submit" className="login-button">
              ログイン
            </button>
          </form>
          <p>
            <Link to="/signup">ユーザー新規登録画面へ</Link>
          </p>
        </main>
      </div>
    </>
  );
};
