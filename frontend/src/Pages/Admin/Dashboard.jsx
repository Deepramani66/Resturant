import { useEffect, useState } from "react";
import { getAllOrders } from '../../api/orderApi';
import { 
  ShoppingBag, 
  Utensils, 
  Clock, 
  DollarSign,
  TrendingUp,
  Loader2
} from "lucide-react";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stats state
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDishes: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllOrders();
      
      console.log("API Response:", response);
      
      let ordersData = [];
      
      // Handle different response structures
      if (Array.isArray(response)) {
        ordersData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        ordersData = response.data;
      } else if (response?.orders && Array.isArray(response.orders)) {
        ordersData = response.orders;
      } else if (response?.success && response?.data && Array.isArray(response.data)) {
        ordersData = response.data;
      }
      
      if (ordersData.length > 0) {
        setOrders(ordersData);
        
        // Calculate dynamic stats
        const totalOrders = ordersData.length;
        const pendingOrders = ordersData.filter(
          order => order.orderStatus?.toLowerCase() === "pending" || 
                   order.orderStatus?.toLowerCase() === "preparing" ||
                   order.orderStatus?.toLowerCase() === "processing"
        ).length;
        const totalRevenue = ordersData.reduce(
          (sum, order) => sum + (parseFloat(order.totalAmount) || 0), 
          0
        );
        
        // Get unique dishes count
        const allDishes = ordersData.flatMap(order => 
          order.items?.map(item => item.dishName) || []
        );
        const uniqueDishes = new Set(allDishes);
        const totalDishes = uniqueDishes.size;

        setStats({
          totalOrders,
          totalDishes,
          pendingOrders,
          totalRevenue,
        });
      } else {
        setOrders([]);
        setStats({
          totalOrders: 0,
          totalDishes: 0,
          pendingOrders: 0,
          totalRevenue: 0,
        });
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount);
  };

  // Get status color
  const getStatusColor = (status) => {
    const statusMap = {
      "delivered": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "preparing": "bg-blue-100 text-blue-800 border-blue-200",
      "pending": "bg-amber-100 text-amber-800 border-amber-200",
      "processing": "bg-blue-100 text-blue-800 border-blue-200",
      "cancelled": "bg-rose-100 text-rose-800 border-rose-200",
      "completed": "bg-green-100 text-green-800 border-green-200",
      "paid": "bg-green-100 text-green-800 border-green-200",
      "unpaid": "bg-red-100 text-red-800 border-red-200",
    };
    return statusMap[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Get payment status color
  const getPaymentStatusColor = (status) => {
    const statusMap = {
      "paid": "bg-green-100 text-green-800 border-green-200",
      "unpaid": "bg-red-100 text-red-800 border-red-200",
      "pending": "bg-amber-100 text-amber-800 border-amber-200",
    };
    return statusMap[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Stats cards configuration
  const statsCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Dishes",
      value: stats.totalDishes,
      icon: Utensils,
      bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      bgGradient: "bg-gradient-to-br from-amber-50 to-amber-100",
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-100 text-emerald-600",
    },
  ];

  // Helper function to get customer name
  const getCustomerName = (order) => {
    if (order.customer) {
      if (typeof order.customer === 'string') {
        return order.customer;
      }
      if (typeof order.customer === 'object') {
        return order.customer.fullName || order.customer.name || "Unknown Customer";
      }
    }
    return "Unknown Customer";
  };

  // Helper function to get first letter for avatar
  const getAvatarLetter = (order) => {
    const name = getCustomerName(order);
    return name.charAt(0).toUpperCase() || "U";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center">
        <div className="text-rose-600 text-lg font-semibold mb-2">⚠️ Error</div>
        <p className="text-rose-700">{error}</p>
        <button 
          onClick={fetchOrders}
          className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            Manage your restaurant system
            <span className="hidden md:inline text-sm text-gray-400 ml-2">
              • {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Live
          </span>
          <button 
            onClick={fetchOrders}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`${card.bgGradient} p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-white/50 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.iconBg} p-3 rounded-xl`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            Recent Orders
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({orders.length} orders)
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order, index) => (
                  <tr 
                    key={order._id || order.id || index}
                    className="hover:bg-gray-50/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-semibold text-sm">
                          {getAvatarLetter(order)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {getCustomerName(order)}
                          </p>
                          {order.customer?.email && (
                            <p className="text-xs text-gray-500">{order.customer.email}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {order.items && order.items.length > 0 ? (
                          order.items.slice(0, 2).map((item, idx) => (
                            <span key={idx} className="text-sm text-gray-700">
                              {item.dishName || item.name} × {item.quantity || 1}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No items</span>
                        )}
                        {order.items && order.items.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{order.items.length - 2} more items
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex items-center gap-1.5 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {order.orderStatus || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex items-center gap-1.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="font-medium">No orders found</p>
                      <p className="text-sm text-gray-400">Orders will appear here once they're created</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {orders.length > 5 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mx-auto">
              View all orders
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}