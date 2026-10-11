import React from 'react';
import { WolfLogo } from './WolfLogo';
import { Instagram, Music2, MessageCircle, MapPin, ShieldCheck, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'inicio' | 'catalogo' | 'estudio' | 'checkout') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-950 text-white border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <WolfLogo size="lg" theme="dark" />
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              WOLF RF es un taller y plataforma de co-creación de productos y combos personalizados en Cartagena de Indias. Diseñamos con algodón peinado colombiano, cerámica de alta densidad y tecnología DTF de alta resolución.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-300" />
                Cartagena de Indias, Colombia
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-300" />
                Garantía 100%
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-white transition-colors"
                >
                  Inicio / Experiencia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-white transition-colors"
                >
                  Catálogo de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estudio')}
                  className="hover:text-white transition-colors"
                >
                  Estudio de Co-Creación
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('checkout')}
                  className="hover:text-white transition-colors"
                >
                  Checkout & Anticipo 50%
                </button>
              </li>
            </ul>
          </div>

          {/* Combos Destacados */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Combos WOLF
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('estudio')}
                  className="hover:text-white transition-colors text-left"
                >
                  Camiseta + Tote Bag
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estudio')}
                  className="hover:text-white transition-colors text-left"
                >
                  Llavero + Mug Cerámico
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estudio')}
                  className="hover:text-white transition-colors text-left"
                >
                  Mug + Camiseta Custom
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estudio')}
                  className="hover:text-white transition-colors text-left"
                >
                  Caja de Regalo Exclusiva
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto & Social */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Atención & Redes
            </h4>
            <p className="text-xs text-stone-400">
              Escríbenos directamente para asesoría de diseño personalizada:
            </p>
            <div className="space-y-1.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>+57 300 892 4156 (WhatsApp Taller)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>contacto@wolfrf.co</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Instagram de WOLF"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="TikTok de WOLF"
              >
                <Music2 className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/573008924156"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 hover:bg-emerald-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="WhatsApp directo"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-stone-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} WOLF RF. Todos los derechos reservados. Cartagena de Indias, Colombia.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 cursor-pointer">
              Términos del Servicio
            </span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">
              Política de Tratamiento de Datos (Ley 1581)
            </span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">
              Garantías & Devoluciones
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
