import AdminLayout from "../components/admin/AdminLayout";



function Dashboard() {
  return (
    <AdminLayout>

      <h2 className="fw-bold mb-4">
        📊 Dashboard
      </h2>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h5>Total Products</h5>
            <h2>0</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h5>Total Orders</h5>
            <h2>0</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h5>Reviews</h5>
            <h2>0</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h5>Custom Cakes</h5>
            <h2>0</h2>
          </div>
        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;