import React from 'react';
import { FileBadge, Plus, Search, Download, Trash2, ExternalLink } from 'lucide-react';

const Certificates = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2 gradient-text">أرشيف الشهادات</h1>
          <p className="text-slate-500">إدارة وعرض جميع الشهادات الصادرة عبر النظام.</p>
        </div>
        <button className="flex items-center justify-center px-4 py-2.5 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all">
          <Plus className="w-5 h-5 ml-2" />
          إصدار شهادة جديدة
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث عن طريق اسم المشارك أو رقم الشهادة..." 
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
        <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500">
          <option>جميع البرامج</option>
          <option>برنامج القيادة</option>
          <option>ورشة الذكاء الاصطناعي</option>
        </select>
        <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 text-sm font-bold transition-colors">
          تصدير التقرير (Excel)
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">رقم الشهادة</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">المشارك</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">البرنامج</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">تاريخ الإصدار</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">الحالة</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold text-primary-600">TRF-2026-00012{i}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">خالد بن وليد القحطاني</td>
                  <td className="px-6 py-4 text-sm text-slate-500">تطوير تطبيقات الويب الحديثة</td>
                  <td className="px-6 py-4 text-sm text-slate-500">2026-03-08</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold">صالحة</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors" title="معاينة PDF">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="صفحة التحقق">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="إلغاء">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">عرض 1-10 من 1284 شهادة</p>
          <div className="flex space-x-2 space-x-reverse">
            <button className="px-3 py-1 bg-white border rounded-md text-xs disabled:opacity-50">السابق</button>
            <button className="px-3 py-1 bg-primary-600 text-white border-primary-600 rounded-md text-xs font-bold">1</button>
            <button className="px-3 py-1 bg-white border rounded-md text-xs">2</button>
            <button className="px-3 py-1 bg-white border rounded-md text-xs">التالي</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
