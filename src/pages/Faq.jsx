import { useEffect, useState, useContext } from "react";
import { LangContext } from "../App";
import FloatingButtons from "../components/FloatingButtons";

const Faq = () => {
  const { lang } = useContext(LangContext);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
  const title =
    lang === "en"
      ? "FAQ｜Yihsin Industrial"
      : lang === "zh-CN"
      ? "常见问题｜义歆实业"
      : "常見問題｜義歆實業";

  const description =
    lang === "en"
      ? "Frequently asked questions about Yihsin Industrial's sealing machines, aluminum lid sealers, fructose dispensers, shaker machines, warranty service, and installation support."
      : lang === "zh-CN"
      ? "关于义歆实业封口机、铝盖封口机、果糖机、摇摇机、保固与安装服务的常见问题说明。"
      : "關於義歆實業封口機、鋁蓋封口機、果糖機、搖搖機、保固與安裝服務的常見問題整理。";

  document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  metaDesc?.setAttribute("content", description);
}, [lang]);


 useEffect(() => {
  fetch("/db.json")
    .then((res) => res.json())
    .then((data) => {
      const faq = data.faq?.[0];
      if (faq) {
        setFaqData(faq[lang] || faq["zh-TW"]);
      }
    })
    .catch((err) => console.error("載入 FAQ 失敗:", err));
}, [lang]);

  if (!faqData.length) return <section className="about-section"></section>;

  return (
    <>
      <section className="bg-gray-200 py-lg-12 py-5">
        <div className="container text-center">
          <h2 className="fw-bold display-6 mb-5 text-primary-100">
            常見 Q&A
          </h2>

          <div className="d-flex flex-column align-items-center gap-4">
            {faqData.map((item, i) => (
              <div
                key={i}
                className="faq-card bg-white rounded-4 shadow-sm p-4 text-start w-100"
                style={{ maxWidth: "800px" }}
              >
                <h5 className="fw-bold text-primary-100 mb-3">
                  <span className="me-2 text-primary-600">Q{i + 1}.</span>
                  {item.q}
                </h5>
                <p className="mb-0 text-primary-1000" style={{ whiteSpace: "pre-line" }}>
                  <span className="fw-bold text-danger">A{i + 1}.</span>
                  <br />
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
};

export default Faq;
