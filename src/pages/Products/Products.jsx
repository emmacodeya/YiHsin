import { useEffect, useState, useContext } from "react";
import { LangContext } from "../../App";
import { useLocation } from "react-router-dom";
import FloatingButtons from "../../components/FloatingButtons";

const Products = () => {
  const { lang } = useContext(LangContext);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");


useEffect(() => {
  const title =
    lang === "en"
      ? "Products｜YiHsin Industrial"
      : lang === "zh-CN"
      ? "产品项目｜义歆实业"
      : "產品項目｜義歆實業";

  const description =
    lang === "en"
      ? "Explore YiHsin Industrial's full range of sealing machines, aluminum lid sealers, syrup filling machines, shaker machines, and lemon juicers."
      : lang === "zh-CN"
      ? "查看义歆实业全系列封口机、铝盖封口机、果糖机、摇摇机、柠檬机等食品封口设备。提供全台安装、销售、保固与维修服务。"
      : "查看義歆實業全系列封口機、鋁蓋封口機、果糖機、搖搖機、檸檬機等食品封口設備。提供全台安裝、銷售、保固與維修服務。";

  const previousTitle = document.title;
  document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  const previousDescription = metaDesc?.getAttribute("content");
  metaDesc?.setAttribute("content", description);

  return () => {
    document.title = previousTitle;
    metaDesc?.setAttribute("content", previousDescription);
  };
}, [lang]);


useEffect(() => {
  fetch("/db.json")
    .then((res) => res.json())
    .then((data) => {
      const productList = data.products || [];
      setProducts(productList);
      setCategories(productList.map((p) => p.category));
    })
    .catch((err) => console.error("載入 products 失敗:", err));
}, []);


useEffect(() => {
  if (category && products.length > 0) {
    const matchedCat = products.find(
      (p) =>
        p.category["zh-TW"] === category ||
        p.category["zh-CN"] === category ||
        p.category["en"] === category
    );

    if (matchedCat) {
      setActiveCat(matchedCat.category["zh-TW"]);
    } else {
      setActiveCat("all");
    }
  }
}, [category, products, lang]);

useEffect(() => {
  if (products.length > 0) {
    setCategories(products.map((p) => p.category));
  }
}, [lang, products]);

  // 過濾顯示
const displayedItems =
  activeCat === "all"
    ? products.flatMap((p) =>
        p.items.map((item) => ({ ...item, category: p.category }))
      )
    : products
        .filter((p) => p.category["zh-TW"] === activeCat)
        .flatMap((p) =>
          p.items.map((item) => ({ ...item, category: p.category }))
        );

  const getFeatures = (item) =>
    item.features?.[lang] || item.features?.["zh-TW"] || [];

  // 當網址帶有 ?model= 時，自動打開彈出視窗
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const model = params.get("model");

  if (model && products.length > 0) {
    const match = products
      .flatMap((p) =>
        p.items.map((item) => ({ ...item, category: p.category }))
      )
      .find((item) => item.model === model);

    if (match) {
      setSelected(match);
    }
  }
}, [location, products]);

// 單一產品彈出視窗 SEO
useEffect(() => {
  if (!selected) return; 

  // 備份原本的 SEO
  const previousTitle = document.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  const previousDescription = metaDescription
    ? metaDescription.getAttribute("content")
    : "";

  // 生成動態 Title
  const titleText = `${selected.model}｜${selected.category["zh-TW"]}｜義歆實業`;

  // 生成動態 Description
  const featureList = Array.isArray(selected.features)
    ? selected.features.slice(0, 2).join("；")
    : "";

  const descriptionText =
    featureList ||
    `${selected.model} 詳細規格、功能特色與更多資訊。`;

  document.title = titleText;
  if (metaDescription) {
    metaDescription.setAttribute("content", descriptionText);
  }

  // 離開彈窗時還原 SEO
  return () => {
    document.title = previousTitle;
    if (metaDescription) {
      metaDescription.setAttribute("content", previousDescription);
    }
  };
}, [selected]);


