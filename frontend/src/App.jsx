import { Route, Routes } from "react-router-dom";

import { CartProvider } from "./store/CartProvider";

import Home from "./Pages/Home";
import OrderDish from "./Pages/OrderDish";

import AdminLayout from "./Pages/Admin/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import AddDishForm from "./Pages/Admin/AddDish";
import Orders from "./Pages/Admin/Orders";

const App = () => {
  return (
    <div>
      <Routes>
        {/* User Routes */}

        <Route path="/" element={<Home />} />

        <Route
          path="/order-item"
          element={
            <CartProvider>
              <OrderDish />
            </CartProvider>
          }
        />

        {/* Admin Panel Routes */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="addDish-form" element={<AddDishForm />} />

          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
