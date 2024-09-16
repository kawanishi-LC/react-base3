import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./signUp.css";
import { Header } from "../components/Header";

//API の BaseURL : railway.bookreview.techtrain.dev

export const NewBook = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessge] = useState();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`https://railway.bookreview.techtrain.dev/books`, data,{
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessge(`投稿に失敗しました。 ${err}`);
      });
  };

  return (
    <>
      <div>
        <Header />
        <main className="signup">
          <h3>書籍レビュー新規作成</h3>
          <p className="error-message">{errorMessage}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            <label>書籍タイトル</label>
            <br />
            <input
              type="text"
              {...register("title", {
                required: true,
              })}
              className="name-input"
            />
            <br />
            <label>書籍情報参照URL</label>
            <br />
            <input
              type="url"
              pattern="https?://\S+"
              placeholder="https://app.swaggerhub.com/apis/INFO_3/BookReviewApplication/1.0.0"
              {...register("url", {
                required: true,
              })}
              className="name-input"
            />
            <br />
            <label>書籍詳細情報</label>
            <br />
            <textarea
              type="text"
              {...register("detail", {
                required: true,
              })}
              className="name-input"
            />
            <br />
            <label>読んだ感想</label>
            <br />
            <textarea
              type="text"
              {...register("review", {
                required: true,
              })}
              className="name-input"
            />
            <br />

            <button type="submit" className="signup-button">
              投稿
            </button>
          </form>
          <p>
            <Link to="/">書籍レビュー一覧画面へ戻る</Link>
          </p>
        </main>
      </div>
    </>
  );
};