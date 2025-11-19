import ProductShowcase from "../../components/ProductShowcase";
import FloatingButtons from "../../components/FloatingButtons";
import AdPopup from "../../components/AdPopup";
import { motion as Motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { LangContext } from "../../App";
import { Link } from "react-router-dom";

const Home = () => {
  const { lang } = useContext(LangContext);
  const [products, setProducts] = useState([]);


  // 讀取所有產品資料（供容器推薦區塊比對使用）
useEffect(() => {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => setProducts(data || []))
    .catch((err) => console.error("載入 products 失敗:", err));
}, []);

  // 多語文字設定
  const textMap = {
    "zh-TW": "餐飲開店最佳夥伴",
    "zh-CN": "餐饮开店最佳伙伴",
    en: "Your Best Partner in Starting a Restaurant Business.",
  };


  const flowTitleMap = {
    "zh-TW": "服務流程",
    "zh-CN": "服务流程",
    en: "Service Process",
  };

  // 服務流程多語設定 
const flowStepsMap = {
  "zh-TW": [
    {
      title: "確認需求",
      text: "確認您所需的設備，欲封口的食材（飲料、便當、冷凍食品）、容器口徑、容器材質、使用場景（門市或工廠），以評估最合適方案。",
      icon: "bi-person",
    },
    {
      title: "聯繫我們",
      text: "確認需求後，請直接聯繫我們的服務專員，我們會為您推薦適合的產品，並提供模具客製化服務。只要將您的容器樣品寄送給我們，我們會依照樣品開發專屬模具，並提供報價與運送資訊。",
      icon: "bi-envelope",
    },
    {
      title: "到府教學",
      text: "下單完成後，3–5 個工作天內（客製產品除外），我們會將產品送到您指定地點，並提供現場安裝、操作教學，以及簡易保養流程。",
      icon: "bi-truck",
    },
    {
      title: "售後保固維修",
      text: "所有機種皆享有 1 年免費保固，後續的保養與維修服務，僅需一通電話或訊息即可獲得協助，確保機器持續穩定運作。",
      icon: "bi-gear",
    },
  ],

  "zh-CN": [
    {
      title: "确认需求",
      text: "确认您所需的设备，欲封口的食材（饮料、便当、冷冻食品）、容器口径、容器材质、使用场景（门市或工厂），以评估最合适方案。",
      icon: "bi-person",
    },
    {
      title: "联系我们",
      text: "确认需求后，请直接联系我们的服务专员，我们会为您推荐适合的产品，并提供模具客制化服务。只要将您的容器样品寄送给我们，我们会依照样品开发专属模具，并提供报价与运送资讯。",
      icon: "bi-envelope",
    },
    {
      title: "到府教学",
      text: "下单完成后，3–5 个工作天内（客制产品除外），我们会将产品送到您指定地点，并提供现场安装、操作教学，以及简易保养流程。",
      icon: "bi-truck",
    },
    {
      title: "售后保固维修",
      text: "所有机种皆享有 1 年免费保固，后续的保养与维修服务，仅需一通电话或讯息即可获得协助，确保机器持续稳定运作。",
      icon: "bi-gear",
    },
  ],

  en: [
    {
      title: "Confirm Requirements",
      text: "Identify your needs — what type of food or drink you plan to seal (beverages, lunch boxes, frozen foods), container size, material, and usage scenario (store or factory). We’ll evaluate the best solution for you.",
      icon: "bi-person",
    },
    {
      title: "Contact Us",
      text: "After confirming your needs, contact our service specialist. We’ll recommend suitable machines and provide customized mold development based on your container samples, along with quotation and shipping details.",
      icon: "bi-envelope",
    },
    {
      title: "On-site Training",
      text: "After ordering, within 3–5 working days (excluding custom products), we’ll deliver the machine to your location and provide installation, operation, and basic maintenance training.",
      icon: "bi-truck",
    },
    {
      title: "After-sales Support",
      text: "All models include a one-year warranty. For maintenance or repair, simply contact us — we ensure your equipment continues to run smoothly.",
      icon: "bi-gear",
    },
  ],
};

  const text = textMap[lang];
  const letters = text.split("");

  // 資料 state
  const [hotItems, setHotItems] = useState([]);
  const [bestSolutions, setBestSolutions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [economical, setEconomical] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // fetch data
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch((err) => console.error("載入 db.json 失敗:", err));
  }, [lang]);

  useEffect(() => {
    fetch("http://localhost:3000/bestSolutions")
      .then((res) => res.json())
      .then((data) => setBestSolutions(data || []))
      .catch((err) => console.error("載入 db.json 失敗:", err));
  }, [lang]);

  useEffect(() => {
    fetch("http://localhost:3000/hotitems")
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.items) setHotItems(data[0].items);
      });
  }, [lang]);

  useEffect(() => {
    fetch("http://localhost:3000/economical")
      .then((res) => res.json())
      .then((data) => setEconomical(data || []))
      .catch((err) => console.error("載入資料失敗:", err));
}, [lang]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
    <AdPopup /> 
  {/* banner */}
  <div className="banner p-3  text-primary-1000">
    <div className="container mt-7 container py-5 text-center text-primary-1000">
      <h1 className="mb-4">
    {letters.map((char, i) => (
      <Motion.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.6 }}
        style={{ display: "inline-block" }}
      >
        {char}
      </Motion.span>
    ))}
  </h1>

  <Motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: letters.length * 0.1, duration: 0.6 }}
  >
  </Motion.p>
