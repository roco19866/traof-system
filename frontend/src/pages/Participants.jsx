import React, { useState, useEffect, useRef } from 'react';
import { Users, UserPlus, Upload, Search, Filter, Mail, Phone, Loader2 } from 'lucide-react';
import api from '../api';

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await api.get('/participants');
      setParticipants(response.data);
      setError(null);
    } catch (err) {
      setError('فشل في تحميل المشاركين. يرجى المحاولة لاحقاً.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      await api.post('/participants/bulk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('تم استيراد المشاركين بنجاح!');
      fetchParticipants();
    } catch (err) {
      alert('حدث خطأ أثناء الاستيراد. تأكد من صيغة الملف.');
      console.error(err);
    } finally {
      setUploading(false);
      event.target.value = null;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p>جاري تحميل المشاركين...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2 gradient-text">إدارة المشاركين</h1>
          <p className="text-slate-500">قاعدة بيانات شاملة لجميع المشاركين في البرامج والفعاليات.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept=".xlsx, .xls"
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
            className="flex items-center justify-center px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-semibold disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-5 h-5 ml-2 animate-spin" /> : <Upload className="w-5 h-5 ml-2" />}
            {uploading ? 'جاري الاستيراد...' : 'استيراد Excel'}
          </button>
          <button className="flex items-center justify-center px-4 py-2.5 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all font-bold">
            <UserPlus className="w-5 h-5 ml-2" />
            إضافة مشارك
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث عن اسم، بريد إلكتروني، أو رقم هوية..." 
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 text-sm font-bold">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">الاسم الكامل</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">رقم الهوية</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">التواصل</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">القسم</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">البرنامج الحالي</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {participants.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">لا يوجد مشاركون حالياً.</td>
                </tr>
              ) : (
                participants.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{p.full_name}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono">{p.national_id || '---'}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className="flex items-center text-xs text-slate-500"><Mail className="w-3 h-3 ml-1" />{p.email || '---'}</span>
                        <span className="flex items-center text-xs text-slate-500"><Phone className="w-3 h-3 ml-1" />{p.mobile || '---'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{p.department_name || '---'}</td>
                    <td className="px-6 py-4">
                      <span className="bg-primary-50 text-primary-600 px-2 py-1 rounded-lg text-[11px] font-bold">{p.program_name || '---'}</span>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Departments;
