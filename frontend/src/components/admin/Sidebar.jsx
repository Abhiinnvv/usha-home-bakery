import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">
        🧁 Bakery Admin
      </h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/dashboard"
          >
            📊 Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/admin/products"
          >
            📦 Products
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/admin/orders"
          >
            📋 Orders
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/admin/reviews"
          >
            ⭐ Reviews
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;