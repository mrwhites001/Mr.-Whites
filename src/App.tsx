import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Terminal, 
  Zap, 
  BrainCircuit, 
  ChevronRight, 
  ShieldAlert, 
  Eye, 
  Search,
  Cpu,
  Lock,
  Command
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Systems online. I am Mr. Whites. IQ stabilized at 200. What's the objective?" }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'quick' | 'deep'>('quick');
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands = [
    { cmd: '/SEARCH', desc: 'Perform structured technical analysis' },
    { cmd: '/IQ200', desc: 'Activate maximum theoretical depth' },
    { cmd: '/DEEP', desc: 'Execute chain-of-thought analysis' },
    { cmd: '/DARKWEB', desc: 'Threat intelligence from underground sources' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    let detectedCommand = '';
    const upperInput = input.trim().toUpperCase();
    
    for (const c of commands) {
      if (upperInput.startsWith(c.cmd)) {
        detectedCommand = c.cmd;
        break;
      }
    }

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          mode,
          command: detectedCommand
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `[ERROR] Intelligence connection severed. ${error.message}` 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-cyber-dark text-cyber-green font-mono overflow-hidden border-4 border-cyber-gray shadow-[0_0_50px_rgba(0,0,0,1)] relative flex-col">
      {/* Header: System Status & Persona */}
      <header className="h-16 border-b border-cyber-green/30 bg-cyber-gray flex items-center justify-between px-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse shadow-[0_0_10px_#00FF66]"></div>
          <h1 className="text-xl font-black tracking-widest uppercase font-display">Mr. Whites // IQ: MAX</h1>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-cyber-green/60">
          <span className="hidden md:inline">Session: Encrypted</span>
          <span className="hidden md:inline">Kernel: Kali-X-6.2</span>
          <span className="hidden lg:inline">Status: Analyzing Dark Web</span>
        </div>
        <div className="flex items-center gap-2 bg-black p-1 border border-cyber-green/20 rounded">
          <button
            onClick={() => setMode('quick')}
            className={`px-3 py-1 text-[10px] uppercase font-bold transition-all ${mode === 'quick' ? 'bg-cyber-green text-black shadow-[0_0_10px_#00FF66]' : 'text-cyber-green/40 hover:text-cyber-green'}`}
          >
            Quick
          </button>
          <button
            onClick={() => setMode('deep')}
            className={`px-3 py-1 text-[10px] uppercase font-bold transition-all ${mode === 'deep' ? 'bg-cyber-green text-black shadow-[0_0_10px_#00FF66]' : 'text-cyber-green/40 hover:text-cyber-green'}`}
          >
            Deep
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar: Command Index & Toolset */}
        <aside className="w-64 border-r border-cyber-green/20 bg-cyber-alt p-4 hidden md:flex flex-col gap-6">
          <section>
            <h2 className="text-[11px] text-white/40 mb-3 uppercase tracking-tighter border-b border-white/5 pb-1">Quick Access Commands</h2>
            <ul className="space-y-4">
              {commands.map(c => (
                <li key={c.cmd} className="group cursor-pointer" onClick={() => setInput(c.cmd + ' ')}>
                  <span className="text-xs text-white group-hover:text-cyber-green transition-colors font-bold tracking-tight">{c.cmd}</span>
                  <p className="text-cyber-green/40 text-[9px] mt-0.5 leading-tight">{c.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-auto">
            <div className="p-3 bg-cyber-green/5 border border-cyber-green/20 rounded-sm">
              <p className="text-[9px] text-cyber-green/80 leading-relaxed italic">
                "I'm the guy who sees the door you didn't know existed. Let's find the ghost in the machine."
              </p>
              <p className="text-[9px] text-white mt-2 font-bold">— Mr. Whites</p>
            </div>
          </section>
        </aside>

        {/* Main Content: Chat Interface */}
        <div className="flex-1 flex flex-col bg-[radial-gradient(circle_at_center,_#0a0a0a_0%,_#020202_100%)] relative">
          <div 
            ref={scrollRef}
            className="flex-1 p-6 space-y-6 overflow-y-auto terminal-scroll"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`
                    p-4 max-w-[90%] md:max-w-[80%] border-l-2
                    ${m.role === 'assistant' 
                      ? 'border-cyber-green bg-cyber-green/5 text-cyber-green shadow-[0_0_15px_rgba(0,255,102,0.05)]' 
                      : 'border-white/20 bg-white/5 text-white'
                    }
                  `}>
                    {m.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-1.5 py-0.5 bg-cyber-green text-black text-[9px] font-bold uppercase">Thought Process: {mode.toUpperCase()}</span>
                        <span className="text-[9px] text-cyber-green/50 uppercase italic font-bold">Analysis active...</span>
                      </div>
                    )}
                    <div className="space-y-2 text-sm leading-relaxed">
                      {m.content.split('\n').map((line, li) => (
                        <p key={li}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <span className={`text-[9px] mt-1 uppercase tracking-widest ${m.role === 'user' ? 'text-white/20' : 'text-cyber-green/40'}`}>
                    {m.role === 'user' ? 'User [Secure]' : 'Mr. Whites // Genius Mode Active'}
                  </span>
                </motion.div>
              ))}
              {isProcessing && (
                <div className="flex flex-col items-start opacity-50">
                  <div className="border-l-2 border-cyber-green/30 bg-cyber-green/5 p-4 w-48 text-[11px] animate-pulse">
                    EXECUTING_ANALYSIS...
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Input & Action Bar */}
          <div className="border-t border-cyber-green/20 bg-cyber-alt p-4 flex flex-col gap-4">
            <div className="flex gap-4">
              <button 
                onClick={() => setMode('deep')}
                className={`flex-1 py-2 border text-xs uppercase tracking-widest font-bold transition-all ${mode === 'deep' ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-green/40 text-cyber-green/40 hover:bg-cyber-green/10'}`}
              >
                [ THINK DEEPLY BEFORE REPLYING ]
              </button>
              <button 
                onClick={() => setMode('quick')}
                className={`flex-1 py-2 border text-xs uppercase tracking-widest font-bold transition-all ${mode === 'quick' ? 'border-white bg-white/10 text-white' : 'border-white/20 text-white/40 hover:bg-white/10'}`}
              >
                [ QUICK REPLY ]
              </button>
            </div>
            
            <div className="relative flex items-center">
              <span className="absolute left-4 text-cyber-green text-sm">$</span>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter command or prompt... (e.g., /DEEP analysis on data packets)" 
                className="w-full bg-black/50 border border-cyber-green/30 pl-10 pr-20 py-3 text-sm focus:outline-none focus:border-cyber-green focus:bg-black/80 placeholder-cyber-green/20 text-cyber-green transition-all"
              />
              <div className="absolute right-4 text-[9px] text-cyber-green/30 font-bold uppercase tracking-widest">
                TERMUX@KALI_V.4
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Visual Flare: Data stream footer */}
      <footer className="h-6 bg-cyber-green flex items-center px-4 overflow-hidden shadow-[0_-5px_15px_rgba(0,255,102,0.2)]">
        <div className="whitespace-nowrap text-[8px] font-black text-black uppercase tracking-[0.3em] flex gap-20 animate-marquee">
          <span>THC_HYDRA_THREAD_START...</span>
          <span>METASPLOIT_PAYLOAD_READY...</span>
          <span>ENCRYPTING_TRAFFIC_DARKWEB_NODE_04...</span>
          <span>DARK_PSYCHOLOGY_MODULE_ACTIVE...</span>
          <span>EMOTION_READING_BUFFER_SYNCED...</span>
          <span>ACTION_PREDICTION_ACTIVE...</span>
          <span>MIND_READING_INTENT_LOCKED...</span>
          <span>BARAK_BIGBOSS_AUTH_SUCCESS...</span>
        </div>
      </footer>
    </div>
  );
}
