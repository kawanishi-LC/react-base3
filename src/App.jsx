import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "./App.css";
import LogIn from "./pages/LogIn";

//API の BaseURL : railway.bookreview.techtrain.dev

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
