import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1 p-4"
        style={{
          background: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;