import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Upload from '@/pages/Upload';
import DocumentDetail from '@/pages/DocumentDetail';
import CaseLaw from '@/pages/CaseLaw';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

// Layout
import { Layout } from '@/components/layout/Layout';

// Auth
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/upload" element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          } />
          
          <Route path="/documents/:id" element={
            <ProtectedRoute>
              <DocumentDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/case-law" element={
            <ProtectedRoute>
              <CaseLaw />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
