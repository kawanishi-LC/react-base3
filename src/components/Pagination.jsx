import "../pages/home.css";


export const Pagination = (props) => {
  const { books, pageIndex, setPageIndex} = props;

  const listitems = books.map((book, key) => (
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
  ))

  return (
    <>
      <ul className="container__list">
        {listitems}
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
    </>
  );
};
