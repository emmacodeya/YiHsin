import { useEffect, useState } from "react";

const AdPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300); // 延遲1.5秒出現
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="ad-popup-overlay">
      <div className="ad-popup">
        <button className="close-btn" onClick={() => setVisible(false)}>×</button>
        <img
          src="http://localhost:3000/images/discount.jpg"
          alt="限時優惠"
          className="img-fluid rounded my-5"
        />
        
          <a
            href="https://line.me/R/ti/p/@477fjgkd"
            target="_blank"              
            rel="noopener noreferrer"    
            className="btn btn-outline-primary-100 rounded-pill px-lg-4 py-lg-2 
              px-lg-2 py-lg-1 fw-bold"
          >
          馬上聯繫
        </a>
      </div>
    </div>
  );
};

export default AdPopup;
