import React from 'react';
import { Menu, X, LayoutDashboard, Building2, BookOpen, Users, FileBadge, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'لوحة التحكم', icon: LayoutDashboard, path: '/' },
    { name: 'إدارة الأقسام', icon: Building2, path: '/departments' },
    { name: 'البرامج التدريبية', icon: BookOpen, path: '/programs' },
    { name: 'المشاركين', icon: Users, path: '/participants' },
    { name: 'الشهادات الملحقة', icon: FileBadge, path: '/certificates' },
    { name: 'الإعدادات', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-20 px-6 border-b bg-primary-500">
            <h1 className="text-2xl font-bold text-white tracking-widest">تراوف</h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path ? 'bg-primary-500 text-white shadow-lg shadow-primary-200' : 'text-slate-500 hover:bg-primary-50 hover:text-primary-600'}`}
              >
                <item.icon className={`w-5 h-5 ml-3 ${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-primary-500'}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center w-full px-4 py-3 text-slate-500 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors">
              <LogOut className="w-5 h-5 ml-3" />
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-left ml-4">
              <p className="text-sm font-semibold text-slate-700">أحمد محمد</p>
              <p className="text-xs text-slate-500">مدير النظام</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold border-2 border-white shadow-sm">
              أ
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 focus:outline-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
