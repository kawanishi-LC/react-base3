import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./home.css";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const [cookies] = useCookies();
  const [books, setBooks] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://railway.bookreview.techtrain.dev/books?offset=${pageIndex}`,
          {
            headers: {
              authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        console.log(response.data);
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Header />
        <main className="contents">
          <div className="container">
            <div className="block">
              <h3 className="block__title">書籍レビュー一覧</h3>
              <p className="block__link">
                <Link to="/new">書籍レビューを登録する</Link>
              </p>
            </div>
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
