import React from 'react';
import { HERO_BANNER_IMG, COMBOS } from '../data/mockData';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { ComboOption } from '../types';

interface HeroSectionProps {
  onStartCoCreation: (combo?: ComboOption) => void;
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCoCreation,
  onExploreCatalog,
}) => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Editorial Hero Split Grid */}
      <section className="relative overflow-hidden pt-6 md:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Subtle Unboxed Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-stone-600 uppercase">
                <span>Cartagena de Indias</span>
                <span aria-hidden="true">·</span>
                <span>Taller de Co-Creación & Estampado DTF</span>
                <span aria-hidden="true">·</span>
                <span>Edición Limitada</span>
              </div>

              {/* Display Headline without orphans */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.08] [text-wrap:balance]">
                Ideas que se imprimen con identidad y lujo minimalista.
              </h1>

              {/* Subtitle Prose */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                Diseña camisetas 100% algodón, mugs cerámicos y tote bags con nuestro configurador en tiempo real. 
                Arma combos exclusivos, abona solo el <strong className="text-stone-950 font-semibold">50% de anticipo</strong> y recibe tu empaque de regalo listo para sorprender.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onStartCoCreation()}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-sm font-semibold tracking-wide uppercase rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Co-Crear mi Combo Ahora</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={onExploreCatalog}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-[#F5F0EB] hover:bg-[#E8DFD8] text-stone-900 text-sm font-semibold tracking-wide rounded-xl transition-all border border-[#E8DFD8]"
                >
                  Ver Catálogo Individual
                </button>
              </div>

              {/* Quiet Micro Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-stone-800 shrink-0" />
                  <span>Garantía de Satisfacción 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-stone-800 shrink-0" />
                  <span>Anticipo 50% con Nequi / PSE / Daviplata</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-800 shrink-0" />
                  <span>Elaboración récord en 24-48 horas</span>
                </div>
              </div>
            </div>

            {/* Right Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] lg:aspect-[1/1] rounded-2xl overflow-hidden border border-[#E8DFD8] shadow-lg group bg-[#F5F0EB]">
                <img
                  src={HERO_BANNER_IMG}
                  alt="Colección y combos personalizados WOLF RF"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Visual Card Overlay Tag */}
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-200">
                      Colección Estudio 2026
                    </span>
                    <h3 className="text-lg font-bold">WOLF RF Signature Box</h3>
                  </div>
                  <span className="text-xs bg-white text-stone-950 font-bold px-3 py-1 rounded-md shadow-xs">
                    Desde $40.000 COP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Value Pillars Strip */}
      <section className="border-y border-[#E8DFD8] bg-[#F5F0EB]/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Pilar 01
              </span>
              <h3 className="text-lg font-bold text-stone-950">
                Lienzo Virtual de Co-Creación
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Sube tu fotografía, elige frases personalizadas, códigos de canciones o temáticas de autor y visualízalo en vivo en la prenda antes de imprimir.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Pilar 02
              </span>
              <h3 className="text-lg font-bold text-stone-950">
                Flexibilidad con 50% de Anticipo
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Iniciamos producción de tu pedido personalizado con sólo el 50% del valor. El saldo restante lo abonas al recibir tu paquete o previo al despacho.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Pilar 03
              </span>
              <h3 className="text-lg font-bold text-stone-950">
                Empaque de Lujo para Regalar
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Cada detalle cuenta: caja rígida negro mate, lazo de satén y tarjeta caligráfica con tu mensaje personal para ocasiones inolvidables.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Combos Showcase (Quick Start Selector) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Combos Oficiales WOLF
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight mt-1">
              Selecciona tu combo favorito y personalízalo
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Ahorra dinero combinando productos complementarios con acabado uniforme y empaque listo para regalo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-2xl border border-[#E8DFD8] p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 relative group"
            >
              {combo.popular && (
                <div className="absolute -top-3 right-6 bg-stone-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  Más Popular
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Ahorras ${(combo.savings).toLocaleString('es-CO')} COP
                  </span>
                  <h3 className="text-xl font-bold text-stone-950 pt-2">
                    {combo.name}
                  </h3>
                  <p className="text-sm text-stone-600">
                    {combo.tagline}
                  </p>
                </div>

                {/* Items included list */}
                <div className="bg-[#FAF8F5] rounded-xl p-3.5 space-y-2 border border-[#E8DFD8]/60">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Incluye 2 piezas:
                  </div>
                  {combo.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-black text-stone-950 tabular-nums">
                    ${combo.price.toLocaleString('es-CO')} COP
                  </span>
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ${combo.originalPrice.toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onStartCoCreation(combo)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#111111] hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalizar este Combo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
