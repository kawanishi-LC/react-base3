import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { Header } from "../components/Header";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://railway.bookreview.techtrain.dev/public/books?offset=${pageIndex}`
        );
        console.log(response.data); //レスポンスデータは配列
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pageIndex]);

  return (
    <>
      <div>
        <Header />
        <main className="contents">
          <div className="container">
            <h3 className="container__title">書籍レビュー一覧</h3>
            <ul className="container__list">
              {books.map((book) => {
                return (
                  <li className="container__list__item" key={book.id}>
                    書籍タイトル:{book.title}
                    <br />
                    書籍情報参照URL:<a href={`${book.url}`}>コチラ</a>
                    <br />
                    書籍詳細情報:{book.detail}
                    <br />
                    読んだ感想:{book.review}
                    <br />
                    レビュー者:{book.reviewer}
                  </li>
                );
              })}
            </ul>
            <div className="container__pagination">
              <button
                className="container__pagination__button"
                onClick={() => setPageIndex(pageIndex - 10)}
              >
                前の10件
              </button>
              <button
                className="container__pagination__button"
                onClick={() => setPageIndex(pageIndex + 10)}
              >
                次の10件
              </button>
              <button
                className="container__pagination__button"
                onClick={() => setPageIndex(0)}
              >
                最初に戻る
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
