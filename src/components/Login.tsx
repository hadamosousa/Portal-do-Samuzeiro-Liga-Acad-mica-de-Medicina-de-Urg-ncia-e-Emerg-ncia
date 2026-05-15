import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, AlertCircle, ChevronRight } from 'lucide-react';

const Login: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Normalizing CPF
    const cleanCpf = cpf.replace(/\D/g, '');
    
    // Auth Logic requested by user
    if (cleanCpf === '03113888174') {
      localStorage.setItem('ligante_auth', JSON.stringify({
        name: 'Hadamo Fernandes de Sousa Filho',
        role: 'Presidente',
        cpf: cleanCpf
      }));
      navigate('/portal');
    } else {
      setError('CPF não autorizado para o portal de ligantes neste estágio de desenvolvimento.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="bg-[#003B73] w-20 h-20 rounded-full flex items-center justify-center shadow-xl mx-auto mb-4 border-4 border-white">
            <span className="text-white font-bold text-3xl">✚</span>
          </div>
          <h1 className="text-3xl font-black text-[#003B73]">Portal LAMURGEM</h1>
          <p className="text-slate-500 font-medium mt-1">Acesso exclusivo para Ligantes</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Número do CPF</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#003B73] focus:border-transparent transition-all outline-none font-medium"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3 items-center text-red-600 text-sm"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#003B73] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#002a52] transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Entrar no Portal <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400">
              Faculdade de Medicina de Formosa • Internato SAMU
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
