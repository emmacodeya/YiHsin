import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { LangContext } from "../../App";

const ProductDetail = () => {
  const { model } = useParams();
  const { lang } = useContext(LangContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const allItems = data.products.flatMap((p) =>
          p.items.map((item) => ({ ...item, category: p.category }))
        );
        const match = allItems.find((i) => i.model === model);
        setProduct(match || null);
      });
  }, [model]);

  // === SEO 設定 ===
  useEffect(() => {
    if (!product) return;

    document.title = `${product.model}｜義歆實業`;

    const desc = product.features?.[lang]?.[0] || "";
    const metaDesc = document.querySelector('meta[name="description"]');
    metaDesc?.setAttribute("content", desc);
  }, [product, lang]);

  if (!product) return <p className="text-center py-5">Loading...</p>;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.model,
            image: product.images?.[0] || "",
            brand: { "@type": "Brand", name: "YODO / 義歆實業" },
            description: product.features?.[lang]?.slice(0, 3).join("；") || "",
            category:
              product.category?.[lang] ||
              product.category?.["zh-TW"] ||
              "product",
            additionalProperty: Object.entries(product.specs?.values || {}).map(
              ([key, value]) => ({
                "@type": "PropertyValue",
                name: product.specs?.titles?.[lang]?.[key] || key,
                value,
              })
            ),
          }),
        }}
      />

      {/* === 虛擬產品頁面（給 Google） === */}
      <div className="container py-5">
        <h1 className="fw-bold mb-3">{product.model}</h1>

        {/* 圖片 */}
        <img
          src={product.images?.[0]}
          alt={product.model}
          style={{ maxWidth: "300px" }}
          className="mb-4"
        />

        {/* 簡述 */}
        <p className="mt-4 text-primary-200">{product.features?.[lang]?.[0] || ""}</p>

        <p className="mt-4 text-primary-200">
          完整規格與介紹，請到「產品項目」頁面並點擊此型號以查看彈窗展示。
        </p>
      </div>
    </>
  );
};

export default ProductDetail;
