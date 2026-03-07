import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F3F5F7] font-['Tajawal']" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1F6F8B] text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#25B99A] font-bold text-xl">T</div>
          <h1 className="text-xl font-bold">تراوف</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon="📊" label="لوحة التحكم" active />
          <NavItem icon="🏢" label="الأقسام" />
          <NavItem icon="📚" label="البرامج" />
          <NavItem icon="👥" label="المشاركين" />
          <NavItem icon="🎨" label="قوالب الشهادات" />
          <NavItem icon="📜" label="الأرشيف" />
        </nav>

        <div className="p-4 bg-black/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">👤</div>
            <div>
              <p className="text-sm font-medium">أحمد المسؤول</p>
              <p className="text-xs text-white/60">مدير النظام</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-700">لوحة التحكم</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">السبت، 7 مارس 2026</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-[#25B99A] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}>
    <span>{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

export default Layout;
