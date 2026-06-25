import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../../api/orderApi";
import { 
  ShoppingBag, 
  User, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  Package,
  Truck,
  XCircle,
  ChevronRight,
  Calendar,
  DollarSign
} from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        const formattedOrders = data.map((order) => ({
          ...order,
          status: order.orderStatus,
        }));
        setOrders(formattedOrders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);

      if (newStatus === "delivered") {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        return;
      }

      setOrders((prev) =>
        prev.map((order) => {
          if (order._id === id) {
            return {
              ...order,
              status: newStatus,
              orderStatus: newStatus,
            };
          }
          return order;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusStyles = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      confirmed: "bg-blue-50 text-blue-700 border-blue-200",
      preparing: "bg-purple-50 text-purple-700 border-purple-200",
      delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return styles[status] || styles.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-3.5 h-3.5" />,
      confirmed: <CheckCircle className="w-3.5 h-3.5" />,
      preparing: <Package className="w-3.5 h-3.5" />,
      delivered: <Truck className="w-3.5 h-3.5" />,
    };
    return icons[status] || <Clock className="w-3.5 h-3.5" />;
  };

  const getButtonStyles = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
      confirmed: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
      preparing: "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200",
      delivered: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
    };
    return styles[status] || styles.pending;
  };

  const getStatusSteps = (currentStatus) => {
    const steps = ['pending', 'confirmed', 'preparing', 'delivered'];
    const currentIndex = steps.indexOf(currentStatus);
    return steps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50/60 via-white to-green-50/60 p-4 md:p-6">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-emerald-600" />
              </div>
              Orders Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1 ml-1">Manage and track all restaurant orders</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100">
              <span className="text-sm text-gray-500">Total Orders</span>
              <span className="ml-2 text-lg font-bold text-emerald-600">{orders.length}</span>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Order Header */}
              <div className="p-5 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</p>
                    <p className="text-sm font-mono font-semibold text-gray-800 mt-0.5">
                      #{order._id.slice(-8)}
                    </p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusStyles(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(order.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                    {order.customer.fullName?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {order.customer.fullName}
                    </p>
                    <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 shrink-0" />
                      {order.customer.email}
                    </p>
                    <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {order.customer.street}, {order.customer.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex-1 p-5 border-b border-gray-100 max-h-48 overflow-y-auto">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Items ({order.items.length})
                </p>
                <div className="space-y-2.5">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.dishName} 
                        className="w-12 h-12 rounded-lg object-cover border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{item.dishName}</p>
                        <p className="text-xs text-gray-400">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-gray-400 text-center pt-1">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Order Footer */}
              <div className="p-5 bg-gray-50/50">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Total Amount</span>
                  <span className="text-lg font-bold text-gray-800 flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    {order.totalAmount}
                  </span>
                </div>

                {/* Status Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                      order.status === "pending" 
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200' 
                        : getButtonStyles("pending")
                    } hover:scale-105`}
                    onClick={() => updateStatus(order._id, "pending")}
                  >
                    Pending
                  </button>
                  <button
                    className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                      order.status === "confirmed" 
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200' 
                        : getButtonStyles("confirmed")
                    } hover:scale-105`}
                    onClick={() => updateStatus(order._id, "confirmed")}
                  >
                    Confirm
                  </button>
                  <button
                    className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                      order.status === "preparing" 
                        ? 'bg-purple-500 text-white border-purple-500 shadow-md shadow-purple-200' 
                        : getButtonStyles("preparing")
                    } hover:scale-105`}
                    onClick={() => updateStatus(order._id, "preparing")}
                  >
                    Prepare
                  </button>
                  <button
                    className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                      order.status === "delivered" 
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200' 
                        : getButtonStyles("delivered")
                    } hover:scale-105`}
                    onClick={() => updateStatus(order._id, "delivered")}
                  >
                    Deliver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No orders yet</h3>
            <p className="text-sm text-gray-400">Orders will appear here once customers place them</p>
          </div>
        )}
      </div>
    </div>
  );
}