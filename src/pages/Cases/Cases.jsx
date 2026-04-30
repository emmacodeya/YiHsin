import { useEffect, useState, useContext } from "react";
import { motion as Motion } from "framer-motion";
import { LangContext } from "../../App";
import FloatingButtons from "../../components/FloatingButtons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const { lang } = useContext(LangContext);
  const [currentIndex, setCurrentIndex] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const textMap = {
    "zh-TW": {
      title: "合作案例",
      subtitle: "我們與客戶的實際應用案例",
    },
    "zh-CN": {
      title: "合作案例",
      subtitle: "我们与客户的实际应用案例",
    },
    en: {
      title: "Cases",
      subtitle: "Real-world applications with our clients",
    },
  };

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setCases(data.cases || []);
      });
  }, []);

  useEffect(() => {
    setCurrentIndex(cases.map(() => 0));
  }, [cases]);

  const handleChange = (caseIdx, imgIdx) => {
    const newIndex = [...currentIndex];
    newIndex[caseIdx] = imgIdx;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  const titleMap = {
    "zh-TW": "合作案例｜義歆實業",
    "zh-CN": "合作案例｜义歆实业",
    en: "Cases | YiHsin Industrial",
  };

 const descMap = {
  "zh-TW":
    "查看義歆實業封口機、封杯機、鋁蓋封口機與食品包裝設備的實際應用案例，涵蓋飲料店封口、餐飲業與食品工廠包裝解決方案。",
    
  "zh-CN":
    "查看义歆实业封口机、封杯机、铝盖封口机及食品包装设备的实际应用案例。",
    
  en:
    "Explore real-world applications of sealing machines, cup sealers, and food packaging equipment from YiHsin Industrial.",
};

  document.title = titleMap[lang];

  let meta = document.querySelector("meta[name='description']");
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = descMap[lang];

}, [lang]);

useEffect(() => {
   if (!cases.length) return;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "合作案例",
    "itemListElement": cases.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.title?.[lang] || item.title,
      "description": item.description?.[lang] || item.description,
      "image": item.images?.[0],
    })),
  };

  let script = document.getElementById("cases-jsonld");
  if (script) script.remove();

  script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "cases-jsonld";
  script.innerHTML = JSON.stringify(jsonLd);

  document.head.appendChild(script);
}, [cases, lang]);

  return (
    <>
      <section className="hot-section cases-page py-5">
        <div className="container">

          {/* 標題 */}
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 text-primary-200 mb-3">
              {textMap[lang].title}
            </h2>
            <p className="text-primary-1000">
              {textMap[lang].subtitle}
            </p>
            <div className="title-underline mx-auto mt-3"></div>
          </div>

          {/* 案例列表 */}
          {cases.map((item, idx) => {
            const isReverse = idx % 2 !== 0;

            return (
              <Motion.div
                key={item.id}
                className={`case-row row align-items-center mb-5 ${
                  isReverse ? "reverse" : ""
                }`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >

                {/* 圖片 */}
                <div className="col-md-6">
                  <div className="case-image-wrap">

                    {isMobile ? (
                      /* 手機：Swiper 滑動 */
                      <Swiper loop={true} className="case-swiper">
                        {item.images?.map((img, i) => (
                          <SwiperSlide key={i}>
                            <img
                              src={img}
                              alt={`${item.title?.[lang] || item.title}｜封口機應用案例`}
                              className={`case-img ${
                                i === 0 ? "logo-img" : ""
                              }`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      /* 桌機 */
                      <>
                        <img
                          src={item.images?.[currentIndex[idx]]}
                          alt={item.title?.[lang] || item.title}
                          className={`case-img ${
                            currentIndex[idx] === 0 ? "logo-img" : ""
                          }`}
                        />

                        {/* 左 */}
                        <button
                          className="arrow left"
                          onClick={() =>
                            handleChange(
                              idx,
                              (currentIndex[idx] - 1 + item.images.length) %
                                item.images.length
                            )
                          }
                        >
                          <i className="bi bi-arrow-left-square-fill"></i>
                        </button>

                        {/* 右 */}
                        <button
                          className="arrow right"
                          onClick={() =>
                            handleChange(
                              idx,
                              (currentIndex[idx] + 1) % item.images.length
                            )
                          }
                        >
                          <i className="bi bi-arrow-right-square-fill"></i>
                        </button>
                      </>
                    )}

                  </div>
                </div>

                {/* 文字 */}
                <div className="col-md-6 case-content">
                  <h3 className="case-title fw-bold mb-3">
                    {item.title?.[lang] || item.title}
                  </h3>

                  <p className="case-desc mb-0">
                    {item.description?.[lang] || item.description}
                  </p>

                  {/* TAG */}
                  <div className="case-tags">
                    {item.tags?.[lang]?.map((tag, i) => (
                      <span key={i} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </Motion.div>
            );
          })}

        </div>
      </section>

      {/* 浮動快捷按鈕 */}
      <FloatingButtons />
    </>
  );
};

export default Cases;