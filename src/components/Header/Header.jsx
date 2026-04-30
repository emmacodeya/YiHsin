import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LangContext } from "../../App";

const Header = () => {
  const { lang } = useContext(LangContext);

  const text = {
    "zh-TW": {
      company: "義歆實業股份有限公司",
      home: "首頁",
      products: "產品項目",
      used: "精選中古機",
      news: "最新消息",
      partners: "尋找合作夥伴",
      cases: "合作案例",
      contact: "聯繫我們",
      line: "官方LINE",
      tel: "市話",
      mobile: "服務專員",
    },
    "zh-CN": {
      company: "义歆实业股份有限公司",
      home: "首页",
      products: "产品项目",
      used: "精选中古机",
      news: "最新消息",
      partners: "寻找合作伙伴",
      cases: "合作案例",
      contact: "联系我们",
      line: "官方LINE",
      tel: "座机",
      mobile: "客服专员",
    },
    en: {
      company: "YiHsin Industrial Co., Ltd.",
      home: "Home",
      products: "Products",
      used: "Used Machines",
      news: "News",
      partners: "Partners",
      cases: "Cases", 
      contact: "Contact Us",
      gmail: "Email",
      tel: "Tel",
      mobile: "Customer Service Specialist",
    },
  };

  const t = text[lang] || text["zh-TW"];

  return (
    <nav className="navbar navbar-expand-lg py-3 navbar-classic">
      <div className="container-fluid">
        {/* LOGO + 公司名稱 */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
         <img
            src="/images/logo/logo-1.png"
            alt="義歆實業"
            className="navbar-logo"
          />
          <span className="fw-bold d-none d-lg-inline">
            {t.company}
          </span>
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
            <li className="nav-item">
            <NavLink to="/cases" className="nav-link">
              {t.cases}
            </NavLink>
          </li>
          </ul>

          {/* ✅ 右邊聯繫資訊 */}
          <div className="text-end small contact-info mt-lg-0 mt-2">
            {/* 桌機版 */}
            <div className="d-none d-md-flex gap-4 justify-content-end">
              
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

                {/* 服務專員電話 */}
                <div className="text-center">
                  <p className="fw-bold">{t.mobile}</p>
                  <a
                    href="tel:+886900008608"
                    className="text-decoration-none text-primary-1000"
                    onClick={() => {
                      window.gtag('event', 'mobile_click');
                    }}
                  >
                    +886 900-008-608
                  </a>
                </div>

                {/* 市話 */}
                <div className="text-center">
                  <p className="fw-bold">{t.tel}</p>
                  <a
                    href="tel:022260-7800#9"
                    className="text-decoration-none text-primary-1000"
                    onClick={() => {
                      window.gtag('event', 'tel_click');
                    }}
                  >
                    02 2260-7800#9
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
                    {t.line}：
                    <a
                      href="https://line.me/R/ti/p/@477fjgkd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-decoration-none"
                      onClick={() => {
                      window.gtag('event', 'line_click');
                      }}
                    >
                      @477fjgkd
                    </a>
                  </p>
                  {/* 服務專員（手機） */}
                  <p className="mb-1">
                    {t.mobile}：
                    <a
                      href="tel:+886900008608"
                      className="text-white text-decoration-none"
                      onClick={() => {
                        window.gtag('event', 'mobile_click');
                      }}
                    >
                      +886 900-008-608
                    </a>
                  </p>
                  {/* 市話 */}
                  <p className="mb-0">
                    {t.tel}：
                    <a
                      href="tel:+886212345678"
                      className="text-white text-decoration-none"
                      onClick={() => {
                        window.gtag('event', 'tel_click');
                      }}
                    >
                      (02) 1234-5678
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
