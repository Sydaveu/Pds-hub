# Replit AI — Full PDS Agri-Hub Setup

## Project: PDS Agri-Hub

A Pi Network agricultural marketplace (BUYING ONLY — no selling). Vite + React 19 + TypeScript 6 + Tailwind CSS v4.

**GitHub repo:** https://github.com/Sydaveu/Pds-hub.git

Import this repo into Replit, then tell Replit AI to do everything below.

---

## What You Need To Do (Full Automation)

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Create a Supabase Project
Use Replit's built-in Supabase integration to create a new Supabase project. Set up:
- PostgreSQL database
- Authentication (email/password)
- Storage bucket `avatars` (public)
- Auto-fill the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` into Replit Secrets

### 3. Database Schema (Run in Supabase SQL Editor)

Create these tables with full Row Level Security (RLS):

**profiles** — id (uuid PK, ref auth.users), username (text unique), email, avatar_url, animated_avatar, member_since, total_orders, total_spent, preferred_category, created_at, updated_at

**categories** — id (uuid PK), name, slug (unique), description, image_url, icon, product_count

**products** — id (uuid PK), name, price (numeric), image, gallery (jsonb), category_id (ref categories), description, rating, reviews, stock, unit, origin, is_featured, created_at

**cart_items** — id (uuid PK), user_id (ref auth.users), product_id (ref products), quantity, created_at — unique(user_id, product_id)

**orders** — id (uuid PK), user_id (ref auth.users), order_number (unique), status, total, shipping_name, shipping_phone, shipping_email, shipping_address, shipping_city, shipping_state, shipping_zip, tracking_number, created_at, updated_at

**order_items** — id (uuid PK), order_id (ref orders), product_id (ref products), product_name, product_price, quantity, unit

Seed the categories table with 16 rows: Crops, Rice, Beans, Yam, Cassava, Maize, Vegetables, Fruits, Livestock, Poultry, Fishery, Dairy, Honey, Farm Tools, Fertilizers, Seeds, Pets

Seed the products table with ~20 products matching the current mock data in Marketplace.tsx.

**RLS Policies:**
- profiles: SELECT anyone, UPDATE own only
- categories + products: SELECT anon + authenticated
- cart_items: CRUD own only (user_id = auth.uid())
- orders + order_items: SELECT + INSERT own only

### 4. Create Supabase Client

File: `src/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL!
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 5. Replace ALL Mock Data With Supabase Queries

Go through each file and swap hardcoded data for real DB calls:

**Home.tsx** — featuredProducts → `supabase.from('products').select('*').eq('is_featured', true).limit(4)`

**Marketplace.tsx** — allProducts → `supabase.from('products').select('*, categories(name)')` with real ilike search, category filter, price filter, sorting

**Categories.tsx** — categoriesData → `supabase.from('categories').select('*')`, products → `supabase.from('products').select('*').eq('category_id', id)`

**ProductDetails.tsx** — mockProducts[id] → `supabase.from('products').select('*').eq('id', id).single()`, related products by same category

**Cart.tsx** — mockCartItems → `supabase.from('cart_items').select('*, products(*)').eq('user_id', userId)`, implement add/update/remove via Supabase

**Checkout.tsx** — On confirm: insert into orders + order_items, clear cart, redirect

**Profile.tsx** — mockUser → `supabase.from('profiles').select('*').eq('id', userId).single()`, save edits via `.update()`, upload avatar to storage bucket

**Orders.tsx** — mockOrders → `supabase.from('orders').select('*, order_items(*)').eq('user_id', userId).order('created_at', { ascending: false })`, cancel via `.update({ status: 'cancelled' })`

### 6. Add Authentication

Create `src/lib/auth.tsx` with:
- AuthContext + AuthProvider (React context)
- signUp, signIn, signOut functions
- Auto-create profile row on signup
- onAuthStateChange listener
- `useAuth()` hook

Create `src/pages/Login.tsx`:
- Email + password form
- Toggle between Login / Sign Up
- Redirect to /home after success

Update `src/App.tsx`:
- Wrap with AuthProvider
- Protect /cart, /checkout, /profile, /orders (redirect to /login if not authed)

### 7. Fix Navbar

Update `Navbar.tsx` to show user avatar or Login link based on auth state.

---

## CRITICAL RULES — Do NOT Break These

1. **BUYING ONLY** — No seller dashboards, no "Sell" buttons, no product creation forms for users
2. **Pi prices** — All prices show the π symbol, stored as numeric, no USD conversion
3. **Dark theme** — Purple+gold glow, glassmorphism, animations — keep ALL existing styles
4. **No blank screens** — Keep LoadingFallback on every lazy route, add loading/error states for ALL data fetches
5. **SY-DAVET Assistant** — Keep the floating chat bot intact, do not remove or break it
6. **Mobile-first** — Preserve all responsive classes, don't break the layout
7. **Error Boundary** — Keep the ErrorBoundary wrapping the entire app
8. **Lazy loading** — Keep React.lazy + Suspense for all pages in App.tsx

## DO NOT Change

- tailwind.config.cjs
- index.css (tailwind v4 theme)
- vite.config.ts
- tsconfig files
- package.json scripts
- The AI assistant component (AiAssistant.tsx)
- ErrorBoundary.tsx
- LoadingFallback.tsx
- Layout.tsx (keep children prop pattern)

---

## Final Steps

- Add env vars to Replit Secrets: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
- Run `npm run build` — must have 0 errors
- Deploy on Replit using Replit's built-in deployment

## Verification

- [ ] `npm run build` passes with 0 TypeScript errors
- [ ] All 9 pages load with live Supabase data
- [ ] Login/Signup works
- [ ] Cart persists per user
- [ ] Checkout creates orders
- [ ] Profile edits and avatar uploads work
- [ ] Search and filters query real data
- [ ] No blank white screens ever
