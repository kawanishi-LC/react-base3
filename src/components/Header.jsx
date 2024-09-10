import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./header.css";

export const Header = () => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies();

  const handleSignOut = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <h2>書籍レビューアプリ</h2>           
    </header>
  );
};
