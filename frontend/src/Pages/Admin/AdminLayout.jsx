import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  LogOut,
  ChefHat,
  Bell,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'text-blue-400',
      bgHover: 'hover:bg-blue-500/10',
      activeBg: 'bg-blue-500/20',
      borderColor: 'border-blue-400'
    },
    {
      path: '/admin/addDish-form',
      label: 'Add Dishes',
      icon: PlusCircle,
      color: 'text-emerald-400',
      bgHover: 'hover:bg-emerald-500/10',
      activeBg: 'bg-emerald-500/20',
      borderColor: 'border-emerald-400'
    },
    {
      path: '/admin/orders',
      label: 'Check Orders',
      icon: ClipboardList,
      color: 'text-amber-400',
      bgHover: 'hover:bg-amber-500/10',
      activeBg: 'bg-amber-500/20',
      borderColor: 'border-amber-400'
    }
  ];

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 font-sans overflow-x-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white/70 backdrop-blur-sm'
      }`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 
        text-white flex flex-col shadow-2xl z-50 transition-all duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Section */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse-slow">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-gray-800"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-xs text-gray-400 font-medium">Restaurant Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 xx-4 py-6 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
            Main Menu
          </p>
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                      transition-all duration-200 group relative
                      ${active 
                        ? `${item.activeBg} ${item.color} shadow-lg shadow-black/20` 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {active && (
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 ${item.borderColor} rounded-r-full bg-current`} />
                    )}
                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      active ? item.color : 'text-gray-400 group-hover:text-white'
                    }`} />
                    <span className={`font-medium text-sm ${active ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                    {active && (
                      <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                        Active
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
              Account
            </p>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
              <span className="font-medium text-sm">Logout</span>
              <kbd className="ml-auto text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-500 font-mono">
                ⌘Q
              </kbd>
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@bunglow.co.in</p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        lg:ml-72 min-h-screen transition-all duration-300
        ${isMobileMenuOpen ? 'opacity-50' : 'opacity-100'}
      `}>
        {/* Header Spacer for Mobile */}
        <div className="h-16 lg:h-0"></div>

        {/* Main Content Area with Animation */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="animate-fadeIn">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}