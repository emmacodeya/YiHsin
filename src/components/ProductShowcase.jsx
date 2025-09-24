import { useEffect, useState, useMemo } from "react";

export default function ProductShowcase() {
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
    "果糖機": "F-09",
    "鋁蓋封口機系列": "K-2280A",
    "封口機": "K-2590SA",
    "檸檬機系列": "K-CD07",
    "搖搖機": "YY-02",
  };

  // 3. 左側要顯示的分類
  const allowedCategories = [
    "封口機",
    "果糖機",
    "搖搖機",
    "檸檬機系列",
    "鋁蓋封口機系列",
  ];

  // 當前選中的分類
  const activeCategory = products.filter(cat =>
    allowedCategories.includes(cat.category)
  )[activeIdx];

  // 2. 從 db.json 找出該分類的固定機型資料
  const activeItem = useMemo(() => {
  if (!activeCategory) return null;
  const fixedModel = categoryModelMap[activeCategory.category];
  return (activeCategory.items || []).find(it => it.model === fixedModel) || null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeCategory]);

  return (
    <section className="py-lg-10 py-8 product-showcase">
      <div className="container">
        <h2 className="text-center fw-bold display-6 mb-8 text-primary-100">
          開店必備機型
        </h2>
        <div className="row g-4">
          {/* 左側：分類清單（只顯示指定的五個） */}
          <aside className="col-12 col-lg-3">
            <div className="nav flex-column nav-pills bg-gray-200 p-4 h-100 d-none d-lg-block rounded-3">
              {products
                .filter(cat => allowedCategories.includes(cat.category))
                .map((cat, i) => (
                  <button
                    key={cat.category ?? i}
                    type="button"
                    className={`nav-link fw-bolder text-primary-100 text-start mb-3 p-3 fs-5 ${
                      i === activeIdx ? "active" : ""
                    }`}
                    aria-selected={i === activeIdx}
                    onClick={() => setActiveIdx(i)}
                  >
                    ．{cat.category}
                  </button>
                ))}
            </div>
          </aside>

          {/* 右側：顯示固定機型 */}
          <div className="col-12 col-lg-9 d-flex align-items-center justify-content-center">
            <div className="rounded-3 bg-gray-200 w-100 h-100 p-lg-7 p-3 d-flex align-items-center right-wrap">
              {!activeItem ? (
                <div className="p-4 text-primary-600">此分類暫無產品</div>
              ) : (
                <div className="w-100">
                  <div className="glass rounded-4 p-4 h-100 mx-auto card-wide" style={{ maxWidth: 960 }}>
                    <div className="row g-4 align-items-center">
                      {/* 左：文字 */}
                      <div className="col-12 col-lg-7">
                        <h4 className="fw-bold mb-3 text-primary-100">
                          {activeItem.model}
                        </h4>
                        <ul className="list-unstyled d-grid mb-4 gap-2">
                          {(activeItem.features || []).slice(0, 3).map((f, i) => (
                            <li key={i} className="text-primary-1000">｜{f}</li>
                          ))}
                          {(!activeItem.features || activeItem.features.length === 0) && (
                            <li className="text-gray-dark">｜此產品尚無特色</li>
                          )}
                        </ul>
                        <a
                          href={`/products?cat=${encodeURIComponent(
                            activeCategory.category
                          )}&model=${encodeURIComponent(activeItem.model || "")}`}
                          className="btn btn-outline-primary-100 rounded-pill px-4 fw-bold"
                        >
                          更多詳情
                        </a>
                      </div>

                      {/* 右：圖片（只顯示一張） */}
                      <div className="col-12 col-lg-5">
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
