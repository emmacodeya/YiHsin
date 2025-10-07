import { useEffect, useState, useMemo, useContext } from "react";
import { LangContext } from "../App";

export default function ProductShowcase() {
  const { lang } = useContext(LangContext);
  const [products, setProducts] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data || []))
      .catch((err) => console.error("載入產品失敗:", err));
  }, []);

  // 1. 指定每個分類只展示一個固定機型
  const categoryModelMap = {
    "果糖機": "QF-11D2",
    "鋁蓋封口機系列": "K-2280A",
    "封口機": "K-2590SA",
    "檸檬機系列": "K-CD07",
    "搖搖機": "YY-02",
  };

  // 2. 要顯示的分類
  const allowedCategories = [
    "封口機",
    "果糖機",
    "搖搖機",
    "檸檬機系列",
    "鋁蓋封口機系列",
  ];

  // 3. 篩選允許的分類（支援多語 category）
  const filteredCategories = products.filter((cat) => {
    const name =
      typeof cat.category === "object" ? cat.category["zh-TW"] : cat.category;
    return allowedCategories.includes(name);
  });

  const activeCategory = filteredCategories[activeIdx];

  // 4. 根據分類找到固定展示機型
  const activeItem = useMemo(() => {
    if (!activeCategory) return null;
    const categoryName =
      typeof activeCategory.category === "object"
        ? activeCategory.category["zh-TW"]
        : activeCategory.category;
    const fixedModel = categoryModelMap[categoryName];
    return (activeCategory.items || []).find((it) => it.model === fixedModel) || null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  // 5. 自動取出語言文字的工具
  const getText = (textObj) => {
    if (typeof textObj === "string") return textObj;
    return textObj?.[lang] || textObj?.["zh-TW"] || "";
  };

  return (
    <section className="py-lg-12 py-5 product-showcase">
      <div className="container">
        {/* 區塊標題 */}
        <h2 className="text-center fw-bold display-6 mb-lg-8 mb-5 text-primary-100">
          {lang === "en"
            ? "Essential Machines for Every Store"
            : lang === "zh-CN"
            ? "开店必备机型"
            : "開店必備機型"}
        </h2>

        {/* 手機版分類按鈕 */}
        <div className="category-scroll d-lg-none mb-4">
          {filteredCategories.map((cat, i) => (
            <button
              key={i}
              type="button"
              className={`btn btn-outline-primary-100 px-3 py-2 fw-bold ${
                i === activeIdx ? "active" : ""
              }`}
              onClick={() => setActiveIdx(i)}
            >
              {getText(cat.category)}
            </button>
          ))}
        </div>

        <div className="row g-4 align-items-stretch">
          {/* 左側分類（桌機版） */}
          <aside className="col-12 col-lg-3 d-none d-lg-block">
            <div className="nav flex-column nav-pills bg-gray-200 p-4 h-100 rounded-3">
              {filteredCategories.map((cat, i) => (
                <button
                  key={i}
                  type="button"
                  className={`nav-link fw-bolder text-primary-100 text-start mb-3 p-3 fs-5 ${
                    i === activeIdx ? "active" : ""
                  }`}
                  onClick={() => setActiveIdx(i)}
                >
                  ．{getText(cat.category)}
                </button>
              ))}
            </div>
          </aside>

          {/* 右側內容區 */}
          <div className="col-12 col-lg-9 d-flex align-items-center justify-content-center">
            <div className="rounded-3 bg-gray-200 w-100 h-100 p-lg-7 p-3 d-flex align-items-center right-wrap">
              {!activeItem ? (
                <div className="p-4 text-primary-600">
                  {lang === "en"
                    ? "No product available for this category."
                    : lang === "zh-CN"
                    ? "此分类暂无产品。"
                    : "此分類暫無產品。"}
                </div>
              ) : (
                <div className="w-100">
                  <div
                    className="glass rounded-4 p-4 h-100 mx-auto card-wide"
                    style={{ maxWidth: 960 }}
                  >
                    <div className="row g-4 align-items-center">
                      {/* 左：圖片 */}
                      <div className="col-12 col-lg-5 order-1 order-lg-2">
                        <div className="single-image rounded-4 overflow-hidden">
                          {activeItem.images?.[0] ? (
                            <img
                              src={activeItem.images[0]}
                              alt={`${activeItem.model} 圖片`}
                              className="w-100 h-100 object-fit-contain"
                            />
                          ) : (
                            <div className="ph" />
                          )}
                        </div>
                      </div>

                      {/* 右：文字介紹 */}
                      <div className="col-12 col-lg-7 order-2 order-lg-1 d-flex flex-column justify-content-center text-start text-lg-start">
                        <h4 className="fw-bold mb-lg-3 mb-2 text-primary-100">
                          {activeItem.model}
                        </h4>
                        <ul className="list-unstyled d-grid mb-lg-4 mb-3 gap-2 flex-grow-1">
                          {(getText(activeItem.features) || [])
                            .slice(0, 3)
                            .map((f, i) => (
                              <li key={i} className="text-primary-1000">
                                ｜{f}
                              </li>
                            ))}
                        </ul>

                        <div className="d-flex justify-content-start">
                          <a
                            href={`/products?cat=${encodeURIComponent(
                              getText(activeCategory.category)
                            )}&model=${encodeURIComponent(activeItem.model || "")}`}
                            className="btn btn-outline-primary-100 rounded-pill px-lg-4 py-lg-2 
                            px-lg-2 py-lg-1 fw-bold btn-more"
                          >
                            {lang === "en"
                              ? "View More"
                              : lang === "zh-CN"
                              ? "更多详情"
                              : "更多詳情"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
