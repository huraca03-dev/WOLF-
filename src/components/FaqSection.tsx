import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-widest">
          <HelpCircle className="w-4 h-4 text-stone-700" />
          <span>Resolución de Dudas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
          Preguntas Frecuentes
        </h2>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Todo lo que necesitas saber sobre nuestros procesos de estampado en Cartagena, tiempos de entrega y garantía.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-stone-950 hover:bg-[#FAF8F5] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-stone-950' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-[#E8DFD8]/60 bg-[#FAF8F5]/50 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
