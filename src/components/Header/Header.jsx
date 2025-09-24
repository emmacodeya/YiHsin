import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg py-3 navbar-classic">
      <div className="container-fluid">
        {/* 公司名稱 */}
        <NavLink to="/" className="navbar-brand fs-4">
          義歆實業股份有限公司
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
                首頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                產品項目
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/usedmachine" className="nav-link">
                精選中古機
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/news" className="nav-link">
                最新消息
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/partners" className="nav-link">
                尋找合作夥伴
              </NavLink>
            </li>
          </ul>

          {/* 右邊聯繫資訊 */}
          <div className="text-end small d-flex gap-4 contact-info">
            <div className="text-center">
              <p className="fw-bold">聯繫我們</p>
              <p>0900-008-608</p>
            </div>
            <div className="text-center">
              <p className="fw-bold">Gmail</p>
              <p>yihsin1630@gmail.com</p>
            </div>
            <div className="text-center">
              <p className="fw-bold">LINE</p>
              <p>0900008608</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
