import { BarLoader } from "react-spinners";

const Loading = ({ loading = true }) => {
  if (!loading) return null;

  return (
    <div
      className="loading-overlay d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.7)",
        zIndex: 2000,
      }}
    >
      <div className="text-center">
        <BarLoader color="#b39a84" height={5} width={180} />
        <p className="mt-3 text-primary-1000 fw-bold">載入中...</p>
      </div>
    </div>
  );
};

export default Loading;
