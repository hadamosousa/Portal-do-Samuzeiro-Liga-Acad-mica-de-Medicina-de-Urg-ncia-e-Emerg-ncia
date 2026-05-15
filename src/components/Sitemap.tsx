import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';
import { motion } from 'motion/react';

const Sitemap: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border-t-8 border-[#C8102E] overflow-hidden"
      >
        <div className="bg-[#003B73] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
          <h2 className="text-3xl font-bold tracking-tight">LAMURGEM</h2>
          <p className="text-xs uppercase tracking-widest opacity-80 mt-2 font-medium">Mapa de Desenvolvimento • Formosa/GO</p>
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
             <span className="text-slate-400 font-semibold uppercase text-xs tracking-wider">Rotas Disponíveis (Developer Preview)</span>
          </div>
          
          <nav className="space-y-4">
            <Link 
              to="/lp-video" 
              className="flex items-center justify-between p-5 bg-slate-50 hover:bg-[#003B73] hover:text-white transition-all duration-300 rounded-xl group border border-slate-100 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col">
                <span className="font-bold text-lg">Landing Page</span>
                <span className="text-sm opacity-60 group-hover:opacity-100">Vídeo de Treinamento Principal</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C8102E] group-hover:text-white transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-5 bg-blue-50 border border-blue-100 rounded-xl flex gap-4 items-start"
            >
              <Info className="w-6 h-6 text-[#003B73] shrink-0 mt-0.5" />
              <div className="text-sm text-[#003B73]/80 leading-relaxed">
                <strong className="text-[#003B73] block mb-1">Nota de Desenvolvimento:</strong>
                Você está vendo esta tela porque o sistema detectou um ambiente de <strong>Cloud/Preview</strong>. Em produção, os usuários são encaminhados diretamente para a LP.
              </div>
            </motion.div>
          </nav>
        </div>
        
        <div className="bg-slate-50/50 p-6 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
            Liga Acadêmica de Urgência e Emergência
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            2026
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Sitemap;
