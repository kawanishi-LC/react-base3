import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./signUp.css";
import { Header } from "../components/Header";

//API の BaseURL : railway.bookreview.techtrain.dev

export const EditBook = () => {
  const { register, handleSubmit } = useForm();
  const { bookId } = useParams();
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessge] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  const onSubmit = () => {
    const data = {
      title: title,
      url: url,
      detail: detail,
      review: review,
    };

    axios
      .put(`https://railway.bookreview.techtrain.dev/books/${bookId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessge(`更新に失敗しました。 ${err}`);
      });
  };

  const onDelete = () => {
      axios
        .delete(
          `https://railway.bookreview.techtrain.dev/books/${bookId}`, {
            headers: {
              authorization: `Bearer ${cookies.token}`,
            },
          })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          setErrorMessge(`削除に失敗しました。 ${err}`);
        });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://railway.bookreview.techtrain.dev/books/${bookId}`,
          {
            headers: {
              authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        console.log(response.data); //レスポンスデータは配列
        const book = response.data;
        setTitle(book.title);
        setUrl(book.url);
        setDetail(book.detail);
        setReview(book.review);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
  // ロード中の場合はローディング画面
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
  // ロードが終わるとデータ表示 

  return (
    <>
      <div>
        <Header />
        <main className="signup">
          <h3>書籍レビュー編集</h3>
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
              value={title}
              onChange={handleTitleChange}
            />
            <br />
            <label>書籍情報参照URL</label>
            <br />
            <input
              type="url"
              {...register("url", {
                required: true,
              })}
              className="name-input"
              value={url}
              onChange={handleUrlChange}
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
              value={detail}
              onChange={handleDetailChange}
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
              value={review}
              onChange={handleReviewChange}
            />
            <br />

            <button type="submit" className="signup-button">
              更新
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={onDelete}
            >
              削除
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
};