import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Product, CustomizationConfig } from '../types';
import { ShoppingBag, Eye, Sparkles, Check, Plus, Minus, X } from 'lucide-react';
import { LiveMockupCanvas } from './LiveMockupCanvas';

interface ProductCatalogProps {
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedSize?: string,
    selectedColorHex?: string,
    selectedColorName?: string
  ) => void;
  onCustomizeInStudio: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  onCustomizeInStudio,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, { hex: string; name: string }>>({});
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);

  const getQuantity = (id: string) => quantities[id] || 1;
  const setQuantity = (id: string, qty: number) => {
    if (qty >= 1 && qty <= 50) {
      setQuantities((prev) => ({ ...prev, [id]: qty }));
    }
  };

  const getSelectedSize = (product: Product) => {
    if (!product.sizes || product.sizes.length === 0) return undefined;
    return selectedSizes[product.id] || product.sizes[0];
  };

  const getSelectedColor = (product: Product) => {
    if (selectedColors[product.id]) return selectedColors[product.id];
    return { hex: product.colors[0].hex, name: product.colors[0].name };
  };

  const handleAdd = (product: Product) => {
    const qty = getQuantity(product.id);
    const size = getSelectedSize(product);
    const color = getSelectedColor(product);
    onAddToCart(product, qty, size, color.hex, color.name);

    setAddedFeedback(product.id);
    setTimeout(() => {
      setAddedFeedback(null);
    }, 2200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD8] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest">
            <span>Colección Oficial</span>
            <span aria-hidden="true">·</span>
            <span>Piezas Individuales</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-1">
            Catálogo de Productos
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            Prendas y objetos de autor diseñados con materias primas de primera línea. Elige tus piezas individuales con estampados de alta fidelidad.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Mostrando 5 artículos listos para personalizar
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => {
          const currentColor = getSelectedColor(product);
          const currentSize = getSelectedSize(product);
          const qty = getQuantity(product.id);
          const isJustAdded = addedFeedback === product.id;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[4/3] bg-[#F5F0EB] overflow-hidden border-b border-[#E8DFD8]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm hover:bg-white text-stone-900 rounded-full shadow-xs transition-colors"
                  title="Vista rápida del producto"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Material Tag */}
                <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                  {product.material.split('+')[0]}
                </div>
              </div>

              {/* Product Info & Controls */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-stone-950 tracking-tight leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-1 flex items-baseline justify-between">
                    <span className="text-xl font-extrabold text-stone-950 tabular-nums">
                      ${product.price.toLocaleString('es-CO')} COP
                    </span>
                    <span className="text-xs text-stone-500">
                      {product.dimensions || 'Disponible en inventario'}
                    </span>
                  </div>
                </div>

                {/* Variant Selectors: Colors */}
                <div className="space-y-3 pt-2 border-t border-[#E8DFD8]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">Color Base:</span>
                    <span className="text-stone-500 text-[11px]">{currentColor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() =>
                          setSelectedColors((prev) => ({
                            ...prev,
                            [product.id]: { hex: c.hex, name: c.name },
                          }))
                        }
                        className={`w-6 h-6 rounded-full border transition-all ${
                          currentColor.hex === c.hex
                            ? 'ring-2 ring-stone-950 ring-offset-2 scale-110'
                            : 'border-stone-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.name}
                      />
                    ))}
                  </div>

                  {/* Sizes (if t-shirt) */}
                  {product.sizes && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-700">Talla:</span>
                        <span className="text-stone-500 text-[11px]">{currentSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [product.id]: sz,
                              }))
                            }
                            className={`flex-1 py-1 text-xs font-semibold rounded-md border transition-all ${
                              currentSize === sz
                                ? 'bg-stone-950 text-white border-stone-950'
                                : 'bg-[#FAFAFA] text-stone-700 border-[#E8DFD8] hover:bg-[#F5F0EB]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity and Actions */}
                  <div className="pt-2 flex items-center gap-3">
                    <div className="flex items-center border border-[#E8DFD8] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => setQuantity(product.id, qty - 1)}
                        className="p-2 text-stone-600 hover:text-stone-950"
                        disabled={qty <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-stone-900 tabular-nums">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQuantity(product.id, qty + 1)}
                        className="p-2 text-stone-600 hover:text-stone-950"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        isJustAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-950 hover:bg-stone-800 text-white shadow-xs'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>¡Agregado!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Añadir a Bolsa</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Secondary CTA: Customize in studio */}
                  <button
                    onClick={() => onCustomizeInStudio(product)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-stone-800 bg-[#F5F0EB] hover:bg-[#E8DFD8] rounded-lg transition-colors border border-[#E8DFD8]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                    <span>Personalizar diseño de esta pieza</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#E8DFD8] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#F5F0EB] border border-[#E8DFD8]">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                    WOLF Signature Series
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-950 mt-1">
                    {quickViewProduct.name}
                  </h3>
                  <div className="text-2xl font-black text-stone-950 mt-1 tabular-nums">
                    ${quickViewProduct.price.toLocaleString('es-CO')} COP
                  </div>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8DFD8] space-y-1 text-xs text-stone-700">
                  <div><strong>Material:</strong> {quickViewProduct.material}</div>
                  <div><strong>Especificación:</strong> {quickViewProduct.dimensions || 'Estándar'}</div>
                  <div><strong>Técnica:</strong> Impresión DTF textil & Curado térmico</div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      handleAdd(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    Añadir al Carrito
                  </button>
                  <button
                    onClick={() => {
                      const p = quickViewProduct;
                      setQuickViewProduct(null);
                      onCustomizeInStudio(p);
                    }}
                    className="py-3 px-4 bg-[#F5F0EB] hover:bg-[#E8DFD8] text-stone-900 text-xs font-bold rounded-xl transition-all"
                  >
                    Ir al Estudio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
