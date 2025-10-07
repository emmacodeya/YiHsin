import { useState } from "react";

const FloatingButtons = () => {
  const [open, setOpen] = useState(false);

  return (
    <div 
      className={`floating-buttons position-fixed d-flex flex-column gap-3`}
      style={{ right: "20px", bottom: "80px", zIndex: 1050 }}
    >
      {/* 桌機/平板 → 直接顯示三顆 */}
      <div className="d-none d-md-flex flex-column gap-3">
        <button 
          className="btn btn-primary-1000 floating-btn shadow"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

      {/* 手機 → FAB */}
      <div className="d-flex d-md-none flex-column align-items-end">
        {open && (
          <div className="d-flex flex-column gap-2 mb-2">
            <button 
              className="btn btn-primary-1000 floating-btn shadow"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

        {/* 主 FAB */}
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
