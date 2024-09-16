import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../authSlice";
import axios from "axios";
import "./header.css";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isLogIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [userName, setUserName] = useState([]);

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    dispatch(logOut());
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://railway.bookreview.techtrain.dev/users`,
          {
            headers: {
              authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        console.log(response.data);
        setUserName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

  }, []);

  return (
    <header className="header">
      <h2 className="header__title">書籍レビューアプリ</h2>
      {auth ? (
        <>
          <p className="header__paragraph">ユーザ名:{userName}</p>
          <p>
            <Link to="/profile" className="header__link">ユーザー情報を編集</Link>
          </p>

          <button onClick={handleLogOut} className="header__button">
            ログアウト
          </button>
        </>
      ) : (
        <button onClick={handleLogIn} className="header__button">
          ログイン
        </button>
      )}
    </header>
  );
};
