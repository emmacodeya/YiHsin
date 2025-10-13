import { useContext, useEffect, useRef, useState } from "react";
import { LangContext } from "../App";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Contact = () => {
  const { lang } = useContext(LangContext);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const t = {
    "zh-TW": {
      title: "聯絡我們",
      desc: "有任何產品問題或合作需求，歡迎使用下方表單或直接聯繫我們。",
      name: "姓名／公司名稱 *",
      email: "電子郵件 *",
      phone: "聯絡電話 *",
      message: "留言內容 *",
      submit: "送出訊息",
      infoTitle: "聯絡資訊",
      phoneLabel: "電話",
      emailLabel: "Email",
      addressLabel: "地址",
      hoursLabel: "服務時間",
      address: "新北市土城區中央路二段126號3樓",
      hours: "週一至週五 09:00–18:00",
      line: "加入 LINE",
      mail: "寄信給我們",
      sent: "已成功寄出！感謝您的聯絡！",
      fail: "寄信失敗，請稍後再試。",
      required: "欄位未填寫完畢！",
      phoneInvalid: "電話格式不正確，請輸入 09 開頭的手機號碼或市話！",
      emailInvalid: "電子郵件格式不正確！",
      msgInvalid: "留言內容不可為空！",
    },
    "zh-CN": {
      title: "联系我们",
      desc: "如有任何产品问题或合作需求，欢迎使用下方表单或直接与我们联系。",
      name: "姓名／公司名称 *",
      email: "电子邮箱 *",
      phone: "联系电话 *",
      message: "留言内容 *",
      submit: "发送讯息",
      infoTitle: "联系方式",
      phoneLabel: "电话",
      emailLabel: "邮箱",
      addressLabel: "地址",
      hoursLabel: "服务时间",
      address: "新北市土城区中央路二段126号3楼",
      hours: "周一至周五 09:00–18:00",
      line: "加入 LINE",
      mail: "发送邮件",
      sent: "已成功发送！感谢您的联系！",
      fail: "发送失败，请稍后重试。",
      required: "栏位未填写完毕！",
      phoneInvalid: "电话格式不正确，请输入以 09 开头的手机号或座机号！",
      emailInvalid: "电子邮箱格式不正确！",
      msgInvalid: "留言内容不能为空！",
    },
    en: {
      title: "Contact Us",
      desc: "If you have any questions or cooperation inquiries, please fill out the form below or contact us directly.",
      name: "Name / Company *",
      email: "Email *",
      phone: "Phone *",
      message: "Message *",
      submit: "Send Message",
      infoTitle: "Contact Info",
      phoneLabel: "Phone",
      emailLabel: "Email",
      addressLabel: "Address",
      hoursLabel: "Business Hours",
      address: "3F., No.126, Sec.2, Zhongyang Rd., Tucheng Dist., New Taipei City, Taiwan",
      hours: "Mon–Fri 09:00–18:00",
      line: "Add LINE",
      mail: "Send Email",
      sent: "Message sent successfully!",
      fail: "Failed to send, please try again.",
      required: "Please complete all required fields!",
      phoneInvalid: "Invalid phone number format!",
      emailInvalid: "Invalid email format!",
      msgInvalid: "Message cannot be empty!",
    },
  };

  const text = t[lang] || t["zh-TW"];

  useEffect(() => {
    document.title = `${text.title}｜義歆實業股份有限公司`;
  }, [lang, text.title]);

  // 驗證函式
  const validateField = (name, value) => {
    let errorMsg = "";

    if (!value.trim()) {
      errorMsg = text.required;
    } else {
      switch (name) {
        case "user_email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            errorMsg = text.emailInvalid;
          break;
        case "user_phone":
          if (!/^(09\d{8}|0\d{1,2}-?\d{6,8})$/.test(value))
            errorMsg = text.phoneInvalid;
          break;
        case "message":
          if (value.trim().length === 0) errorMsg = text.msgInvalid;
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  // 即時驗證
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // 送出表單
  const handleSendEmail = (e) => {
    e.preventDefault();
    const form = e.target;

    const fields = ["user_name", "user_email", "user_phone", "message"];
    const allValid = fields.every((field) =>
      validateField(field, form[field].value)
    );

    if (!allValid) {
      Swal.fire({
        icon: "warning",
        text: text.required,
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);

    const SERVICE_ID = "service_yihsin1630";
    const TEMPLATE_ID = "template_op10jbx";
    const PUBLIC_KEY = "J4zGrb2tDWXbBTPyq";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "寄出成功",
            text: text.sent,
            confirmButtonColor: "#3085d6",
          });
          form.reset();
          setErrors({ name: "", email: "", phone: "", message: "" });
        },
        () => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "寄信失敗",
            text: text.fail,
            confirmButtonColor: "#d33",
          });
        }
      );
  };

  return (
    <section className="hot-section py-lg-12 py-5">
      <div className="container">
        {/* 標題 */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-6 mb-5 text-primary-100">{text.title}</h1>
          <p className="text-primary-200">{text.desc}</p>
        </div>

        <div className="row g-5 align-items-start ">
          {/* 左側表單 */}
          <div className="col-lg-6">
            <form
              ref={formRef}
              onSubmit={handleSendEmail}
              className="p-4 rounded-3 shadow-sm bg-gray-200"
            >
              {/* 姓名／公司 */}
              <div className="mb-3">
                <label className="form-label fw-bold text-primary-100">{text.name}</label>
                <input
                  type="text"
                  name="user_name"
                  className={`form-control text-primary-100 ${
                    errors.user_name ? "border border-danger" : ""
                  }`}
                  onChange={handleInputChange}
                />
                {errors.user_name && (
                  <small className="text-danger">{errors.user_name}</small>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-bold text-primary-100">{text.email}</label>
                <input
                  type="email"
                  name="user_email"
                  className={`form-control text-primary-100 ${
                    errors.user_email ? "border border-danger" : ""
                  }`}
                  onChange={handleInputChange}
                />
                {errors.user_email && (
                  <small className="text-danger">{errors.user_email}</small>
                )}
              </div>

              {/* 電話 */}
              <div className="mb-3">
                <label className="form-label fw-bold text-primary-100">{text.phone}</label>
                <input
                  type="tel"
                  name="user_phone"
                  className={`form-control text-primary-100 ${
                    errors.user_phone ? "border border-danger" : ""
                  }`}
                  onChange={handleInputChange}
                />
                {errors.user_phone && (
                  <small className="text-danger">{errors.user_phone}</small>
                )}
              </div>

              {/* 留言 */}
              <div className="mb-3">
                <label className="form-label fw-bold text-primary-100">{text.message}</label>
                <textarea
                  name="message"
                  rows="5"
                  className={`form-control text-primary-100 ${
                    errors.message ? "border border-danger" : ""
                  }`}
                  placeholder={text.message}
                  onChange={handleInputChange}
                ></textarea>
                {errors.message && (
                  <small className="text-danger">{errors.message}</small>
                )}
              </div>

              {/* 按鈕 */}
              <button
                type="submit"
                className="btn btn-outline-primary-100 rounded-pill px-lg-4 py-lg-2 
                          px-lg-2 py-lg-1 fw-bold"
                style={{ fontSize: "0.9rem", width: "auto" }}
                disabled={loading}
              >
                {loading ? "⏳ 送出中..." : text.submit}
              </button>
            </form>
          </div>

          {/* 右側聯絡資訊 */}
          <div className="col-lg-6">
            <div className="p-4 bg-gray-200 rounded-3 shadow-sm text-primary-100">
              <h4 className="fw-bold mb-3">{text.infoTitle}</h4>
              <p className="mb-2">{text.phoneLabel}：0900-008-608</p>
              <p className="mb-2">{text.emailLabel}：yihsin1630@gmail.com</p>
              <p className="mb-2">{text.addressLabel}：{text.address}</p>
              <p className="mb-3">{text.hoursLabel}：{text.hours}</p>
              <a
                href="https://line.me/R/ti/p/@477fjgkd"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success rounded-pill px-lg-4 py-lg-2 
                          px-lg-2 py-lg-1 fw-bold me-2"
              >
                <i className="bi bi-line me-1"></i> {text.line}
              </a>
              <a href="mailto:yihsin1630@gmail.com" className="btn btn-primary-100 rounded-pill px-lg-4 py-lg-2 
                          px-lg-2 py-lg-1 fw-bold">
                <i className="bi bi-envelope me-1"></i> {text.mail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
