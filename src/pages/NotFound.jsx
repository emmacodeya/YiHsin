import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { LangContext } from "../App";

const NotFound = () => {
  const { lang } = useContext(LangContext);

  const text = {
    "zh-TW": {
      title: "找不到頁面",
      desc: "很抱歉，您要找的頁面不存在或已被移除。",
      btn: "返回首頁",
    },
    "zh-CN": {
      title: "找不到页面",
      desc: "抱歉，您访问的页面不存在或已被删除。",
      btn: "返回首页",
    },
    en: {
      title: "Page Not Found",
      desc: "Sorry, the page you’re looking for doesn’t exist or has been removed.",
      btn: "Back to Home",
    },
  };

  const t = text[lang] || text["zh-TW"];

  return (
    <div className="notfound d-flex flex-column justify-content-center align-items-center text-center">
      <Motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="display-1 fw-bold"
      >
        404
      </Motion.h1>

      <Motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-3"
      >
        {t.title}
      </Motion.h3>

      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-4"
      >
        {t.desc}
      </Motion.p>

      <Link to="/" className="btn btn-outline-primary-1000 px-4 py-2 rounded-pill">
        {t.btn}
      </Link>
    </div>
  );
};

export default NotFound;
