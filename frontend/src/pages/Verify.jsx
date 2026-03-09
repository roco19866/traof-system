import React from 'react';
import { ShieldCheck, ShieldAlert, Search, FileBadge, User, Calendar, CheckCircle2 } from 'lucide-react';

const Verify = () => {
  const [certData, setCertData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  // Mock verification logic
  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setCertData({
        number: 'TRF-2026-000124',
        name: 'خالد بن وليد القحطاني',
        program: 'تطوير تطبيقات الويب الحديثة',
        date: '2026-03-08',
        status: 'Valid'
      });
      setLoading(false);
      setSearched(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6" dir="rtl">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary-600 rounded-2xl shadow-xl shadow-primary-200 flex items-center justify-center mx-auto mb-4 rotate-3">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">التحقق من الشهادة</h1>
          <p className="text-slate-500">أدخل رقم الشهادة للتأكد من صحتها وموثوقيتها.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          
          <form onSubmit={handleVerify} className="relative z-10 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">رقم الشهادة</label>
              <div className="relative">
                <FileBadge className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="مثال: TRF-2026-XXXXXX"
                  className="w-full pr-12 pl-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-primary-500 focus:bg-white transition-all text-lg font-mono tracking-wider outline-none"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Search className="w-5 h-5 ml-2" />
                  تحقق الآن
                </>
              )}
            </button>
          </form>

          {searched && certData && (
            <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center space-x-4 space-x-reverse mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white flex-shrink-0 animate-pulse">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-emerald-800 font-bold text-lg">شهادة موثقة</h3>
                  <p className="text-emerald-600 text-sm">هذه الشهادة مسجلة وصالحة في نظام تراوف.</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'اسم المشارك', value: certData.name, icon: User },
                  { label: 'البرنامج', value: certData.program, icon: BookOpen },
                  { label: 'تاريخ الإصدار', value: certData.date, icon: Calendar },
                  { label: 'رقم الشهادة', value: certData.number, icon: FileBadge },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center text-slate-500 text-sm">
                      <item.icon className="w-4 h-4 ml-2" />
                      {item.label}
                    </div>
                    <div className="text-slate-800 font-bold text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-slate-400 text-sm">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} نظام تراوف
        </p>
      </div>
    </div>
  );
};

export default Verify;
