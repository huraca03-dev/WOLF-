import React, { useState, useRef } from 'react';
import { COMBOS, BASE_COLORS, TEXT_COLORS, FONT_OPTIONS, GRAPHIC_THEMES, GIFT_PACKAGING_OPTIONS } from '../data/mockData';
import { ComboOption, CustomizationConfig, GiftPackagingOption, ProductType, CartItem } from '../types';
import { LiveMockupCanvas } from './LiveMockupCanvas';
import { Upload, Type, Palette, Gift, Check, Sparkles, Image as ImageIcon, Sliders, AlertCircle } from 'lucide-react';

interface CoCreationStudioProps {
  initialCombo?: ComboOption;
  onAddComboToCart: (cartItem: CartItem) => void;
  onNavigateToCheckout: () => void;
}

export const CoCreationStudio: React.FC<CoCreationStudioProps> = ({
  initialCombo,
  onAddComboToCart,
  onNavigateToCheckout,
}) => {
  // Step navigation (1: Combo Selection, 2: Customization Canvas, 3: Gift Packaging)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCombo, setSelectedCombo] = useState<ComboOption>(initialCombo || COMBOS[0]);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  
  // Customization configurations for each piece of the combo
  const [customConfigs, setCustomConfigs] = useState<Record<number, CustomizationConfig>>({
    0: {
      productType: (initialCombo || COMBOS[0]).items[0].type,
      baseColor: '#18181B',
      baseColorName: 'Negro Ónix',
      customText: 'WOLF COLLECTIVE',
      fontFamily: 'urban',
      fontSize: 'md',
      textColor: '#FFFFFF',
      uploadedImageUrl: null,
      selectedThemeId: 'spotify',
      placement: 'center',
      sizeSelected: 'M',
    },
    1: {
      productType: (initialCombo || COMBOS[0]).items[1].type,
      baseColor: '#E8DFD8',
      baseColorName: 'Beige Arena',
      customText: 'Ideas que se imprimen',
      fontFamily: 'serif',
      fontSize: 'md',
      textColor: '#111111',
      uploadedImageUrl: null,
      selectedThemeId: null,
      placement: 'center',
      sizeSelected: 'M',
    },
  });

  // Gift packaging selection
  const [selectedPackaging, setSelectedPackaging] = useState<GiftPackagingOption>(GIFT_PACKAGING_OPTIONS[1]); // Default to Luxury Box
  const [giftCardMessage, setGiftCardMessage] = useState<string>('¡Feliz aniversario mi vida! Que este recuerdo sea tan especial como cada día contigo.');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Hidden file input ref for user image uploads
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update combo selection
  const handleSelectCombo = (combo: ComboOption) => {
    setSelectedCombo(combo);
    setActiveItemIndex(0);
    // Initialize configs for the combo items
    setCustomConfigs({
      0: {
        productType: combo.items[0].type,
        baseColor: combo.items[0].type === 'tshirt' ? '#18181B' : '#FFFFFF',
        baseColorName: combo.items[0].type === 'tshirt' ? 'Negro Ónix' : 'Blanco Nieve',
        customText: 'WOLF ARCHIVE',
        fontFamily: 'urban',
        fontSize: 'md',
        textColor: combo.items[0].type === 'tshirt' ? '#FFFFFF' : '#111111',
        uploadedImageUrl: null,
        selectedThemeId: 'spotify',
        placement: 'center',
        sizeSelected: 'M',
      },
      1: {
        productType: combo.items[1].type,
        baseColor: '#E8DFD8',
        baseColorName: 'Beige Arena',
        customText: 'Ideas que se imprimen',
        fontFamily: 'serif',
        fontSize: 'md',
        textColor: '#111111',
        uploadedImageUrl: null,
        selectedThemeId: null,
        placement: 'center',
        sizeSelected: 'M',
      },
    });
  };

  const currentItemConfig = customConfigs[activeItemIndex] || {
    productType: selectedCombo.items[activeItemIndex]?.type || 'tshirt',
    baseColor: '#18181B',
    baseColorName: 'Negro Ónix',
    customText: '',
    fontFamily: 'sans',
    fontSize: 'md',
    textColor: '#FFFFFF',
    uploadedImageUrl: null,
    selectedThemeId: null,
    placement: 'center',
  };

  const updateCurrentConfig = (updates: Partial<CustomizationConfig>) => {
    setCustomConfigs((prev) => ({
      ...prev,
      [activeItemIndex]: {
        ...prev[activeItemIndex],
        ...updates,
      },
    }));
  };

  // Real file upload reader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateCurrentConfig({
            uploadedImageUrl: event.target.result as string,
            selectedThemeId: null, // clear theme when custom photo uploaded
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinishCombo = () => {
    const comboCartItem: CartItem = {
      cartItemId: `combo-${Date.now()}`,
      isCombo: true,
      comboId: selectedCombo.id,
      comboTitle: selectedCombo.name,
      productType: selectedCombo.items[0].type,
      price: selectedCombo.price,
      quantity: 1,
      customizations: [customConfigs[0], customConfigs[1]],
      giftPackaging: selectedPackaging,
      giftCardMessage: selectedPackaging.id === 'luxury-box' ? giftCardMessage : undefined,
    };

    onAddComboToCart(comboCartItem);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onNavigateToCheckout();
    }, 1200);
  };

  const activeItem = selectedCombo.items[activeItemIndex] || selectedCombo.items[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD8] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest">
            <span>Estudio de Co-Creación</span>
            <span aria-hidden="true">·</span>
            <span>WOLF Custom Lab</span>
            <span aria-hidden="true">·</span>
            <span>Cartagena</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-1">
            Arma y Personaliza tu Combo
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            Sigue los 3 pasos: escoge tu combo oficial, personaliza cada pieza en nuestro lienzo interactivo en tiempo real y añade tu empaque de lujo.
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F0EB] rounded-xl border border-[#E8DFD8]">
          <button
            onClick={() => setCurrentStep(1)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              currentStep === 1
                ? 'bg-stone-950 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            1. Elegir Combo
          </button>
          <button
            onClick={() => setCurrentStep(2)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              currentStep === 2
                ? 'bg-stone-950 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            2. Personalizar
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              currentStep === 3
                ? 'bg-stone-950 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            3. Empaque & Finalizar
          </button>
        </div>
      </div>

      {/* STEP 1: COMBO SELECTION */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-950">
                Paso 1: Selecciona uno de los 3 Combos Oficiales
              </h2>
              <p className="text-xs text-stone-500">
                Los combos incluyen descuento especial garantizado frente a la compra individual.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMBOS.map((combo) => {
              const isSelected = selectedCombo.id === combo.id;
              return (
                <div
                  key={combo.id}
                  onClick={() => handleSelectCombo(combo)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-stone-950 bg-white shadow-md'
                      : 'border-[#E8DFD8] bg-[#FAF8F5] hover:bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Ahorras ${combo.savings.toLocaleString('es-CO')}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-stone-950 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-stone-950">
                        {combo.name}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1">
                        {combo.tagline}
                      </p>
                    </div>

                    <div className="bg-white/80 rounded-xl p-3 border border-[#E8DFD8] space-y-1.5">
                      <div className="text-[10px] font-bold uppercase text-stone-400">
                        Piezas que incluye:
                      </div>
                      {combo.items.map((it, idx) => (
                        <div key={idx} className="text-xs text-stone-800 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                          <span>{it.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-stone-950 tabular-nums">
                        ${combo.price.toLocaleString('es-CO')} COP
                      </span>
                      <span className="text-xs text-stone-400 line-through tabular-nums">
                        ${combo.originalPrice.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCombo(combo);
                        setCurrentStep(2);
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        isSelected
                          ? 'bg-stone-950 text-white'
                          : 'bg-[#E8DFD8] text-stone-900 hover:bg-stone-950 hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Continuar con este Combo →' : 'Elegir Combo'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-8 py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
            >
              Continuar al Lienzo de Personalización →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CUSTOMIZATION CANVAS (THE CORE) */}
      {currentStep === 2 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Combo piece selector strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F5F0EB] p-4 rounded-2xl border border-[#E8DFD8]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Personalizando:
              </span>
              <span className="text-sm font-bold text-stone-950">
                {selectedCombo.name} (${selectedCombo.price.toLocaleString('es-CO')} COP)
              </span>
            </div>

            {/* Toggle between Piece 1 and Piece 2 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 mr-1">Selecciona pieza a editar:</span>
              {selectedCombo.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveItemIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    activeItemIndex === idx
                      ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                      : 'bg-white text-stone-700 border-[#E8DFD8] hover:bg-stone-100'
                  }`}
                >
                  Pieza {idx + 1}: {item.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Split: Mockup Canvas Left, Customizer Controls Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: LIVE MOCKUP CANVAS */}
            <div className="lg:col-span-6 space-y-4 sticky top-24">
              <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-stone-800">
                      Pieza #{activeItemIndex + 1}: {activeItem.name}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      ({currentItemConfig.baseColorName})
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold bg-[#F5F0EB] text-stone-800 px-2 py-0.5 rounded">
                    Estampado DTF 300 DPI
                  </span>
                </div>

                {/* Render the reactive canvas */}
                <LiveMockupCanvas
                  productType={currentItemConfig.productType}
                  config={currentItemConfig}
                />

                <div className="mt-4 pt-3 border-t border-[#E8DFD8] flex items-center justify-between text-xs text-stone-500">
                  <span>✨ Tu diseño se actualizará en tiempo real</span>
                  <button
                    onClick={() =>
                      updateCurrentConfig({
                        uploadedImageUrl: null,
                        customText: '',
                        selectedThemeId: null,
                      })
                    }
                    className="text-stone-700 hover:text-stone-950 underline font-medium"
                  >
                    Restablecer diseño de esta pieza
                  </button>
                </div>
              </div>

              {/* Quick toggle to inspect the other piece */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8DFD8] flex items-center justify-between text-xs">
                <span className="text-stone-600">
                  Segunda pieza del combo: <strong>{selectedCombo.items[activeItemIndex === 0 ? 1 : 0].name}</strong>
                </span>
                <button
                  onClick={() => setActiveItemIndex(activeItemIndex === 0 ? 1 : 0)}
                  className="font-bold text-stone-950 hover:underline"
                >
                  Cambiar a esa pieza →
                </button>
              </div>
            </div>

            {/* RIGHT: CONTROLS ACCORDION & PANELS */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* CONTROL 1: Base Product Color */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DFD8] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-stone-900" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Color Base del Producto
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-stone-700">
                    {currentItemConfig.baseColorName}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {BASE_COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() =>
                        updateCurrentConfig({
                          baseColor: c.hex,
                          baseColorName: c.name,
                          // auto adjust text color for contrast if user hasn't explicitly set it
                          textColor: c.hex === '#18181B' ? '#FFFFFF' : '#111111',
                        })
                      }
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        currentItemConfig.baseColor === c.hex
                          ? 'ring-2 ring-stone-950 ring-offset-2 border-stone-950 bg-white font-bold'
                          : 'border-stone-200 bg-[#FAFAFA] hover:bg-stone-100'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-stone-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>

                {/* Size selector if item is a t-shirt */}
                {currentItemConfig.productType === 'tshirt' && (
                  <div className="pt-3 border-t border-[#E8DFD8] flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700">Talla de Camiseta:</span>
                    <div className="flex items-center gap-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => updateCurrentConfig({ sizeSelected: size })}
                          className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                            currentItemConfig.sizeSelected === size
                              ? 'bg-stone-950 text-white border-stone-950'
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CONTROL 2: Upload Own Image/Photo */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DFD8] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-stone-900" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Carga tu Imagen o Fotografía
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500">
                    PNG, JPG (Hasta 10MB)
                  </span>
                </div>

                <p className="text-xs text-stone-600">
                  Sube fotos familiares, logos de tu marca, recuerdos de Cartagena o ilustraciones propias.
                </p>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#F5F0EB] hover:bg-[#E8DFD8] text-stone-900 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#E8DFD8] transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Seleccionar archivo desde mi dispositivo</span>
                  </button>

                  {currentItemConfig.uploadedImageUrl && (
                    <button
                      onClick={() => updateCurrentConfig({ uploadedImageUrl: null })}
                      className="py-3 px-3 text-red-600 hover:text-red-700 text-xs font-semibold rounded-xl border border-red-200 bg-red-50"
                      title="Eliminar foto subida"
                    >
                      Quitar
                    </button>
                  )}
                </div>

                {currentItemConfig.uploadedImageUrl && (
                  <div className="flex items-center gap-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Foto cargada correctamente y renderizada en la prenda.</span>
                  </div>
                )}
              </div>

              {/* CONTROL 3: Text & Phrase Editor */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DFD8] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-stone-900" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Editor de Texto & Frases
                    </span>
                  </div>
                </div>

                {/* Text input */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Escribe tu frase, nombre o fecha:
                  </label>
                  <input
                    type="text"
                    value={currentItemConfig.customText}
                    onChange={(e) => updateCurrentConfig({ customText: e.target.value })}
                    placeholder="Ej. WOLF ARCHIVE / J & M 2026"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-stone-950 focus:bg-white text-stone-900"
                  />
                </div>

                {/* Typography Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    Tipo de Fuente Tipográfica:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {FONT_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => updateCurrentConfig({ fontFamily: f.id })}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          currentItemConfig.fontFamily === f.id
                            ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                            : 'bg-[#FAF8F5] text-stone-700 border-[#E8DFD8] hover:bg-stone-100'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold opacity-75">{f.name}</div>
                        <div className={`text-sm mt-1 truncate ${f.fontClass}`}>{f.preview}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size & Text Color */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-stone-700">
                      Tamaño de Letra:
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[
                        { id: 'sm', label: 'Pequeño' },
                        { id: 'md', label: 'Mediano' },
                        { id: 'lg', label: 'Grande' },
                      ].map((sz) => (
                        <button
                          key={sz.id}
                          onClick={() => updateCurrentConfig({ fontSize: sz.id as any })}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            currentItemConfig.fontSize === sz.id
                              ? 'bg-stone-950 text-white border-stone-950'
                              : 'bg-white text-stone-700 border-stone-200'
                          }`}
                        >
                          {sz.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-stone-700">
                      Color de Texto:
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {TEXT_COLORS.map((tc) => (
                        <button
                          key={tc.name}
                          onClick={() => updateCurrentConfig({ textColor: tc.hex })}
                          title={tc.name}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            currentItemConfig.textColor === tc.hex
                              ? 'ring-2 ring-stone-950 ring-offset-2 scale-110'
                              : 'border-stone-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: tc.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTROL 4: Graphic Theme Gallery / Stickers */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DFD8] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-stone-900" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Temáticas & Diseños de Galería
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500">Diseños de Autor WOLF</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {GRAPHIC_THEMES.map((theme) => {
                    const isSelected = currentItemConfig.selectedThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() =>
                          updateCurrentConfig({
                            selectedThemeId: isSelected ? null : theme.id,
                            uploadedImageUrl: null, // clear uploaded image
                          })
                        }
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                            : 'bg-[#FAF8F5] text-stone-800 border-[#E8DFD8] hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{theme.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <p className={`text-[11px] mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          {theme.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Nav: Proceed to Step 3 */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-stone-950"
                >
                  ← Volver a Selección
                </button>

                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                >
                  Paso 3: Elección del Empaque →
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* STEP 3: GIFT PACKAGING & FINAL CONFIRMATION */}
      {currentStep === 3 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div>
            <h2 className="text-xl font-bold text-stone-950">
              Paso 3: Elección de Empaque de Regalo & Tarjeta Caligráfica
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Haz de tu combo una experiencia memorable desde el primer instante en que se abre la caja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GIFT_PACKAGING_OPTIONS.map((pkg) => {
              const isSelected = selectedPackaging.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackaging(pkg)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-stone-950 bg-white shadow-md'
                      : 'border-[#E8DFD8] bg-[#FAF8F5] hover:bg-white'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-stone-950" />
                        <h3 className="text-base font-bold text-stone-950">{pkg.name}</h3>
                      </div>
                      <span className="text-sm font-extrabold text-stone-950 tabular-nums">
                        {pkg.price === 0 ? 'GRATIS' : `+$${pkg.price.toLocaleString('es-CO')} COP`}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {pkg.description}
                    </p>

                    {pkg.includedMessage && (
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Mensaje personalizado para la tarjeta de regalo:
                        </label>
                        <textarea
                          rows={3}
                          value={giftCardMessage}
                          onChange={(e) => setGiftCardMessage(e.target.value)}
                          placeholder="Escribe la dedicatoria que escribiremos a mano..."
                          className="w-full p-3 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-950 focus:bg-white"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-6">
                    <div className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center ${
                      isSelected ? 'bg-stone-950 text-white' : 'bg-[#E8DFD8] text-stone-800'
                    }`}>
                      {isSelected ? '✓ Empaque Seleccionado' : 'Seleccionar este Empaque'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FINAL ORDER SUMMARY CARD FOR THIS COMBO */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8DFD8] space-y-4 max-w-2xl mx-auto">
            <h3 className="text-base font-bold text-stone-950 border-b border-[#E8DFD8] pb-3">
              Resumen de Co-Creación de tu Combo
            </h3>

            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>Combo Base ({selectedCombo.name}):</span>
                <span className="font-bold tabular-nums">${selectedCombo.price.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="flex justify-between">
                <span>Pieza 1 ({selectedCombo.items[0].name}):</span>
                <span>{customConfigs[0]?.baseColorName} · {customConfigs[0]?.customText || 'Diseño de Autor'}</span>
              </div>
              <div className="flex justify-between">
                <span>Pieza 2 ({selectedCombo.items[1].name}):</span>
                <span>{customConfigs[1]?.baseColorName} · {customConfigs[1]?.customText || 'Diseño de Autor'}</span>
              </div>
              <div className="flex justify-between">
                <span>Empaque de Regalo:</span>
                <span className="font-bold tabular-nums">
                  {selectedPackaging.price === 0 ? 'Gratis' : `+$${selectedPackaging.price.toLocaleString('es-CO')} COP`}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#E8DFD8] pt-2 text-sm font-extrabold text-stone-950">
                <span>Total de este Combo:</span>
                <span className="tabular-nums">
                  ${(selectedCombo.price + selectedPackaging.price).toLocaleString('es-CO')} COP
                </span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Anticipo requerido para iniciar producción (50%):</span>
                <span className="font-bold text-stone-950 tabular-nums">
                  ${Math.round((selectedCombo.price + selectedPackaging.price) * 0.5).toLocaleString('es-CO')} COP
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-stone-950"
              >
                ← Volver a Modificar Diseño
              </button>

              <button
                onClick={handleFinishCombo}
                className={`flex-1 w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-950 hover:bg-stone-800 text-white shadow-md active:scale-[0.99]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Combo Agregado! Redirigiendo a Checkout...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Finalizar Diseño y Añadir Combo al Carrito</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
