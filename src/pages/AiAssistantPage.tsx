import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, ArrowLeft, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
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

const PRODUCT_IMAGES: Record<string, { url: string; caption: string }[]> = {
  rice: [
    { url: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&q=80', caption: 'Premium Long Grain Rice (25kg) — 15π' },
    { url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', caption: 'Basmathi Rice (10kg) — 8π' },
  ],
  beans: [
    { url: 'https://images.unsplash.com/photo-1612257416648-2ac09c193a50?w=400&q=80', caption: 'Black Eyed Beans (2kg) — 5π' },
    { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', caption: 'Mixed Legumes Pack — 7π' },
  ],
  vegetables: [
    { url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', caption: 'Fresh Organic Carrots (3kg) — 6π' },
    { url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80', caption: 'Plum Tomatoes (2kg) — 4π' },
    { url: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400&q=80', caption: 'Fresh Bell Peppers (1kg) — 5π' },
  ],
  fruits: [
    { url: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80', caption: 'Sweet Mangoes (10pcs) — 12π' },
    { url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&q=80', caption: 'Fresh Pineapples (3pcs) — 9π' },
  ],
  livestock: [
    { url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&q=80', caption: 'Healthy Goat (medium) — 150π' },
    { url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&q=80', caption: 'Mature Bull — 300π' },
  ],
  poultry: [
    { url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80', caption: 'Live Broiler Chicken (2kg+) — 12π' },
  ],
  fishery: [
    { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80', caption: 'Fresh Tilapia (5kg) — 35π' },
    { url: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&q=80', caption: 'Live Catfish (3kg) — 25π' },
  ],
  honey: [
    { url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', caption: 'Natural Wildflower Honey (500ml) — 15π' },
  ],
  dairy: [
    { url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80', caption: 'Fresh Cow Milk (10L) — 20π' },
  ],
  seeds: [
    { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', caption: 'Hybrid Maize Seeds (5kg) — 15π' },
  ],
  tools: [
    { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', caption: 'Premium Garden Hoe — 8π' },
  ],
  maize: [
    { url: 'https://images.unsplash.com/photo-1601593768793-4d3ab7d7a7f7?w=400&q=80', caption: 'Yellow Maize (50kg bag) — 18π' },
  ],
  yam: [
    { url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80', caption: 'Fresh Yam Tubers (per piece) — 8π' },
  ],
};

const RESPONSES: Record<Intent, BotResponse[]> = {
  greeting: [
    {
      text: "Hey there! 👋 Welcome to **PDS Agri-Hub** — I'm SY-DAVET, your personal agricultural shopping assistant.\n\nI can show you product photos, give you prices in Pi (π), help you find what you need, walk you through checkout, explain delivery... basically everything! What are you shopping for today?",
      smartReplies: ["Show me fresh vegetables 🥬", "What livestock do you have?", "How do I pay with Pi?", "Show me honey 🍯"],
    },
    {
      text: "Hello and welcome! 🌾 I'm SY-DAVET — think of me as your knowledgeable friend at the market, but smarter and available 24/7.\n\nWant to see what's available? I can show you product photos, current prices, delivery info, and more. What brings you here today?",
      smartReplies: ["Show me popular products", "What's the cheapest option?", "Tell me about Pi payments", "What categories do you have?"],
    },
  ],
  help: [
    {
      text: "Here's everything I can do for you:\n\n🖼️ **Show product images** — just ask \"show me rice\" or \"what does your honey look like?\"\n💰 **Pricing** — all prices in Pi (π), clearly stated\n🛒 **Cart & Checkout** — step-by-step guidance\n🚚 **Delivery** — timelines, packaging, tracking\n🐄 **Product info** — detailed breakdown of any category\n⭐ **Recommendations** — I'll suggest the best picks\n\nJust chat naturally — I understand plain English. What do you need?",
      smartReplies: ["Show me fresh produce", "What's on sale?", "Help me checkout", "Track my order"],
    },
  ],
  payment_pi: [
    {
      text: "Pi Network payments are super straightforward here! Here's the flow:\n\n1️⃣ Add items to your cart\n2️⃣ Go to checkout\n3️⃣ Fill in your delivery address\n4️⃣ Select **Pi Network** as payment (it's our recommended method ✅)\n5️⃣ Your Pi wallet app opens to confirm the amount\n6️⃣ Confirm → Order placed instantly! 🎉\n\n**Why Pi?** Low fees, fast settlement, borderless — ideal for agricultural commerce. No bank delays, no middleman.",
      smartReplies: ["What other payment methods work?", "What's the checkout process?", "What's free shipping?", "Show me products"],
    },
  ],
  payment_methods: [
    {
      text: "We accept 4 payment methods at checkout:\n\n🥧 **Pi Network** — *Recommended.* Fast, low-fee, no borders\n💳 **Visa** — Standard credit/debit card\n💳 **Mastercard** — Credit/debit card\n₿ **Crypto** — BTC, ETH, USDT via wallet transfer\n\nPi is our primary currency and the best option if you're in the Pi ecosystem. All methods are equally secure — your card data is never stored on our servers.",
      smartReplies: ["How does Pi payment work?", "Is it secure?", "Help me checkout", "What's the total cost?"],
    },
  ],
  categories: [
    {
      text: "We have **16+ categories** covering everything from staple foods to farm supplies:\n\n🌾 **Crops** — Rice, Beans, Maize, Yam, Cassava\n🥬 **Vegetables** — Tomatoes, Carrots, Peppers, Onions\n🍎 **Fruits** — Mangoes, Pineapples, Bananas\n🐄 **Livestock** — Cattle, Goats, Sheep\n🐔 **Poultry** — Broilers, Layers, Ducks\n🐟 **Fishery** — Tilapia, Catfish, Smoked fish\n🥛 **Dairy** — Fresh milk, Cheese, Yogurt\n🍯 **Honey** — Raw, Wildflower, Forest varieties\n🌱 **Seeds & Fertilizers**\n🔧 **Farm Tools**\n\nWant to see photos of a specific category?",
      smartReplies: ["Show me vegetables 🥬", "Show me fruits 🍎", "Show me livestock 🐄", "Show me honey 🍯"],
      link: { label: "Browse All Categories", to: "/categories" },
    },
  ],
  search: [
    {
      text: "Finding products is easy on PDS Agri-Hub! Here's how:\n\n🔍 **Search bar** — Type any product name (rice, goat, honey...)\n🏷️ **Category pills** — Click to filter instantly (16 options)\n↕️ **Sort** — by Popularity, Price Low→High, Price High→Low, A-Z\n\nThe results update live as you type. You can also combine search + category filter for precision. Alternatively, just tell me what you want and I'll describe exactly what's available!",
      smartReplies: ["Show me rice 🌾", "Show me goats 🐄", "Show me vegetables 🥬", "Open marketplace"],
      link: { label: "Go to Marketplace", to: "/marketplace" },
    },
  ],
  cart: [
    {
      text: "Your cart is always one click away — look for the 🛒 icon in the navbar! Here's what you can do:\n\n➕ **Adjust quantities** — tap +/- on any item\n🗑️ **Remove items** — tap the trash icon\n💰 **See live total** — subtotal + 7.5% tax shown in real-time\n🚚 **Free delivery** — automatically applied\n✅ **Checkout** — when you're ready, tap Proceed to Checkout\n\nYour cart saves automatically even if you close the browser. You'll need to be signed in to complete checkout.",
      smartReplies: ["Take me to my cart", "How do I checkout?", "Is delivery free?", "Show me more products"],
      link: { label: "View My Cart", to: "/cart" },
    },
  ],
  checkout: [
    {
      text: "Checkout is a clean **3-step process** — takes under 2 minutes:\n\n**Step 1 — Shipping Info** 📦\nFull name, phone, email, delivery address, city, state\n\n**Step 2 — Payment** 💳\nChoose Pi Network, Visa, Mastercard, or Crypto. Enter details if needed.\n\n**Step 3 — Confirmation** 🎉\nYou get a unique order ID like `PDS-48291`. Track it anytime under My Orders.\n\nDelivery is **always free**. Tax is 7.5% and shown upfront — no surprises!",
      smartReplies: ["How do I pay with Pi?", "How long does delivery take?", "How do I track my order?", "Is my data secure?"],
    },
  ],
  shipping: [
    {
      text: "Great news — **all deliveries are free!** 🚚 Here's the full breakdown:\n\n📦 **Processing:** Within 24 hours of order placement\n🗓️ **Delivery time:** 2–5 business days nationwide\n🧊 **Perishables** (vegetables, fruits, dairy): Insulated cold-chain packaging\n🐾 **Live animals** (livestock, poultry): Special humane transport arrangements\n📍 **Tracking:** Order status visible under My Orders → use your order ID\n\nFor bulk/large orders, we may reach out to confirm delivery logistics.",
      smartReplies: ["How do I track my order?", "What about live animals?", "How do I place an order?", "Show me products"],
    },
  ],
  delivery: [
    {
      text: "Here's our delivery promise:\n\n✅ **Free** on every order — no minimum purchase\n⏱️ **2–5 business days** standard nationwide\n🧊 **Cold-chain packaging** for produce and dairy — stays fresh!\n🐾 **Livestock handled** with certified transport partners\n📬 **Track your order** under My Orders at any time\n\nFor specific delivery concerns or commercial/bulk orders, email us: **pds.agrihub@gmail.com**",
      smartReplies: ["How does checkout work?", "Is delivery really free?", "Show me popular items", "Track my order"],
    },
  ],
  price: [
    {
      text: "All prices are in **Pi (π)** — the Pi Network cryptocurrency. Here's a quick price guide:\n\n| Product | Price |\n|---|---|\n| 🌾 Rice (25kg bag) | 15π |\n| 🫘 Beans (2kg) | 5π |\n| 🥬 Tomatoes (2kg) | 4π |\n| 🥭 Mangoes (10pcs) | 12π |\n| 🐐 Live Goat (medium) | 150π |\n| 🍯 Honey (500ml) | 15π |\n| 🐟 Tilapia (5kg) | 35π |\n| 🐔 Broiler Chicken | 12π |\n\nPrices are set by individual farmers and updated regularly. Want to see images of any of these?",
      smartReplies: ["Show me rice prices 🌾", "Show me livestock prices 🐄", "Show me vegetables 🥬", "How do I pay?"],
    },
  ],
  quality: [
    {
      text: "Quality is non-negotiable at PDS Agri-Hub. Here's our guarantee:\n\n✅ **Verified farmers** — all sellers are screened and vetted\n🌱 **Grade A standards** — produce graded before listing\n🧪 **Freshness checks** — perishables inspected before dispatch\n⭐ **Real buyer reviews** — ratings from verified purchases only\n📦 **Smart packaging** — protective materials matched to product type\n💉 **Livestock certification** — vaccination records provided\n\nIf anything arrives unsatisfactory, report it within 48 hours and we'll make it right — replacement or refund.",
      smartReplies: ["What's your return policy?", "Show me top rated products", "How do I complain?", "Show me fresh produce"],
    },
  ],
  livestock: [
    {
      text: "Our **Livestock** section is one of the most popular on the platform! 🐄 Here's what's available:\n\n🐐 **Goats** — Medium (150π), Large (200π)\n🐄 **Cattle/Cows** — Young bulls (250π), Mature (300π+)\n🐑 **Sheep** — from 120π\n\nAll animals are:\n💉 Vaccinated with health certificates available\n🐾 Sourced from certified farms\n🚚 Transported humanely by licensed partners\n\nHere's a look at some of our livestock:",
      images: PRODUCT_IMAGES.livestock,
      smartReplies: ["Show me poultry 🐔", "What's the delivery for animals?", "Show me fishery 🐟", "How do I order a goat?"],
      link: { label: "Browse Livestock", to: "/marketplace" },
    },
  ],
  poultry: [
    {
      text: "Fresh **Poultry** from certified farms — here's what's in stock:\n\n🐔 **Broiler Chickens** — 2kg+ live weight, 12π each\n🥚 **Layer Hens** — great for eggs, 15π each\n🦆 **Ducks** — 18π each\n🦃 **Turkeys** — available seasonally, from 40π\n\nAll birds are healthy, well-fed, and free-range where possible. Delivered live or prepared based on your preference.\n\nTake a look:",
      images: PRODUCT_IMAGES.poultry,
      smartReplies: ["Show me livestock 🐄", "Show me fishery 🐟", "What's the price for chickens?", "How is delivery handled?"],
    },
  ],
  crops: [
    {
      text: "Our **Crops** section has Nigeria's essential staple foods — direct from farms! 🌾\n\nHere's what's available:\n\n🌾 **Rice** — Basmathi (8π/10kg), Long Grain (15π/25kg), Brown Rice\n🫘 **Beans** — Black-eyed (5π/2kg), Kidney, Chickpeas\n🌽 **Maize** — Yellow/White (18π/50kg bag)\n🍠 **Yam** — Fresh tubers from Benue (8π/tuber)\n🌿 **Cassava** — Fresh and processed (garri, flour)\n\nAll crops are non-GMO where specified, freshly harvested. Here's a sample:",
      images: [...(PRODUCT_IMAGES.rice || []), ...(PRODUCT_IMAGES.maize || [])],
      smartReplies: ["Show me just rice 🌾", "What about beans?", "Show me vegetables too", "What are current prices?"],
      link: { label: "Browse Crops", to: "/marketplace" },
    },
  ],
  vegetables: [
    {
      text: "Our **Fresh Vegetables** are harvested daily and delivered in cold-chain packaging! 🥬\n\nWhat's available right now:\n\n🍅 **Tomatoes** — Roma, Plum (4π/2kg)\n🥕 **Organic Carrots** — crunchy and sweet (6π/3kg)\n🫑 **Bell Peppers** — Red, Green, Yellow (5π/1kg)\n🧅 **Onions** — Red and white varieties (3π/kg)\n🥦 **Broccoli & Cabbage** — seasonal availability\n🌿 **Spinach, Lettuce** — super fresh\n\nHere's a look at some of our produce:",
      images: PRODUCT_IMAGES.vegetables,
      smartReplies: ["Show me fruits too 🍎", "What's the delivery like for veggies?", "How fresh are they?", "Add tomatoes to cart"],
      link: { label: "Browse Vegetables", to: "/marketplace" },
    },
  ],
  fruits: [
    {
      text: "Tropical **Fruits** at their finest — picked fresh and packed with care! 🍎\n\n🥭 **Mangoes** — Alphonso, Peter, Sheri varieties (12π/10pcs)\n🍍 **Pineapples** — Golden ripe, from Cross River (9π/3pcs)\n🍌 **Bananas & Plantains** — various ripeness levels available\n🍊 **Oranges & Tangerines** — freshly picked\n🍋 **Lemons** — available in season\n\nPacked in protective boxes to arrive in perfect condition. Have a look:",
      images: PRODUCT_IMAGES.fruits,
      smartReplies: ["Show me vegetables 🥬", "Show me honey 🍯", "What's the delivery time?", "Can I get a mixed fruit box?"],
      link: { label: "Browse Fruits", to: "/marketplace" },
    },
  ],
  fishery: [
    {
      text: "Fresh from the water to your door! 🐟 Our **Fishery** section includes:\n\n🐟 **Tilapia** — freshwater, firm white flesh (35π/5kg)\n🐠 **Catfish** — great for Nigerian pepper soup (25π/3kg)\n🦐 **Prawns & Shrimp** — premium grade\n🐡 **Smoked Fish** — Mangala, Titus, Panla varieties\n🐙 **Dried stockfish** — ready for soups and stews\n\nAll fish is sourced from clean local farms and handled with proper cold-chain logistics. Here's a preview:",
      images: PRODUCT_IMAGES.fishery,
      smartReplies: ["Show me livestock 🐄", "Show me dairy 🥛", "Is the fish fresh?", "What's included in delivery?"],
      link: { label: "Browse Fishery", to: "/marketplace" },
    },
  ],
  dairy: [
    {
      text: "Farm-fresh **Dairy** products from grass-fed Northern Nigerian cows 🥛\n\n🥛 **Fresh Cow Milk** — collected daily, no additives (20π/10L)\n🧀 **Cheese** — locally produced artisan varieties\n🍦 **Natural Yogurt** — plain and flavored\n🧈 **Butter** — churned from fresh cream\n\nDairy has a short shelf life, so we dispatch same-day with cold-chain packaging. Perfect for families, restaurants, and bakeries. Here's what it looks like:",
      images: PRODUCT_IMAGES.dairy,
      smartReplies: ["Show me honey 🍯", "Show me eggs / poultry", "What's the delivery process?", "What are the prices?"],
    },
  ],
  honey: [
    {
      text: "Oh, this is a fan favourite! 🍯 Our **Natural Honey** collection is something special:\n\n🌺 **Wildflower Honey** — multi-floral, complex flavor (15π/500ml)\n🌲 **Forest Honey** — darker, earthy, medicinal (18π/500ml)\n🌸 **Acacia Honey** — light, delicate sweetness (20π/500ml)\n\nAll varieties are:\n✅ 100% raw and unfiltered — enzymes and pollen intact\n💊 Antioxidant-rich with natural antibacterial properties\n📍 From Plateau State beekeepers — one of Nigeria's finest honey regions\n\nHere's a look at the jars:",
      images: PRODUCT_IMAGES.honey,
      smartReplies: ["Show me fruits 🍎", "Is honey good for health?", "What sizes are available?", "Show me all products"],
    },
  ],
  seeds: [
    {
      text: "Great seeds = great harvest! 🌱 Our **Seeds** section carries certified, high-yield varieties:\n\n🌽 **Hybrid Maize Seeds** — 95% germination, drought-tolerant (15π/5kg)\n🍅 **Tomato Seeds** — Early Girl, Roma varieties\n🌶️ **Pepper Seeds** — Scotch bonnet, Bell peppers\n🫘 **Soybean Seeds** — IITA-certified (12π/5kg)\n🌿 **Vegetable seed packs** — mixed assortments from 8π\n\nAll seeds come with planting instructions, expected yield, and spacing guides. Here's a preview:",
      images: PRODUCT_IMAGES.seeds,
      smartReplies: ["Show me farm tools 🔧", "When's the planting season?", "Show me fertilizers", "What's the germination rate?"],
    },
  ],
  tools: [
    {
      text: "Every farmer needs the right tools! 🔧 Here's what's in our **Farm Tools** section:\n\n🔨 **Hand Tools** — Hoes (8π), Cutlasses (6π), Rakes (7π), Watering cans\n⚙️ **Power Equipment** — Small tillers, Water pumps\n🌿 **Garden Tools** — Pruning shears, Grafting knives, Trowels\n🧪 **Soil Testing Kits** — pH and nutrient level testing\n🪣 **Storage** — Grain bags, Drying nets, Silos\n\nAll tools are heavy-duty grade, built for Nigerian farming conditions. Most come with a manufacturer warranty.",
      images: PRODUCT_IMAGES.tools,
      smartReplies: ["Show me seeds 🌱", "Show me fertilizers", "What's the warranty?", "Go to marketplace"],
      link: { label: "Browse Farm Tools", to: "/marketplace" },
    },
  ],
  profile: [
    {
      text: "Your **Profile** is your personal control centre on PDS Agri-Hub! Here's what you can manage there:\n\n👤 **Edit name & username**\n📸 **Upload profile photo** or choose an emoji avatar\n📋 **Order history** with full status tracking\n🔔 **Notification preferences** — order updates, promos, newsletter\n🛡️ **Security settings** — 2FA, login alerts\n🚪 **Sign out** securely\n\nAccess it by clicking your avatar icon in the top-right navbar (you must be signed in).",
      smartReplies: ["How do I sign in?", "How do I track my order?", "Change my password", "View my orders"],
      link: { label: "Go to Profile", to: "/profile" },
    },
  ],
  orders: [
    {
      text: "Checking your orders is simple! Here's how:\n\n1. Click your **avatar** in the navbar (top right)\n2. Select **My Orders** from the dropdown\n3. You'll see all orders with real-time status:\n\n🟡 **Pending** — order just placed\n🔵 **Processing** — being prepared by the farmer\n📦 **Shipped** — on its way to you\n✅ **Delivered** — order complete\n❌ **Cancelled** — if applicable\n\nYou can also filter by status. Your order ID (e.g. PDS-48291) is shown in your confirmation screen.",
      smartReplies: ["What if my order is late?", "How do I return an item?", "Place a new order", "Go to marketplace"],
      link: { label: "View My Orders", to: "/orders" },
    },
  ],
  returns: [
    {
      text: "We stand behind every product. Here's our **Return & Refund policy**:\n\n📸 Report issues **within 48 hours** of delivery\n📧 Email us at **pds.agrihub@gmail.com** with photos of the issue\n🔄 We'll arrange a **replacement or refund** — whichever you prefer\n\nFor perishables, please inspect your delivery immediately on arrival. We can't accept returns on opened perishables after 24 hours.\n\nYour satisfaction is genuinely our top priority — we take every complaint seriously and respond within 24 hours.",
      smartReplies: ["How do I track my order?", "What's your email?", "I have a different issue", "Show me more products"],
    },
  ],
  security: [
    {
      text: "Your security on PDS Agri-Hub is handled with care:\n\n🔒 **Data encryption** — all data encrypted in transit (HTTPS/TLS)\n🛡️ **No card storage** — we never store payment card details on our servers\n🔑 **Strong passwords** — use 8+ characters with mixed types\n📱 **Two-factor auth (2FA)** — enable it in Profile → Settings\n🚨 **Login alerts** — get notified of new device sign-ins\n📧 **Phishing warning** — we'll NEVER ask for your password by email\n\nIf you suspect any security issue, email **pds.agrihub@gmail.com** immediately.",
      smartReplies: ["How do I enable 2FA?", "Is my payment safe?", "How do I change my password?", "Contact support"],
    },
  ],
  creator: [
    {
      text: "I'm **SY-DAVET**, an AI assistant created by **JJ Void Assistant** — built specifically for PDS Agri-Hub to make agricultural shopping as smooth and intelligent as possible.\n\nI was designed to:\n🖼️ Show you real product images\n💡 Give detailed, accurate answers\n🤝 Feel like chatting with a knowledgeable friend\n🔁 Never repeat myself unnecessarily\n\nJJ Void built me with deep knowledge of Nigerian agriculture, Pi Network payments, and e-commerce. I'm always improving — the more you chat, the better I get at helping you!",
      smartReplies: ["What can you do?", "Show me products", "How does Pi payment work?", "Tell me about PDS Agri-Hub"],
    },
  ],
  about: [
    {
      text: "**PDS Agri-Hub** is a premium agricultural marketplace powered by Pi Network. Here's our story:\n\n🌱 **Founded by** Pisydaveu & Co. with a mission to connect farmers directly to buyers\n🥧 **Pi-powered** — all transactions in Pi cryptocurrency, enabling borderless commerce\n🚀 **What we do** — Cut out middlemen so farmers earn more and buyers pay less\n🌍 **Who we serve** — Buyers and farmers across Nigeria, with pan-African ambitions\n🤖 **AI-supported** — I'm here to guide every step of your journey\n\nFrom a bag of rice to live cattle, from seeds to farm equipment — we've got it all, delivered to your door.",
      smartReplies: ["Show me what's available", "Who created SY-DAVET?", "How does Pi payment work?", "Start shopping"],
      link: { label: "Learn More — About Page", to: "/about" },
    },
  ],
  compliment: [
    {
      text: "Thank you — that really means a lot! 😊 I put a lot of effort into giving you accurate, helpful answers instead of generic responses.\n\nIs there anything else I can help you with? Whether it's finding a product, understanding Pi payments, tracking an order, or anything else about the marketplace — I'm all yours!",
      smartReplies: ["Show me popular products", "Help me find something", "How does checkout work?", "Show me categories"],
    },
    {
      text: "Appreciate it! 🙌 My goal is to feel less like a chatbot and more like a helpful friend who happens to know everything about this marketplace.\n\nWhat else can I do for you?",
      smartReplies: ["Show me best sellers", "What's new?", "Help me with my order", "Tell me a joke 😄"],
    },
  ],
  weather: [
    {
      text: "Ha — I'm an agricultural marketplace assistant, not a weather app! 😄 But I appreciate you testing me.\n\nIf you're asking because you want to know the best time to plant or harvest, I can actually help with that — just tell me what crop you're working with and your state/region in Nigeria, and I'll share general planting season guidance.\n\nOtherwise — what can I help you find on PDS Agri-Hub today?",
      smartReplies: ["Tell me about planting seasons", "Show me seeds", "Show me products", "What else can you do?"],
    },
  ],
  joke: [
    {
      text: "Okay, okay — here's one for you! 😄\n\n*Why did the scarecrow win an award?*\n...Because he was **outstanding in his field!** 🌾\n\nAlright, back to business — I'm a lot better at finding you fresh tomatoes than telling jokes. What can I actually help you with?",
      smartReplies: ["Show me vegetables 🥬", "Show me products", "How does Pi payment work?", "Another joke 😄"],
    },
    {
      text: "Sure! 🌽\n\n*Why don't farmers tell secrets on the farm?*\n...Because the **corn has ears**, the **potatoes have eyes**, and the **beans stalk!** 😂\n\nOkay, I'll stick to agriculture. What can I help you find?",
      smartReplies: ["Show me crops 🌾", "Show me vegetables", "Open marketplace", "You're funny 😄"],
    },
  ],
  default: [
    {
      text: "Hmm, that's an interesting one! I want to give you the most accurate answer, so let me ask — are you asking about:\n\n🛒 A specific **product** (rice, goat, honey, etc.)?\n💳 **Payments** or Pi Network?\n🚚 **Delivery** or shipping?\n📦 **An order** you've placed?\n🆘 Something else entirely?\n\nJust give me a bit more context and I'll nail it for you!",
      smartReplies: ["Show me products", "Help with payment", "Delivery question", "Order tracking"],
    },
    {
      text: "I want to make sure I get this right for you. Could you rephrase or give me a bit more detail? I'm very good at:\n\n🖼️ Showing product images\n💰 Explaining prices\n🛒 Cart and checkout help\n📦 Delivery and tracking\n\nWhat's on your mind?",
      smartReplies: ["Show me what's available", "Pi payment help", "I have an issue", "Just browsing"],
    },
  ],
};

function detectIntent(message: string): Intent {
  const m = message.toLowerCase();
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

const usedResponseMap = new Map<Intent, Set<number>>();

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const resp = getResponse('greeting');
    setMessages([{
      id: 'welcome',
      text: resp.text,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      smartReplies: resp.smartReplies,
      images: resp.images,
      link: resp.link,
    }]);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotResponse = useCallback((resp: BotResponse) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      text: resp.text,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      images: resp.images,
      smartReplies: resp.smartReplies,
      link: resp.link,
    }]);
  }, []);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;
    setInput('');
    setMessages(prev => [...prev, {
      id: Date.now().toString(36),
      text: msg,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setIsTyping(true);
    const intent = detectIntent(msg);
    await new Promise(r => setTimeout(r, 700 + Math.random() * 800));
    addBotResponse(getResponse(intent));
    setIsTyping(false);
  }, [input, isTyping, addBotResponse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleClear = () => {
    usedResponseMap.clear();
    const resp = getResponse('greeting');
    setMessages([{
      id: 'reset-' + Date.now(),
      text: resp.text,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      smartReplies: resp.smartReplies,
      images: resp.images,
      link: resp.link,
    }]);
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
      {/* Header */}
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
          <p className="text-gray-500 text-xs">by JJ Void • Online — responds instantly</p>
        </div>
        <button onClick={handleClear} className="p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-colors" title="New conversation">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Glow bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 left-1/3 w-72 h-72 bg-purple-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-56 h-56 bg-indigo-700/5 rounded-full blur-3xl" />
      </div>

      {/* Messages */}
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
                {/* Bubble */}
                <div className={`px-4 py-3 rounded-2xl text-sm space-y-1 ${
                  msg.isUser
                    ? 'bg-purple-600 text-white rounded-br-sm'
                    : 'bg-white/5 border border-white/8 text-gray-200 rounded-bl-sm'
                }`}>
                  {formatText(msg.text)}
                </div>

                {/* Images */}
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

                {/* Link button */}
                {msg.link && (
                  <button
                    onClick={() => navigate(msg.link!.to)}
                    className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 px-3 py-2 rounded-lg transition-all"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {msg.link.label}
                  </button>
                )}

                {/* Smart replies */}
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

        {/* Typing indicator */}
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

      {/* Quick prompts — show only at start */}
      {messages.length <= 1 && (
        <div className="px-4 sm:px-6 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-3 w-3 text-purple-400" />
            <span className="text-gray-500 text-xs font-medium">Try asking me</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Show me fresh vegetables 🥬", "What livestock do you have? 🐄", "Show me honey 🍯", "How do I pay with Pi?", "Tell me a joke 😄", "What products are available?"].map(p => (
              <button key={p} onClick={() => handleSend(p)} className="text-xs bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-600/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-all">
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
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
        <p className="text-center text-gray-700 text-[10px] mt-2">SY-DAVET by JJ Void Assistant • PDS Agri-Hub</p>
      </div>
    </div>
  );
}
