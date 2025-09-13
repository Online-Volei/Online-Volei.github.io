import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, History, Circle } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/training', label: 'Treino', icon: Activity },
    { path: '/history', label: 'Histórico', icon: History },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-volleyball-600 rounded-lg flex items-center justify-center">
              <Circle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Online Vôlei</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-volleyball-100 text-volleyball-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
