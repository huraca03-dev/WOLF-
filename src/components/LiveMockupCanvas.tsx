import React from 'react';
import { ProductType, CustomizationConfig } from '../types';

interface LiveMockupCanvasProps {
  productType: ProductType;
  config: CustomizationConfig;
  className?: string;
  showLabels?: boolean;
}

export const LiveMockupCanvas: React.FC<LiveMockupCanvasProps> = ({
  productType,
  config,
  className = '',
  showLabels = true,
}) => {
  const {
    baseColor,
    customText,
    fontFamily,
    fontSize,
    textColor,
    uploadedImageUrl,
    selectedThemeId,
    placement,
  } = config;

  // Font class resolver
  const getFontFamilyStyle = () => {
    switch (fontFamily) {
      case 'serif':
        return "'Playfair Display', Georgia, serif";
      case 'urban':
        return "'Space Grotesk', -apple-system, sans-serif";
      case 'sans':
      default:
        return "'Plus Jakarta Sans', system-ui, sans-serif";
    }
  };

  const isDarkBase = baseColor === '#18181B' || baseColor === '#111111';

  // Render graphic themes
  const renderThemeGraphic = () => {
    const strokeCol = textColor;
    if (selectedThemeId === 'spotify') {
      return (
        <div className="flex flex-col items-center justify-center p-2 rounded max-w-full">
          {/* Spotify Waveform Bars Simulation */}
          <div className="flex items-center gap-1 my-1">
            <span className="text-[10px] font-bold tracking-widest mr-1 opacity-80" style={{ color: strokeCol }}>
              SPOTIFY CODE
            </span>
            {[18, 28, 12, 34, 22, 10, 26, 38, 16, 30, 24, 14, 32, 20, 10, 26].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full transition-all"
                style={{ height: `${h}px`, backgroundColor: strokeCol }}
              />
            ))}
          </div>
          <div className="text-[11px] font-medium tracking-tight mt-0.5 opacity-90" style={{ color: strokeCol }}>
            ♪ Our Favorite Track
          </div>
        </div>
      );
    }

    if (selectedThemeId === 'anniversary') {
      return (
        <div className="flex flex-col items-center justify-center p-1">
          <svg className="w-10 h-10 mb-1" viewBox="0 0 24 24" fill="none" stroke={strokeCol} strokeWidth="1.6">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: strokeCol }}>
            Cartagena · 10.11.2024
          </span>
        </div>
      );
    }

    if (selectedThemeId === 'minimal_line') {
      return (
        <div className="flex flex-col items-center justify-center p-1">
          <svg className="w-12 h-12" viewBox="0 0 40 40" fill="none" stroke={strokeCol} strokeWidth="1.4">
            <circle cx="20" cy="18" r="10" strokeDasharray="3 2" />
            <path d="M12 28 C15 22, 25 22, 28 28" />
            <path d="M20 8 L20 28" />
            <circle cx="20" cy="15" r="3" fill={strokeCol} />
          </svg>
        </div>
      );
    }

    if (selectedThemeId === 'motivational') {
      return (
        <div className="flex flex-col items-center justify-center text-center p-1">
          <span className="text-[9px] uppercase tracking-widest font-bold opacity-75" style={{ color: strokeCol }}>
            — WOLF COLLECTIVE —
          </span>
          <span className="text-xs font-black tracking-tighter uppercase" style={{ color: strokeCol }}>
            MAKE YOUR OWN RULES
          </span>
        </div>
      );
    }

    if (selectedThemeId === 'birthday') {
      return (
        <div className="flex flex-col items-center justify-center text-center border px-3 py-1.5 rounded" style={{ borderColor: strokeCol }}>
          <span className="text-[8px] uppercase tracking-wider font-semibold" style={{ color: strokeCol }}>
            LIMITED EDITION
          </span>
          <span className="text-xs font-black" style={{ color: strokeCol }}>
            SINCE 1998
          </span>
        </div>
      );
    }

    return null;
  };

  // Printable overlay content
  const renderPrintableContent = () => {
    const fontSizeMap = {
      sm: 'text-xs',
      md: 'text-sm md:text-base',
      lg: 'text-base md:text-lg font-bold',
    };

    return (
      <div className="flex flex-col items-center justify-center max-w-[85%] text-center pointer-events-none select-none z-10 p-2">
        {/* Uploaded User Photo if exists */}
        {uploadedImageUrl && (
          <div className="relative mb-2 max-w-[130px] max-h-[120px] rounded overflow-hidden shadow-sm border border-black/10">
            <img
              src={uploadedImageUrl}
              alt="Tu foto personalizada"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Selected Theme Graphic */}
        {!uploadedImageUrl && selectedThemeId && renderThemeGraphic()}

        {/* Custom Text Phrase */}
        {customText && (
          <div
            className={`mt-1 font-medium transition-all ${fontSizeMap[fontSize]}`}
            style={{
              fontFamily: getFontFamilyStyle(),
              color: textColor,
              textShadow: isDarkBase && textColor === '#FFFFFF' ? '0 1px 2px rgba(0,0,0,0.5)' : undefined,
              lineHeight: 1.25,
            }}
          >
            {customText}
          </div>
        )}

        {!uploadedImageUrl && !selectedThemeId && !customText && (
          <div
            className="text-[11px] font-medium tracking-wide uppercase px-2 py-1 border border-dashed rounded opacity-75"
            style={{ borderColor: textColor, color: textColor }}
          >
            Tu diseño aquí
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative flex flex-col items-center justify-center w-full aspect-square bg-[#F7F5F2] rounded-2xl p-6 overflow-hidden border border-[#E8DFD8] shadow-inner ${className}`}>
      {/* Background Studio Lighting Effect */}
      <div className="absolute inset-0 bg-radial from-white/90 via-transparent to-black/5 pointer-events-none" />

      {/* T-SHIRT MOCKUP */}
      {productType === 'tshirt' && (
        <div className="relative w-full max-w-[290px] h-full max-h-[290px] flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-md transition-all duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* T-Shirt Silhouette */}
            <path
              d="M 65 30 
                 C 75 42, 125 42, 135 30 
                 L 175 52 
                 L 155 86 
                 L 138 74 
                 L 142 178 
                 C 142 182, 138 184, 134 184 
                 L 66 184 
                 C 62 184, 58 182, 58 178 
                 L 62 74 
                 L 45 86 
                 L 25 52 
                 Z"
              fill={baseColor}
              stroke={isDarkBase ? '#3F3F46' : '#D1D5DB'}
              strokeWidth="2"
            />
            {/* Collar Ribbing */}
            <path
              d="M 65 30 C 75 42, 125 42, 135 30 C 122 36, 78 36, 65 30 Z"
              fill={isDarkBase ? '#27272A' : '#E5E7EB'}
              stroke={isDarkBase ? '#52525B' : '#9CA3AF'}
              strokeWidth="1.2"
            />
            {/* Sleeve Folds & Shadow details */}
            <path d="M 45 86 L 62 74" stroke={isDarkBase ? '#27272A' : '#E5E7EB'} strokeWidth="1.5" />
            <path d="M 155 86 L 138 74" stroke={isDarkBase ? '#27272A' : '#E5E7EB'} strokeWidth="1.5" />
            <path d="M 60 176 L 140 176" stroke={isDarkBase ? '#27272A' : '#E5E7EB'} strokeWidth="1" strokeDasharray="3 3" />
          </svg>

          {/* Printable Area Placement */}
          <div
            className={`absolute flex items-center justify-center transition-all ${
              placement === 'pocket'
                ? 'top-[36%] right-[28%] w-[60px]'
                : placement === 'large'
                ? 'top-[34%] w-[150px]'
                : 'top-[35%] w-[130px]'
            }`}
          >
            {renderPrintableContent()}
          </div>
        </div>
      )}

      {/* MUG MOCKUP */}
      {productType === 'mug' && (
        <div className="relative w-full max-w-[270px] h-full max-h-[270px] flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-md transition-all duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mug Handle */}
            <path
              d="M 140 70 
                 C 178 70, 178 135, 140 135
                 L 140 120
                 C 162 120, 162 85, 140 85 Z"
              fill={baseColor}
              stroke={isDarkBase ? '#3F3F46' : '#D1D5DB'}
              strokeWidth="2.5"
            />
            {/* Mug Cylinder Body */}
            <path
              d="M 50 55 
                 L 140 55 
                 C 140 145, 138 160, 130 165
                 C 122 170, 68 170, 60 165
                 C 52 160, 50 145, 50 55 Z"
              fill={baseColor}
              stroke={isDarkBase ? '#3F3F46' : '#D1D5DB'}
              strokeWidth="2"
            />
            {/* Mug Top Rim Opening (Elliptical depth) */}
            <ellipse
              cx="95"
              cy="55"
              rx="45"
              ry="11"
              fill={isDarkBase ? '#27272A' : '#E5E7EB'}
              stroke={isDarkBase ? '#52525B' : '#9CA3AF'}
              strokeWidth="1.5"
            />
            {/* Gloss Reflection Highlight */}
            <path
              d="M 56 68 L 56 150"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              opacity={isDarkBase ? '0.2' : '0.6'}
            />
          </svg>

          {/* Printable Area on Mug Front */}
          <div className="absolute top-[38%] left-[23%] w-[115px] flex items-center justify-center">
            {renderPrintableContent()}
          </div>
        </div>
      )}

      {/* TOTE BAG MOCKUP */}
      {productType === 'totebag' && (
        <div className="relative w-full max-w-[270px] h-full max-h-[270px] flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-md transition-all duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Long Shoulder Straps */}
            <path
              d="M 75 75 
                 C 75 20, 125 20, 125 75"
              fill="none"
              stroke={isDarkBase ? '#27272A' : '#D7C4B7'}
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Bag Body Rectangle with soft bottom taper */}
            <path
              d="M 45 75 
                 L 155 75 
                 L 150 180 
                 C 150 184, 146 186, 140 186
                 L 60 186 
                 C 54 186, 50 184, 50 180 
                 Z"
              fill={baseColor}
              stroke={isDarkBase ? '#3F3F46' : '#C4B5A5'}
              strokeWidth="2"
            />
            {/* Strap Stitching onto bag */}
            <line x1="75" y1="75" x2="75" y2="105" stroke={isDarkBase ? '#3F3F46' : '#B8A898'} strokeWidth="4" />
            <line x1="125" y1="75" x2="125" y2="105" stroke={isDarkBase ? '#3F3F46' : '#B8A898'} strokeWidth="4" />
            {/* Bottom seam */}
            <line x1="50" y1="180" x2="150" y2="180" stroke={isDarkBase ? '#3F3F46' : '#D7C4B7'} strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>

          {/* Printable Area Center of Tote Bag */}
          <div className="absolute top-[48%] w-[125px] flex items-center justify-center">
            {renderPrintableContent()}
          </div>
        </div>
      )}

      {/* KEYCHAIN MOCKUP */}
      {productType === 'keychain' && (
        <div className="relative w-full max-w-[250px] h-full max-h-[250px] flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-md transition-all duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Key Ring & Chain Link */}
            <circle cx="100" cy="35" r="18" stroke="#71717A" strokeWidth="4" fill="none" />
            <circle cx="100" cy="35" r="14" stroke="#A1A1AA" strokeWidth="1.5" fill="none" />
            <line x1="100" y1="53" x2="100" y2="70" stroke="#71717A" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="74" r="5" stroke="#71717A" strokeWidth="3" fill="#D4D4D8" />
            {/* Acrylic Pendant Body */}
            <rect
              x="55"
              y="85"
              width="90"
              height="95"
              rx="14"
              fill={baseColor}
              stroke={isDarkBase ? '#3F3F46' : '#CBD5E1'}
              strokeWidth="3"
            />
            {/* Top hole in acrylic */}
            <circle cx="100" cy="98" r="4" fill="#94A3B8" />
            {/* Acrylic Bevel Highlight */}
            <rect
              x="58"
              y="88"
              width="84"
              height="89"
              rx="11"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              opacity="0.4"
            />
          </svg>

          {/* Printable Area on Keychain */}
          <div className="absolute top-[52%] w-[80px] flex items-center justify-center">
            {renderPrintableContent()}
          </div>
        </div>
      )}

      {/* PUZZLE MOCKUP */}
      {productType === 'puzzle' && (
        <div className="relative w-full max-w-[270px] h-full max-h-[270px] flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-md transition-all duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Puzzle Base Board */}
            <rect
              x="30"
              y="45"
              width="140"
              height="110"
              rx="6"
              fill={baseColor}
              stroke="#D4D4D8"
              strokeWidth="2"
            />
            {/* Subtle Puzzle Grid Interlocks */}
            <path
              d="M 65 45 L 65 75 C 60 77, 60 85, 65 87 L 65 115 C 70 117, 70 125, 65 127 L 65 155
                 M 100 45 L 100 68 C 105 70, 105 78, 100 80 L 100 120 C 95 122, 95 130, 100 132 L 100 155
                 M 135 45 L 135 80 C 140 82, 140 90, 135 92 L 135 155
                 M 30 80 L 70 80 C 72 85, 80 85, 82 80 L 120 80 C 122 75, 130 75, 132 80 L 170 80
                 M 30 120 L 60 120 C 62 115, 70 115, 72 120 L 110 120 C 112 125, 120 125, 122 120 L 170 120"
              stroke={isDarkBase ? '#3F3F46' : '#E2E8F0'}
              strokeWidth="1.2"
              fill="none"
            />
          </svg>

          {/* Printable Area on Puzzle */}
          <div className="absolute top-[32%] w-[130px] flex items-center justify-center">
            {renderPrintableContent()}
          </div>
        </div>
      )}

      {/* Real-time Indicator Tag at corner */}
      {showLabels && (
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] font-medium text-stone-600 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-stone-200 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
          <span>Vista Previa en Vivo 1:1</span>
        </div>
      )}
    </div>
  );
};
