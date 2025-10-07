import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
import { UserContext } from "./context/UserContext";

// 全域元件
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// 前台頁面
import Home from "./pages/Home/Home";

// === 建立多語 Context ===
// eslint-disable-next-line react-refresh/only-export-components
export const LangContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "zh-TW");

  // 當語言改變時儲存到 localStorage
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // 載入使用者資料
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // 同步 localStorage 與 currentUser
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <LangContext.Provider value={{ lang, setLang }}>
        <Router>
          <Content />
        </Router>
      </LangContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

// === 路由與版面控制 ===
const Content = () => {
  const location = useLocation();
  const { setCurrentUser } = useContext(UserContext);

  // 每次切換頁面時重新載入使用者資料
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(null);
    }
  }, [location, setCurrentUser]);

  // 判斷是否為後台頁面（可避免重複 Header/Footer）
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
};
