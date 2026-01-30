import { useEffect, useState, useContext } from "react";
import { LangContext } from "../App";
import { Link } from "react-router-dom";

const AdPopup = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const { lang } = useContext(LangContext);

  const images = [
    "/images/news/maintenance.png",
    "/images/news/discount-2.jpg",
    "/images/discount.jpg" 
  ];

  // 顯示彈窗
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // 自動輪播
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500); 

    return () => clearInterval(interval);
  }, [visible, images.length]);

  if (!visible) return null;

  const closePopup = () => setVisible(false);

  return (
    <div className="ad-popup-overlay" onClick={closePopup}>
      <div
        className="ad-popup text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X */}
        <button className="close-btn" onClick={closePopup}>
          ×
        </button>

        {/* 提示文字 */}
        <p className="popup-hint text-primary-100">
          {lang === "zh-TW" ? (
            <>詳情請至 <Link to="/news">最新消息</Link> 查看</>
          ) : lang === "zh-CN" ? (
            <>详情请至 <Link to="/news">最新消息</Link> 查看</>
          ) : (
            <>For more details, please check our <Link to="/news">latest news</Link></>
          )}
        </p>

        {/* 圖片 */}
        <img
          src={images[current]}
          alt="popup"
          className="img-fluid rounded my-4"
        />

        {/* CTA */}
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
