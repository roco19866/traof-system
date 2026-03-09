import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search, Edit3, Trash2, Loader2 } from 'lucide-react';
import api from '../api';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/departments');
      setDepartments(response.data);
      setError(null);
    } catch (err) {
      setError('فشل في تحميل الأقسام. يرجى المحاولة لاحقاً.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p>جاري تحميل الأقسام...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2 gradient-text">إدارة الأقسام</h1>
          <p className="text-slate-500">تنظيم الهيكل الإداري للمنظمة.</p>
        </div>
        <button className="flex items-center justify-center px-4 py-2.5 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all font-bold">
          <Plus className="w-5 h-5 ml-2" />
          إضافة قسم جديد
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 text-sm font-bold">
          {error}
        </div>
      )}

      {departments.length === 0 && !error ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center">
          <Building2 className="w-16 h-16 mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400">لا توجد أقسام مضافة حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${dept.status === 'نشط' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                  {dept.status || 'نشط'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{dept.name}</h3>
              <p className="text-sm text-slate-500 mt-1">المدير: {dept.manager_name || 'غير محدد'}</p>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-xs text-slate-400">بانتظار البيانات...</span>
                <div className="flex space-x-2 space-x-reverse">
                  <button className="p-2 text-slate-400 hover:text-primary-500 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                  <button className="p-2 text-slate-400 hover:text-rose-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Departments;
