import { useContext, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { LangContext } from "../App";
import FloatingButtons from "../components/FloatingButtons";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Partners = () => {
  const { lang } = useContext(LangContext);

  const text = {
    "zh-TW": {
      heroTitle: "成為 YODO 全球合作夥伴",
      heroSubtitle: "一起打造世界級餐飲設備服務平台",
      intro1:
        "義歆實業股份有限公司專注於代理與推廣 YODO鎧瑋品牌餐飲設備，產品涵蓋封口機、果糖機、搖搖機、暴打檸檬機、鋁蓋封口機及產業型封口機等，廣泛應用於全球各地的飲料連鎖品牌與餐飲行業。",
      intro2:
        "為了提供更完善的在地化服務，我們誠摯邀請全球各地優質經銷商加入我們的合作網絡，共同開拓市場、共享資源，攜手打造世界級的餐飲設備服務平台。",
      inviteTitle: "全球合作夥伴招募中",
      inviteSubtitle:
        "我們誠摯邀請全球各地優質經銷商加入我們的合作網絡，攜手開創世界級餐飲設備新價值。",
      offerTitle: "我們能為經銷商提供",
      ctaTitle: "我們期待與您合作，共創雙贏！",
      ctaSubtitle:
        "立即與我們聯繫，加入 YODO 鎧瑋全球經銷網絡，攜手開創更廣闊的市場版圖。",
      contactBtn: "聯絡我們",
      offers: [
        ["bi bi-award", "高品質產品", "研發創新，穩定耐用。"],
        ["bi bi-graph-up-arrow", "市場支持", "提供產品培訓、銷售資源與行銷物料。"],
        ["bi bi-tools", "售後保障", "完整技術支援、維修保養與零件供應。"],
        ["bi bi-shuffle", "合作彈性", "依市場狀況制定靈活的經銷策略。"],
      ],
    },
    "zh-CN": {
      heroTitle: "成为 YODO 全球合作伙伴",
      heroSubtitle: "携手打造世界级餐饮设备服务平台",
      intro1:
        "义歆实业股份有限公司专注于代理与推广 YODO鎧瑋品牌餐饮设备，产品涵盖封口机、果糖机、摇摇机、暴打柠檬机、铝盖封口机及产业型封口机等，广泛应用于全球各地的饮料连锁品牌与餐饮行业。",
      intro2:
        "为了提供更完善的本地化服务，我们诚挚邀请全球各地优质经销商加入我们的合作网络，共同开拓市场、共享资源。",
      inviteTitle: "全球合作伙伴招募中",
      inviteSubtitle: "诚邀全球经销商加入，携手拓展餐饮设备新蓝海。",
      offerTitle: "我们能为经销商提供",
      ctaTitle: "期待与您合作，共创双赢！",
      ctaSubtitle: "立即联系我们，加入 YODO 全球经销网络。",
      contactBtn: "联系我们",
      offers: [
        ["bi bi-award", "高品质产品", "研发创新，稳定耐用。"],
        ["bi bi-graph-up-arrow", "市场支持", "提供培训、销售资源与营销物料。"],
        ["bi bi-tools", "售后保障", "完整技术支持与零件供应。"],
        ["bi bi-shuffle", "合作弹性", "根据市场制定灵活策略。"],
      ],
    },
    en: {
      heroTitle: "Become a Global YODO Partner",
      heroSubtitle: "Join us in building a world-class food equipment network",
      intro1:
        "Yihsin Industrial Co., Ltd. specializes in distributing and promoting YODO Kaiwei catering equipment. Our products include sealing machines, fructose dispensers, shakers, lemon smashers, and aluminum lid sealers, widely used by global beverage brands.",
      intro2:
        "To provide better localized service, we sincerely invite outstanding distributors worldwide to join our partnership network and expand the market together.",
      inviteTitle: "Global Partnership Invitation",
      inviteSubtitle:
        "Join us to develop and share opportunities in the global food equipment industry.",
      offerTitle: "We Provide Our Partners With",
      ctaTitle: "Let’s Create Success Together!",
      ctaSubtitle:
        "Contact us today to join the YODO global distributor network.",
      contactBtn: "Contact Us",
      offers: [
        ["bi bi-award", "High-Quality Products", "Innovative, durable, and reliable."],
        ["bi bi-graph-up-arrow", "Market Support", "Training, sales tools, and marketing materials."],
        ["bi bi-tools", "After-Sales Service", "Technical support and spare parts supply."],
        ["bi bi-shuffle", "Flexible Partnership", "Adaptable strategies for each market."],
      ],
    },
  };

    useEffect(() => {
  const title =
    lang === "en"
      ? "Partners｜Yihsin Industrial"
      : lang === "zh-CN"
      ? "合作伙伴｜义歆实业"
      : "合作夥伴｜義歆實業";

  const description =
    lang === "en"
      ? "Become a Yihsin Industrial global partner. Join us in building a world-class food sealing equipment service platform."
      : lang === "zh-CN"
      ? "成为义歆实业全球合作伙伴，与我们一起打造世界级的食品封口设备服务平台。"
      : "成為義歆實業全球合作夥伴，一起打造世界級的食品封口設備服務平台。";

  document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  metaDesc?.setAttribute("content", description);
}, [lang]);


  

  const t = text[lang];

   return (
    <>
      {/* === Hero === */}
      <section className="partners-hero text-center text-white d-flex align-items-center justify-content-center position-relative">
        <div className="container py-5">
          <Motion.h1
            className="hero-title mb-3"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {lang === "zh-TW" && (
              <>
                成為 <span className="brand-font display-2 flip">YODO</span> 全球合作夥伴
              </>
            )}
            {lang === "zh-CN" && (
              <>
                成为 <span className="brand-font display-2 flip">YODO</span> 全球合作伙伴
              </>
            )}
            {lang === "en" && (
              <>
                Become a Global Partner of{" "}
                <span className="brand-font display-2 flip">YODO</span>
              </>
            )}
          </Motion.h1>

          <Motion.p
            className="hero-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            {t.heroSubtitle}
          </Motion.p>
        </div>

        <div className="curve-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#fff" d="M0,256 C360,320 1080,160 1440,240 L1440,320 L0,320 Z" />
          </svg>
        </div>
      </section>

     {/* === 品牌介紹 === */}
<section className="partners-intro text-center text-md-start position-relative">
  {/* 背景圖獨立放在整區底層 */}
  <div className="intro-bg"></div>

  <div className="container position-relative">
    <div className="row align-items-center g-4">
      {/* 左邊：品牌文字 */}
      <div className="col-md-6">
        <Motion.div
          className="intro-text"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            {lang === "zh-TW" && "關於義歆"}
            {lang === "zh-CN" && "关于义歆"}
            {lang === "en" && "About Yihsin"}
          </h2>
          <p className="mb-3">{t.intro1}</p>
          <p>{t.intro2}</p>
        </Motion.div>
      </div>

      {/* 右邊：空白占位，維持結構比例 */}
      <div className="col-md-6 d-none d-md-block"></div>
    </div>
  </div>
</section>



      {/* === 統一背景區 === */}
      <section className="partners-section">
        {/* 全球邀請 */}
        <div className="partners-invite">
          <div className="container text-start">
            <Motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {t.inviteTitle}
            </Motion.h2>
            <Motion.p
              className="lead mb-0"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ delay: 0.2 }}
            >
              {t.inviteSubtitle}
            </Motion.p>
          </div>
        </div>

        {/* 合作優勢 */}
        <div className="partners-advantages">
          <div className="container text-center">
            <Motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {t.offerTitle}
            </Motion.h2>

            <div className="row justify-content-center">
              {t.offers.map(([icon, title, desc], i) => (
                <Motion.div
                  className="col-auto"
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="adv-card shadow-sm">
                    <div className="icon-wrap mb-3">
                      <i className={`${icon} fs-1 text-white`}></i>
                    </div>
                    <h5 className="fw-bold mb-2 text-white">{title}</h5>
                    <p className="small mb-0 text-white">{desc}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="partners-cta">
          <div className="container text-center">
            <Motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {t.ctaTitle}
            </Motion.h2>
            <Motion.p
              className="lead mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ delay: 0.2 }}
            >
              {t.ctaSubtitle}
            </Motion.p>
            <Motion.a
              href="/#/contact"
              className="btn btn-outline-primary-100 rounded-pill px-lg-4 py-lg-2 px-2 py-1 fw-bold"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ delay: 0.4 }}
            >
              {t.contactBtn}
            </Motion.a>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </>
  );
};

export default Partners;
