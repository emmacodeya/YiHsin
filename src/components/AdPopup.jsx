import { useEffect, useState, useContext } from "react";
import { LangContext } from "../App";

const AdPopup = () => {
  const [visible, setVisible] = useState(false);
  const { lang } = useContext(LangContext);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const closePopup = () => setVisible(false);

  return (
    <div className="ad-popup-overlay" onClick={closePopup}>
      
      {/* 彈窗本體 */}
      <div
        className="ad-popup"
        onClick={(e) => e.stopPropagation()} // 避免點到裡面也關閉
      >
        {/* X 按鈕 */}
        <button className="close-btn" onClick={closePopup}>
          ×
        </button>

        <img
          src="/images/discount.jpg"
          alt="限時優惠"
          className="img-fluid rounded my-5"
        />

        <a
          href="https://line.me/R/ti/p/@477fjgkd"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary-100 rounded-pill px-lg-4 py-lg-2 px-2 py-1 fw-bold"
        >
          {lang === "zh-TW"
            ? "馬上聯繫"
            : lang === "zh-CN"
            ? "马上联系"
            : "Contact Us Now"}
        </a>
      </div>

    </div>
  );
};

export default AdPopup;
