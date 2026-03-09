import React from 'react';
import { Users, FileBadge, Building2, BookOpen, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 card-hover">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: 'إجمالي الشهادات', value: '1,284', icon: FileBadge, color: 'primary', trend: 12 },
    { title: 'المشاركين النشطين', value: '856', icon: Users, color: 'emerald', trend: 5 },
    { title: 'البرامج التدريبية', value: '24', icon: BookOpen, color: 'amber', trend: -2 },
    { title: 'الأقسام', value: '6', icon: Building2, color: 'indigo' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2 gradient-text">لوحة التحكم</h1>
        <p className="text-slate-500">أهلاً بك مجدداً، إليك ملخص نشاط النظام لهذا اليوم.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Certificates */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">آخر الشهادات الصادرة</h2>
            <button className="text-primary-600 text-sm font-semibold hover:underline">عرض الكل</button>
          </div>
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-4 hover:bg-slate-50 flex items-center justify-between transition-colors">
                <div className="flex items-center space-x-3 space-x-reverse ml-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">محمد علي الهاشمي</p>
                    <p className="text-xs text-slate-500">برنامج القيادة الفعالة</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-700">TRF-2026-00012{item}</p>
                  <p className="text-[10px] text-slate-400">منذ 15 دقيقة</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 ml-2 text-primary-500" />
            نشاط النظام
          </h2>
          <div className="space-y-6">
            {[
              { type: 'issue', msg: 'تم إصدار 45 شهادة جديدة لقسم التدريب', time: '10:30 ص', icon: CheckCircle, color: 'emerald' },
              { type: 'import', msg: 'تم استيراد قائمة مشاركين جديدة (120 مشارك)', time: '09:15 ص', icon: Clock, color: 'blue' },
              { type: 'alert', msg: 'تنبيه: قالب شهادة التميز يحتاج لتحديث الشعار', time: 'أمس', icon: AlertCircle, color: 'amber' },
            ].map((act, i) => (
              <div key={i} className="flex space-x-3 space-x-reverse relative pb-6 last:pb-0">
                {i !== 2 && <div className="absolute top-8 bottom-0 right-4 w-0.5 bg-slate-100"></div>}
                <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-${act.color}-50 text-${act.color}-500`}>
                  <act.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-700 font-medium leading-tight">{act.msg}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
