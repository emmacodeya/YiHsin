import FloatingButtons from "../../components/FloatingButtons";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { LangContext } from "../../App";

const NewsDetail = () => {
  const { lang } = useContext(LangContext);
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/news")
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((n) => String(n.id) === String(id));
        setNews(item);
      })
      .catch((err) => console.error("載入單一 news 失敗:", err));
  }, [id]);

  if (!news) return <p className="text-center py-5">載入中...</p>;

  // ✅ 翻譯輔助函式
  const t = (obj) => obj?.[lang] || obj?.["zh-TW"];

  // ✅ 返回按鈕多語
  const text = {
    "zh-TW": { back: "返回最新消息" },
    "zh-CN": { back: "返回最新消息" },
    en: { back: "Back to News" },
  };

  return (
    <>
      <section className="news-detail py-5">
        <div className="container">
          {/* === 標題區 === */}
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">{t(news.title)}</h2>
            <p>{news.date}</p>
          </div>

          {/* === 封面圖 === */}
          {news.cover && (
            <div className="text-center mb-5">
              <img
                src={news.cover}
                alt={t(news.title)}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* === 內文 === */}
          <article className="mx-auto" style={{ maxWidth: "800px" }}>
            {news.content?.map((block, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={i} className="lh-lg mb-3">
                      {t(block.text)}
                    </p>
                  );
                case "heading":
                  return (
                    <h4 key={i} className="mt-4 mb-3">
                      {t(block.text)}
                    </h4>
                  );
                case "image":
                  return (
                    <div key={i} className="text-center my-4">
                      <img
                        src={block.src}
                        alt={block.alt || ""}
                        className="img-fluid rounded"
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                      />
                    </div>
                  );
                case "list":
                  return (
                    <ul key={i} className="mb-3">
                      {t(block.items)?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })}
          </article>

          {/* === 返回按鈕 === */}
          <div className="text-center mt-5">
            <Link
              to="/news"
              className="btn btn-outline-primary-1000 rounded-pill px-lg-4 py-lg-2 
              px-2 py-1 fw-bold"
            >
              {text[lang].back}
            </Link>
          </div>
        </div>
      </section>

      {/* === 浮動快捷按鈕 === */}
      <FloatingButtons />
    </>
  );
};

export default NewsDetail;