</div>
  </div>


 {/* 服務流程 */}
<section className="service-flow py-lg-12 py-5">
  <div className="container">
    <h2 className="text-center fw-bold display-6 mb-lg-8 mb-5">
      {flowTitleMap[lang]}
    </h2>

    <div className="row row-cols-1 row-cols-lg-4 g-4 flow-grid">
      {flowStepsMap[lang].map((step, index) => (
        <div className="col" key={index}>
          <div
            className={`step-card h-100 p-4 p-md-3 rounded-4 shadow-lg ${
              index === flowStepsMap[lang].length - 1 ? "connector-last" : "connector"
            }`}
          >
            <span className="num-badge d-flex align-items-center justify-content-center fw-bold rounded-circle">
            {index + 1}
          </span>
            <div className="icon-wrap d-flex align-items-center justify-content-center mb-2 rounded-circle">
              <i className={`bi ${step.icon}`}></i>
            </div>
            <h5 className="fw-bold text-primary-1000 mb-2">{step.title}</h5>
            <p className="mb-0 small text-primary-600">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* 產品項目 */}
<ProductShowcase />

{/* 容器推薦 */}
<section className="service-flow py-lg-12 py-5 text-white">
  <div className="container">
    {categories[0] && (
      <div>
        {/* 標題 */}
        <h2
          className="
            section-title
            d-flex align-items-center justify-content-center gap-3
            fw-bold display-6 mb-lg-3 mb-2 text-white
          "
        >
          {typeof categories[0].title === "object"
            ? categories[0].title[lang] || categories[0].title["zh-TW"]
            : categories[0].title}
        </h2>

        {/* 副標題 */}
        {categories[0].subtitle && (
          <p className="text-center mb-lg-8 mb-5">
            {typeof categories[0].subtitle === "object"
              ? categories[0].subtitle[lang] || categories[0].subtitle["zh-TW"]
              : categories[0].subtitle}
          </p>
        )}

        {/* 圖片與名稱 */}
        <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 g-4">
          {categories[0].items.map((item, i) => {
            const imgSrc = isMobile ? item.image.mobile : item.image.desktop;
            const name =
              typeof item.name === "object"
                ? item.name[lang] || item.name["zh-TW"]
                : item.name;

            let targetCategory = null;
            if (products?.length > 0) {
              targetCategory = products.find((p) => {
                const c = p.category;
                return (
                  // 封口機
                  (["飲料封口", "饮料封口", "Drink sealing"].some((kw) =>
                    name.includes(kw)
                  ) && c["zh-TW"].includes("封口機")) ||

                  // 鋁蓋封口機
                  (["封罐", "封罐", "Food can sealing"].some((kw) =>
                    name.includes(kw)
                  ) && c["zh-TW"].includes("鋁蓋封口機")) ||

                  // 容器封口機
                  ([
                    "冷凍",
                    "冷冻",
                    "Frozen",
                    "便當",
                    "便当",
                    "Bento",
                    "湯品",
                    "汤品",
                    "Soup",
                  ].some((kw) => name.includes(kw)) &&
                    c["zh-TW"].includes("容器封口機"))
                );
              })?.category?.["zh-TW"];
            }

            // fallback：找不到時導向封口機
            if (!targetCategory) targetCategory = "封口機";

            return (
              <div
                className="col d-flex justify-content-center"
                key={i}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(targetCategory)}`}
                  className="text-decoration-none"
                >
                  <div className="hot-topic position-relative">
                    <img src={imgSrc} alt={name} />
                    <p className="position-absolute bottom-0 start-0 m-1 fw-bold fs-5 text-white">
                      {name}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
</section>

 {/* 熱銷區塊 */}
<section className="hot-section py-lg-12 py-5">
  <div className="container">
    <div className="row align-items-center">
      {/* 左側文字 */}
      <div className="col-lg-6 mb-5 mb-lg-0">
        <div className="style-text d-flex flex-column align-items-center">
          <h5 className="text-primary-1000 mb-3">
            {lang === "en"
              ? "See which machines are most popular!"
              : lang === "zh-CN"
              ? "看看大家都在用哪些机型吧"
              : "來看看大家都在用哪款機型吧"}
          </h5>

          <h2 className="mb-lg-6 mb-3 fw-bold text-primary-100 display-2">
            {lang === "en"
              ? "Best Sellers"
              : lang === "zh-CN"
              ? "最热销"
              : "最熱銷"}
          </h2>

        <a
            href="https://line.me/R/ti/p/@477fjgkd"
            target="_blank"              
            rel="noopener noreferrer"    
            className="btn btn-outline-primary-100 rounded-pill px-lg-4 py-lg-2 
              px-2 py-1 fw-bold d-flex align-items-center"
          >
            <span className="pe-2">
              {lang === "en"
                ? "Contact Us"
                : lang === "zh-CN"
                ? "马上联系"
                : "馬上聯繫"}
            </span>
            <i className="bi bi-arrow-right"></i>
          </a>

        </div>
      </div>

      {/* 右側四格圖片 */}
      <div className="col-lg-6">
        <div className="row g-4">
          {hotItems.map((item, index) => {
            // 處理多語 tagline
            const tagline =
              typeof item.tagline === "object"
                ? item.tagline[lang] || item.tagline["zh-TW"]
                : item.tagline;

            return (
              <div
                key={index}
                className={`col-6 ${index % 2 === 0 ? "pt-8" : "pb-8"}`} // 左低右高
              >
                <div className="hot-card-wrap position-relative">
                  {/* 超出去的框框 */}
                  <div className="badge-box position-absolute bg-white border border-primary-1000 rounded-1 px-2 py-0">
                   <Link
                    to={`/products?model=${encodeURIComponent(item.name)}`}
                    className="d-flex align-items-center text-primary-1000 small fw-bold py-1"
                  >
                    <i className="bi bi-play-fill me-1"></i>
                    {item.name}
                  </Link>
                  </div>

                  {/* 圖片卡片 */}
                  <div className="hot-card position-relative">
                    <img
                      src={item.image}
                      className="hot-item-img"
                      alt={item.name}
                    />

                    {/* tagline 疊在圖片底部 */}
                    <div className="tagline-box position-absolute bottom-0 start-0 w-100 d-flex justify-content-around align-items-center m-1">
                      <span className="fw-bold text-white">{tagline}</span>
                      <i className="bi bi-arrow-right text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</section>


{/* 最實惠區塊 */}
<section className="py-lg-12 py-5 service-flow two-col-section">
  <div className="container">
    {/* 區塊標題 */}
    <div className="text-center mb-8">
      <h2 className="fw-bold text-white display-2 mb-3">
        {lang === "en" ? "Best Value" : lang === "zh-CN" ? "最实惠" : "最實惠"}
      </h2>
      <h5 className="mb-1 text-primary-1000">
        {lang === "en"
          ? "We’ve selected the most economical models"
          : lang === "zh-CN"
          ? "我们挑选了最经济的款式"
          : "我們挑選了最經濟的款式"}
      </h5>
      <h5 className="text-primary-1000">
        {lang === "en"
          ? "Perfect for small shops seeking great value"
          : lang === "zh-CN"
          ? "适合单点店，追求高性价比的店家"
          : "適合單點店，追求CP值的店家"}
      </h5>
    </div>

    {/* 自動渲染交錯版型 */}
    {economical[0]?.items?.map((item, idx) => {
      const name =
        typeof item.name === "object"
          ? item.name[lang] || item.name["zh-TW"]
          : item.name;

      const features =
        typeof item.features === "object"
          ? item.features[lang] || item.features["zh-TW"]
          : item.features;

      return (
        <div
          key={idx}
          className={`row align-items-center mb-8 ${
            idx % 2 !== 0 ? "flex-row-reverse" : ""
          }`}
        >
          {/* 圖片 */}
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src={item.image}
              alt={name}
              className="fixed-square"
            />
          </div>

          {/* 文字 */}
          <div className="col-md-6 d-flex flex-column justify-content-center text-block">
            <h3 className="brush-title  py-1 px-4  fw-bold mb-lg-5 mb-3 text-end">
              {name}
            </h3>

            {features && Array.isArray(features) && (
              <ul className="mb-lg-4 mb-2 text-muted text-start">
                {features.map((f, i) => (
                  <li key={i} className="mb-2">{f}</li>
                ))}
              </ul>
            )}

           <div>
          <Link
            to={`/products?model=${encodeURIComponent(name || "")}`}
            className="btn btn-outline-primary-100 rounded-pill px-lg-4 py-lg-2 
                        px-2 py-1 fw-bold"
          >
            {lang === "en"
              ? "View More"
              : lang === "zh-CN"
              ? "更多详情"
              : "更多詳情"}
          </Link>
          </div>
                    </div>
        </div>
      );
    })}
  </div>
</section>


{/* 飲料開店最佳方案 */}
<section className="service-flow py-lg-12 py-5 text-primary-100 best-solutions">
  <div className="container">
    {bestSolutions[0] && (
      <div>
        {/* 標題（Bootstrap + 線條 SCSS） */}
        <h2
          className="
            solutions-title 
            position-relative
            d-flex align-items-center justify-content-center gap-3
            fw-bold display-6 mb-3 text-center
          "
        >
          {typeof bestSolutions[0].title === "object"
            ? bestSolutions[0].title[lang] || bestSolutions[0].title["zh-TW"]
            : bestSolutions[0].title}
        </h2>

        {/* 副標題 */}
        {bestSolutions[0].subtitle && (
          <p className="text-center mb-lg-8 mb-5">
            {typeof bestSolutions[0].subtitle === "object"
              ? bestSolutions[0].subtitle[lang] ||
                bestSolutions[0].subtitle["zh-TW"]
              : bestSolutions[0].subtitle}
          </p>
        )}

        {/* 圖片 + 名稱 */}
        <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 gy-4 align-items-end">
          {bestSolutions[0].items.map((item, i) => {
            const name =
              typeof item.name === "object"
                ? item.name[lang] || item.name["zh-TW"]
                : item.name;

            return (
              <div className="col text-center" key={i}>
                <Link
                  to={`/products?category=${encodeURIComponent(name)}`}
                  className="text-decoration-none"
                >
                  <div className="best-img position-relative">
                    <img
                      src={item.image}
                      alt={name}
                      className="img-fluid"
                    />
                    <p className="fw-bold fs-5 mt-2 text-primary-100">
                      {name}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
</section>

{/* 浮動快捷按鈕 */}
<FloatingButtons />


</>

    
  );
};

export default Home;
