import { useContext, useEffect, useRef, useState } from "react";
import { LangContext } from "../App";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Select from "react-select";
import FloatingButtons from "../components/FloatingButtons";

const Contact = () => {
  const { lang } = useContext(LangContext);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
  const title =
    lang === "en"
      ? "Contact Us｜YiHsin Industrial"
      : lang === "zh-CN"
      ? "联系我们｜义歆实业"
      : "聯絡我們｜義歆實業";

  const description =
    lang === "en"
      ? "Contact YiHsin Industrial for sealing machines, aluminum lid sealing machines, fructose dispensers, and shaker machines. We provide installation, sales, warranty, and maintenance services across Taiwan."
      : lang === "zh-CN"
      ? "如需封口机、铝盖封口机、果糖机或摇摇机设备，欢迎联系义歆实业，我们提供全台安装、销售、保固和维修服务。"
      : "如需封口機、鋁蓋封口機、果糖機或搖搖機設備，歡迎聯絡義歆實業，我們提供全台安裝、銷售、保固與維修服務。";

  document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  metaDesc?.setAttribute("content", description);
}, [lang]);


  // 抓取國家資料
 useEffect(() => {
  const fetchCountries = async () => {
    try {
      const res = await fetch("/YiHsin/db.json");
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      const langKey = lang === "en" ? "en" : lang === "zh-CN" ? "zh-CN" : "zh-TW";

      const countryList = data.countries?.[0]?.[langKey] || [];
      setCountries(countryList);

    } catch (err) {
      console.error("Error fetching countries:", err);
      setCountries([]);
    }
  };

  fetchCountries();
}, [lang]);

  // 多語內容
  const t = {
    "zh-TW": {
      title: "聯絡我們",
      desc: "若有任何產品疑問、報價或維修需求，請使用下方表單或透過聯絡方式與我們聯繫。",
      info: [
        { icon: "bi-telephone-fill", title: "聯絡電話", value: "+886 900-008-608" },
        { icon: "bi-clock-fill", title: "服務時間", value: "週一至週五 09:00–18:00" },
        { icon: "bi-geo-alt-fill", title: "公司地址", value: "新北市土城區中央路二段125號5樓" },
      ],
      name: "姓名／公司名稱 *",
      email: "電子郵件 *",
      phone: "聯絡電話 *",
      model: "詢問機種 *",
      industry: "行業 *",
      address: "聯絡地址 *",
      country: "國家 *",
      message: "留言內容 *",
      submit: "送出訊息",
      line: "加入 LINE",
      mail: "寄信給我們",
      sentTitle: "寄出成功！",
      sent: "感謝您的來信，我們將盡快回覆。",
      fail: "寄信失敗，請稍後再試。",
      required: "請填寫所有必填欄位！",
      emailInvalid: "電子郵件格式不正確！",
      phoneInvalid: "電話格式不正確！",
      models: ["封口機", "封罐機", "果糖機", "搖搖機", "檸檬機", "其他"],
    },
    "zh-CN": {
      title: "联系我们",
      desc: "如有任何产品疑问、报价或维修需求，请使用下方表单或通过联系方式与我们联系。",
      info: [
        { icon: "bi-telephone-fill", title: "联系电话", value: "+886 900-008-608" },
        { icon: "bi-clock-fill", title: "服务时间", value: "周一至周五 09:00–18:00" },
        { icon: "bi-geo-alt-fill", title: "公司地址", value: "新北市土城区中央路二段125号5楼" },
      ],
      name: "姓名／公司名称 *",
      email: "电子邮箱 *",
      phone: "联系电话 *",
      model: "询问机种 *",
      industry: "行业 *",
      address: "联系地址 *",
      country: "国家 *",
      message: "留言内容 *",
      submit: "发送讯息",
      line: "加入 LINE",
      mail: "发送邮件",
      sentTitle: "发送成功！",
      sent: "感谢您的来信，我们将尽快回复。",
      fail: "发送失败，请稍后再试。",
      required: "请填写所有必填栏位！",
      emailInvalid: "电子邮箱格式不正确！",
      phoneInvalid: "电话号码格式不正确！",
      models: ["封口机", "封罐机", "果糖机", "摇摇机", "柠檬机", "其他"],
    },
    en: {
      title: "Contact Us",
      desc: "For any inquiries or cooperation, please fill in the form below or contact us directly.",
      info: [
        { icon: "bi-telephone-fill", title: "Telephone", value: "+886 900-008-608" },
        { icon: "bi-clock-fill", title: "Service Hours", value: "Mon–Fri 9:00–18:00" },
        { icon: "bi-geo-alt-fill", title: "Address", value: "5F., No. 125, Sec. 2, Zhongyang Rd., Tucheng Dist., New Taipei City, Taiwan" },
      ],
      name: "Name / Company *",
      email: "Email *",
      phone: "Phone *",
      model: "Model of Interest *",
      industry: "Industry *",
      address: "Address *",
      country: "Country *",
      message: "Message *",
      submit: "Send Message",
      line: "Add LINE",
      mail: "Send Email",
      sentTitle: "Message Sent!",
      sent: "Thank you for contacting us. We'll get back to you soon.",
      fail: "Failed to send. Please try again later.",
      required: "Please complete all required fields!",
      emailInvalid: "Invalid email format!",
      phoneInvalid: "Invalid phone number format!",
      models: ["Cup Sealer", "Can Sealer", "Fructose Dispenser", "Shaking Machine", "Lemon Squeezer", "Other"],
    },
  };

  const text = t[lang] || t["zh-TW"];


  const validateField = (name, value) => {
    let msg = "";
    if (!value?.trim()) msg = text.required;
    else if (name === "user_email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = text.emailInvalid;
    else if (name === "user_phone" && !/^(09\d{8}|0\d{1,2}-?\d{6,8})$/.test(value)) msg = text.phoneInvalid;
    setErrors((prev) => ({ ...prev, [name]: msg }));
    return msg === "";
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const form = e.target;

    const normalFields = ["user_name", "user_email", "user_phone", "industry", "address", "message"];
    const allNormalValid = normalFields.every((f) => validateField(f, form[f]?.value || ""));
    const modelValid = !!selectedModel;
    const countryValid = !!selectedCountry;

    if (!modelValid) setErrors((prev) => ({ ...prev, model: text.required }));
    if (!countryValid) setErrors((prev) => ({ ...prev, country: text.required }));

    if (!(allNormalValid && modelValid && countryValid)) {
      Swal.fire({ icon: "warning", text: text.required, confirmButtonColor: "#b39a84" });
      return;
    }

    setLoading(true);
    emailjs
      .sendForm("service_yihsin1630", "template_op10jbx", formRef.current, "J4zGrb2tDWXbBTPyq")
      .then(
        () => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: text.sentTitle,
            text: text.sent,
            background: "#f3fff5",
            color: "#0A1E54",
            confirmButtonColor: "#0A1E54",
            iconColor: "#6bcf81",
          });
          form.reset();
          setSelectedModel(null);
          setSelectedCountry(null);
          setErrors({});
        },
        () => {
          setLoading(false);
          Swal.fire({ icon: "error", title: "Oops!", text: text.fail, confirmButtonColor: "#d33" });
        }
      );
  };

  return (
    <>
      <section className="contact-layout">
        <div className="container-fluid p-0">
          <div className="row g-0">
            {/* 左側資訊 */}
            <div className="col-12 col-lg-5 contact-left text-light py-5 d-flex flex-column align-items-center justify-content-center">
              <h2 className="fw-bold mb-4 text-center">{text.title}</h2>
              <p className="mb-5 px-4 text-center small opacity-75">{text.desc}</p>

              <div className="contact-cards d-flex flex-column align-items-center gap-4 w-100 mx-auto" style={{ maxWidth: "380px" }}>
                {text.info.map((item, i) => (
                  <div className="contact-card" key={i}>
                    <div className="icon-wrap">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <h6 className="fw-bold mt-2">{item.title}</h6>
                    <p className="mb-0 small">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 右側表單 */}
            <div className="col-12 col-lg-7 contact-right py-5 px-lg-5">
              <div className="contact-form mx-auto text-start p-4 rounded-4 shadow">
                <form ref={formRef} onSubmit={handleSendEmail}>
                  {[
                    { name: "user_name", label: text.name, type: "text" },
                    { name: "user_email", label: text.email, type: "email" },
                    { name: "user_phone", label: text.phone, type: "tel" },
                    { name: "industry", label: text.industry, type: "text" },
                    { name: "address", label: text.address, type: "text" },
                  ].map((f, i) => (
                    <div className="mb-3" key={i}>
                      <label className="form-label fw-bold text-primary-100">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        className={`form-control text-primary-100 ${errors[f.name] ? "is-invalid" : ""}`}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                      />
                      {errors[f.name] && (
                        <small className="text-danger fade-in">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {errors[f.name]}
                        </small>
                      )}
                    </div>
                  ))}

                  {/* 詢問機種 */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary-100">{text.model}</label>
                    <Select
                      name="model"
                      options={text.models.map((m) => ({ label: m, value: m }))}
                      value={selectedModel}
                      onChange={(val) => setSelectedModel(val)}
                      placeholder={lang === "en" ? "Select model..." : lang === "zh-CN" ? "请选择机种" : "請選擇機種"}
                      classNamePrefix="react-select"
                    />
                  </div>

                  {/* 國家 */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary-100">{text.country}</label>
                    <Select
                      name="country"
                      options={countries}
                      value={selectedCountry}
                      onChange={(val) => setSelectedCountry(val)}
                      placeholder={lang === "en" ? "Select country..." : lang === "zh-CN" ? "请选择国家" : "請選擇國家"}
                      classNamePrefix="react-select"
                    />
                  </div>

                  {/* 留言 */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary-100">{text.message}</label>
                    <textarea
                      name="message"
                      rows="5"
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      onBlur={(e) => validateField("message", e.target.value)}
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn send-btn" disabled={loading}>
                      {loading ? (
                        <>
                          <i className="bi bi-arrow-repeat spin me-2"></i>
                          {lang === "en" ? "Sending..." : lang === "zh-CN" ? "发送中..." : "送出中..."}
                        </>
                      ) : (
                        text.submit
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* 下方快速按鈕 */}
              <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">
                <a href="https://line.me/R/ti/p/@477fjgkd" target="_blank" rel="noreferrer" className="btn btn-line rounded-pill px-4 py-2 fw-bold">
                  <i className="bi bi-line me-1"></i> {text.line}
                </a>
                <a href="mailto:yihsin1630@gmail.com" className="btn btn-mail rounded-pill px-4 py-2 fw-bold">
                  <i className="bi bi-envelope me-1"></i> {text.mail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FloatingButtons />
    </>
  );
};

export default Contact;
