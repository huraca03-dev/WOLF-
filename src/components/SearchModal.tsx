import React, { useState } from 'react';
import { PRODUCTS, COMBOS } from '../data/mockData';
import { Product, ComboOption } from '../types';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCombo: (combo: ComboOption) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCombo,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.material.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCombos = COMBOS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.tagline.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E8DFD8] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#E8DFD8] pb-4">
          <Search className="w-5 h-5 text-stone-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar camisetas, mugs, tote bags, combos, Spotify..."
            className="w-full text-base font-medium placeholder-stone-400 focus:outline-hidden text-stone-950"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-4">
          
          {/* Combos Matching */}
          {filteredCombos.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Combos de Co-Creación
              </span>
              <div className="grid grid-cols-1 gap-2">
                {filteredCombos.map((combo) => (
                  <div
                    key={combo.id}
                    onClick={() => {
                      onSelectCombo(combo);
                      onClose();
                    }}
                    className="p-3 bg-[#FAF8F5] hover:bg-[#F5F0EB] rounded-xl cursor-pointer border border-[#E8DFD8] flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-bold text-sm text-stone-950 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                        <span>{combo.name}</span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">{combo.tagline}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xs text-stone-950">
                        ${combo.price.toLocaleString('es-CO')}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        Ahorra ${combo.savings.toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual Products Matching */}
          {filteredProducts.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Productos Individuales
              </span>
              <div className="grid grid-cols-1 gap-2">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 bg-white hover:bg-[#FAF8F5] rounded-xl cursor-pointer border border-[#E8DFD8] flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-bold text-sm text-stone-950">{p.name}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{p.material}</div>
                    </div>
                    <div className="font-bold text-xs text-stone-950 tabular-nums">
                      ${p.price.toLocaleString('es-CO')} COP
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCombos.length === 0 && filteredProducts.length === 0 && (
            <div className="text-center py-8 text-xs text-stone-500">
              No se encontraron resultados para "{query}". Prueba buscando "Camiseta", "Mug" o "Combo".
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
