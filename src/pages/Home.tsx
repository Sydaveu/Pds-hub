import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Users, Package, Clock } from 'lucide-react';
import { ProductCard } from '../components/product-card/ProductCard';
import allProducts from '../lib/products';
import { CATEGORY_LIST } from '../lib/products';
import { getImageUrl } from '../lib/images';

const featuredProducts = allProducts.slice(0, 12);

const homeCategories = [
  { name: 'Vegetables', slug: 'vegetables', emoji: '\uD83E\uDD6C', desc: 'Fresh & organic' },
  { name: 'Fruits', slug: 'fruits', emoji: '\uD83C\uDF4E', desc: 'Tropical varieties' },
  { name: 'Livestock', slug: 'livestock', emoji: '\uD83D\uDC04', desc: 'Cattle & goats' },
  { name: 'Fishery', slug: 'fishery', emoji: '\uD83D\uDC1F', desc: 'Fresh seafood' },
  { name: 'Honey', slug: 'honey', emoji: '\uD83C\uDF6F', desc: 'Natural honey' },
  { name: 'Farm Tools', slug: 'tools', emoji: '\uD83D\uDD27', desc: 'Quality tools' },
  { name: 'Seeds', slug: 'seeds', emoji: '\uD83C\uDF31', desc: 'Quality seeds' },
  { name: 'Rice', slug: 'rice', emoji: '\uD83C\uDF3E', desc: 'Premium grains' },
];

const stats = [
  { value: '10K+', label: 'Trusted Farmers', icon: Users, color: 'from-purple-600 to-purple-800' },
  { value: '50K+', label: 'Products Available', icon: Package, color: 'from-amber-500 to-amber-700' },
  { value: '100%', label: 'Pi Payments', icon: ShoppingBag, color: 'from-purple-600 to-indigo-800' },
  { value: '24/7', label: 'AI Support', icon: Clock, color: 'from-indigo-600 to-purple-800' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3383a0084b0d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-black/40 to-indigo-900/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.2),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.1),transparent_60%)]" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              Powered by Pi Network
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              From Soil to Soul<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Powered by Pi</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover fresh, quality agricultural products from trusted farmers. Buy with Pi cryptocurrency — fast, secure, and borderless.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/marketplace"
                className="group flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/30"
              >
                Start Buying Now <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/categories"
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                Explore Categories
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating glow orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map(({ value, label, icon: Icon, color }) => (
            <motion.div key={label} variants={item}
              className="glass-card rounded-2xl border border-white/5 p-6 text-center hover:border-purple-500/20 transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Featured Products</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Handpicked quality products from our top-rated farmers</p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProducts.map(product => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} className="hover:-translate-y-1 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Browse All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-gray-400">Three simple steps to get fresh produce delivered</p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { step: '01', icon: '🔍', title: 'Browse & Select', desc: 'Explore our marketplace and find exactly what you need from trusted farmers.' },
            { step: '02', icon: '🥧', title: 'Buy with Pi', desc: 'Secure checkout using Pi Network cryptocurrency — fast, low-fee, and borderless.' },
            { step: '03', icon: '📦', title: 'Get Delivered', desc: 'Your products are carefully packaged and delivered fresh to your doorstep.' },
          ].map(({ step, icon, title, desc }) => (
            <motion.div key={step} variants={item} className="glass-card rounded-2xl border border-white/5 p-8 text-center hover:border-purple-500/20 transition-all">
              <div className="relative mb-5">
                <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                  {icon}
                </div>
                <span className="absolute top-0 right-1/3 text-xs font-bold text-purple-400/60">{step}</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Shop by Category</h2>
          <p className="text-gray-400">Find everything you need organized by agricultural categories</p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {homeCategories.map(cat => (
            <motion.div key={cat.slug} variants={item}>
              <Link
                to={`/categories?type=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl h-36 flex flex-col items-center justify-center text-center glass-card border border-white/5 hover:border-purple-500/30 transition-all"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-15 transition-all duration-500 group-hover:opacity-25 group-hover:scale-110"
                  style={{ backgroundImage: `url(${getImageUrl(cat.slug)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                  <div className="text-3xl mb-1">{cat.emoji}</div>
                  <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{cat.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-800 to-indigo-900 border border-purple-500/20 p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.3),transparent_70%)]" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">🌾</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Buying?</h2>
            <p className="text-purple-200 max-w-xl mx-auto mb-8">
              Join thousands of buyers already using PDS Agri-Hub to source quality agricultural products with Pi.
            </p>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-4 px-10 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/30"
            >
              Explore Marketplace <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
