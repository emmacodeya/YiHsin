const Header = () => {
  return (
    <header className=" bg-primary-200 text-primary-400 py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-3 mb-2 mb-lg-0">
          義歆實業股份有限公司
        </div>

        <nav className="d-flex justify-content-center gap-10 flex-wrap">
          <a href="#" className="text-primary-400 text-decoration-none fw-bold fs-5">首頁</a>
          <a href="#" className="text-primary-400 text-decoration-none fw-bold fs-5">產品項目</a>
          <a href="#" className="text-primary-400 text-decoration-none fw-bold fs-5">最新消息</a>
          <a href="#" className="text-primary-400 text-decoration-none fw-bold fs-5">尋找合作夥伴</a>
        </nav>

        <div className="text-end  text-primary-400 small  d-flex gap-4">
          <div className=" text-center">
            <p>聯繫我們</p>
            <p>02-2787-8000</p>
          </div>
          <div className="text-center">
            <p>Gmail</p>
            <p>yihsin1630@gmail.com</p>
          </div>
          <div className="text-center">
            <p>LINE</p>
            <p>nani123123</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
