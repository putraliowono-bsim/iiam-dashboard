import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Shield,
  ChevronDown,
  ChevronRight,
  BarChart3,
  LogOut,
  Menu,
  X,
  UserCheck
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const [setupExpanded, setSetupExpanded] = React.useState(
    location.pathname.startsWith('/setup')
  );
  const [intelligenceExpanded, setIntelligenceExpanded] = React.useState(
    location.pathname.startsWith('/intelligence')
  );
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'User', href: '/identity', icon: Users },
    { name: 'Group', href: '/group', icon: UserCheck },
  ];

  const intelligenceSubmenu = [
    { name: 'Audit Trails', href: '/intelligence/audit-trails' },
  ];

  const setupSubmenu = [
    { name: 'Applications', href: '/setup/applications' },
    { name: 'Tasks', href: '/setup/tasks' },
    { name: 'Policies', href: '/setup/policies' },
    { name: 'Identity Sync', href: '/setup/identity-sync' },
    { name: 'Intern/Trainee', href: '/setup/intern-trainee' },
  ];

  React.useEffect(() => {
    if (location.pathname.startsWith('/setup')) {
      setSetupExpanded(true);
    }
    if (location.pathname.startsWith('/intelligence')) {
      setIntelligenceExpanded(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Implementation for logout
    console.log('User logged out');
    alert('You have been logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-blue-600 shadow-lg">
        <div className="flex items-center h-16 px-6 border-b border-blue-500">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">IAM Portal</span>
          </div>
        </div>
        
        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              </li>
            ))}
            
            {/* Intelligence Menu with Submenu */}
            <li>
              <button
                onClick={() => setIntelligenceExpanded(!intelligenceExpanded)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname.startsWith('/intelligence')
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Intelligence
                </div>
                {intelligenceExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {intelligenceExpanded && (
                <ul className="mt-2 ml-8 space-y-1">
                  {intelligenceSubmenu.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActive
                              ? 'bg-blue-400 text-white'
                              : 'text-blue-100 hover:bg-blue-400 hover:text-white'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Setup Menu with Submenu */}
            <li>
              <button
                onClick={() => setSetupExpanded(!setupExpanded)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname.startsWith('/setup')
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  Setup
                </div>
                {setupExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {setupExpanded && (
                <ul className="mt-2 ml-8 space-y-1">
                  {setupSubmenu.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActive
                              ? 'bg-blue-400 text-white'
                              : 'text-blue-100 hover:bg-blue-400 hover:text-white'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-blue-500">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-blue-100 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        {/* Top bar */}
        <div className="flex items-center justify-end h-16 bg-white border-b border-gray-200 px-6">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-900">
              Welcome back, Administrator
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-6">
            <div className="flex items-center mb-4">
              <LogOut className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will need to sign in again to access the system.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}