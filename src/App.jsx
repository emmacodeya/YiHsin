import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";

// 全局元件
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// 前台
import Home from "./pages/Home/Home";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Content />
      </Router>
    </UserContext.Provider>
  );
}

export default App;

const Content = () => {
  const location = useLocation();
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(null);
    }
  }, [location, setCurrentUser]);

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      {/* 如果你有 ScrollToTop 元件再打開 */}
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
};
