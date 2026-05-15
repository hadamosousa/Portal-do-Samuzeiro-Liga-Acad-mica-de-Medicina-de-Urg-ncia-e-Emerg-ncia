import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Bell, 
  Image as ImageIcon, 
  Calendar, 
  FileText, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  UserCircle
} from 'lucide-react';
import ProtocolChat from '../AI/ProtocolChat';

interface Ligante {
  name: string;
  role: string;
  cpf: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Ligante | null>(null);
  const [activeTab, setActiveTab] = useState<'mural' | 'galeria'>('mural');

  useEffect(() => {
    const auth = localStorage.getItem('ligante_auth');
    if (!auth) {
      navigate('/login');
    } else {
      setUser(JSON.parse(auth));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ligante_auth');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="bg-[#003B73] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">✚</span>
            </div>
            <span className="font-extrabold tracking-tight text-xl text-[#003B73]">LAMURGEM</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('mural')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'mural' ? 'bg-blue-50 text-[#003B73] font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Bell className="w-5 h-5" /> Mural de Avisos
          </button>
          <button 
            onClick={() => setActiveTab('galeria')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'galeria' ? 'bg-blue-50 text-[#003B73] font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <ImageIcon className="w-5 h-5" /> Galeria de Projetos
          </button>
          
          <div className="pt-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">Links Externos</p>
            <a 
              href="https://docs.google.com/forms/d/e/SAMPLE_ESCALA" 
              target="_blank" 
              rel="noreferrer"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium"
            >
              <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-[#C8102E]" /> Escala de Maio</div>
              <ExternalLink className="w-4 h-4 opacity-40" />
            </a>
            <a 
              href="https://docs.google.com/forms/d/e/SAMPLE_CARGA_HORARIA" 
              target="_blank" 
              rel="noreferrer"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium"
            >
              <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-[#C8102E]" /> Registro de C.H.</div>
              <ExternalLink className="w-4 h-4 opacity-40" />
            </a>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-50">
          <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 mb-4">
            <UserCircle className="w-10 h-10 text-slate-300" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-700 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" /> Sair do Portal
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-10">
        <header className="mb-10 lg:hidden flex justify-between items-center">
           <div className="bg-[#003B73] w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">✚</span>
            </div>
            <button onClick={handleLogout} className="p-2 text-red-500"><LogOut className="w-6 h-6" /></button>
        </header>

        {activeTab === 'mural' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-black text-[#003B73] mb-8">Mural de Avisos</h2>
            <div className="grid gap-6">
              {[
                { title: 'Plantão SAMU - Escala de Maio', description: 'A escala do mês de Maio já está disponível para preenchimento. Favor verificar os horários de internato.', date: 'Hoje, 10:45', tag: 'IMPORTANTE' },
                { title: 'Novo Protocolo PHTLS 10ª Ed.', description: 'Adicionamos a tradução comentada dos novos guidelines de controle de hemorragia exanguinante.', date: 'Ontem', tag: 'EDUCATIVO' },
                { title: 'Reunião Geral de Alinhamento', description: 'Encontro obrigatório para todos os ligantes no auditório da faculdade na próxima sexta-feira.', date: '12 Maio', tag: 'EVENTO' }
              ].map((aviso, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
                      aviso.tag === 'IMPORTANTE' ? 'bg-red-100 text-red-600' : 
                      aviso.tag === 'EDUCATIVO' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {aviso.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{aviso.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{aviso.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{aviso.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-3xl font-black text-[#003B73] mb-8">Galeria de Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400', title: 'Treinamento Prático' },
                { img: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?q=80&w=400', title: 'Visita Técnica SAMU' },
                { img: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=400', title: 'Ação Comunitária' },
                { img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400', title: 'Simulado de Vítimas' }
              ].map((item, idx) => (
                <div key={idx} className="group relative bg-white rounded-3xl overflow-hidden aspect-square shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Floating AI */}
      <ProtocolChat />
    </div>
  );
};

export default Dashboard;
