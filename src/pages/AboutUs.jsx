import { useContext, useEffect, useState } from "react";
import { LangContext } from "../App";
import FloatingButtons from "../components/FloatingButtons";


const AboutUs = () => {
  const { lang } = useContext(LangContext);
  const [t, setT] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/about")
      .then((res) => res.json())
      .then((data) => setT(data[0][lang] || data[0]["zh-TW"])) 
      .catch((err) => console.error("載入關於我們失敗:", err));
  }, [lang]);

  if (!t) return <section className="about-section"></section>;


  return (
    <>
    <section className="about-section">
      {/* 左側深色玻璃風區塊 */}
      <div className="about-left">
        <h1 className="fw-bold display-4 mb-3 text-primary-200">{t.title}</h1>
      </div>

      {/* 右側主內文 */}
      <div className="about-right">
        <div className="about-inner container">
          {/* ✅ content 區塊（含 hover 光暈效果） */}
          <div className="about-content-block mb-4">
            {t.content.map((p, i) => (
              <p key={i} className="about-text">
                {p}
              </p>
            ))}
          </div>

          {/* 列表區塊 */}
          <ul className="about-list my-4">
            {t.list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* 使命區塊 */}
          <div className="about-highlight my-4">
            {t.mission.map((p, i) => (
              <p key={i} className="about-mission">
                {p}
              </p>
            ))}
          </div>

          {/* 願景區塊 */}
          <p className="about-vision">{t.vision}</p>
        </div>
      </div>
    </section>
     <FloatingButtons />
    </>
  );
};

export default AboutUs;
