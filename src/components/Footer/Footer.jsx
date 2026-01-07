import { useContext } from "react";
import { LangContext } from "../../App";
import { Link } from "react-router-dom";


const Footer = () => {
  const { lang, setLang } = useContext(LangContext);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const text = {
    "zh-TW": {
      company: "義歆實業股份有限公司",
      desc: "專營封口機、包裝設備，品質與服務是我們的堅持。",
      products: "產品項目",
      productsList: ["飲料封口機","果糖機", "搖搖機", "檸檬機", "鋁蓋封口機","容器封口機","產業型封口機"],
      links: "快速連結",
      linksList: ["關於我們", "常見問題", "聯絡我們"],
      contact: "聯絡資訊",
      address: "新北市土城區中央路二段125號5樓",
      phone: "電話",
      fax: "傳真",
      email: "電子信箱",
      copyright: "版權所有 © 2025 義歆實業股份有限公司",
      chooseLang: "選擇語言",
    },
    "zh-CN": {
      company: "义歆实业股份有限公司",
      desc: "专营封口机、包装设备，品质与服务是我们的坚持。",
      products: "产品项目",
      productsList: ["饮料封口机", "果糖机", "摇摇机", "柠檬机", "铝盖封口机","容器封口机","产业型封口机"],
      links: "快速链接",
      linksList: ["关于我们", "常见问题", "联系我们"],
      contact: "联系方式",
      address: "新北市土城区中央路二段125号5楼",
      phone: "电话",
      fax: "传真",
      email: "电子邮箱",
      copyright: "版权所有 © 2025 义歆实业股份有限公司",
      chooseLang: "选择语言",
    },
    en: {
      company: "YiHsin Industrial Co., Ltd.",
      desc: "Specialized in sealing and packaging machines — quality and service are our commitment.",
      products: "Products",
      productsList: [
        "Beverage Cup Sealer",
        "Syrup Filling Machine",
        "Shaking Machine",
        "Lemon Pounding Machine",
        "Aluminum Lid Sealer",
        "Container Sealer",
        "Industrial Sealer"
      ],
      links: "Quick Links",
      linksList: ["About Us", "FAQ", "Contact Us"],
      contact: "Contact Info",
      address: "5F., No. 125, Sec. 2, Zhongyang Rd., Tucheng Dist., New Taipei City, Taiwan",
      phone: "Tel",
      fax: "Fax",
      email: "Email",
      copyright: "© 2025 Yihsin Industrial Co., Ltd. All Rights Reserved.",
      chooseLang: "Language",
    },
  };

  const t = text[lang] || text["zh-TW"];

  return (
    <footer className="footer-classic text-light">
      <div className="container py-5">
        <div className="row gy-4 gx-5 align-items-start">
         {/* 公司資訊 */}
        <div className="col-12 col-md-6 col-lg-3 text-center text-lg-start">
          {/* LOGO + 公司名 */}
          <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-2">
            <img
              src={`${import.meta.env.BASE_URL}images/logo/logo-1.png`}
              alt="義歆實業 YiHsin"
              className="footer-logo"
            />
            <h5 className="fw-bold text-accent mb-0">
              {t.company}
            </h5>
          </div>

          {/* 說明文字 */}
          <p className="small text-gray-200 mb-3">
            {t.desc}
          </p>

          {/* icon */}
          <div className="d-flex justify-content-center justify-content-lg-start gap-3">
            <a
              href="https://line.me/R/ti/p/@477fjgkd"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-circle"
              aria-label="LINE"
              onClick={() => {
                window.gtag("event", "line_click");
              }}
            >
              <i className="bi bi-line"></i>
            </a>

            <a
              href="mailto:yihsin1630@gmail.com"
              className="icon-circle"
              aria-label="Email"
              onClick={() => {
                window.gtag("event", "email_click");
              }}
            >
              <i className="bi bi-envelope"></i>
            </a>
          </div>
        </div>


         {/* 產品項目 */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-accent mb-3">{t.products}</h6>
            <ul className="list-unstyled small footer-list">
              {t.productsList.map((p, i) => (
                <li key={i}>
                  <Link
                    to={`/products?category=${encodeURIComponent(p)}`}
                    className="footer-link"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 快速連結 */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-accent mb-3">{t.links}</h6>
            <ul className="list-unstyled small footer-list">
            {t.linksList.map((l, i) => {
              let path = "#";

              if (l.includes("關於") || l.includes("关于") || l.includes("About")) {
                path = "/about";
              } else if (l.includes("常見") || l.includes("FAQ")) {
                path = "/faq";
              } else if (l.includes("聯絡") || l.includes("Contact")) {
                path = "/contact";
              }

              return (
                <li key={i}>
                  <Link to={path} className="footer-link">
                    {l}
                  </Link>
                </li>
              );
            })}
            </ul>

          </div>

          {/* 聯絡資訊 */}
          <div className="col-12 col-md-6 col-lg-5 small">
            <h6 className="fw-bold text-accent mb-3">{t.contact}</h6>
            <p className="mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>{t.address}
            </p>
            <p className="mb-2">
              <i className="bi bi-telephone-fill me-2"></i>{t.phone}：+886 900-008-608
            </p>
            <p className="mb-0">
              <i className="bi bi-envelope-fill me-2"></i>{t.email}：yihsin1630@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* 底部版權 + 語言選擇 */}
      <div className="footer-bottom">
        <div className="container py-3 d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-center">
          <small className="text-secondary">{t.copyright}</small>
          <div className="d-flex align-items-center gap-2">
            <span className="text-accent small d-none d-sm-inline">
              <i className="bi bi-globe2 me-1"></i>{t.chooseLang}
            </span>
            <select
              className="form-select form-select-sm lang-select w-auto"
              value={lang}
              onChange={handleLangChange}
            >
              <option value="zh-TW">繁體中文</option>
              <option value="zh-CN">简体中文</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
