import { useContext, useEffect, useState } from "react";
import { LangContext } from "../App";
import FloatingButtons from "../components/FloatingButtons";

const AboutUs = () => {
  const { lang } = useContext(LangContext);
  const [t, setT] = useState(null);

  useEffect(() => {
  const title =
    lang === "en"
      ? "About Us｜Yihsin Industrial"
      : lang === "zh-CN"
      ? "关于我们｜义歆实业"
      : "關於我們｜義歆實業";

  const description =
    lang === "en"
      ? "Learn about Yihsin Industrial, a professional supplier of sealing machines, aluminum lid sealers, fructose dispensers, and shaker machines, providing installation and maintenance services across Taiwan."
      : lang === "zh-CN"
      ? "了解义歆实业——专业封口机、铝盖封口机、果糖机及摇摇机设备供应商，提供全台湾安装及售后服务。"
      : "了解義歆實業——專業封口機、鋁蓋封口機、果糖機與搖搖機設備供應商，提供全台安裝與售後維修服務。";

  document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  metaDesc?.setAttribute("content", description);
}, [lang]);


useEffect(() => {
  fetch("/YiHsin/db.json")
    .then((res) => res.json())
    .then((data) => {
      const about = data.about?.[0];
      if (about) {
        setT(about[lang] || about["zh-TW"]);
      }
    })
    .catch((err) => console.error("載入關於我們失敗:", err));
}, [lang]);

  if (!t) return <section className="about-section"></section>;

  return (
    <>
      <section className="about-section">
        <div className="about-left d-flex flex-column justify-content-center align-items-center p-5 text-center text-white">
          <h1 className="fw-bold display-4 mb-3">{t.title}</h1>
        </div>

        <div className="about-right d-flex flex-column justify-content-center align-items-center p-5">
          <div className="about-inner container lh-lg">
            {/* 主要內文 */}
            <div className="about-content-block mb-4">
              {t.content.map((p, i) => (
                <p key={i} className="about-text">
                  {p}
                </p>
              ))}
            </div>

            {/* 列表 */}
            <ul className="about-list mb-4">
              {t.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {/* 任務區塊 */}
            <div className="about-highlight mb-4">
              {t.mission.map((p, i) => (
                <p key={i} className="mb-2">
                  {p}
                </p>
              ))}
            </div>

            {/* 願景 */}
            <p className="about-vision mb-0">{t.vision}</p>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
};

export default AboutUs;
