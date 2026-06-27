import { useEffect, useState } from "react";
import { getAllOrders } from '../../api/orderApi';
import { 
  ShoppingBag, 
  Utensils, 
  Clock, 
  DollarSign,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Stats state
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDishes: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    uniqueCustomers: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
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

        // Get unique customers
        const uniqueCustomers = new Set(
          ordersData.map(order => 
            order.customer?.fullName || order.customer?.name || order.customer
          )
        );

        setStats({
          totalOrders,
          totalDishes,
          pendingOrders,
          totalRevenue,
          uniqueCustomers: uniqueCustomers.size,
        });
      } else {
        setOrders([]);
        setStats({
          totalOrders: 0,
          totalDishes: 0,
          pendingOrders: 0,
          totalRevenue: 0,
          uniqueCustomers: 0,
        });
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
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
      "processing": "bg-purple-100 text-purple-800 border-purple-200",
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
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100 text-blue-600",
      trend: "+12%",
    },
    {
      title: "Total Dishes",
      value: stats.totalDishes,
      icon: Utensils,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100 text-purple-600",
      trend: "+5%",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-50 to-amber-100",
      iconBg: "bg-amber-100 text-amber-600",
      trend: "-3%",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-100 text-emerald-600",
      trend: "+18%",
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

  // Helper function to get avatar color
  const getAvatarColor = (name) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-emerald-400 to-emerald-600',
      'from-amber-400 to-amber-600',
      'from-rose-400 to-rose-600',
      'from-cyan-400 to-cyan-600',
      'from-indigo-400 to-indigo-600',
      'from-pink-400 to-pink-600',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="bg-gray-100 rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-24 h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );

  // Skeleton Table Rows
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-32 h-3 bg-gray-200 rounded mt-1"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-14 h-6 bg-gray-200 rounded-full"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-20 h-5 bg-gray-200 rounded"></div>
      </td>
    </tr>
  );

  if (loading && !refreshing) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="w-48 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-64 h-4 bg-gray-200 rounded mt-2 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="w-40 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-6 py-4 text-left">
                    <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="w-18 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-rose-600" />
          </div>
          <div className="text-rose-600 text-lg font-semibold">Failed to Load Dashboard</div>
          <p className="text-rose-700 max-w-md">{error}</p>
          <button 
            onClick={() => fetchOrders()}
            className="mt-4 px-6 py-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            Dashboard
            <span className="text-sm font-normal text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Live
            </span>
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
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">System Online</span>
          </div>
          <button 
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
            className="px-3 py-2 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 transition-all duration-300 flex items-center gap-1.5 border border-gray-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
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
              className={`bg-linear-to-br ${card.bgGradient} p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-white/50 backdrop-blur-sm relative overflow-hidden group`}
            >
              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="flex items-start justify-between relative">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  {card.trend && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className={`text-xs font-medium ${card.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {card.trend}
                      </span>
                      <span className="text-xs text-gray-400">vs last month</span>
                    </div>
                  )}
                </div>
                <div className={`${card.iconBg} p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
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
          {orders.length > 0 && (
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 transition-colors">
              View all
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
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
                orders.slice(0, 5).map((order, index) => {
                  const avatarColor = getAvatarColor(getCustomerName(order));
                  return (
                    <tr 
                      key={order._id || order.id || index}
                      className="hover:bg-gray-50/50 transition-colors duration-150 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-linear-to-br ${avatarColor} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
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
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-5xl">📭</div>
                      <p className="font-medium text-gray-700">No orders found</p>
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
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 mx-auto transition-colors">
              View all orders
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}