// 關閉彈窗時清除網址參數
const closeDetail = () => {
  setSelected(null);
  const base = `${window.location.origin}${window.location.pathname}#/products`;
  window.history.replaceState({}, "", base);
};

  return (
    <>

    {selected && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        name: selected.model,
        image: Array.isArray(selected.images) ? selected.images[0] : "",
        brand: {
          "@type": "Brand",
          name: "YODO / 義歆實業"
        },
        category: selected.category?.[lang] || selected.category?.["zh-TW"] || "產品",
        description: Array.isArray(selected.features)
          ? selected.features.slice(0, 3).join("；")
          : "",
        additionalProperty: Object.entries(selected.specs || {}).map(
          ([key, value]) => ({
            "@type": "PropertyValue",
            name: key,
            value: value
          })
        )
      })
    }}
  />
)}

    <div key={location.search} className="hot-section">
      <div className="container py-5 products-page">
        {/* 🔸分類導覽列 */}
        <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
          <button
            className={`btn btn-outline-primary-1000 px-3 py-2 fw-bold rounded-pill ${
              activeCat === "all" ? "active" : ""
            }`}
            onClick={() => setActiveCat("all")}
          >
            全部
          </button>

          {categories.map((c, i) => (
            <button
              key={i}
              className={`btn btn-outline-primary-1000 px-3 py-2 fw-bold rounded-pill ${
                activeCat === c["zh-TW"] ? "active" : ""
              }`}
              onClick={() => setActiveCat(c["zh-TW"])}
            >
              {c[lang] || c["zh-TW"]}
            </button>
          ))}
        </div>

        {/* 🔸產品卡片 */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {displayedItems.map((item, i) => (
            <div className="col" key={i}>
              <div
                className="card h-100 shadow-sm hover-scale"
                onClick={() => setSelected(item)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.images?.[0]}
                  className="card-img-top"
                  alt={item.model}
                  loading="lazy"
                />
                <div className="card-body text-center text-primary-100">
                  <h6 className="fw-bold">{item.model}</h6>
                  {item.price && (
                    <p className="mt-1 small text-center text-danger fw-bold">
                      {item.price[lang] || item.price["zh-TW"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 右下詳細視窗 */}
        {selected && (
          <div className="offcanvas show shadow-lg product-detail">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-primary-100 fw-bold">{selected.model}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeDetail} 
              ></button>
            </div>

            {/* 左圖 + 右文字排版 */}
            <div className="offcanvas-body d-flex flex-column flex-lg-row gap-4">
              {/* 左側圖片區（含輪播） */}
              <div className="product-images flex-shrink-0 w-100 w-lg-50">
               {selected.images && selected.images.length > 1 ? (
                <div
                  id="productCarousel"
                  className="carousel slide mb-3"
                  data-bs-ride="carousel"
                >
                  {/* 🔹 圖片輪播主體 */}
                  <div className="carousel-inner">
                    {selected.images.map((img, i) => (
                      <div
                        className={`carousel-item ${i === 0 ? "active" : ""}`}
                        key={i}
                      >
                        <img
                          src={img}
                          className="d-block w-100 rounded"
                          alt={`${selected.model}-${i}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 🔹 下方三個圈圈指示器 */}
                  <div className="carousel-indicators position-static mt-2">
                    {selected.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide-to={i}
                        className={i === 0 ? "active" : ""}
                        aria-label={`Slide ${i + 1}`}
                      ></button>
                    ))}
                  </div>

                  {/* 🔹 左右切換箭頭 */}
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                </div>
              ) : (
                <img
                  src={selected.images?.[0]}
                  className="img-fluid mb-3 rounded"
                  alt={selected.model}
                  loading="lazy"
                />
              )}
              </div>

              {/* 右側文字內容 */}
              <div className="product-info flex-grow-1">
               <h6 className="fw-bold mb-2">
                {lang === "zh-TW"
                  ? "產品特色："
                  : lang === "zh-CN"
                  ? "产品特色："
                  : "Product Feature:"}
              </h6>
                <ul className="small text-muted mb-3">
                  {getFeatures(selected).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>

                <h6 className="fw-bold mb-2">
                    {lang === "en" ? "Specifications:" : "規格："}
                  </h6>
                  <table className="table table-sm table-bordered small specs-table">
                    <tbody>
                      {selected.specs?.values &&
                        Object.entries(selected.specs.values).map(([key, value], i) => (
                          <tr key={i}>
                            <td className="fw-bold">
                              {selected.specs.titles?.[lang]?.[key] ||
                                selected.specs.titles?.["zh-TW"]?.[key] ||
                                key}
                            </td>
                            <td>
                              {typeof value === "object"
                                ? value[lang] || value["zh-TW"]
                                : value}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

              </div>
            </div>

            {/* 下方 LINE 聯繫按鈕 */}
            <div className="contact-btn text-center py-3 border-top">
            <a
              href="https://line.me/R/ti/p/@477fjgkd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary-100 fw-bold px-4 py-2 rounded-pill"
            >
              <i className="bi bi-line me-2"></i>
              {lang === "zh-TW"
                ? "馬上聯繫"
                : lang === "zh-CN"
                ? "马上联系"
                : "Contact Us Now"}
            </a>
            </div>
          </div>
        )}
      </div>
    </div>
    <FloatingButtons />
    </>
  );
};

export default Products;
