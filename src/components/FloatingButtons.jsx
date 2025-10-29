import { useState, useEffect } from "react";

const FloatingButtons = () => {
  const [showUp, setShowUp] = useState(false);
  const [open, setOpen] = useState(false);

  // 監聽滾動高度
  useEffect(() => {
    const handleScroll = () => {
      setShowUp(window.scrollY > 100); // 超過100px才顯示上箭頭
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="floating-buttons position-fixed d-flex flex-column gap-3"
      style={{ right: "20px", bottom: "80px", zIndex: 1050 }}
    >
      {/* 桌機／平板 */}
      <div className="d-none d-md-flex flex-column gap-3 align-items-end">
        {/* 上箭頭滑入／滑出動畫 */}
        <button
          className="btn btn-primary-1000 floating-btn shadow"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            transform: showUp ? "translateY(0)" : "translateY(80px)",
            opacity: showUp ? 1 : 0,
            transition: "all 0.4s ease",
          }}
        >
          <i className="bi bi-arrow-up fs-5"></i>
        </button>

        <a
          href="https://line.me/R/ti/p/@477fjgkd"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success floating-btn shadow"
        >
          <i className="bi bi-line fs-5"></i>
        </a>

        <a
          href="mailto:yihsin1630@gmail.com"
          className="btn btn-danger floating-btn shadow"
        >
          <i className="bi bi-envelope fs-5"></i>
        </a>
      </div>

      {/* 手機 FAB */}
      <div className="d-flex d-md-none flex-column align-items-end">
        {open && (
          <div className="d-flex flex-column gap-2 mb-2 align-items-end">
            {/* 只控制上箭頭的顯示 */}
            <button
              className="btn btn-primary-1000 floating-btn shadow"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                transform: showUp ? "translateY(0)" : "translateY(60px)",
                opacity: showUp ? 1 : 0,
                transition: "all 0.4s ease",
              }}
            >
              <i className="bi bi-arrow-up fs-6"></i>
            </button>

            <a
              href="https://line.me/R/ti/p/@477fjgkd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success floating-btn shadow"
            >
              <i className="bi bi-line fs-6"></i>
            </a>

            <a
              href="mailto:yihsin1630@gmail.com"
              className="btn btn-danger floating-btn shadow"
            >
              <i className="bi bi-envelope fs-6"></i>
            </a>
          </div>
        )}

        <button
          className="btn btn-dark floating-btn shadow"
          onClick={() => setOpen(!open)}
        >
          <i className={`bi ${open ? "bi-x" : "bi-plus"} fs-5`}></i>
        </button>
      </div>
    </div>
  );
};

export default FloatingButtons;
