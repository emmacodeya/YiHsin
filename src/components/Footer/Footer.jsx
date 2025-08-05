const Footer = () => {
  return (
    <footer className="bg-primary-200 text-light py-4">
      <div className="container d-flex flex-wrap justify-content-between">
        {/* 公司介紹 */}
        <div className="">
          <h5 className="fs-3  text-primary-400 mb-5">義歆實業股份有限公司</h5>
          <p className="fs-6 text-primary-600">專營封口機、包裝設備，品質與服務是我們的堅持。</p>
          <div className="d-flex gap-2">
            {/* <img src="/line-icon.svg" alt="LINE" width="30" />
            <img src="/email-icon.svg" alt="Email" width="30" /> */}
          </div>
        </div>

        {/* 產品列表 */}
        <div className="text-primary-400 fs-4 ">
          <ul className="list-unstyled">
            <li className="pb-2">封罐機</li>
            <li className="pb-2">果糖機</li>
            <li className="pb-2">搖搖機</li>
            <li className="pb-2">榨檸檬機</li>
          </ul>
        </div>

        {/* 導覽列 */}
        <div className="text-primary-400 fs-4">
          <ul className="list-unstyled">
            <li className="pb-2">設備介紹</li>
            <li className="pb-2">關於我們</li>
            <li className="pb-2">常見問題</li>
            <li className="pb-2">聯絡我們</li>
            <li>選擇語言</li>
          </ul>
        </div>

        {/* 聯絡資訊 */}
        <div className="mt-5 text-primary-600 fs-5">
          <p className="pb-2"><i className="bi bi-geo-alt-fill me-2"></i>新北市土城區中央路二段121巷2號5樓</p>
          <p className="pb-2"><i className="bi bi-telephone-fill me-2"></i>02-2787-8000</p>
          <p className="pb-2"><i className="bi bi-printer-fill me-2"></i>02-2787-8000</p>
          <p><i className="bi bi-envelope-fill me-2"></i>yihsin1630@gmail.com</p>
        </div>
      </div>
      <div className="text-end text-primary-400  pe-4">
        Copyright © 2025 封口機 - 義歆實業股份有限公司
      </div>

      
    </footer>
  );
};

export default Footer;
