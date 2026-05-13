import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export function AiAssistant() {
  const navigate = useNavigate();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate('/assistant')}
      aria-label="Open AI Assistant"
      className="relative w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-purple-500/20"
    >
      <Bot className="h-5 w-5 text-white" />
      <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#09090b] animate-pulse" />
    </motion.button>
  );
}
