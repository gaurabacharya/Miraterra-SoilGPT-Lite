import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Plane as Plant, Droplets, Database, MessageSquare, BarChart3 } from 'lucide-react';

// Components & Pages
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SoilAnalyzer from './pages/SoilAnalyzer';
import KnowledgeBase from './pages/KnowledgeBase';
import SimulatedIntegrations from './pages/SimulatedIntegrations';
import NotFound from './pages/NotFound';
import AuthProvider from './context/AuthContext';

function App() {
  // Define sidebar navigation items with icons
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/analyzer', label: 'Soil Analyzer', icon: <Droplets className="w-5 h-5" /> },
    { path: '/knowledge', label: 'Knowledge Base', icon: <Database className="w-5 h-5" /> },
    { path: '/integrations', label: 'Integrations', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <AuthProvider>
      <Router>
        <Layout navItems={navItems}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyzer" element={<SoilAnalyzer />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/integrations" element={<SimulatedIntegrations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;