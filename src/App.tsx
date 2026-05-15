import React from 'react';
import { 
  BrowserRouter, 
  HashRouter, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import { Play, Shield, Users, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

// Components
import Sitemap from './components/Sitemap';

/**
 * Utility for detecting Preview/Cloud IDE environments
 * Shields the routing against proxies that break HTML5 History API (refreshes/subroutes)
 */
const checkPreviewEnvironment = (): boolean => {
  const indicators = [
    'googleusercontent',
    'webcontainer',
    'shim',
    '.goog',
    'scf.usercontent',
    'stackblitz',
    'codesandbox'
  ];
  
  const hostname = window.location.hostname;
  const href = window.location.href;

  return indicators.some(indicator => 
    hostname.includes(indicator) || href.includes(indicator)
  );
};

// Main LP Component
const LPVideo = () => (
  <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
    {/* Navigation */}
    <nav className="bg-[#003B73] text-white py-4 px-6 fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
             <span className="text-[#C8102E] font-bold text-xl">✚</span>
          </div>
          <span className="font-bold tracking-tight text-xl">LAMURGEM</span>
        </div>
        <button className="bg-[#C8102E] hover:bg-[#A00D25] px-5 py-2 rounded-lg font-bold transition-colors text-sm uppercase tracking-wide flex items-center gap-2">
          Inscrever-se <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </nav>

    {/* Hero Section */}
    <main className="mt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-red-100 text-[#C8102E] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Treinamento 2026 • Formosa/GO
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-[#003B73] leading-[1.1] mb-6">
            Domine Atendimentos de <span className="text-[#C8102E]">Alta Complexidade</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
            Aprenda os protocolos mais atualizados de Urgência e Emergência com a Liga Acadêmica que é referência no estado.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#C8102E]" />
              <span className="font-semibold text-slate-700">Certificado MEC</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-[#C8102E]" />
              <span className="font-semibold text-slate-700">Mentoria VIP</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#C8102E]" />
              <span className="font-semibold text-slate-700">Acesso Vitalício</span>
            </div>
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-[#C8102E]" />
              <span className="font-semibold text-slate-700">Aulas Práticas</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#003B73] rounded-3xl transform rotate-3 scale-105 opacity-10"></div>
          <div className="relative bg-[#003B73] rounded-3xl overflow-hidden aspect-video shadow-2xl group cursor-pointer border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop" 
              alt="Emergency Training" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-[#C8102E] fill-[#C8102E] ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-wider mb-1">Vídeo Demonstrativo</p>
              <h3 className="text-xl font-bold">Protocolos Avançados de Trauma</h3>
            </div>
          </div>
        </motion.div>
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">
          LAMURGEM © 2026 • Liga Acadêmica de Urgência e Emergência de Formosa
        </p>
      </div>
    </footer>
  </div>
);

export default function App() {
  const isPreview = checkPreviewEnvironment();
  
  // Selection of Router: HashRouter for Cloud IDEs, BrowserRouter for Production
  const Router = isPreview ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>
        {/* Dynamic Root Redirection */}
        <Route 
          path="/" 
          element={<Navigate to={isPreview ? "/sitemap" : "/lp-video"} replace />} 
        />

        <Route path="/lp-video" element={<LPVideo />} />
        <Route path="/sitemap" element={<Sitemap />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

