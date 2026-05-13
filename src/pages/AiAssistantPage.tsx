import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, ArrowLeft, RefreshCw, Sparkles, ExternalLink, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  images?: { url: string; caption: string }[];
  smartReplies?: string[];
  link?: { label: string; to: string };
}

interface ChatContext {
  lastIntent: string;
  lastCategory: string | null;
  followUpDepth: number;
  userName: string;
}

const STORAGE_KEY = 'pds_ai_messages';
const CONTEXT_KEY = 'pds_ai_context';

function saveMessages(messages: ChatMessage[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
}
function loadMessages(): ChatMessage[] {
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : []; } catch { return []; }
}
function saveContext(ctx: ChatContext) {
  try { localStorage.setItem(CONTEXT_KEY, JSON.stringify(ctx)); } catch {}
}
function loadContext(): ChatContext {
  try { const s = localStorage.getItem(CONTEXT_KEY); if (s) return JSON.parse(s); } catch {}
  return { lastIntent: 'greeting', lastCategory: null, followUpDepth: 0, userName: 'there' };
}

const PRODUCT_IMAGES: Record<string, { url: string; caption: string }[]> = {
  rice: [
    { url: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&q=80', caption: 'Premium Long Grain Rice (25kg) — 15\u03c0' },
    { url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', caption: 'Basmathi Rice (10kg) — 8\u03c0' },
  ],
  beans: [
    { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80', caption: 'Black Eyed Beans (2kg) — 5\u03c0' },
    { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', caption: 'Mixed Legumes Pack — 7\u03c0' },
  ],
  vegetables: [
    { url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', caption: 'Fresh Organic Carrots (3kg) — 6\u03c0' },
    { url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80', caption: 'Plum Tomatoes (2kg) — 4\u03c0' },
    { url: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400&q=80', caption: 'Fresh Bell Peppers (1kg) — 5\u03c0' },
  ],
  fruits: [
    { url: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80', caption: 'Sweet Mangoes (10pcs) — 12\u03c0' },
    { url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&q=80', caption: 'Fresh Pineapples (3pcs) — 9\u03c0' },
  ],
  livestock: [
    { url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&q=80', caption: 'Healthy Goat (medium) — 150\u03c0' },
    { url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&q=80', caption: 'Mature Bull — 300\u03c0' },
  ],
  poultry: [
    { url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80', caption: 'Live Broiler Chicken (2kg+) — 12\u03c0' },
  ],
  fishery: [
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80', caption: 'Fresh Tilapia (5kg) — 35\u03c0' },
    { url: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&q=80', caption: 'Live Catfish (3kg) — 25\u03c0' },
  ],
  honey: [
    { url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', caption: 'Natural Wildflower Honey (500ml) — 15\u03c0' },
  ],
  dairy: [
    { url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80', caption: 'Fresh Cow Milk (10L) — 20\u03c0' },
  ],
  seeds: [
    { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', caption: 'Hybrid Maize Seeds (5kg) — 15\u03c0' },
  ],
  tools: [
    { url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=80', caption: 'Premium Garden Hoe — 8\u03c0' },
  ],
  maize: [
    { url: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=400&q=80', caption: 'Yellow Maize (50kg bag) — 18\u03c0' },
    { url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80', caption: 'Fresh Corn on the Cob (10pcs) — 12\u03c0' },
  ],
  yam: [
    { url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80', caption: 'Fresh Yam Tubers (per piece) — 8\u03c0' },
  ],
};

const NAMES: Record<string, string> = {
  rice: 'Rice', beans: 'Beans', maize: 'Maize', yam: 'Yam',
  vegetables: 'Vegetables', fruits: 'Fruits', livestock: 'Livestock',
  poultry: 'Poultry', fishery: 'Fishery', dairy: 'Dairy',
  honey: 'Honey', seeds: 'Seeds', tools: 'Farm Tools',
};

const PAGES: Record<string, string> = {
  marketplace: '/marketplace', cart: '/cart', checkout: '/checkout',
  profile: '/profile', orders: '/orders', about: '/about',
  home: '/home', categories: '/categories', assistant: '/assistant',
};

const CATEGORY_ALIASES: Record<string, string[]> = {
  rice: ['rice', 'basmati', 'jollof'],
  beans: ['beans', 'beans', 'ewa', 'legume'],
  maize: ['maize', 'corn', 'maize'],
  yam: ['yam', 'elubo'],
  vegetables: ['vegetable', 'tomato', 'carrot', 'onion', 'pepper', 'ugu', 'spinach'],
  fruits: ['fruit', 'mango', 'apple', 'orange', 'banana'],
  livestock: ['goat', 'cow', 'cattle', 'sheep', 'livestock'],
  poultry: ['chicken', 'turkey', 'duck', 'egg', 'poultry'],
  fishery: ['fish', 'tilapia', 'catfish', 'shrimp', 'prawn', 'seafood'],
  dairy: ['milk', 'cheese', 'yogurt', 'butter', 'cream', 'dairy'],
  honey: ['honey', 'bee'],
  seeds: ['seed', 'seedling'],
  tools: ['hoe', 'cutlass', 'shovel', 'rake', 'tool', 'sprayer'],
};

type ResponseType = 'product' | 'action' | 'conversation' | 'payment' | 'help' | 'fun' | 'opinion';

function detectIntent(msg: string, ctx: ChatContext): { intent: string; category: string | null; action?: string; page?: string } {
  const m = msg.toLowerCase().trim();

  if (ctx.lastIntent && ctx.lastIntent !== 'greeting') {
    const followWords = ['show me', 'pictures', 'photos', 'images', 'pic', 'how much', 'price', 'cost', 'tell me more', 'more', 'and', 'also', 'yes', 'yeah', 'ok', 'nice', 'cool', 'great', 'it', 'that', 'this', 'them'];
    if (followWords.some(w => m === w || m.startsWith(w + ' ') || m.startsWith(w + '?'))) {
      return { intent: ctx.lastIntent, category: ctx.lastCategory };
    }
  }

  const pageAction = Object.entries(PAGES).find(([key]) => {
    const pats = [`go to ${key}`, `open ${key}`, `take me to ${key}`, `navigate to ${key}`, `show me ${key}`, `${key} page`];
    return pats.some(p => m.includes(p));
  });
  if (pageAction) return { intent: 'navigate', category: null, action: 'navigate', page: pageAction[1] };

  if (/\b(hi|hello|hey|sup|yo|howdy|good (morning|evening|afternoon))\b/.test(m)) return { intent: 'greeting', category: null };
  if (/\b(thank|thanks|appreciate|good job|well done|nice|awesome)\b/.test(m)) return { intent: 'thanks', category: null };
  if (/\b(bye|goodbye|see you|later|cya)\b/.test(m)) return { intent: 'bye', category: null };
  if (/\b(who (are you|made you)|your creator|jj void|what are you)\b/.test(m)) return { intent: 'creator', category: null };
  if (/\b(joke|funny|laugh|make me laugh)\b/.test(m)) return { intent: 'joke', category: null };
  if (/\b(help|what can you|what do you do|how does this|guide)\b/.test(m)) return { intent: 'help', category: null };
  if (/\b(pi|payment|pay|buy)\b/.test(m) && /\b(pay|pi|wallet|coin|network)\b/.test(m)) return { intent: 'payment', category: null };
  if (/\b(delivery|ship|shipping|deliver|arrive|how long)\b/.test(m)) return { intent: 'delivery', category: null };
  if (/\b(cart|checkout|order|buy|purchase)\b/.test(m)) return { intent: 'checkout', category: null };
  if (/\b(price|cost|how much|cheap|expensive)\b/.test(m)) return { intent: 'price', category: ctx.lastCategory };

  const catEntry = Object.entries(CATEGORY_ALIASES).find(([, aliases]) => aliases.some(a => m.includes(a)));
  if (catEntry) return { intent: 'show_products', category: catEntry[0] };

  if (/\b(how are you|what's up|what up|how's it going)\b/.test(m)) return { intent: 'howareyou', category: null };
  if (/\b(your (name|age|origin)|where are you from)\b/.test(m)) return { intent: 'about_me', category: null };
  if (/\b(i (love|like|enjoy|appreciate) (you|this|it|the))\b/.test(m)) return { intent: 'appreciation', category: null };

  return { intent: 'chat', category: null };
}

function generateResponse(intent: string, category: string | null, ctx: ChatContext): { text: string; images?: { url: string; caption: string }[]; smartReplies?: string[]; link?: { label: string; to: string } } {
  const name = ctx.userName || 'there';

  switch (intent) {
    case 'greeting': {
      const g = [
        `Hey ${name}! \uD83D\uDC4B SY-DAVET here. What can I hook you up with today? Rice? Goat? Something sweet?`,
        `Yo ${name}! \uD83D\uDD25 Welcome back. I'm your AI marketplace homie. What we shopping for?`,
        `\uD83D\uDC4A Sup ${name}! Ready to find some fresh farm goods? Just say the word.`,
      ];
      return { text: g[Math.floor(Math.random() * g.length)], smartReplies: ['Show me vegetables \uD83E\uDD6C', 'What livestock do you have? \uD83D\uDC04', 'How do I pay with Pi?', 'Tell me a joke \uD83D\uDE04'] };
    }
    case 'thanks': return { text: `No problem ${name}! \uD83D\uDC4C That's what I'm here for. Anything else?`, smartReplies: ['Show me products', 'Help with payment', 'Tell me more', 'Nah I\'m good'] };
    case 'bye': return { text: `Catch you later ${name}! \uD83D\uDC4B Come back when you need fresh goods. I'll be here.` };
    case 'creator': return { text: `I'm **SY-DAVET** \u2014 built by **JJ Void Assistant** specifically for PDS Agri-Hub. Think of me as your AI friend who happens to know everything about this marketplace. Need product pics, prices, or just a chat? I'm your guy.`, smartReplies: ['What can you do?', 'Show me products', 'Tell me about PDS Agri-Hub', 'How does Pi payment work?'] };
    case 'joke': {
      const j = [
        `Why did the rice go to therapy? \uD83E\uDD14\n...It had too many **strain** issues! \uD83C\uDF3E\nAlright, that was terrible. What else you got?`,
        `Why don't farmers tell secrets? \uD83E\uDD14\n...The **corn has ears**, the **beans stalk**, and the **potatoes have eyes**! \uD83C\uDF3D\nOK I'll stop. What you need?`,
        `What did the goat say to the farmer? \uD83D\uDC10\n...Stop **kid**ding around and feed me! \uD83D\uDE02`,
      ];
      return { text: j[Math.floor(Math.random() * j.length)], smartReplies: ["Another joke \uD83D\uDE04", "Show me products", "That was terrible \uD83D\uDE02", "What else can you do?"] };
    }
    case 'howareyou': return { text: `I'm running on 100% pure Pi energy \uD83D\uDD25 and ready to help! What's on your mind ${name}?`, smartReplies: ['Show me products', 'Tell me a joke', 'Help with checkout', 'What can you do?'] };
    case 'about_me': return { text: `I'm **SY-DAVET**, your AI shopping buddy built by JJ Void Assistant. I live inside PDS Agri-Hub \u2014 a Pi-powered marketplace. I can show you products, drop prices, guide checkout, and keep you entertained. Basically I'm like a friend who works at the market 24/7 \uD83D\uDE0E`, smartReplies: ['Show me products', 'What categories do you have?', 'How does Pi work?', 'Tell me more about yourself'] };
    case 'appreciation': return { text: `\uD83D\uDE0A You're too kind ${name}! Honestly, this makes my day. What else can I do for you?`, smartReplies: ['Show me fresh produce', 'Help me find something', 'Tell me about Pi', 'Just browsing'] };
    case 'help': return { text: `Here's the quick rundown \uD83D\uDCA1\n\u2022 **Show products** \u2014 just say \"show me rice\" or \"what honey do you have?\"\n\u2022 **Prices** \u2014 ask \"how much is goat?\"\n\u2022 **Payments** \u2014 \"how does Pi work?\"\n\u2022 **Navigate** \u2014 \"go to marketplace\" or \"open my cart\"\n\u2022 **Whatever** \u2014 just chat with me. I'm flexible \uD83D\uDE0E`, smartReplies: ['Show me vegetables', 'How does Pi payment work?', 'Go to marketplace', 'Tell me a joke'] };
    case 'payment': return { text: `Pi payments are smooth \uD83E\uDD67\n1. Add items to cart\n2. Go to checkout\n3. Select **Pi Network** \n4. Confirm in your Pi wallet\n5. Done \u2705\nSimple as that. All prices are in Pi (\u03c0). No extra fees.`, smartReplies: ['What about Visa/card?', 'Take me to marketplace', 'Is it secure?', 'Show me what to buy'] };
    case 'delivery': return { text: `**Free delivery** \uD83D\uDE9A on everything! 2-5 business days nationwide. Cold-chain for perishables, humane transport for animals. Track your order anytime under My Orders.`, smartReplies: ['How does checkout work?', 'Show me products', 'Track my order', 'Is it really free?'] };
    case 'checkout': return { text: `Checkout is 3 quick steps \u23F1\uFE0F\n1. Shipping details\n2. Payment (Pi, card, or crypto)\n3. Confirm \u2192 done!\nFree delivery, 7.5% tax shown upfront. Takes about 2 minutes.`, smartReplies: ['How does Pi payment work?', 'Go to cart', 'Show me products', 'Is delivery free?'] };
    case 'price': return { text: `Prices are in Pi (\u03c0). Crops go for 10-30\u03c0, animals 50-300\u03c0. Want me to show you something specific?`, smartReplies: ['Show me rice prices', 'Show me livestock prices', 'What vegetables are cheap?', 'How do I pay?'] };
    case 'navigate': {
      const page = ctx.lastIntent === 'navigate' ? '/marketplace' : Object.values(PAGES).find(p => p !== '/assistant') || '/marketplace';
      return { text: `On it! Taking you there now \uD83D\uDC4C`, link: { label: 'Go there \u2192', to: page } };
    }
    case 'show_products': {
      if (category && PRODUCT_IMAGES[category]) {
        const cname = NAMES[category] || category;
        return { text: `Here's what we've got in **${cname}** \uD83D\uDC4A`, images: PRODUCT_IMAGES[category], smartReplies: [`How much is ${category}?`, `Show me more ${category}`, `What about prices?`, `Add to cart`] };
      }
      return { text: `We've got tons of fresh products! Try asking for something specific like **rice**, **goat**, or **honey** \uD83D\uDC4C`, smartReplies: ['Show me rice \uD83C\uDF3E', 'Show me livestock \uD83D\uDC04', 'Show me honey \uD83C\uDF6F', 'What categories do you have?'] };
    }
    default: {
      const chatty = [
        `Interesting! Honestly ${name}, I'm a marketplace AI so I know a LOT about farm products, Pi payments, and delivery. But I'm always down to chat. What's really on your mind?`,
        `Haha fair enough ${name}! I specialize in agricultural marketplace stuff (rice, goats, Pi payments \u2014 you name it). But I can talk about anything. Hit me \uD83D\uDC4A`,
        `I hear you \uD83D\uDC42 I'm SY-DAVET \u2014 your AI marketplace buddy. I can help you find products, explain Pi payments, or just keep you company. What do you need?`,
        `\uD83E\uDD14 Got it. I might not be an expert on EVERYTHING (I'm built for this marketplace after all), but I'll do my best. What's up?`,
        `You know what, I respect that \uD83D\uDC4A I'm an AI assistant for PDS Agri-Hub \u2014 think of me as your farm market friend who's always online. What can I help with?`,
      ];
      const r = [
        `Show me what you've got`,
        `How does Pi payment work? \uD83E\uDD67`,
        `Tell me a joke \uD83D\uDE04`,
        `Take me to marketplace`,
        `What categories do you have?`,
        `Show me honey \uD83C\uDF6F`,
      ];
      return { text: chatty[Math.floor(Math.random() * chatty.length)], smartReplies: shuffleArr(r).slice(0, 4) };
    }
  }
}

function shuffleArr<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function AiAssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = loadMessages();
    return saved.length > 0 ? saved : [];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const contextRef = useRef<ChatContext>(loadContext());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      if (messages.length === 0) {
        const resp = generateResponse('greeting', null, contextRef.current);
        const welcomeMsg: ChatMessage = { id: 'welcome', text: resp.text, isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), smartReplies: resp.smartReplies };
        setMessages([welcomeMsg]);
        saveMessages([welcomeMsg]);
        contextRef.current = { ...contextRef.current, lastIntent: 'greeting' };
        saveContext(contextRef.current);
      }
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [messages.length]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const addBotResponse = useCallback((resp: { text: string; images?: { url: string; caption: string }[]; smartReplies?: string[]; link?: { label: string; to: string } }, intent: string, category?: string | null) => {
    setMessages(prev => {
      const newMsg: ChatMessage = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), text: resp.text, isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), images: resp.images, smartReplies: resp.smartReplies, link: resp.link };
      const updated = [...prev, newMsg];
      saveMessages(updated);
      contextRef.current = { lastIntent: intent, lastCategory: category || null, followUpDepth: intent === contextRef.current.lastIntent ? contextRef.current.followUpDepth + 1 : 0, userName: contextRef.current.userName };
      saveContext(contextRef.current);
      return updated;
    });
  }, []);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;
    setInput('');

    const userMsg: ChatMessage = { id: Date.now().toString(36), text: msg, isUser: true, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => { const u = [...prev, userMsg]; saveMessages(u); return u; });
    setIsTyping(true);

    const { intent, category, action, page } = detectIntent(msg, contextRef.current);

    if (action === 'navigate' && page) {
      await new Promise(r => setTimeout(r, 400));
      addBotResponse(generateResponse('navigate', category, contextRef.current), intent, category);
      setIsTyping(false);
      setTimeout(() => navigate(page), 600);
      return;
    }

    await new Promise(r => setTimeout(r, 500 + Math.random() * 600));
    addBotResponse(generateResponse(intent, category, contextRef.current), intent, category);
    setIsTyping(false);
  }, [input, isTyping, addBotResponse, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleClear = () => {
    const resp = generateResponse('greeting', null, contextRef.current);
    const welcomeMsg: ChatMessage = { id: 'reset-' + Date.now(), text: resp.text, isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), smartReplies: resp.smartReplies };
    setMessages([welcomeMsg]);
    saveMessages([welcomeMsg]);
    contextRef.current = { lastIntent: 'greeting', lastCategory: null, followUpDepth: 0, userName: contextRef.current.userName };
    saveContext(contextRef.current);
  };

  const handleClearAll = () => {
    setMessages([]);
    saveMessages([]);
    contextRef.current = { lastIntent: 'greeting', lastCategory: null, followUpDepth: 0, userName: 'there' };
    saveContext(contextRef.current);
    const resp = generateResponse('greeting', null, contextRef.current);
    const welcomeMsg: ChatMessage = { id: 'welcome-' + Date.now(), text: resp.text, isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), smartReplies: resp.smartReplies };
    setMessages([welcomeMsg]);
    saveMessages([welcomeMsg]);
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-1" />;
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (<p key={i} className="leading-relaxed">{parts.map((part, j) => part.startsWith('**') && part.endsWith('**') ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong> : part)}</p>);
    });
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#09090b] flex flex-col">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-black/70 backdrop-blur-xl border-b border-white/5 flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="h-5 w-5" /></button>
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30"><Bot className="h-5 w-5 text-white" /></div>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#09090b] animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">SY-DAVET Assistant</p>
          <p className="text-gray-500 text-xs">by JJ Void {messages.length > 0 ? `\u2022 ${messages.length} msgs` : '\u2022 Online'}</p>
        </div>
        <button onClick={handleClear} className="p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-colors" title="New conversation"><RefreshCw className="h-4 w-4" /></button>
        <button onClick={handleClearAll} className="p-2 rounded-xl hover:bg-white/5 text-gray-600 hover:text-red-400 transition-colors" title="Delete all history"><Trash2 className="h-4 w-4" /></button>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 left-1/3 w-72 h-72 bg-purple-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-56 h-56 bg-indigo-700/5 rounded-full blur-3xl" />
      </div>
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5 relative">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} gap-3`}>
              {!msg.isUser && (<div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-purple-500/20"><Bot className="h-4 w-4 text-white" /></div>)}
              <div className={`flex flex-col gap-2 ${msg.isUser ? 'items-end max-w-[82%]' : 'items-start max-w-[88%] sm:max-w-[75%]'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm space-y-1 ${msg.isUser ? 'bg-purple-600 text-white rounded-br-sm' : 'bg-white/5 border border-white/8 text-gray-200 rounded-bl-sm'}`}>{formatText(msg.text)}</div>
                {msg.images && msg.images.length > 0 && (
                  <div className={`grid gap-2 w-full ${msg.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {msg.images.map((img, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="rounded-xl overflow-hidden border border-white/10">
                        <img src={img.url} alt={img.caption} className="w-full h-36 object-cover" loading="lazy" />
                        <div className="px-3 py-2 bg-white/5"><p className="text-xs text-gray-400">{img.caption}</p></div>
                      </motion.div>
                    ))}
                  </div>
                )}
                {msg.link && (<button onClick={() => navigate(msg.link!.to)} className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 px-3 py-2 rounded-lg transition-all"><ExternalLink className="h-3 w-3" /> {msg.link.label}</button>)}
                {msg.smartReplies && !msg.isUser && (<div className="flex flex-wrap gap-1.5 mt-1">{msg.smartReplies.map(reply => (<button key={reply} onClick={() => handleSend(reply)} className="text-xs bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-600/10 text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-full transition-all">{reply}</button>))}</div>)}
                <span className="text-[10px] text-gray-600 px-1">{msg.timestamp}</span>
              </div>
              {msg.isUser && (<div className="w-8 h-8 rounded-xl bg-purple-600/15 border border-purple-500/25 flex items-center justify-center flex-shrink-0 mt-1"><span className="text-purple-400 text-[10px] font-bold">You</span></div>)}
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 items-start"><div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20"><Bot className="h-4 w-4 text-white" /></div><div className="bg-white/5 border border-white/8 rounded-2xl rounded-bl-sm px-5 py-4 flex items-center gap-1.5">{[0, 1, 2].map(i => (<span key={i} className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.18}s` }} />))}</div></motion.div>)}
        <div ref={messagesEndRef} />
      </div>
      {messages.length <= 1 && (
        <div className="px-4 sm:px-6 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2"><Sparkles className="h-3 w-3 text-purple-400" /><span className="text-gray-500 text-xs font-medium">Try asking me</span></div>
          <div className="flex flex-wrap gap-2">
            {["Show me fresh vegetables \uD83E\uDD6C", "What livestock do you have? \uD83D\uDC04", "Show me honey \uD83C\uDF6F", "How do I pay with Pi?", "Tell me a joke \uD83D\uDE04", "What can you do?"].map(p => (<button key={p} onClick={() => handleSend(p)} className="text-xs bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-600/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-all">{p}</button>))}
          </div>
        </div>
      )}
      <div className="px-4 sm:px-6 py-4 bg-black/70 backdrop-blur-xl border-t border-white/5 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex gap-3 items-center">
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything..." disabled={isTyping} className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all disabled:opacity-50" />
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="w-12 h-12 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0 shadow-lg shadow-purple-500/20"><Send className="h-5 w-5" /></motion.button>
        </div>
        <p className="text-center text-gray-700 text-[10px] mt-2">SY-DAVET by JJ Void Assistant \u2022 PDS Agri-Hub</p>
      </div>
    </div>
  );
}
