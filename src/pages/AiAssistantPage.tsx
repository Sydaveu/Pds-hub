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
  lastProductCategory: string | null;
  followUpDepth: number;
}

type Intent =
  | 'greeting' | 'help' | 'payment_pi' | 'payment_methods' | 'categories'
  | 'search' | 'cart' | 'checkout' | 'shipping' | 'delivery' | 'price'
  | 'quality' | 'livestock' | 'crops' | 'vegetables' | 'fruits'
  | 'fishery' | 'dairy' | 'honey' | 'seeds' | 'tools' | 'poultry'
  | 'profile' | 'orders' | 'returns' | 'security'
  | 'creator' | 'about' | 'compliment' | 'weather' | 'joke' | 'default';

interface BotResponse {
  text: string;
  images?: { url: string; caption: string }[];
  smartReplies?: string[];
  link?: { label: string; to: string };
}

const STORAGE_KEY = 'pds_ai_messages';
const CONTEXT_KEY = 'pds_ai_context';

function saveMessages(messages: ChatMessage[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
}

function loadMessages(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveContext(ctx: ChatContext) {
  try { localStorage.setItem(CONTEXT_KEY, JSON.stringify(ctx)); } catch {}
}

function loadContext(): ChatContext {
  try {
    const stored = localStorage.getItem(CONTEXT_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { lastIntent: 'default', lastCategory: null, lastProductCategory: null, followUpDepth: 0 };
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

const RESPONSES: Record<Intent, BotResponse[]> = {
  greeting: [
    {
      text: "Hey there! \uD83D\uDC4B Welcome back to **PDS Agri-Hub** \u2014 I'm SY-DAVET, your personal agricultural shopping assistant.\n\nI can show you product photos, give you prices in Pi (\u03c0), help you find what you need, walk you through checkout, explain delivery... basically everything! What are you shopping for today?",
      smartReplies: ["Show me fresh vegetables \uD83E\uDD6C", "What livestock do you have?", "How do I pay with Pi?", "Show me honey \uD83C\uDF6F"],
    },
    {
      text: "Hello and welcome! \uD83C\uDF3E I'm SY-DAVET \u2014 think of me as your knowledgeable friend at the market, but smarter and available 24/7.\n\nWant to see what's available? I can show you product photos, current prices, delivery info, and more. What brings you here today?",
      smartReplies: ["Show me popular products", "What's the cheapest option?", "Tell me about Pi payments", "What categories do you have?"],
    },
  ],
  help: [
    {
      text: "Here's everything I can do for you:\n\n\uD83D\uDDBC\uFE0F **Show product images** \u2014 just ask \"show me rice\" or \"what does your honey look like?\"\n\uD83D\uDCB0 **Pricing** \u2014 all prices in Pi (\u03c0), clearly stated\n\uD83D\uDED2 **Cart & Checkout** \u2014 step-by-step guidance\n\uD83D\uDE9A **Delivery** \u2014 timelines, packaging, tracking\n\uD83D\uDC04 **Product info** \u2014 detailed breakdown of any category\n\u2B50 **Recommendations** \u2014 I'll suggest the best picks\n\nJust chat naturally \u2014 I understand plain English. What do you need?",
      smartReplies: ["Show me fresh produce", "What's on sale?", "Help me checkout", "Track my order"],
    },
  ],
  payment_pi: [
    {
      text: "Pi Network payments are super straightforward here! Here's the flow:\n\n1\u20E3 Add items to your cart\n2\u20E3 Go to checkout\n3\u20E3 Fill in your delivery address\n4\u20E3 Select **Pi Network** as payment (it's our recommended method \u2705)\n5\u20E3 Your Pi wallet app opens to confirm the amount\n6\u20E3 Confirm \u2192 Order placed instantly! \uD83C\uDF89\n\n**Why Pi?** Low fees, fast settlement, borderless \u2014 ideal for agricultural commerce. No bank delays, no middleman.",
      smartReplies: ["What other payment methods work?", "What's the checkout process?", "What's free shipping?", "Show me products"],
    },
  ],
  payment_methods: [
    {
      text: "We accept 4 payment methods at checkout:\n\n\uD83E\uDD67 **Pi Network** \u2014 *Recommended.* Fast, low-fee, no borders\n\uD83D\uDCB3 **Visa** \u2014 Standard credit/debit card\n\uD83D\uDCB3 **Mastercard** \u2014 Credit/debit card\n\u20BF **Crypto** \u2014 BTC, ETH, USDT via wallet transfer\n\nPi is our primary currency and the best option if you're in the Pi ecosystem. All methods are equally secure \u2014 your card data is never stored on our servers.",
      smartReplies: ["How does Pi payment work?", "Is it secure?", "Help me checkout", "What's the total cost?"],
    },
  ],
  categories: [
    {
      text: "We have **16+ categories** covering everything from staple foods to farm supplies:\n\n\uD83C\uDF3E **Crops** \u2014 Rice, Beans, Maize, Yam, Cassava\n\uD83E\uDD6C **Vegetables** \u2014 Tomatoes, Carrots, Peppers, Onions\n\uD83C\uDF4E **Fruits** \u2014 Mangoes, Pineapples, Bananas\n\uD83D\uDC04 **Livestock** \u2014 Cattle, Goats, Sheep\n\uD83D\uDC14 **Poultry** \u2014 Broilers, Layers, Ducks\n\uD83D\uDC1F **Fishery** \u2014 Tilapia, Catfish, Smoked fish\n\uD83E\uDD5B **Dairy** \u2014 Fresh milk, Cheese, Yogurt\n\uD83C\uDF6F **Honey** \u2014 Raw, Wildflower, Forest varieties\n\uD83C\uDF31 **Seeds & Fertilizers**\n\uD83D\uDD27 **Farm Tools**\n\nWant to see photos of a specific category?",
      smartReplies: ["Show me vegetables \uD83E\uDD6C", "Show me fruits \uD83C\uDF4E", "Show me livestock \uD83D\uDC04", "Show me honey \uD83C\uDF6F"],
      link: { label: "Browse All Categories", to: "/categories" },
    },
  ],
  search: [
    {
      text: "Finding products is easy on PDS Agri-Hub! Here's how:\n\n\uD83D\uDD0D **Search bar** \u2014 Type any product name (rice, goat, honey...)\n\uD83C\uDFF7\uFE0F **Category pills** \u2014 Click to filter instantly (16 options)\n\u2195\uFE0F **Sort** \u2014 by Popularity, Price Low\u2192High, Price High\u2192Low, A-Z\n\nThe results update live as you type. You can also combine search + category filter for precision. Alternatively, just tell me what you want and I'll describe exactly what's available!",
      smartReplies: ["Show me rice \uD83C\uDF3E", "Show me goats \uD83D\uDC04", "Show me vegetables \uD83E\uDD6C", "Open marketplace"],
      link: { label: "Go to Marketplace", to: "/marketplace" },
    },
  ],
  cart: [
    {
      text: "Your cart is always one click away \u2014 look for the \uD83D\uDED2 icon in the navbar! Here's what you can do:\n\n\u2795 **Adjust quantities** \u2014 tap +/- on any item\n\uD83D\uDDD1\uFE0F **Remove items** \u2014 tap the trash icon\n\uD83D\uDCB0 **See live total** \u2014 subtotal + 7.5% tax shown in real-time\n\uD83D\uDE9A **Free delivery** \u2014 automatically applied\n\u2705 **Checkout** \u2014 when you're ready, tap Proceed to Checkout\n\nYour cart saves automatically even if you close the browser. You'll need to be signed in to complete checkout.",
      smartReplies: ["Take me to my cart", "How do I checkout?", "Is delivery free?", "Show me more products"],
      link: { label: "View My Cart", to: "/cart" },
    },
  ],
  checkout: [
    {
      text: "Checkout is a clean **3-step process** \u2014 takes under 2 minutes:\n\n**Step 1 \u2014 Shipping Info** \uD83D\uDCE6\nFull name, phone, email, delivery address, city, state\n\n**Step 2 \u2014 Payment** \uD83D\uDCB3\nChoose Pi Network, Visa, Mastercard, or Crypto. Enter details if needed.\n\n**Step 3 \u2014 Confirmation** \uD83C\uDF89\nYou get a unique order ID like `PDS-48291`. Track it anytime under My Orders.\n\nDelivery is **always free**. Tax is 7.5% and shown upfront \u2014 no surprises!",
      smartReplies: ["How do I pay with Pi?", "How long does delivery take?", "How do I track my order?", "Is my data secure?"],
    },
  ],
  shipping: [
    {
      text: "Great news \u2014 **all deliveries are free!** \uD83D\uDE9A Here's the full breakdown:\n\n\uD83D\uDCE6 **Processing:** Within 24 hours of order placement\n\uD83D\uDDD3\uFE0F **Delivery time:** 2\u20135 business days nationwide\n\uD83E\uDDCA **Perishables** (vegetables, fruits, dairy): Insulated cold-chain packaging\n\uD83D\uDC3E **Live animals** (livestock, poultry): Special humane transport arrangements\n\uD83D\uDCCD **Tracking:** Order status visible under My Orders \u2192 use your order ID\n\nFor bulk/large orders, we may reach out to confirm delivery logistics.",
      smartReplies: ["How do I track my order?", "What about live animals?", "How do I place an order?", "Show me products"],
    },
  ],
  delivery: [
    {
      text: "Here's our delivery promise:\n\n\u2705 **Free** on every order \u2014 no minimum purchase\n\u23F1\uFE0F **2\u20135 business days** standard nationwide\n\uD83E\uDDCA **Cold-chain packaging** for produce and dairy \u2014 stays fresh!\n\uD83D\uDC3E **Livestock handled** with certified transport partners\n\uD83D\uDCEB **Track your order** under My Orders at any time\n\nFor specific delivery concerns or commercial/bulk orders, email us: **pds.agrihub@gmail.com**",
      smartReplies: ["How does checkout work?", "Is delivery really free?", "Show me popular items", "Track my order"],
    },
  ],
  price: [
    {
      text: "All prices are in **Pi (\u03c0)** \u2014 the Pi Network cryptocurrency. Here's a quick price guide:\n\n| Product | Price |\n|---|---|\n| \uD83C\uDF3E Rice (25kg bag) | 15\u03c0 |\n| \uD83E\uDD6D Beans (2kg) | 5\u03c0 |\n| \uD83E\uDD6C Tomatoes (2kg) | 4\u03c0 |\n| \uD83E\uDD6D Mangoes (10pcs) | 12\u03c0 |\n| \uD83D\uDC10 Live Goat (medium) | 150\u03c0 |\n| \uD83C\uDF6F Honey (500ml) | 15\u03c0 |\n| \uD83D\uDC1F Tilapia (5kg) | 35\u03c0 |\n| \uD83D\uDC14 Broiler Chicken | 12\u03c0 |\n\nPrices are set by individual farmers and updated regularly. Want to see images of any of these?",
      smartReplies: ["Show me rice prices \uD83C\uDF3E", "Show me livestock prices \uD83D\uDC04", "Show me vegetables \uD83E\uDD6C", "How do I pay?"],
    },
  ],
  quality: [
    {
      text: "Quality is non-negotiable at PDS Agri-Hub. Here's our guarantee:\n\n\u2705 **Verified farmers** \u2014 all sellers are screened and vetted\n\uD83C\uDF31 **Grade A standards** \u2014 produce graded before listing\n\uD83E\uDDEC **Freshness checks** \u2014 perishables inspected before dispatch\n\u2B50 **Real buyer reviews** \u2014 ratings from verified purchases only\n\uD83D\uDCE6 **Smart packaging** \u2014 protective materials matched to product type\n\uD83D\uDC89 **Livestock certification** \u2014 vaccination records provided\n\nIf anything arrives unsatisfactory, report it within 48 hours and we'll make it right \u2014 replacement or refund.",
      smartReplies: ["What's your return policy?", "Show me top rated products", "How do I complain?", "Show me fresh produce"],
    },
  ],
  livestock: [
    {
      text: "Our **Livestock** section is one of the most popular on the platform! \uD83D\uDC04 Here's what's available:\n\n\uD83D\uDC10 **Goats** \u2014 Medium (150\u03c0), Large (200\u03c0)\n\uD83D\uDC04 **Cattle/Cows** \u2014 Young bulls (250\u03c0), Mature (300\u03c0+)\n\uD83D\uDC11 **Sheep** \u2014 from 120\u03c0\n\nAll animals are:\n\uD83D\uDC89 Vaccinated with health certificates available\n\uD83D\uDC3E Sourced from certified farms\n\uD83D\uDE9A Transported humanely by licensed partners\n\nHere's a look at some of our livestock:",
      images: PRODUCT_IMAGES.livestock,
      smartReplies: ["Show me poultry \uD83D\uDC14", "What's the delivery for animals?", "Show me fishery \uD83D\uDC1F", "How do I order a goat?"],
      link: { label: "Browse Livestock", to: "/marketplace" },
    },
  ],
  poultry: [
    {
      text: "Fresh **Poultry** from certified farms \u2014 here's what's in stock:\n\n\uD83D\uDC14 **Broiler Chickens** \u2014 2kg+ live weight, 12\u03c0 each\n\uD83E\uDD5A **Layer Hens** \u2014 great for eggs, 15\u03c0 each\n\uD83E\uDD86 **Ducks** \u2014 18\u03c0 each\n\uD83E\uDD83 **Turkeys** \u2014 available seasonally, from 40\u03c0\n\nAll birds are healthy, well-fed, and free-range where possible. Delivered live or prepared based on your preference.\n\nTake a look:",
      images: PRODUCT_IMAGES.poultry,
      smartReplies: ["Show me livestock \uD83D\uDC04", "Show me fishery \uD83D\uDC1F", "What's the price for chickens?", "How is delivery handled?"],
    },
  ],
  crops: [
    {
      text: "Our **Crops** section has Nigeria's essential staple foods \u2014 direct from farms! \uD83C\uDF3E\n\nHere's what's available:\n\n\uD83C\uDF3E **Rice** \u2014 Basmathi (8\u03c0/10kg), Long Grain (15\u03c0/25kg), Brown Rice\n\uD83E\uDD6D **Beans** \u2014 Black-eyed (5\u03c0/2kg), Kidney, Chickpeas\n\uD83C\uDF3D **Maize** \u2014 Yellow/White (18\u03c0/50kg bag)\n\uD83C\uDF60 **Yam** \u2014 Fresh tubers from Benue (8\u03c0/tuber)\n\uD83C\uDF3F **Cassava** \u2014 Fresh and processed (garri, flour)\n\nAll crops are non-GMO where specified, freshly harvested. Here's a sample:",
      images: [...(PRODUCT_IMAGES.rice || []), ...(PRODUCT_IMAGES.maize || [])],
      smartReplies: ["Show me just rice \uD83C\uDF3E", "What about beans?", "Show me vegetables too", "What are current prices?"],
      link: { label: "Browse Crops", to: "/marketplace" },
    },
  ],
  vegetables: [
    {
      text: "Our **Fresh Vegetables** are harvested daily and delivered in cold-chain packaging! \uD83E\uDD6C\n\nWhat's available right now:\n\n\uD83C\uDF45 **Tomatoes** \u2014 Roma, Plum (4\u03c0/2kg)\n\uD83E\uDD55 **Organic Carrots** \u2014 crunchy and sweet (6\u03c0/3kg)\n\uD83E\uDD51 **Bell Peppers** \u2014 Red, Green, Yellow (5\u03c0/1kg)\n\uD83E\uDDC5 **Onions** \u2014 Red and white varieties (3\u03c0/kg)\n\uD83E\uDD66 **Broccoli & Cabbage** \u2014 seasonal availability\n\uD83C\uDF3F **Spinach, Lettuce** \u2014 super fresh\n\nHere's a look at some of our produce:",
      images: PRODUCT_IMAGES.vegetables,
      smartReplies: ["Show me fruits too \uD83C\uDF4E", "What's the delivery like for veggies?", "How fresh are they?", "Add tomatoes to cart"],
      link: { label: "Browse Vegetables", to: "/marketplace" },
    },
  ],
  fruits: [
    {
      text: "Tropical **Fruits** at their finest \u2014 picked fresh and packed with care! \uD83C\uDF4E\n\n\uD83E\uDD6D **Mangoes** \u2014 Alphonso, Peter, Sheri varieties (12\u03c0/10pcs)\n\uD83C\uDF4D **Pineapples** \u2014 Golden ripe, from Cross River (9\u03c0/3pcs)\n\uD83C\uDF4C **Bananas & Plantains** \u2014 various ripeness levels available\n\uD83C\uDF4A **Oranges & Tangerines** \u2014 freshly picked\n\uD83C\uDF4B **Lemons** \u2014 available in season\n\nPacked in protective boxes to arrive in perfect condition. Have a look:",
      images: PRODUCT_IMAGES.fruits,
      smartReplies: ["Show me vegetables \uD83E\uDD6C", "Show me honey \uD83C\uDF6F", "What's the delivery time?", "Can I get a mixed fruit box?"],
      link: { label: "Browse Fruits", to: "/marketplace" },
    },
  ],
  fishery: [
    {
      text: "Fresh from the water to your door! \uD83D\uDC1F Our **Fishery** section includes:\n\n\uD83D\uDC1F **Tilapia** \u2014 freshwater, firm white flesh (35\u03c0/5kg)\n\uD83D\uDC20 **Catfish** \u2014 great for Nigerian pepper soup (25\u03c0/3kg)\n\uD83E\uDD90 **Prawns & Shrimp** \u2014 premium grade\n\uD83D\uDCA8 **Smoked Fish** \u2014 Mangala, Titus, Panla varieties\n\uD83D\uDC19 **Dried stockfish** \u2014 ready for soups and stews\n\nAll fish is sourced from clean local farms and handled with proper cold-chain logistics. Here's a preview:",
      images: PRODUCT_IMAGES.fishery,
      smartReplies: ["Show me livestock \uD83D\uDC04", "Show me dairy \uD83E\uDD5B", "Is the fish fresh?", "What's included in delivery?"],
      link: { label: "Browse Fishery", to: "/marketplace" },
    },
  ],
  dairy: [
    {
      text: "Farm-fresh **Dairy** products from grass-fed Northern Nigerian cows \uD83E\uDD5B\n\n\uD83E\uDD5B **Fresh Cow Milk** \u2014 collected daily, no additives (20\u03c0/10L)\n\uD83E\uDDC0 **Cheese** \u2014 locally produced artisan varieties\n\uD83C\uDF66 **Natural Yogurt** \u2014 plain and flavored\n\uD83E\uDDC8 **Butter** \u2014 churned from fresh cream\n\nDairy has a short shelf life, so we dispatch same-day with cold-chain packaging. Perfect for families, restaurants, and bakeries. Here's what it looks like:",
      images: PRODUCT_IMAGES.dairy,
      smartReplies: ["Show me honey \uD83C\uDF6F", "Show me eggs / poultry", "What's the delivery process?", "What are the prices?"],
    },
  ],
  honey: [
    {
      text: "Oh, this is a fan favourite! \uD83C\uDF6F Our **Natural Honey** collection is something special:\n\n\uD83C\uDF3A **Wildflower Honey** \u2014 multi-floral, complex flavor (15\u03c0/500ml)\n\uD83C\uDF32 **Forest Honey** \u2014 darker, earthy, medicinal (18\u03c0/500ml)\n\uD83C\uDF38 **Acacia Honey** \u2014 light, delicate sweetness (20\u03c0/500ml)\n\nAll varieties are:\n\u2705 100% raw and unfiltered \u2014 enzymes and pollen intact\n\uD83D\uDC8A Antioxidant-rich with natural antibacterial properties\n\uD83D\uDCCD From Plateau State beekeepers \u2014 one of Nigeria's finest honey regions\n\nHere's a look at the jars:",
      images: PRODUCT_IMAGES.honey,
      smartReplies: ["Show me fruits \uD83C\uDF4E", "Is honey good for health?", "What sizes are available?", "Show me all products"],
    },
  ],
  seeds: [
    {
      text: "Great seeds = great harvest! \uD83C\uDF31 Our **Seeds** section carries certified, high-yield varieties:\n\n\uD83C\uDF3D **Hybrid Maize Seeds** \u2014 95% germination, drought-tolerant (15\u03c0/5kg)\n\uD83C\uDF45 **Tomato Seeds** \u2014 Early Girl, Roma varieties\n\uD83C\uDF36\uFE0F **Pepper Seeds** \u2014 Scotch bonnet, Bell peppers\n\uD83E\uDD6D **Soybean Seeds** \u2014 IITA-certified (12\u03c0/5kg)\n\uD83C\uDF3F **Vegetable seed packs** \u2014 mixed assortments from 8\u03c0\n\nAll seeds come with planting instructions, expected yield, and spacing guides. Here's a preview:",
      images: PRODUCT_IMAGES.seeds,
      smartReplies: ["Show me farm tools \uD83D\uDD27", "When's the planting season?", "Show me fertilizers", "What's the germination rate?"],
    },
  ],
  tools: [
    {
      text: "Every farmer needs the right tools! \uD83D\uDD27 Here's what's in our **Farm Tools** section:\n\n\uD83D\uDD28 **Hand Tools** \u2014 Hoes (8\u03c0), Cutlasses (6\u03c0), Rakes (7\u03c0), Watering cans\n\u2699\uFE0F **Power Equipment** \u2014 Small tillers, Water pumps\n\uD83C\uDF3F **Garden Tools** \u2014 Pruning shears, Grafting knives, Trowels\n\uD83E\uDDEA **Soil Testing Kits** \u2014 pH and nutrient level testing\n\uD83E\uDEA3 **Storage** \u2014 Grain bags, Drying nets, Silos\n\nAll tools are heavy-duty grade, built for Nigerian farming conditions. Most come with a manufacturer warranty.",
      images: PRODUCT_IMAGES.tools,
      smartReplies: ["Show me seeds \uD83C\uDF31", "Show me fertilizers", "What's the warranty?", "Go to marketplace"],
      link: { label: "Browse Farm Tools", to: "/marketplace" },
    },
  ],
  profile: [
    {
      text: "Your **Profile** is your personal control centre on PDS Agri-Hub! Here's what you can manage there:\n\n\uD83D\uDC64 **Edit name & username**\n\uD83D\uDCF8 **Upload profile photo** or choose an emoji avatar\n\uD83D\uDCCB **Order history** with full status tracking\n\uD83D\uDD14 **Notification preferences** \u2014 order updates, promos, newsletter\n\uD83D\uDEE1\uFE0F **Security settings** \u2014 2FA, login alerts\n\uD83D\uDEAA **Sign out** securely\n\nAccess it by clicking your avatar icon in the top-right navbar (you must be signed in).",
      smartReplies: ["How do I sign in?", "How do I track my order?", "Change my password", "View my orders"],
      link: { label: "Go to Profile", to: "/profile" },
    },
  ],
  orders: [
    {
      text: "Checking your orders is simple! Here's how:\n\n1. Click your **avatar** in the navbar (top right)\n2. Select **My Orders** from the dropdown\n3. You'll see all orders with real-time status:\n\n\uD83D\uDFE1 **Pending** \u2014 order just placed\n\uD83D\uDD35 **Processing** \u2014 being prepared by the farmer\n\uD83D\uDCE6 **Shipped** \u2014 on its way to you\n\u2705 **Delivered** \u2014 order complete\n\u274C **Cancelled** \u2014 if applicable\n\nYou can also filter by status. Your order ID (e.g. PDS-48291) is shown in your confirmation screen.",
      smartReplies: ["What if my order is late?", "How do I return an item?", "Place a new order", "Go to marketplace"],
      link: { label: "View My Orders", to: "/orders" },
    },
  ],
  returns: [
    {
      text: "We stand behind every product. Here's our **Return & Refund policy**:\n\n\uD83D\uDCF8 Report issues **within 48 hours** of delivery\n\uD83D\uDCE7 Email us at **pds.agrihub@gmail.com** with photos of the issue\n\uD83D\uDD04 We'll arrange a **replacement or refund** \u2014 whichever you prefer\n\nFor perishables, please inspect your delivery immediately on arrival. We can't accept returns on opened perishables after 24 hours.\n\nYour satisfaction is genuinely our top priority \u2014 we take every complaint seriously and respond within 24 hours.",
      smartReplies: ["How do I track my order?", "What's your email?", "I have a different issue", "Show me more products"],
    },
  ],
  security: [
    {
      text: "Your security on PDS Agri-Hub is handled with care:\n\n\uD83D\uDD12 **Data encryption** \u2014 all data encrypted in transit (HTTPS/TLS)\n\uD83D\uDEE1\uFE0F **No card storage** \u2014 we never store payment card details on our servers\n\uD83D\uDD11 **Strong passwords** \u2014 use 8+ characters with mixed types\n\uD83D\uDCF1 **Two-factor auth (2FA)** \u2014 enable it in Profile \u2192 Settings\n\uD83D\uDEA8 **Login alerts** \u2014 get notified of new device sign-ins\n\uD83D\uDCE7 **Phishing warning** \u2014 we'll NEVER ask for your password by email\n\nIf you suspect any security issue, email **pds.agrihub@gmail.com** immediately.",
      smartReplies: ["How do I enable 2FA?", "Is my payment safe?", "How do I change my password?", "Contact support"],
    },
  ],
  creator: [
    {
      text: "I'm **SY-DAVET**, an AI assistant created by **JJ Void Assistant** \u2014 built specifically for PDS Agri-Hub to make agricultural shopping as smooth and intelligent as possible.\n\nI was designed to:\n\uD83D\uDDBC\uFE0F Show you real product images\n\uD83D\uDCA1 Give detailed, accurate answers\n\uD83E\uDD1D Feel like chatting with a knowledgeable friend\n\uD83D\uDD01 Never repeat myself unnecessarily\n\nJJ Void built me with deep knowledge of Nigerian agriculture, Pi Network payments, and e-commerce. I'm always improving \u2014 the more you chat, the better I get at helping you!",
      smartReplies: ["What can you do?", "Show me products", "How does Pi payment work?", "Tell me about PDS Agri-Hub"],
    },
  ],
  about: [
    {
      text: "**PDS Agri-Hub** is a premium agricultural marketplace powered by Pi Network. Here's our story:\n\n\uD83C\uDF31 **Founded by** Pisydaveu & Co. with a mission to connect farmers directly to buyers\n\uD83E\uDD67 **Pi-powered** \u2014 all transactions in Pi cryptocurrency, enabling borderless commerce\n\uD83D\uDE80 **What we do** \u2014 Cut out middlemen so farmers earn more and buyers pay less\n\uD83C\uDF0D **Who we serve** \u2014 Buyers and farmers across Nigeria, with pan-African ambitions\n\uD83E\uDD16 **AI-supported** \u2014 I'm here to guide every step of your journey\n\nFrom a bag of rice to live cattle, from seeds to farm equipment \u2014 we've got it all, delivered to your door.",
      smartReplies: ["Show me what's available", "Who created SY-DAVET?", "How does Pi payment work?", "Start shopping"],
      link: { label: "Learn More \u2014 About Page", to: "/about" },
    },
  ],
  compliment: [
    {
      text: "Thank you \u2014 that really means a lot! \uD83D\uDE0A I put a lot of effort into giving you accurate, helpful answers instead of generic responses.\n\nIs there anything else I can help you with? Whether it's finding a product, understanding Pi payments, tracking an order, or anything else about the marketplace \u2014 I'm all yours!",
      smartReplies: ["Show me popular products", "Help me find something", "How does checkout work?", "Show me categories"],
    },
    {
      text: "Appreciate it! \uD83D\uDC4C My goal is to feel less like a chatbot and more like a helpful friend who happens to know everything about this marketplace.\n\nWhat else can I do for you?",
      smartReplies: ["Show me best sellers", "What's new?", "Help me with my order", "Tell me a joke \uD83D\uDE04"],
    },
  ],
  weather: [
    {
      text: "Ha \u2014 I'm an agricultural marketplace assistant, not a weather app! \uD83D\uDE04 But I appreciate you testing me.\n\nIf you're asking because you want to know the best time to plant or harvest, I can actually help with that \u2014 just tell me what crop you're working with and your state/region in Nigeria, and I'll share general planting season guidance.\n\nOtherwise \u2014 what can I help you find on PDS Agri-Hub today?",
      smartReplies: ["Tell me about planting seasons", "Show me seeds", "Show me products", "What else can you do?"],
    },
  ],
  joke: [
    {
      text: "Okay, okay \u2014 here's one for you! \uD83D\uDE04\n\n*Why did the scarecrow win an award?*\n...Because he was **outstanding in his field!** \uD83C\uDF3E\n\nAlright, back to business \u2014 I'm a lot better at finding you fresh tomatoes than telling jokes. What can I actually help you with?",
      smartReplies: ["Show me vegetables \uD83E\uDD6C", "Show me products", "How does Pi payment work?", "Another joke \uD83D\uDE04"],
    },
    {
      text: "Sure! \uD83C\uDF3D\n\n*Why don't farmers tell secrets on the farm?*\n...Because the **corn has ears**, the **potatoes have eyes**, and the **beans stalk!** \uD83D\uDE02\n\nOkay, I'll stick to agriculture. What can I help you find?",
      smartReplies: ["Show me crops \uD83C\uDF3E", "Show me vegetables", "Open marketplace", "You're funny \uD83D\uDE04"],
    },
  ],
  default: [
    {
      text: "Hmm, that's an interesting one! I want to give you the most accurate answer, so let me ask \u2014 are you asking about:\n\n\uD83D\uDED2 A specific **product** (rice, goat, honey, etc.)?\n\uD83D\uDCB3 **Payments** or Pi Network?\n\uD83D\uDE9A **Delivery** or shipping?\n\uD83D\uDCE6 **An order** you've placed?\n\uD83D\uDE18 Something else entirely?\n\nJust give me a bit more context and I'll nail it for you!",
      smartReplies: ["Show me products", "Help with payment", "Delivery question", "Order tracking"],
    },
    {
      text: "I want to make sure I get this right for you. Could you rephrase or give me a bit more detail? I'm very good at:\n\n\uD83D\uDDBC\uFE0F Showing product images\n\uD83D\uDCB0 Explaining prices\n\uD83D\uDED2 Cart and checkout help\n\uD83D\uDCE6 Delivery and tracking\n\nWhat's on your mind?",
      smartReplies: ["Show me what's available", "Pi payment help", "I have an issue", "Just browsing"],
    },
  ],
};

const CATEGORY_MAP: Record<string, { productKey: string; label: string }> = {
  rice: { productKey: 'rice', label: 'Rice' },
  beans: { productKey: 'beans', label: 'Beans' },
  maize: { productKey: 'maize', label: 'Maize' },
  yam: { productKey: 'yam', label: 'Yam' },
  vegetables: { productKey: 'vegetables', label: 'Vegetables' },
  fruits: { productKey: 'fruits', label: 'Fruits' },
  livestock: { productKey: 'livestock', label: 'Livestock' },
  poultry: { productKey: 'poultry', label: 'Poultry' },
  fishery: { productKey: 'fishery', label: 'Fishery' },
  dairy: { productKey: 'dairy', label: 'Dairy' },
  honey: { productKey: 'honey', label: 'Honey' },
  seeds: { productKey: 'seeds', label: 'Seeds' },
  tools: { productKey: 'tools', label: 'Tools' },
};

function detectIntent(message: string, context: ChatContext | null): Intent {
  const m = message.toLowerCase().trim();

  if (context && context.lastIntent && context.lastIntent !== 'default') {
    const singleWord = m.split(/\s+/).length <= 3;
    const isFollowUp = singleWord && /^(show me|pictures|photos|images|pic|how much|price|cost|tell me more|more|and|also|what else|yes|yeah|sure|ok|okay|nice|cool|great|good|i see|wow|interesting|later|thanks|thx)\b/.test(m);
    const isPronounRef = /^(it|that|this|them|those|these|they)\b/.test(m) || /\b(it|that|this|them)\s*$/.test(m);

    if (isFollowUp || isPronounRef) {
      return context.lastIntent as Intent;
    }
  }

  if (/\b(hi|hello|hey|good (morning|evening|afternoon|day)|howdy|greetings|what'?s up|sup|yo)\b/.test(m)) return 'greeting';
  if (/\b(thank|thanks|great|excellent|amazing|awesome|brilliant|perfect|helpful|good job|nice|well done|cool)\b/.test(m)) return 'compliment';
  if (/\b(joke|funny|laugh|humor|make me laugh|cheer me up)\b/.test(m)) return 'joke';
  if (/\b(weather|rain|sun|temperature|forecast|climate)\b/.test(m)) return 'weather';
  if (/\b(who (made|created|built|are you)|your (creator|developer|maker|name)|jj void|about you|what are you)\b/.test(m)) return 'creator';
  if (/\b(about (pds|agri-hub|company|us|platform)|what is (pds|agri-hub)|company info|history)\b/.test(m)) return 'about';
  if (/\b(help|assist|support|what can you|guide me|how does this work|what do you do)\b/.test(m)) return 'help';
  if (/\b(pi (network|coin|crypto|pay|payment|wallet)|pay with pi|pi transaction|pi currency)\b/.test(m)) return 'payment_pi';
  if (/\b(visa|mastercard|card|credit|debit|crypto|bitcoin|eth|usdt|payment method|how (do i |can i )?pay)\b/.test(m)) return 'payment_methods';
  if (/\b(categor|type of product|what (do you sell|is available|have you got)|product range|what products)\b/.test(m)) return 'categories';
  if (/\b(search|find|look for|how to find|browse|filter|discover)\b/.test(m)) return 'search';
  if (/\b(cart|basket|add to cart|my cart|shopping cart|bag)\b/.test(m)) return 'cart';
  if (/\b(checkout|check out|buy now|place order|order process|how to buy|purchase process)\b/.test(m)) return 'checkout';
  if (/\b(ship|shipping|dispatch|how long|receive|packaging)\b/.test(m)) return 'shipping';
  if (/\b(deliver|delivery|when will|arrive)\b/.test(m)) return 'delivery';
  if (/\b(price|cost|how much|afford|expensive|cheap|rate|tariff|pricing)\b/.test(m)) return 'price';
  if (/\b(quality|fresh|organic|grade|standard|certified|clean|safe|how good)\b/.test(m)) return 'quality';
  if (/\b(goat|cow|cattle|livestock|sheep|bull|ram|farm animal|ruminant)\b/.test(m)) return 'livestock';
  if (/\b(chicken|poultry|broiler|layer|duck|turkey|bird|hen|rooster)\b/.test(m)) return 'poultry';
  if (/\b(rice|beans|maize|corn|yam|cassava|millet|sorghum|grain|cereal|crop|staple)\b/.test(m)) return 'crops';
  if (/\b(vegetable|tomato|carrot|pepper|onion|cabbage|spinach|okra|broccoli|lettuce|garden)\b/.test(m)) return 'vegetables';
  if (/\b(fruit|mango|pineapple|orange|banana|plantain|watermelon|pawpaw|tropical|lemon|lime)\b/.test(m)) return 'fruits';
  if (/\b(fish|tilapia|catfish|prawn|shrimp|seafood|smoked fish|stockfish)\b/.test(m)) return 'fishery';
  if (/\b(milk|dairy|cheese|yogurt|butter|cream|cow milk)\b/.test(m)) return 'dairy';
  if (/\b(honey|bee|beeswax|propolis|sweetener)\b/.test(m)) return 'honey';
  if (/\b(seed|seedling|planting|germination|hybrid|certified seed|sow)\b/.test(m)) return 'seeds';
  if (/\b(tool|hoe|cutlass|fertilizer|npk|equipment|farm tool|sprayer|tractor|implement)\b/.test(m)) return 'tools';
  if (/\b(profile|account|settings|username|avatar|notification|my account)\b/.test(m)) return 'profile';
  if (/\b(order|track(ing)?|history|status|my order|past order|where is my)\b/.test(m)) return 'orders';
  if (/\b(return|refund|complaint|problem|issue|wrong|damaged|missing|not fresh|spoiled)\b/.test(m)) return 'returns';
  if (/\b(security|password|safe|hack|two.?factor|2fa|login alert|protect|secure)\b/.test(m)) return 'security';
  return 'default';
}

function resolveSmartReplies(intent: Intent, context: ChatContext): string[] {
  const pool = RESPONSES[intent];
  if (!pool || pool.length === 0) return RESPONSES.default[0].smartReplies || [];

  const replies = pool[0].smartReplies;
  if (!replies) return RESPONSES.default[0].smartReplies || [];

  if (intent === 'default') return replies;

  return replies;
}

const usedResponseMap = new Map<string, Set<number>>();

function getResponse(intent: Intent): BotResponse {
  const pool = RESPONSES[intent];
  if (!usedResponseMap.has(intent)) usedResponseMap.set(intent, new Set());
  const used = usedResponseMap.get(intent)!;
  const available = pool.map((_, i) => i).filter(i => !used.has(i));
  const indices = available.length > 0 ? available : pool.map((_, i) => i);
  if (available.length === 0) used.clear();
  const idx = indices[Math.floor(Math.random() * indices.length)];
  used.add(idx);
  return pool[idx];
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
        const resp = getResponse('greeting');
        const welcomeMsg: ChatMessage = {
          id: 'welcome',
          text: resp.text,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          smartReplies: resp.smartReplies,
          images: resp.images,
          link: resp.link,
        };
        setMessages([welcomeMsg]);
        saveMessages([welcomeMsg]);
        contextRef.current = { lastIntent: 'greeting', lastCategory: null, lastProductCategory: null, followUpDepth: 0 };
        saveContext(contextRef.current);
      }
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotResponse = useCallback((resp: BotResponse, intent: string, category?: string | null) => {
    setMessages(prev => {
      const newMsg: ChatMessage = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        text: resp.text,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        images: resp.images,
        smartReplies: resp.smartReplies,
        link: resp.link,
      };
      const updated = [...prev, newMsg];
      saveMessages(updated);

      contextRef.current = {
        lastIntent: intent,
        lastCategory: category || null,
        lastProductCategory: category && CATEGORY_MAP[category] ? CATEGORY_MAP[category].productKey : null,
        followUpDepth: intent === contextRef.current.lastIntent ? contextRef.current.followUpDepth + 1 : 0,
      };
      saveContext(contextRef.current);

      return updated;
    });
  }, []);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;
    setInput('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(36),
      text: msg,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => {
      const updated = [...prev, userMsg];
      saveMessages(updated);
      return updated;
    });

    setIsTyping(true);

    const intent = detectIntent(msg, contextRef.current);

    const categoryMatch = msg.match(/\b(rice|beans|maize|yam|vegetables?|fruits?|livestock|poultry|fishery|dairy|honey|seeds?|tools?)\b/i);
    const category = categoryMatch ? categoryMatch[1].toLowerCase().replace(/s$/, '') : null;

    let resolvedCategory = category;
    if (!resolvedCategory && ['livestock', 'poultry', 'crops', 'vegetables', 'fruits', 'fishery', 'dairy', 'honey', 'seeds', 'tools'].includes(intent)) {
      resolvedCategory = intent;
    }

    await new Promise(r => setTimeout(r, 700 + Math.random() * 800));
    addBotResponse(getResponse(intent), intent, resolvedCategory);
    setIsTyping(false);
  }, [input, isTyping, addBotResponse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleClear = () => {
    usedResponseMap.clear();
    const resp = getResponse('greeting');
    const welcomeMsg: ChatMessage = {
      id: 'reset-' + Date.now(),
      text: resp.text,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      smartReplies: resp.smartReplies,
      images: resp.images,
      link: resp.link,
    };
    setMessages([welcomeMsg]);
    saveMessages([welcomeMsg]);
    contextRef.current = { lastIntent: 'greeting', lastCategory: null, lastProductCategory: null, followUpDepth: 0 };
    saveContext(contextRef.current);
  };

  const handleClearAll = () => {
    usedResponseMap.clear();
    setMessages([]);
    saveMessages([]);
    contextRef.current = { lastIntent: 'default', lastCategory: null, lastProductCategory: null, followUpDepth: 0 };
    saveContext(contextRef.current);
    const resp = getResponse('greeting');
    const welcomeMsg: ChatMessage = {
      id: 'welcome-' + Date.now(),
      text: resp.text,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      smartReplies: resp.smartReplies,
      images: resp.images,
      link: resp.link,
    };
    setMessages([welcomeMsg]);
    saveMessages([welcomeMsg]);
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-1" />;
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="leading-relaxed">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#09090b] flex flex-col">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-black/70 backdrop-blur-xl border-b border-white/5 flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#09090b] animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">SY-DAVET Assistant</p>
          <p className="text-gray-500 text-xs">by JJ Void {messages.length > 0 ? `\u2022 ${messages.length} messages in this session` : '\u2022 Online \u2014 responds instantly'}</p>
        </div>
        <button onClick={handleClear} className="p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-colors" title="New conversation">
          <RefreshCw className="h-4 w-4" />
        </button>
        <button onClick={handleClearAll} className="p-2 rounded-xl hover:bg-white/5 text-gray-600 hover:text-red-400 transition-colors" title="Delete all history">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 left-1/3 w-72 h-72 bg-purple-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-56 h-56 bg-indigo-700/5 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5 relative">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} gap-3`}
            >
              {!msg.isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-purple-500/20">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}

              <div className={`flex flex-col gap-2 ${msg.isUser ? 'items-end max-w-[82%]' : 'items-start max-w-[88%] sm:max-w-[75%]'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm space-y-1 ${
                  msg.isUser
                    ? 'bg-purple-600 text-white rounded-br-sm'
                    : 'bg-white/5 border border-white/8 text-gray-200 rounded-bl-sm'
                }`}>
                  {formatText(msg.text)}
                </div>

                {msg.images && msg.images.length > 0 && (
                  <div className={`grid gap-2 w-full ${msg.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {msg.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-xl overflow-hidden border border-white/10"
                      >
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full h-36 object-cover"
                          loading="lazy"
                        />
                        <div className="px-3 py-2 bg-white/5">
                          <p className="text-xs text-gray-400">{img.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {msg.link && (
                  <button
                    onClick={() => navigate(msg.link!.to)}
                    className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 px-3 py-2 rounded-lg transition-all"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {msg.link.label}
                  </button>
                )}

                {msg.smartReplies && !msg.isUser && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {msg.smartReplies.map(reply => (
                      <button
                        key={reply}
                        onClick={() => handleSend(reply)}
                        className="text-xs bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-600/10 text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-full transition-all"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-gray-600 px-1">{msg.timestamp}</span>
              </div>

              {msg.isUser && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/15 border border-purple-500/25 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-400 text-[10px] font-bold">You</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white/5 border border-white/8 rounded-2xl rounded-bl-sm px-5 py-4 flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="px-4 sm:px-6 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-3 w-3 text-purple-400" />
            <span className="text-gray-500 text-xs font-medium">Try asking me</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Show me fresh vegetables \uD83E\uDD6C", "What livestock do you have? \uD83D\uDC04", "Show me honey \uD83C\uDF6F", "How do I pay with Pi?", "Tell me a joke \uD83D\uDE04", "What products are available?"].map(p => (
              <button key={p} onClick={() => handleSend(p)} className="text-xs bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-600/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-all">
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 sm:px-6 py-4 bg-black/70 backdrop-blur-xl border-t border-white/5 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex gap-3 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about products, prices, delivery, Pi payments..."
            disabled={isTyping}
            className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all disabled:opacity-50"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0 shadow-lg shadow-purple-500/20"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
        <p className="text-center text-gray-700 text-[10px] mt-2">SY-DAVET by JJ Void Assistant \u2022 PDS Agri-Hub</p>
      </div>
    </div>
  );
}
