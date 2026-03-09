import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Certificates from './pages/Certificates';
import Departments from './pages/Departments';
import Participants from './pages/Participants';
import Programs from './pages/Programs';
import Verify from './pages/Verify';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/verify/:certNumber?" element={<Verify />} />
        
        {/* Protected Dashboard Routes (Wrapped in Layout) */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/participants" element={<Participants />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/settings" element={<div className="p-8 text-center text-slate-400 italic">صفحة الإعدادات قيد التطوير...</div>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
