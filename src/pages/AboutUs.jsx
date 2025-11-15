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
