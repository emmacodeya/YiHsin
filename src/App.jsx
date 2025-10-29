import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
import { UserContext } from "./context/UserContext";

// 全域元件
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading";

// 前台頁面
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
import Products from "./pages/Products/Products"; 
import Contact from "./pages/Contact";
import Partners from "./pages/Partners";
import NotFound from "./pages/NotFound";
import News from "./pages/News/News";
import NewsDetail from "./pages/News/NewsDetail";




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
  const [loading, setLoading] = useState(true);

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

  
 //  Loading，僅首頁載入中
useEffect(() => {
  if (location.pathname !== "/") {
    setLoading(false); 
    return;
  }

  setLoading(true);
  window.scrollTo(0, 0);

  const finishLoading = () => setLoading(false);

  if (document.readyState === "interactive" || document.readyState === "complete") {
    const timer = setTimeout(finishLoading, 300);
    return () => clearTimeout(timer);
  }

  const handleReadyChange = () => {
    if (document.readyState === "interactive") {
      clearListeners();
      setTimeout(finishLoading, 300);
    }
  };

  const clearListeners = () => {
    document.removeEventListener("readystatechange", handleReadyChange);
    window.removeEventListener("load", finishLoading);
  };

  document.addEventListener("readystatechange", handleReadyChange);
  window.addEventListener("load", finishLoading);

  return () => clearListeners();
}, [location]);

  return (
    <>
    {location.pathname === "/" && <Loading loading={loading} />}
    {!isAdmin && <Header />}
    {!loading && (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )}
    {!isAdmin && <Footer />}
    </>
  );
};
