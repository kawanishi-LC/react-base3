import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "../pages/home.css";

export const Pagination = (props) => {
  const { books, pageIndex, setPageIndex } = props;
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const handleSelectBook = (id) => {
    const data = {
      selectBookId: id,
    };

    axios
      .post(`https://railway.bookreview.techtrain.dev/logs`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate(`/detail/${id}`);
      })
      .catch((err) => {
        setErrorMessage(`ログの送信に失敗しました。${err}`);
      });
  };  

  const listitems = books.map((book) => (
    <li
      className="container__list__item"
      key={book.id}
    >
      書籍タイトル:{book.title}
      <br />
      読んだ感想:{book.review}
      <br />
      <a href={`/detail/${book.id}`} onClick={() => handleSelectBook(book.id)}>
        詳細を見る＞＞
      </a>
      <br />
      {book.isMine === true && (<a href={`/edit/${book.id}`}>
        編集する
      </a>)}
    </li>
  ));

  return (
    <>
      <p className="error-message">{errorMessage}</p>
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
      <ul className="container__list">{listitems}</ul>
    </>
  );
};
