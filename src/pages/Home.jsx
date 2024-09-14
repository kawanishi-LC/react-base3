import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";

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
            <Pagination
              books={books} 
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </div>
        </main>
      </div>
    </>
  );
};
