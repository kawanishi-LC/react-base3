import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "./App.css";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { NewBook } from "./pages/NewBook";
import { BookDetail } from "./pages/BookDetail";
import { EditBook } from "./pages/EditBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<NewBook />} />
          <Route path="/detail/:bookId" element={<BookDetail />} />
          <Route path="/edit/:bookId" element={<EditBook />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
