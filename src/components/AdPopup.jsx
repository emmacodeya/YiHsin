import { useEffect, useState } from "react";

const AdPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500); // 延遲1.5秒出現
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="ad-popup-overlay">
      <div className="ad-popup">
        <button className="close-btn" onClick={() => setVisible(false)}>×</button>
        <img
          src="http://localhost:3000/images/product/K-2256A小圖示.png"
          alt="限時優惠"
          className="img-fluid rounded"
        />
        <h4 className="mt-3 text-danger ">優惠價！14900元</h4>
        <a href="/products" className="btn btn-primary-200 mt-2">
          立即查看
        </a>
      </div>
    </div>
  );
};

export default AdPopup;
