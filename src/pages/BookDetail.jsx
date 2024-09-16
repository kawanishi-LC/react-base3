import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./bookDetail.css";
import { Header } from "../components/Header";

export const BookDetail = () => {
  const { bookId } = useParams();
  const [cookies] = useCookies();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [reviewer, setReviewer] = useState("");

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
        setReviewer(book.reviewer);
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
          <main className="contents">
            <div className="container">
              <div className="block">
                <h3 className="block__title">書籍レビュー詳細</h3>
              </div>
              <dev className="container__item">
                <p className="container__paragraph">書籍タイトル:{title}</p>
                <p className="container__paragraph">
                  書籍情報参照URL:<a href={`${url}`}>コチラ</a>
                </p>
                <p className="container__paragraph">書籍詳細情報:{detail}</p>
                <p className="container__paragraph">読んだ感想:{review}</p>
                <p className="container__paragraph">レビュー者:{reviewer}</p>
              </dev>
              <p>
                <Link to="/">書籍レビュー一覧画面へ戻る</Link>
              </p>
            </div>
          </main>
        </div>
      </>
    );
  };
};
