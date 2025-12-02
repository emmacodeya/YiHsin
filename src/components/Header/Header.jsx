import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LangContext } from "../../App";

const Header = () => {
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();

  const text = {
    "zh-TW": {
      company: "義歆實業股份有限公司",
      home: "首頁",
      products: "產品項目",
      used: "精選中古機",
      news: "最新消息",
      partners: "尋找合作夥伴",
      contact: "聯繫我們",
      gmail: "電子信箱",
      line: "官方LINE",
      phone: "電話",
    },
    "zh-CN": {
      company: "义歆实业股份有限公司",
      home: "首页",
      products: "产品项目",
      used: "精选中古机",
      news: "最新消息",
      partners: "寻找合作伙伴",
      contact: "联系我们",
      gmail: "邮箱",
      line: "官方LINE",
      phone: "电话",
    },
    en: {
      company: "YiHsin Industrial Co., Ltd.",
      home: "Home",
      products: "Products",
      used: "Used Machines",
      news: "News",
      partners: "Partners",
      contact: "Contact Us",
      gmail: "Email",
      line: "LINE",
      phone: "Phone",
    },
  };

  const t = text[lang] || text["zh-TW"];

  return (
    <nav className="navbar navbar-expand-lg py-3 navbar-classic">
      <div className="container-fluid">
        {/* 公司名稱 */}
        <NavLink to="/" className="navbar-brand fs-4">
          {t.company}
        </NavLink>

        {/* 漢堡選單 */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 導覽列 + 聯絡資訊 */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* 中間導覽列 */}
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                {t.home}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                {t.products}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/news" className="nav-link">
                {t.news}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/partners" className="nav-link">
                {t.partners}
              </NavLink>
            </li>
          </ul>

          {/* ✅ 右邊聯繫資訊 */}
          <div className="text-end small contact-info mt-lg-0 mt-2">
            {/* 桌機版 */}
            <div className="d-none d-md-flex gap-4 justify-content-end">
              {/* 聯絡我們 (電話) */}
              <div className="text-center">
                <p className="fw-bold">{t.contact}</p>
                <button
                  className="btn btn-link p-0 text-decoration-none text-primary-1000"
                  onClick={() => {
                    window.gtag('event', 'phone_click');
                    navigate("/contact");
                  }}
                >
                  +886 900-008-608
                </button>
              </div>

              {/* Gmail */}
              <div className="text-center">
                <p className="fw-bold">{t.gmail}</p>
                <a
                  href="mailto:yihsin1630@gmail.com"
                  className="text-decoration-none text-primary-1000"
                  onClick={() => {
                    window.gtag('event', 'email_click');
                  }}
                >
                  yihsin1630@gmail.com
                </a>
              </div>

              {/* LINE */}
              <div className="text-center">
                <p className="fw-bold">{t.line}</p>
                <a
                  href="https://line.me/R/ti/p/@477fjgkd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary-1000"
                  onClick={() => {
                    window.gtag('event', 'line_click');
                  }}
                >
                  @477fjgkd
                </a>
              </div>
            </div>

            {/* 手機版：折疊式 */}
            <div className="d-md-none">
              <button
                className="btn btn-primary-1000 w-50 fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#contactCollapse"
              >
                {t.contact}
              </button>

              <div className="collapse mt-2" id="contactCollapse">
                <div className="text-center bg-primary-200 text-white py-2 rounded">
                  <p className="mb-1">
                    {t.phone}：
                    <a
                      href="tel:0900008608"
                      className="text-white text-decoration-none"
                      onClick={() => {
                    window.gtag('event', 'phone_click');
                    navigate("/contact");
                  }}
                    >
                      +886 900-008-608
                    </a>
                  </p>
                  <p className="mb-1">
                    {t.gmail}：
                    <a
                      href="mailto:yihsin1630@gmail.com"
                      className="text-white text-decoration-none"
                      onClick={() => {
                    window.gtag('event', 'email_click');
                  }}
                    >
                      yihsin1630@gmail.com
                    </a>
                  </p>
                  <p className="mb-0">
                    {t.line}：
                    <a
                      href="https://line.me/R/ti/p/@477fjgkd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-link text-white text-decoration-none p-0"
                      onClick={() => {
                      window.gtag('event', 'line_click');
                      }}
                    >
                      @477fjgkd
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
