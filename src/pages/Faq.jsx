import { useEffect, useState, useContext } from "react";
import { LangContext } from "../App";
import FloatingButtons from "../components/FloatingButtons";

const Faq = () => {
  const { lang } = useContext(LangContext);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/faq")
      .then((res) => res.json())
      .then((data) => setFaqData(data[0][lang] || []))
      .catch((err) => console.error("載入 FAQ 失敗:", err));
  }, [lang]);

  if (!faqData.length) return <section className="about-section"></section>;

  return (
    <>
      <section className="bg-gray-200 py-lg-12 py-5">
        <div className="container text-center">
          <h2 className="fw-bold display-6 mb-5 text-primary-100">
            常見 Q&A
          </h2>

          <div className="d-flex flex-column align-items-center gap-4">
            {faqData.map((item, i) => (
              <div
                key={i}
                className="faq-card bg-white rounded-4 shadow-sm p-4 text-start w-100"
                style={{ maxWidth: "800px" }}
              >
                <h5 className="fw-bold text-primary-100 mb-3">
                  <span className="me-2 text-primary-600">Q{i + 1}.</span>
                  {item.q}
                </h5>
                <p className="mb-0 text-primary-1000" style={{ whiteSpace: "pre-line" }}>
                  <span className="fw-bold text-danger">A{i + 1}.</span>
                  <br />
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
};

export default Faq;
