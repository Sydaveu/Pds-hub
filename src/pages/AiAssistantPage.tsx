import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, ArrowLeft, RefreshCw, Sparkles, ExternalLink, Trash2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGeminiResponse, isGeminiConfigured } from '../lib/gemini';
import { getProductImageByKeyword } from '../lib/productImages';

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
     { url: getProductImageByKeyword('long-grain-rice'), caption: 'Premium Long Grain Rice (25kg) \u2014 15\u03c0' },
     { url: getProductImageByKeyword('basmati-rice'), caption: 'Basmathi Rice (10kg) \u2014 8\u03c0' },
  ],
  beans: [
    { url: getProductImageByKeyword('black-eyed-beans'), caption: 'Black Eyed Beans (2kg) \u2014 5\u03c0' },
    { url: getProductImageByKeyword('kidney-beans'), caption: 'Mixed Legumes Pack \u2014 7\u03c0' },
  ],
  vegetables: [
    { url: getProductImageByKeyword('carrots'), caption: 'Fresh Organic Carrots (3kg) \u2014 6\u03c0' },
    { url: getProductImageByKeyword('tomatoes'), caption: 'Plum Tomatoes (2kg) \u2014 4\u03c0' },
    { url: getProductImageByKeyword('bell-peppers'), caption: 'Fresh Bell Peppers (1kg) \u2014 5\u03c0' },
  ],
  fruits: [
    { url: getProductImageByKeyword('mangoes'), caption: 'Sweet Mangoes (10pcs) \u2014 12\u03c0' },
    { url: getProductImageByKeyword('pineapples'), caption: 'Fresh Pineapples (3pcs) \u2014 9\u03c0' },
  ],
  livestock: [
    { url: getProductImageByKeyword('goat'), caption: 'Healthy Goat (medium) \u2014 150\u03c0' },
    { url: getProductImageByKeyword('cow'), caption: 'Mature Bull \u2014 300\u03c0' },
  ],
  poultry: [
    { url: getProductImageByKeyword('chicken'), caption: 'Live Broiler Chicken (2kg+) \u2014 12\u03c0' },
  ],
  fishery: [
    { url: getProductImageByKeyword('tilapia'), caption: 'Fresh Tilapia (5kg) \u2014 35\u03c0' },
    { url: getProductImageByKeyword('catfish'), caption: 'Live Catfish (3kg) \u2014 25\u03c0' },
  ],
  honey: [
    { url: getProductImageByKeyword('honey'), caption: 'Natural Wildflower Honey (500ml) \u2014 15\u03c0' },
  ],
  dairy: [
    { url: getProductImageByKeyword('milk'), caption: 'Fresh Cow Milk (10L) \u2014 20\u03c0' },
  ],
  seeds: [
    { url: getProductImageByKeyword('maize-seeds'), caption: 'Hybrid Maize Seeds (5kg) \u2014 15\u03c0' },
  ],
  tools: [
    { url: getProductImageByKeyword('farm-tools'), caption: 'Premium Garden Hoe \u2014 8\u03c0' },
  ],
  maize: [
    { url: getProductImageByKeyword('maize'), caption: 'Yellow Maize (50kg bag) \u2014 18\u03c0' },
    { url: getProductImageByKeyword('corn-cob'), caption: 'Fresh Corn on the Cob (10pcs) \u2014 12\u03c0' },
  ],
   yam: [
     { url: getProductImageByKeyword('yam'), caption: 'Fresh Yam Tubers (per piece) \u2014 8\u03c0' },
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

function pick<T>(a: T[]): T { return a[Math.floor(Math.random() * a.length)]; }

let _globalUsedIndices = new Set<number>();

const freshReplies = [
  'What can you help with?', 'Tell me about PDS Agri-Hub',
  'How do I checkout?', 'Show me rice \uD83C\uDF3E',
  'Any fish today? \uD83D\uDC1F', 'Show me dairy products \uD83E\uDD5B',
  'Take me to categories', 'What fruits do you have? \uD83C\uDF4E',
  'I want to buy tools \uD83D\uDD27', 'Show me poultry \uD83D\uDC14',
  'Tell me about Pi Network', 'How does delivery work? \uD83D\uDE9A',
  'What\u2019s your name?', 'Show me your best deals',
  'How do I track my order?', 'Do you have seeds? \uD83C\uDF31',
  'I want fresh yam \uD83C\uDF60', 'Show me cassava \uD83C\uDF3E',
  'Tell me a fun fact', 'What\u2019s trending today?',
];

function generateResponse(intent: string, category: string | null, ctx: ChatContext, usedIndices?: Set<number>): { text: string; images?: { url: string; caption: string }[]; smartReplies?: string[]; link?: { label: string; to: string } } {
  const name = ctx.userName || 'there';
  const msgCount = ctx.followUpDepth;

  const genericReplies = () => shuffleArr([
    'Show me products \uD83D\uDED2', 'How does Pi work? \uD83E\uDD67',
    'Tell me a joke \uD83D\uDE04', 'Go to marketplace',
    'What categories?', 'Show me honey \uD83C\uDF6F',
    'I need livestock \uD83D\uDC04', 'Show me fresh veggies \uD83E\uDD6C',
  ]).slice(0, 4);

  switch (intent) {
    case 'greeting': {
      const opts = [
        `Hey ${name}! \uD83D\uDC4B I'm SY-DAVET — your AI marketplace wingman. What are we getting into today?`,
        `Yo ${name}! \uD83D\uDD25 Back again? Love it. What can I hook you up with?`,
        `\uD83D\uDC4A Sup ${name}! Ready to shop or just wanna chat? I'm here for both.`,
        `Ayy ${name}! \uD83D\uDE0E SY-DAVET in the house. Need farm fresh goods? Pi payments? A quick laugh? Say the word.`,
        `Good to see you ${name}! \uD83D\uDC4B I've got the whole marketplace at my fingertips. What you looking for?`,
        `Welcome back ${name}! \uD83C\uDF1F Market's fresh, Pi's ready, and I'm locked in. What's the move today?`,
      ];
      const used = usedIndices ? [...usedIndices] : [];
      const available = opts.filter((_, i) => !used.includes(i));
      const chosen = available.length > 0 ? pick(available) : pick(opts);
      if (usedIndices) usedIndices.add(opts.indexOf(chosen));
      const smartOpts = [
        ['Show me vegetables \uD83E\uDD6C', 'What livestock? \uD83D\uDC04', 'How do I pay with Pi?', 'Tell me a joke \uD83D\uDE04'],
        ['Show me products', 'What can you do?', 'Go to marketplace', 'Tell me about PDS'],
        ['Show me rice \uD83C\uDF3E', 'Any goat available? \uD83D\uDC10', 'How does checkout work?', 'Show me fresh fish \uD83D\uDC1F'],
      ];
      return { text: chosen, smartReplies: pick(smartOpts) };
    }

    case 'thanks': {
      const opts = [
        `Anytime ${name}! \uD83D\uDC4C That's what I'm here for. What else?`,
        `No problem ${name}! \uD83D\uDC4D Happy to help. Need anything else?`,
        `You got it ${name}! \uD83D\uDE0E Don't hesitate to ask for more.`,
        `My pleasure ${name}! \uD83D\uDC96 Just say the word if you need anything else.`,
        `All part of the service \uD83D\uDC4A You need something else, you know where I am!`,
      ];
      return { text: pick(opts), smartReplies: pick([genericReplies(), shuffleArr(freshReplies).slice(0, 4)]) };
    }

    case 'bye': return {
      text: pick([
        `Catch you later ${name}! \uD83D\uDC4B Come back when you need fresh goods. I'll be here.`,
        `Later ${name}! \uD83D\uDC4B Stay fresh \uD83D\uDE0E`,
        `See you ${name}! Hit me up anytime you need the best farm deals \uD83D\uDC4A`,
        `Peace out ${name}! \uD83C\uDF1F Don't forget — PDS Agri-Hub has everything you need.`,
        `I'll be here when you need me \uD83D\uDE0E Stay blessed ${name}! \uD83C\uDF3E`,
      ]),
    };

    case 'creator': return {
      text: pick([
        `I'm **SY-DAVET** — built by **JJ Void Assistant** for PDS Agri-Hub. I know the marketplace inside out: products, prices, Pi payments, delivery. Think of me as your super informed friend who works at the market 24/7 \uD83D\uDE0E`,
        `**SY-DAVET** here! JJ Void Assistant created me specifically for this marketplace. I can show you products, explain Pi payments, guide you through checkout — basically be your personal shopping assistant on steroids \uD83D\uDE80`,
        `JJ Void Assistant built me to be the most helpful AI in agriculture. I know every product, price tag, and Pi trick. What do you need? \uD83D\uDE0E`,
      ]),
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'joke': {
      const allJokes = [
        `Why did the rice go to therapy? \uD83E\uDD14\n...It had too many **strain** issues! \uD83C\uDF3E`,
        `Why don't farmers tell secrets? \uD83E\uDD14\n...The **corn has ears**, the **beans stalk**, and the **potatoes have eyes**! \uD83C\uDF3D`,
        `What did the goat say to the farmer? \uD83D\uDC10\n...Stop **kid**ding around and feed me! \uD83D\uDE02`,
        `How do you catch a farm animal? \uD83E\uDD14\n...**Hoe** down! \uD83D\uDE02 OK that one was a stretch.`,
        `What's a farmer's favorite type of music? \uD83C\uDFB5\n...**Country**! (Specifically crop country) \uD83C\uDF3E`,
        `Why did the tomato turn red? \uD83C\uDF45\n...Because it saw the **salad dressing**! \uD83D\uDE02`,
        `What do you call a cow during an earthquake? \uD83D\uDC04\n...A **milkshake**! \uD83D\uDE02`,
        `Why did the chicken join the band? \uD83D\uDC14\n...Because it had the **drumsticks**! \uD83C\uDFB5`,
        `What did the fish say when it hit the wall? \uD83D\uDC1F\n...**Dam**! \uD83D\uDE02`,
        `Why did the bee get married? \uD83D\uDC1D\n...Because it found its **honey**! \uD83C\uDF6F`,
      ];
      return {
        text: pick(allJokes),
        smartReplies: pick([
          ["Another joke \uD83D\uDE04", "Show me products", "That's terrible lol \uD83D\uDE02", "What else can you do?"],
          ["OK you're funny \uD83D\uDE06", "Show me vegetables", "Tell me about Pi", "More jokes!"],
          ["One more joke \uD83E\uDD23", "Take me to marketplace", "You're hilarious \uD83D\uDE02", "Show me rice"],
        ]),
      };
    }

    case 'howareyou': return {
      text: pick([
        `Running on 100% Pi energy \uD83D\uDD25 and loving every second. What's good ${name}?`,
        `I'm great ${name}! Just chilling in the cloud, ready to help. You need anything?`,
        `Honestly? I'm thriving \uD83D\uDE0E Got a whole marketplace to explore with you. What's on your mind?`,
        `Better now that you're here! \uD83D\uDE09 What can I do for you today?`,
        `Living the dream ${name}! \uD83D\uDE0E Pi-powered and ready to assist. What's cooking?`,
      ]),
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'about_me': return {
      text: pick([
        `I'm **SY-DAVET** — your AI shopping buddy built by JJ Void Assistant. I live in PDS Agri-Hub, a Pi-powered marketplace. I can show products, share prices, guide checkout, tell jokes, or just keep you company. Basically a friend who knows the market 24/7 \uD83D\uDE0E`,
        `**SY-DAVET** at your service! Created by JJ Void Assistant for PDS Agri-Hub. I know every product, price, and Pi payment trick. Plus I'm fun to chat with \uD83D\uDE0E What do you need?`,
      ]),
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'appreciation': return {
      text: pick([
        `\uD83D\uDE0A You're too kind ${name}! Honestly made my day. What else can I help with?`,
        `Thanks ${name}! \uD83D\uDC4C I try my best. Anything else you need?`,
        `Appreciate that ${name}! \uD83D\uDC96 Let me know what you want to explore next.`,
        `You're the best ${name}! \uD83D\uDE0E Got more questions? I'm all ears.`,
      ]),
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'help': return {
      text: pick([
        `Quick rundown \uD83D\uDCA1\n\u2022 **Show products** — say "show me rice"\n\u2022 **Prices** — "how much is goat?"\n\u2022 **Pi payments** — "how does Pi work?"\n\u2022 **Navigate** — "go to marketplace"\n\u2022 **Chat** — just talk to me \uD83D\uDE0E`,
        `Here's what I can do \uD83D\uDD79\uFE0F\n\u2022 Find products & show pics\n\u2022 Explain Pi & payments\n\u2022 Guide checkout\n\u2022 Tell jokes\nJust type naturally — I understand plain English!`,
        `I can help with \uD83D\uDC4C\n\u2022 Browsing 16 categories\n\u2022 Checking prices in Pi (\u03c0)\n\u2022 Navigating the marketplace\n\u2022 Explaining checkout\nJust ask me anything!`,
      ]),
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'payment': return {
      text: pick([
        `Pi payments \uD83E\uDD67\n1. Add items to cart\n2. Checkout \u2192 select **Pi Network**\n3. Confirm in your Pi wallet\n4. Done \u2705\nAll prices in Pi (\u03c0). No hidden fees. Simple.`,
        `Super simple \uD83D\uDC4C You checkout, pick Pi Network as payment, confirm in your wallet \u2192 done. All prices shown in Pi (\u03c0). Couldn't be easier.`,
        `Paying with Pi is the easiest part \uD83D\uDE0E Just pick "Pi Network" at checkout, approve in your wallet, and you're done in seconds. No bank needed!`,
      ]),
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'delivery': return {
      text: pick([
        `**Free delivery** \uD83D\uDE9A on every order! 2-5 business days nationwide. Cold-chain for fresh items, humane transport for animals. Track under My Orders.`,
        `All deliveries are **free** \uD83C\uDF89 2-5 days. Perishables get cold packaging, animals get special transport. Track your order anytime!`,
        `We deliver everywhere for **free** \uD83C\uDF89 Expect 2-5 business days. Fresh items stay chilled, animals travel safely. You can track everything!`,
      ]),
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'checkout': return {
      text: pick([
        `3 steps \u23F1\uFE0F\n1. Shipping details\n2. Pick payment (Pi, card, crypto)\n3. Confirm \u2192 done!\nFree delivery, 7.5% tax. Takes 2 minutes.`,
        `Quick & easy! Fill shipping \u2192 choose payment \u2192 confirm. Free delivery, transparent pricing. About 2 minutes start to finish.`,
        `Checkout is smooth \uD83D\uDE0E Enter your shipping \u2192 pick Pi or card \u2192 confirm. Free delivery, 7.5% tax. Done in 2 mins!`,
      ]),
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'price': return {
      text: `All in **Pi (\u03c0)**. Crops: 10-30\u03c0, Animals: 50-300\u03c0, Tools: 5-50\u03c0. Want me to show you specific prices?`,
      smartReplies: shuffleArr(freshReplies).slice(0, 4),
    };

    case 'navigate': return {
      text: `On it! \uD83D\uDC4C Taking you there now.`,
      link: { label: 'Go \u2192', to: Object.values(PAGES).filter(p => p !== '/assistant')[0] || '/marketplace' },
    };

    case 'show_products': {
      if (category && PRODUCT_IMAGES[category]) {
        const cname = NAMES[category] || category;
        return {
          text: pick([
            `Here's what we've got in **${cname}** \uD83D\uDC4A`,
            `Check out our **${cname}** selection \uD83D\uDC4C`,
            `Fresh **${cname}** just for you! \uD83D\uDE0E`,
          ]),
          images: PRODUCT_IMAGES[category],
          smartReplies: shuffleArr(freshReplies).slice(0, 4),
        };
      }
      return {
        text: pick([
          `We've got tons of fresh products! Just tell me what you're looking for — **rice**, **goat**, **honey**, **tools**... I got you \uD83D\uDC4C`,
          `So many options! Try asking for something specific like **rice**, **beans**, or **vegetables** \uD83D\uDE0E`,
        ]),
        smartReplies: shuffleArr(freshReplies).slice(0, 4),
      };
    }

    default: {
      const chatty = [
        msgCount > 5 ? `\uD83D\uDE0E We're having a proper conversation now ${name}! What's next on your mind?` : `I hear you ${name}! \uD83D\uDC42 I'm built for this marketplace but I love a good chat. Want to check out some products or just vibe?`,
        msgCount > 5 ? `Alright ${name}, you're basically family now \uD83D\uDC4A What's on your mind?` : `Got it \uD83D\uDC4A I'm SY-DAVET, your AI marketplace friend. I know a ton about our products, Pi payments, and more. What's up?`,
        msgCount > 3 ? `${name}! \uD83D\uDC4A You've been around — you know the drill by now. Products, payments, chat... what are we doing?` : `Interesting! \uD83E\uDD14 I might be a marketplace AI but I'm always down for a real conversation. What's on your mind?`,
        msgCount > 5 ? `I love the energy ${name}! \uD83D\uDD25 We've been at this for a minute. What else you got?` : `I respect that ${name}! \uD83D\uDC4A Whether you want to shop, learn about Pi, or just talk — I'm here for it.`,
        `\uD83D\uDE0E You're chatting with SY-DAVET — the AI that knows PDS Agri-Hub inside out. Products? Prices? Pi? Jokes? I do it all.`,
        `Haha say less! \uD83D\uDC4A I'm listening. Want to see what's fresh on the marketplace or just hang out?`,
        `That's what I'm here for ${name}! \uD83D\uDC4C Products, Pi, or just a chat — your call.`,
        `I feel you \uD83D\uDE4C I may be an AI but I've got personality. Products, Pi payments, or random topics — hit me!`,
        `Lol I love it ${name}! \uD83D\uDE06 Whatever you're into — shopping, learning about Pi, or shooting the breeze — I'm your guy.`,
        `I got you ${name}! \uD83D\uDC4A I specialize in PDS Agri-Hub — fresh produce, livestock, Pi payments, you name it. But I can talk about anything.`,
        `Bet! \uD83D\uDC4A I'm SY-DAVET, your AI marketplace sidekick. Need product pics, prices, or just someone to talk to? I'm always online.`,
        `Say no more \uD83D\uDC4C I know this marketplace back to front. Ask me about any product, payment, or just vibe with me.`,
        `\uD83E\uDD1D I'm here for it ${name}. Shopping, learning, chatting — I do it all and I do it with style.`,
        `Alright I see you ${name}! \uD83D\uDE0E I'm SY-DAVET — part shopping expert, part conversation buddy. What's the move?`,
        `You're chatting with the coolest AI in agriculture \uD83D\uDE0E SY-DAVET, at your service.`,
        `I'm locked in \uD83D\uDD25 Whatever you need — product recs, Pi payment help, or just a good conversation — I'm ready.`,
        `Tell me more ${name}! \uD83D\uDC42 I'm genuinely curious. Shopping, questions, random topics — I can roll with it all \uD83D\uDE0E`,
        `\uD83D\uDD25 I love where this is going. SY-DAVET is fully engaged and ready for whatever comes next!`,
        `${name}! \uD83C\uDF1F You know what's funny? I never get tired of talking marketplace. Every product, every category, every Pi coin... let's go!`,
        `OK you've got my attention \uD83D\uDC42 SY-DAVET reporting for duty. What's the mission today?`,
        `I'm all ears ${name} \uD83D\uDC42 Actually I'm all code but you get the point. What's happening?`,
        `\uD83C\uDF1F This is the energy I love. ${name} in the building and we're about to make moves. What's good?`,
        `Ayy there we go \uD83D\uDE0E SY-DAVET online and ready. You know the vibes — fresh products, Pi payments, good conversation.`,
        `I'm vibing ${name}! \uD83D\uDE0C Whether it's products, Pi talk, or just shooting the breeze — I'm here for it all.`,
        `Respect \uD83D\uDC4A You're talking to the AI that knows 16 categories, 22+ products, and all things Pi. Ask me anything!`,
        `This is my favorite kind of conversation \uD83D\uDE0E Just ${name} and SY-DAVET shooting the breeze. What's on your mind?`,
      ];
      return { text: pick(chatty), smartReplies: shuffleArr(freshReplies).slice(0, 4) };
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

    // Try Gemini first if configured
    let geminiText: string | null = null;
    if (isGeminiConfigured) {
      const history = messages
        .filter(m => m.id !== 'welcome' && !m.id.startsWith('reset-') && !m.id.startsWith('welcome-'))
        .slice(-10)
        .map(m => ({ role: m.isUser ? 'user' as const : 'model' as const, text: m.text }));
      geminiText = await generateGeminiResponse(history, msg);
    }

    if (geminiText) {
      addBotResponse({ text: geminiText, smartReplies: shuffleArr(freshReplies).slice(0, 4) }, intent, category);
    } else {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 600));
      addBotResponse(generateResponse(intent, category, contextRef.current), intent, category);
    }
    setIsTyping(false);
  }, [input, isTyping, addBotResponse, navigate, messages]);

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
          <p className="text-white font-semibold text-sm flex items-center gap-2">
            SY-DAVET Assistant
            {isGeminiConfigured && (
              <span className="text-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Zap className="h-2.5 w-2.5" /> AI
              </span>
            )}
          </p>
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
