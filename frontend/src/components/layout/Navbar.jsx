import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import {
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaBirthdayCake,
  FaClipboardList,
  FaUser,
  FaTools,
  FaUserTie,
  FaMagic,
} from "react-icons/fa";

import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-pink-100 shadow-lg">
  <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
      <Link
  to="/"
  className="flex items-center gap-3 group"
>
  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 flex items-center justify-center shadow-lg group-hover:rotate-12 transition duration-300">
    <FaBirthdayCake className="text-white text-2xl" />
  </div>

  <div>
    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
      Usha Home Bakery
    </h1>

    <p className="text-xs text-gray-500 tracking-widest">
      FRESH • SWEET • DELICIOUS
    </p>
  </div>
</Link>

      <div className="flex items-center gap-8 text-gray-700 font-medium">
       <NavLink
  to="/"
  className={({ isActive }) =>
    `flex items-center gap-2 transition ${
      isActive
        ? "text-pink-600 font-bold"
        : "hover:text-pink-600"
    }`
  }
>
  <FaHome />
  Home
</NavLink>

    {!isAdmin && (
  <NavLink
    to="/products"
    className={({ isActive }) =>
      `flex items-center gap-2 transition ${
        isActive
          ? "text-pink-600 font-bold"
          : "hover:text-pink-600"
      }`
    }
  >
    <FaBirthdayCake />
    Products
  </NavLink>
)}
{!isAdmin && (
  <NavLink
    to="/customize-cake"
    className={({ isActive }) =>
      `flex items-center gap-2 transition ${
        isActive
          ? "text-pink-600 font-bold"
          : "hover:text-pink-600"
      }`
    }
  >
    <FaMagic />
    Customize Cake
  </NavLink>
)}

{!isAdmin && (
  <NavLink
    to="/cart"
    className={({ isActive }) =>
      `relative flex items-center gap-2 transition ${
        isActive
          ? "text-pink-600 font-bold"
          : "hover:text-pink-600"
      }`
    }
  >
      Cart
  </NavLink>
)}

        {user ? (
  <>
    {!isAdmin && (
  <NavLink
    to="/orders"
    className="hover:text-pink-600 transition"
  >
    <FaClipboardList className="inline mr-2" />
    Orders
  </NavLink>
)}

    {user?.role === "admin" && (
  <NavLink
    to="/dashboard"
    className="flex items-center gap-2"
  >
    <FaUserTie />
    Dashboard
  </NavLink>
)}

    {user.role === "admin" && (
      <NavLink
        to="/admin"
        className="hover:text-pink-600 transition"
      >
        <FaTools className="inline mr-2" />
        Admin
      </NavLink>
    )}

    <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
      <FaUserCircle className="text-pink-600 text-2xl" />

      <span className="font-semibold">
        {user.name}
      </span>
    </div>

    <button
      onClick={logout}
      className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
    >
      <FaSignOutAlt />
      Logout
    </button>
  </>
) : (
  <>
    <Link
      to="/login"
      className="hover:text-pink-600 transition"
    >
      Login
    </Link>

    <Link
      to="/signup"
      className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full transition"
    >
      Signup
    </Link>
  </>
)}
      </div>
      </div>
    </nav>
  );
}

export default Navbar;