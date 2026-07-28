import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import TopBar from "./components/layout/TopBar";
import CustomizeCake from "./pages/CustomizeCake";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import AdminRoute from "./components/AdminRoute";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";
function App() {
  return (
   <BrowserRouter>

    <TopBar />
    <Navbar />


      <main className="container-fluid p-0">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products />}
          />
          <Route 
          path="/customize-cake" 
          element={<CustomizeCake />} />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

    <Route
  path="/dashboard"
  element={
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>
<Route
  path="/admin/add-product"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>
<Route
  path="/admin/edit-product/:id"
  element={
    <AdminRoute>
      <EditProduct />
    </AdminRoute>
  }
/>

<Route
  path="/admin/reviews"
  element={
    <AdminRoute>
      <h1>Customer Reviews</h1>
    </AdminRoute>
  }
/>

  <Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>
          <Route
  path="/orders"
  element={<Orders />}
/>

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />
          <Route
  path="/admin/add-product"
  element={
    JSON.parse(localStorage.getItem("user"))?.role === "admin" ? (
      <AddProduct />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;