import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./profile.css";

//API の BaseURL : railway.bookreview.techtrain.dev

export const Profile = () => {
  const { register, handleSubmit } = useForm();
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);


  const onSubmit = () => {
    const data = {
      name: name,
    };

    axios
      .put(`https://railway.bookreview.techtrain.dev/users`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })

      .catch((err) => {
        setErrorMessage(`更新に失敗しました。 ${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`https://railway.bookreview.techtrain.dev/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const user = res.data;
        setName(user.name);

      })
      .catch((err) => {
        setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
      });
  }, []);  

  return (
    <>
      <div>
        <main className="signup">
          <h2>ユーザー情報編集</h2>
          <p className="error-message">{errorMessage}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            <label>ユーザ名</label>
            <br />
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              className="name-input"
              value={name}
              onChange={handleNameChange}
            />
            <br />

            <button type="submit" className="signup-button">
              更新
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
