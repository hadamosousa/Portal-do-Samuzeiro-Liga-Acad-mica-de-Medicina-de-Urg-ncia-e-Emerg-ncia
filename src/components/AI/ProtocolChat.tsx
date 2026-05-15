import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';

const ProtocolChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/protocolos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Desculpe, tive um erro ao acessar os protocolos. Tente novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#C8102E] text-white rounded-full shadow-2xl flex items-center justify-center z-[100] border-4 border-white"
      >
        <Bot className="w-8 h-8" />
        <motion.div
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.5 }}
            className="fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-3xl shadow-2xl flex flex-col z-[101] border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#003B73] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">LAMURGEM AI</h3>
                  <p className="text-[10px] opacity-70 tracking-widest uppercase">Especialista em Protocolos</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.length === 0 && (
                <div className="text-center mt-10">
                  <Bot className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Olá, sou a IA da LAMURGEM.<br/>Em que protocolo de emergência posso ajudar hoje?</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {['Protocolo de PCR', 'Doses na Intubação', 'Crise Convulsiva'].map(s => (
                      <button 
                        key={s} 
                        onClick={() => setInput(s)}
                        className="text-[10px] bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-500 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                    ? 'bg-[#003B73] text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    <Markdown className="prose prose-sm prose-slate max-w-none">
                      {m.content}
                    </Markdown>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 italic text-slate-400 text-xs flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> Consultando base SAMU/ACLS...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ex: Protocolo de Trauma PHTLS..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#003B73] transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#003B73] text-white rounded-lg hover:bg-[#002a52] transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProtocolChat;
