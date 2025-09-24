import React from "react";

const Footer = () => {
  return (
    <footer className="footer-classic text-light mt-5">
      <div className="container py-5">
        <div className="row gy-4 gx-5 align-items-start">
          {/* 公司資訊 */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold text-accent mb-2">義歆實業股份有限公司</h5>
            <p className="small text-secondary mb-3">
              專營封口機、包裝設備，品質與服務是我們的堅持。
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="icon-circle" aria-label="LINE">
                <i className="bi bi-line"></i>
              </a>
              <a
                href="mailto:yihsin1630@gmail.com"
                className="icon-circle"
                aria-label="Email"
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>

          {/* 產品項目 */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-accent mb-3">產品項目</h6>
            <ul className="list-unstyled small footer-list">
              <li><a href="#" className="footer-link">封口機</a></li>
              <li><a href="#" className="footer-link">封罐機</a></li>
              <li><a href="#" className="footer-link">果糖機</a></li>
              <li><a href="#" className="footer-link">搖搖機</a></li>
              <li><a href="#" className="footer-link">檸檬機</a></li>
            </ul>
          </div>

          {/* 快速連結 */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-accent mb-3">快速連結</h6>
            <ul className="list-unstyled small footer-list">
              <li><a href="/about-us" className="footer-link">關於我們</a></li>
              <li><a href="#" className="footer-link">常見問題</a></li>
              <li><a href="#" className="footer-link">聯絡我們</a></li>
            </ul>
          </div>

          {/* 聯絡資訊 */}
          <div className="col-12 col-md-6 col-lg-5 small">
            <h6 className="fw-bold text-accent mb-3">聯絡資訊</h6>
            <p className="mb-2"><i className="bi bi-geo-alt-fill me-2"></i>新北市土城區中央路二段121巷2號5樓</p>
            <p className="mb-2"><i className="bi bi-telephone-fill me-2"></i>02-2787-8000</p>
            <p className="mb-2"><i className="bi bi-printer-fill me-2"></i>02-2787-8000</p>
            <p className="mb-0"><i className="bi bi-envelope-fill me-2"></i>yihsin1630@gmail.com</p>
          </div>
        </div>
      </div>

      {/* 版權 + 語言選單（右側） */}
      <div className="footer-bottom">
        <div className="container py-3 d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-center">
          <small className="text-secondary">
            Copyright © 2025 義歆實業股份有限公司. All Rights Reserved.
          </small>

          <div className="d-flex align-items-center gap-2">
            <span className="text-accent small d-none d-sm-inline">
              <i className="bi bi-globe2 me-1"></i>選擇語言
            </span>
            <select
              className="form-select form-select-sm lang-select w-auto"
              defaultValue="zh-TW"
              aria-label="Language"
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
