import React from 'react';
import { REVIEWS } from '../data/mockData';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="bg-white border-y border-[#E8DFD8] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
            Experiencias Reales de Co-Creación
          </h2>
          <p className="text-sm text-stone-600">
            Más de 850 combos y piezas individuales entregadas en Cartagena con una calificación promedio de 4.9/5 estrellas.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8DFD8] flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow"
            >
              <div className="space-y-3">
                {/* Rating stars & verified tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-stone-800" />
                    {rev.tag}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DFD8]/70 space-y-1">
                <div className="text-xs font-bold text-stone-950">
                  {rev.name}
                </div>
                <div className="text-[11px] text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{rev.location}</span>
                  <span>·</span>
                  <span>{rev.date}</span>
                </div>
                <div className="text-[10px] font-medium text-stone-800 bg-white/70 px-2 py-0.5 rounded border border-[#E8DFD8] inline-block mt-1">
                  {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
