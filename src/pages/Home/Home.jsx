import ProductShowcase from "../../components/ProductShowcase";
import { motion as Motion } from "framer-motion";


const Home = () => {
  const text = "餐飲開店最佳夥伴從銷售到售後全部搞定";
  const letters = text.split("");

  return (
    <>
      {/* banner */}
      <div className="banner p-3  text-primary-1000">
        <div className="container mt-7 container py-5 text-center text-primary-1000">
          <h1>
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
        專注於食品封口包裝及飲料門市桌上型機器
      </Motion.p>
    </div>
      </div>


      {/* 服務流程*/}
<section className="service-flow py-12">
  <div className="container">
    <h2 className="text-center fw-bold display-6 mb-8">服務流程</h2>

    <div className="row row-cols-1 row-cols-md-4 g-4 flow-grid">
      {/* Step 1 */}
      <div className="col">
        <div className="step-card h-100 connector">
          <span className="num-badge">1</span>
          <div className="icon-wrap"><i className="bi bi-person"></i></div>
          <h5 className="fw-bold text-primary-1000 mb-2">確認需求</h5>
          <p className="mb-0 small  text-primary-600">
            確認您所需的設備，欲封口的食材（飲料、便當、冷凍食品）、容器口徑、
            容器材質、使用場景（門市或工廠），以評估最合適方案。
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="col">
        <div className="step-card h-100 connector">
          <span className="num-badge">2</span>
          <div className="icon-wrap"><i className="bi bi-envelope"></i></div>
          <h5 className="fw-bold text-primary-1000 mb-2">聯繫我們</h5>
          <p className="mb-0 small text-primary-600">
            確認需求後，請直接聯繫我們的服務專員，我們會為您推薦適合的產品，
            並提供模具客製化服務。只要將您的容器樣品寄送給我們，
            我們會依照樣品開發專屬模具，並提供報價與運送資訊。
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="col">
        <div className="step-card h-100 connector">
          <span className="num-badge">3</span>
          <div className="icon-wrap"><i className="bi bi-truck"></i></div>
          <h5 className="fw-bold text-primary-1000 mb-2">到府教學</h5>
          <p className="mb-0 small text-primary-600">
            下單完成後，3–5 個工作天內（客製產品除外），
            我們會將產品送到您指定地點，並提供現場安裝、操作教學，
            以及簡易保養流程。
          </p>
        </div>
      </div>

      {/* Step 4 */}
      <div className="col">
        <div className="step-card h-100 connector-last">
          <span className="num-badge">4</span>
          <div className="icon-wrap"><i className="bi bi-gear"></i></div>
          <h5 className="fw-bold text-primary-1000 mb-2">售後保固維修</h5>
          <p className="mb-0 small text-primary-600">
            所有機種皆享有 1 年免費保固，後續的保養與維修服務，
            僅需一通電話或訊息即可獲得協助，確保機器持續穩定運作。
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


  {/* 產品項目 */}
    <ProductShowcase />

    </>
  );
};

export default Home;
