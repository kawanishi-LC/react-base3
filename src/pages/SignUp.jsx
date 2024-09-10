import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Compressor from "compressorjs";
import "./signUp.css";

//API の BaseURL : railway.bookreview.techtrain.dev

export const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessge] = useState();
  const [, setCookie] = useCookies();
  const [file, setFile] = useState();

  // 画像ファイルを圧縮する関数
  function compressImage(file) {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        //オプション設定内容
        quality: 0.6,

        success(result) {
          resolve(result);
          setFile(result);
          console.log(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    compressImage(file);
  };

  const onSubmit = (data) => {
    axios
      .post(`https://railway.bookreview.techtrain.dev/users`, data)
      .then((res) => {
        const token = res.data.token;
        console.log(token);
        setCookie("token", token);

        const formData = new FormData();
        formData.append("icon", file,file.name);
             
        return axios.post(
          `https://railway.bookreview.techtrain.dev//uploads`, formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then((res) => {
        const iconUrl = res.data
        console.log(iconUrl);
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });
  };

  return (
    <>
      <div>
        <main className="signup">
          <h2>ユーザー新規登録</h2>
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
            />
            <br />
            <label>メールアドレス</label>
            <br />
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="email-input"
            />
            <br />
            <label>パスワード</label>
            <br />
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message: "4文字以上入力してください。",
                },
              })}
              className="password-input"
            />
            <br />
            <label>アイコン画像</label>
            <br />
            <input
              type="file"
              onChange={handleFileChange}
              id="file"
              accept="image/*"
              className="file-input"
            ></input>
            <br />
            <button type="submit" className="signup-button">
              登録
            </button>
          </form>
          <p>
            <Link to="/login">ログイン画面へ</Link>
          </p>
        </main>
      </div>
    </>
  );
};