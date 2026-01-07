import FloatingButtons from "../../components/FloatingButtons";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { LangContext } from "../../App";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const { lang } = useContext(LangContext);



 useEffect(() => {
  const title = 
    lang === "en"
      ? "News｜YiHsin Industrial"
      : lang === "zh-CN"
      ? "最新消息｜义歆实业"
      : "最新消息｜義歆實業";

  const description =
    lang === "en"
      ? "Latest announcements, product updates and industry insights from Yihsin Industrial."
      : lang === "zh-CN"
      ? "义歆实业最新活动、产品公告、优惠信息与行业资讯整理。"
      : "義歆實業最新活動、產品公告、優惠資訊與產業消息整理。";

  document.title = title;

  const desc = document.querySelector('meta[name="description"]');
  desc?.setAttribute("content", description);
}, [lang]);


 useEffect(() => {
  fetch("/db.json")
    .then((res) => res.json())
    .then((data) => setNewsList(data.news || []))
    .catch((err) => console.error("載入 news 失敗:", err));
}, []);

  // 翻譯輔助函式
  const t = (obj) => obj?.[lang] || obj?.["zh-TW"];

  // 頁面標題多語文字
  const text = {
    "zh-TW": {
      title: "最新消息",
      subtitle: "關注義歆最新活動、產品與展會資訊",
      readMore: "閱讀更多 →",
    },
    "zh-CN": {
      title: "最新消息",
      subtitle: "关注义歆最新活动、产品与展会资讯",
      readMore: "阅读更多 →",
    },
    en: {
      title: "Latest News",
      subtitle: "Stay updated on YiHsin’s newest events, products, and exhibitions",
      readMore: "Read more →",
    },
  };

  return (
    <>
      <section className="hot-section news-page py-5">
        <div className="container">
          {/* 標題區 */}
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 text-primary-200 mb-3">
              {text[lang].title}
            </h2>
            <p className="text-primary-1000">{text[lang].subtitle}</p>
            <div className="title-underline mx-auto mt-3"></div>
          </div>

          {/* 卡片區 */}
          <div className="row g-4">
            {[...newsList]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((n, i) => (
              <div className="col-md-6 col-lg-4" key={n.id}>
                <Motion.div
                  className="news-card card h-100 shadow-sm border-0 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                 <div className="card-img-wrap position-relative">
                    {n.cover?.endsWith(".mp4") ? (
                      <video
                        src={n.cover}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="card-img-top"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src={n.cover}
                        className="card-img-top"
                        alt={t(n.title)}
                      />
                    )}

                    <span className="date-badge">{n.date}</span>
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="fw-bold text-primary-100 mb-2">
                      {t(n.title)}
                    </h5>
                    <p className="text-primary-600 small flex-grow-1 mb-3">
                      {t(n.summary)}
                    </p>
                    <Link
                      to={`/news/${n.id}`}
                      className="btn btn-outline-primary-1000 rounded-pill px-lg-4 py-lg-2 
                        px-2 py-1 fw-bold align-self-center"
                    >
                      {text[lang].readMore}
                    </Link>
                  </div>
                </Motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 浮動快捷按鈕 */}
      <FloatingButtons />
    </>
  );
};

export default News;
