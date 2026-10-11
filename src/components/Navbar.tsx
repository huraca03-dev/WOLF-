import React, { useState } from 'react';
import { WolfLogo } from './WolfLogo';
import { ShoppingBag, Search, Sparkles, X, Menu } from 'lucide-react';

interface NavbarProps {
  activeTab: 'inicio' | 'catalogo' | 'estudio' | 'checkout';
  setActiveTab: (tab: 'inicio' | 'catalogo' | 'estudio' | 'checkout') => void;
  cartItemCount: number;
  openSearchModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartItemCount,
  openSearchModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'inicio' | 'catalogo' | 'estudio' | 'checkout') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E8DFD8] transition-all">
      {/* Top Bar One-Row Three-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Element Brand Wordmark */}
        <div
          onClick={() => handleNavClick('inicio')}
          className="cursor-pointer whitespace-nowrap shrink-0 flex items-center"
        >
          <WolfLogo size="md" theme="light" />
        </div>

        {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => handleNavClick('inicio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'inicio'
                ? 'text-stone-950 font-semibold'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            Inicio
            {activeTab === 'inicio' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-950 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('catalogo')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'catalogo'
                ? 'text-stone-950 font-semibold'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            Catálogo
            {activeTab === 'catalogo' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-950 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('estudio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'estudio'
                ? 'text-stone-950 font-semibold'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-950" />
            <span>Arma tu Combo</span>
            {activeTab === 'estudio' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-950 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('checkout')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'checkout'
                ? 'text-stone-950 font-semibold'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            Checkout & Anticipo
            {activeTab === 'checkout' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-950 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Simulated Search Button */}
          <button
            onClick={openSearchModal}
            aria-label="Buscar productos o combos"
            className="p-2.5 text-stone-600 hover:text-stone-950 hover:bg-[#F5F0EB] rounded-full transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Primary CTA Button with interactive count badge */}
          <button
            onClick={() => handleNavClick('checkout')}
            aria-label="Ver carrito de compras"
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-all shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bolsa</span>
            <span className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#E8DFD8] text-stone-950 font-bold text-[11px] tabular-nums">
              {cartItemCount}
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFD8] bg-[#FFFFFF] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('inicio')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'inicio' ? 'bg-[#F5F0EB] text-stone-950 font-semibold' : 'text-stone-700'
            }`}
          >
            Inicio / Experiencia WOLF
          </button>
          <button
            onClick={() => handleNavClick('catalogo')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'catalogo' ? 'bg-[#F5F0EB] text-stone-950 font-semibold' : 'text-stone-700'
            }`}
          >
            Catálogo de Productos
          </button>
          <button
            onClick={() => handleNavClick('estudio')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              activeTab === 'estudio' ? 'bg-[#F5F0EB] text-stone-950 font-semibold' : 'text-stone-700'
            }`}
          >
            <span>Estudio: Arma tu Combo</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-950 text-white px-2 py-0.5 rounded">
              Nuevo
            </span>
          </button>
          <button
            onClick={() => handleNavClick('checkout')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              activeTab === 'checkout' ? 'bg-[#F5F0EB] text-stone-950 font-semibold' : 'text-stone-700'
            }`}
          >
            <span>Checkout / Carrito de Pago</span>
            <span className="text-xs font-semibold text-stone-950">
              {cartItemCount} items
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
