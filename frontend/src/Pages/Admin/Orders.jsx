import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../../api/orderApi";
import { 
  ShoppingBag, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  Package,
  Truck,
  Calendar,
  DollarSign,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const getOrders = async () => {
    try {
      setError(null);
      const data = await fetchOrders();
      const formattedOrders = data.map((order) => ({
        ...order,
        status: order.orderStatus,
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.log(error);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getOrders();
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
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
      setError("Failed to update order status. Please try again.");
    } finally {
      setUpdatingId(null);
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

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-5 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-20 h-7 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-3.5 h-3.5 bg-gray-200 rounded"></div>
          <div className="w-32 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="w-48 h-3 bg-gray-200 rounded"></div>
            <div className="w-40 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="p-5 border-b border-gray-100">
        <div className="w-24 h-3 bg-gray-200 rounded mb-3"></div>
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-1">
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 bg-gray-50/50">
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50/60 via-white to-green-50/60 p-4 md:p-6">
        <div className="relative max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="w-48 h-8 bg-gray-200 rounded"></div>
              </div>
              <div className="w-64 h-4 bg-gray-200 rounded mt-2 ml-1"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100">
                <div className="w-32 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100">
              <span className="text-sm text-gray-500">Total Orders</span>
              <span className="ml-2 text-lg font-bold text-emerald-600">{orders.length}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-red-600 text-sm flex-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 font-medium text-sm"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Orders Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
          {orders.map((order) => {
            const isUpdating = updatingId === order._id;
            
            return (
              <div
                key={order._id}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${
                  isUpdating ? 'opacity-50 pointer-events-none' : ''
                }`}
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
                      {isUpdating ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        getStatusIcon(order.status)
                      )}
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
                      className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 ${
                        order.status === "pending" 
                          ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200' 
                          : getButtonStyles("pending")
                      }`}
                      onClick={() => updateStatus(order._id, "pending")}
                      disabled={isUpdating}
                    >
                      Pending
                    </button>
                    <button
                      className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 ${
                        order.status === "confirmed" 
                          ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200' 
                          : getButtonStyles("confirmed")
                      }`}
                      onClick={() => updateStatus(order._id, "confirmed")}
                      disabled={isUpdating}
                    >
                      Confirm
                    </button>
                    <button
                      className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 ${
                        order.status === "preparing" 
                          ? 'bg-purple-500 text-white border-purple-500 shadow-md shadow-purple-200' 
                          : getButtonStyles("preparing")
                      }`}
                      onClick={() => updateStatus(order._id, "preparing")}
                      disabled={isUpdating}
                    >
                      Prepare
                    </button>
                    <button
                      className={`px-2 py-2 text-xs font-medium rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 ${
                        order.status === "delivered" 
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200' 
                          : getButtonStyles("delivered")
                      }`}
                      onClick={() => updateStatus(order._id, "delivered")}
                      disabled={isUpdating}
                    >
                      Deliver
                    </button>
                  </div>

                  {/* Loading Overlay for updating */}
                  {isUpdating && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                      <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No orders yet</h3>
            <p className="text-sm text-gray-400">Orders will appear here once customers place them</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}