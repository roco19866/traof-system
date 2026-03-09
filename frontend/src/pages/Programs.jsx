import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Calendar, MapPin, Tag, Loader2 } from 'lucide-react';
import api from '../api';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/programs');
      setPrograms(response.data);
      setError(null);
    } catch (err) {
      setError('فشل في تحميل البرامج. يرجى المحاولة لاحقاً.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p>جاري تحميل البرامج...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2 gradient-text">البرامج التدريبية</h1>
          <p className="text-slate-500">إدارة الفعاليات والبرامج التدريبية المتاحة.</p>
        </div>
        <button className="flex items-center justify-center px-4 py-2.5 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all font-bold">
          <Plus className="w-5 h-5 ml-2" />
          إنشاء برنامج جديد
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث عن برنامج..." 
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 text-sm font-bold">
          {error}
        </div>
      )}

      {programs.length === 0 && !error ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400">لا توجد برامج تدريبية متاحة حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {programs.map((prog) => (
            <div key={prog.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 card-hover">
              <div className={`w-full md:w-32 h-32 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary-50 text-primary-600`}>
                <BookOpen className="w-12 h-12" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600`}>
                    نشط
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{prog.department_name}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{prog.name}</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="flex items-center text-xs text-slate-500">
                    <Tag className="w-3 h-3 ml-1" />
                    {prog.type}
                  </div>
                  <div className="flex items-center text-xs text-slate-500">
                    <Calendar className="w-3 h-3 ml-1" />
                    {new Date(prog.start_date).toLocaleDateString('ar-SA')}
                  </div>
                  <div className="flex items-center text-xs text-slate-500">
                    <MapPin className="w-3 h-3 ml-1" />
                    {prog.location || 'غير محدد'}
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <button className="flex-1 py-2 bg-primary-50 text-primary-600 rounded-lg text-xs font-bold hover:bg-primary-100 transition-colors">إدارة المشاركين</button>
                  <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">تعديل</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Programs;
