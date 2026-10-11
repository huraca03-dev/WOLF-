import React, { useState } from 'react';
import { CartItem, CustomerInfo, Order } from '../types';
import { Trash2, Plus, Minus, ShieldCheck, Sparkles, CreditCard, ChevronRight, AlertCircle, ShoppingBag } from 'lucide-react';
import { OrderSummaryModal } from './OrderSummaryModal';

interface CheckoutSectionProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onGoToStudio: () => void;
  onGoToCatalog: () => void;
}

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGoToStudio,
  onGoToCatalog,
}) => {
  // Anticipo toggle: 50% deposit vs 100% full
  const [paymentType, setPaymentType] = useState<'deposit_50' | 'full_100'>('deposit_50');
  const [paymentMethod, setPaymentMethod] = useState<'nequi' | 'daviplata' | 'transfiya' | 'pse' | 'card'>('nequi');
  
  // Customer delivery details
  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Cartagena de Indias',
    neighborhood: 'Bocagrande',
    address: '',
    desiredDeliveryDate: 'En 48 horas (Recomendado)',
    notes: '',
    paymentType: 'deposit_50',
    paymentMethod: 'nequi',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Financial calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const packagingPrice = item.giftPackaging?.price || 0;
    return acc + (item.price + packagingPrice) * item.quantity;
  }, 0);

  const isCartagena = formData.city.toLowerCase().includes('cartagena');
  // Local delivery is $8.000 COP, free if subtotal >= 90.000 COP
  const shipping = subtotal === 0 ? 0 : isCartagena ? (subtotal >= 90000 ? 0 : 8000) : 14000;
  const total = subtotal + shipping;
  const depositAmount = Math.round(total * 0.5);
  const balanceDue = total - depositAmount;

  const handleInputChange = (field: keyof CustomerInfo, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Ingresa tu nombre y apellido';
    if (!formData.phone.trim()) errors.phone = 'Ingresa tu número de WhatsApp';
    if (!formData.address.trim()) errors.address = 'Ingresa tu dirección exacta de entrega';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega un producto o combo primero.');
      return;
    }

    const order: Order = {
      orderId: `WOLF-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      customer: {
        ...formData,
        paymentType,
        paymentMethod,
      },
      items: cartItems,
      subtotal,
      shipping,
      giftPackagingCost: cartItems.reduce((acc, i) => acc + (i.giftPackaging?.price || 0) * i.quantity, 0),
      total,
      depositAmount,
      balanceDue,
      isDeposit: paymentType === 'deposit_50',
    };

    setCompletedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD8] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest">
            <span>Pasarela & Anticipo</span>
            <span aria-hidden="true">·</span>
            <span>Cartagena</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-1">
            Bolsa de Compra & Checkout
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            Revisa tus piezas personalizadas, selecciona si deseas abonar el 50% de anticipo y confirma los datos de entrega.
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-stone-500 hover:text-stone-900 underline font-medium"
          >
            Vaciar bolsa de compra
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-white rounded-3xl border border-[#E8DFD8] p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#F5F0EB] flex items-center justify-center mx-auto text-stone-800">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-stone-950">Tu bolsa está vacía</h2>
            <p className="text-sm text-stone-600">
              Aún no has agregado productos o combos co-creados a tu pedido.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onGoToStudio}
              className="w-full sm:w-auto px-6 py-3 bg-stone-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-stone-800 transition-all"
            >
              Armar un Combo en el Estudio
            </button>
            <button
              onClick={onGoToCatalog}
              className="w-full sm:w-auto px-6 py-3 bg-[#F5F0EB] text-stone-900 text-xs font-bold rounded-xl hover:bg-[#E8DFD8] transition-all"
            >
              Explorar Catálogo Individual
            </button>
          </div>
        </div>
      ) : (
        /* Active Cart & Checkout Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: ITEM LIST & CUSTOMER FORM */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Itemized Cart List */}
            <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 space-y-5">
              <h2 className="text-lg font-bold text-stone-950 flex items-center justify-between">
                <span>Tus Artículos Seleccionados ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                  Personalización Activa
                </span>
              </h2>

              <div className="divide-y divide-[#E8DFD8]">
                {cartItems.map((item) => {
                  const packagingPrice = item.giftPackaging?.price || 0;
                  const itemUnitPrice = item.price + packagingPrice;
                  const itemTotal = itemUnitPrice * item.quantity;

                  return (
                    <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            {item.isCombo ? 'Combo Oficial WOLF' : 'Pieza Individual'}
                          </span>
                          <h3 className="text-base font-bold text-stone-950">
                            {item.isCombo ? item.comboTitle : item.productTitle}
                          </h3>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-black text-stone-950 tabular-nums">
                            ${itemTotal.toLocaleString('es-CO')} COP
                          </div>
                          <div className="text-[11px] text-stone-500">
                            ${itemUnitPrice.toLocaleString('es-CO')} c/u
                          </div>
                        </div>
                      </div>

                      {/* Customization Details Pills/Summary */}
                      <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8DFD8] space-y-1.5 text-xs text-stone-700">
                        {item.customizations.map((c, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                            <span>
                              <strong>{item.isCombo ? `Pieza ${cIdx + 1} (${c.productType})` : 'Detalles'}:</strong> {c.baseColorName}
                              {c.sizeSelected ? ` · Talla ${c.sizeSelected}` : ''}
                              {c.customText ? ` · Frase: "${c.customText}"` : ''}
                              {c.uploadedImageUrl ? ' · Con fotografía propia' : ''}
                            </span>
                          </div>
                        ))}

                        {/* Gift Packaging info if selected */}
                        {item.giftPackaging && (
                          <div className="flex items-start gap-2 pt-1 border-t border-[#E8DFD8]/60 text-stone-800">
                            <span className="text-stone-950">🎁</span>
                            <div>
                              <span className="font-semibold">{item.giftPackaging.name}</span>
                              {item.giftPackaging.price > 0 && ` (+$${item.giftPackaging.price.toLocaleString('es-CO')} COP)`}
                              {item.giftCardMessage && (
                                <p className="text-[11px] text-stone-600 italic">
                                  Dedicatoria: "{item.giftCardMessage}"
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Stepper & Delete */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-[#E8DFD8] rounded-lg bg-[#FAF8F5]">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1.5 text-stone-600 hover:text-stone-950"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-stone-950 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1.5 text-stone-600 hover:text-stone-950"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Quitar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Customer Delivery Form */}
            <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-stone-950">
                  Datos de Envío & Destinatario
                </h2>
                <span className="text-xs text-stone-500">Cartagena & Todo Colombia</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Ej. María Camila Restrepo"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-sm focus:ring-2 focus:ring-stone-950 focus:bg-white text-stone-900"
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp de Contacto *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Ej. 300 123 4567"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-sm focus:ring-2 focus:ring-stone-950 focus:bg-white text-stone-900"
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ciudad de Destino
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-sm focus:ring-2 focus:ring-stone-950 focus:bg-white text-stone-900"
                  >
                    <option value="Cartagena de Indias">Cartagena de Indias (Tarifa Local)</option>
                    <option value="Turbaco / Arjona">Turbaco / Arjona (Área Metropolitana)</option>
                    <option value="Barranquilla">Barranquilla (Nacional)</option>
                    <option value="Bogotá D.C.">Bogotá D.C. (Nacional)</option>
                    <option value="Medellín">Medellín (Nacional)</option>
                    <option value="Otra Ciudad">Otra Ciudad de Colombia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Barrio / Sector en Cartagena
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    placeholder="Ej. Bocagrande / Manga / Getsemaní / Crespo"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-sm focus:ring-2 focus:ring-stone-950 focus:bg-white text-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Dirección Exacta de Entrega (Calle, Carrera, Edificio, Apto) *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Ej. Cra 3 # 8-45 Edificio Puerta de Hierro, Apto 502"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-sm focus:ring-2 focus:ring-stone-950 focus:bg-white text-stone-900"
                  />
                  {formErrors.address && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.address}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Fecha Deseada de Entrega
                  </label>
                  <select
                    value={formData.desiredDeliveryDate}
                    onChange={(e) => handleInputChange('desiredDeliveryDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8DFD8] rounded-xl text-sm focus:ring-2 focus:ring-stone-950 focus:bg-white text-stone-900"
                  >
                    <option value="En 24-48 horas hábiles (Tiempos estándar WOLF)">
                      En 24-48 horas hábiles (Tiempos estándar WOLF)
                    </option>
                    <option value="Fin de semana próximo (Para regalo)">
                      Fin de semana próximo (Para regalo)
                    </option>
                    <option value="Fecha específica acordada por WhatsApp">
                      Fecha específica acordada por WhatsApp
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Colombian Payment Method Selection */}
            <div className="bg-white rounded-2xl border border-[#E8DFD8] p-6 space-y-4">
              <h2 className="text-lg font-bold text-stone-950">
                Selecciona tu Método de Pago Preferido
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'nequi', name: 'Nequi', note: 'App / QR Inmediato' },
                  { id: 'daviplata', name: 'Daviplata', note: 'Transferencia Rápida' },
                  { id: 'transfiya', name: 'Transfiya', note: 'Cualquier banco' },
                  { id: 'pse', name: 'PSE', note: 'Bancolombia, Davivienda...' },
                  { id: 'card', name: 'Tarjeta Crédito', note: 'Visa / Mastercard' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === m.id
                        ? 'border-stone-950 bg-stone-950 text-white shadow-xs'
                        : 'border-[#E8DFD8] bg-[#FAF8F5] text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <div className="font-bold text-xs">{m.name}</div>
                    <div className={`text-[10px] mt-0.5 ${paymentMethod === m.id ? 'text-stone-300' : 'text-stone-500'}`}>
                      {m.note}
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Method Details Simulation */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8DFD8] text-xs text-stone-700 space-y-2">
                {paymentMethod === 'nequi' && (
                  <div>
                    <strong>Pago por Nequi:</strong> Número directo WOLF: <strong>300 892 4156</strong>. Envía el comprobante por WhatsApp tras presionar Confirmar Pedido para programar tu turno en el taller de estampado.
                  </div>
                )}
                {paymentMethod === 'daviplata' && (
                  <div>
                    <strong>Pago por Daviplata:</strong> Celular autorizado WOLF: <strong>300 892 4156</strong>. Acreditación automática sin comisiones bancarias.
                  </div>
                )}
                {paymentMethod === 'transfiya' && (
                  <div>
                    <strong>Transfiya:</strong> Aceptamos transferencias interbancarias inmediatas desde cualquier entidad de Colombia.
                  </div>
                )}
                {paymentMethod === 'pse' && (
                  <div>
                    <strong>Pasarela PSE:</strong> Acepta cuentas de ahorro y corrientes de Bancolombia, Nu Colombia, Davivienda, BBVA, Colpatria y Banco de Bogotá.
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <div>
                    <strong>Tarjeta de Crédito:</strong> Pagos procesados con cifrado seguro SSL de 256 bits sin recargo adicional.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ANTICIPO MECHANISM & TOTAL SUMMARY (STICKY) */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            {/* CORE MECHANISM: ANTICIPO DEL 50% */}
            <div className="bg-stone-950 text-white rounded-3xl p-6 shadow-xl space-y-6 border border-stone-800">
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  Modelo de Pago Seguro WOLF
                </span>
                <h3 className="text-xl font-bold">
                  Modalidad de Pago del Pedido
                </h3>
                <p className="text-xs text-stone-300">
                  Elige cómo deseas financiar la producción de tus piezas personalizadas:
                </p>
              </div>

              {/* Toggle Buttons: 50% vs 100% */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-900 rounded-2xl border border-stone-800">
                <button
                  type="button"
                  onClick={() => setPaymentType('deposit_50')}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                    paymentType === 'deposit_50'
                      ? 'bg-white text-stone-950 shadow-md'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-black">Anticipo 50%</span>
                  <span className="text-[10px] opacity-80 font-normal">Paga la mitad hoy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('full_100')}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                    paymentType === 'full_100'
                      ? 'bg-white text-stone-950 shadow-md'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-black">Pago 100%</span>
                  <span className="text-[10px] opacity-80 font-normal">Liquidación total</span>
                </button>
              </div>

              {/* Deposit Explanation Callout */}
              <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-stone-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="leading-relaxed">
                    {paymentType === 'deposit_50' ? (
                      <>
                        <strong>Abonas ${depositAmount.toLocaleString('es-CO')} COP hoy</strong> para iniciar la compra de insumos e impresión. El saldo de <strong className="text-white">${balanceDue.toLocaleString('es-CO')} COP</strong> se cancela contra entrega o al momento de enviar tu guía.
                      </>
                    ) : (
                      <>
                        <strong>Pagas el 100% de la orden hoy.</strong> Tu pedido quedará liquidado y priorizado en la cola de producción de nuestro taller.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-2.5 text-xs border-t border-stone-800 pt-4 text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal Artículos:</span>
                  <span className="font-bold tabular-nums text-white">
                    ${subtotal.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Envío a {formData.city.split(' ')[0]}:</span>
                  <span className="font-bold tabular-nums text-white">
                    {shipping === 0 ? 'GRATIS' : `$${shipping.toLocaleString('es-CO')} COP`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-stone-800">
                  <span>Total Pedido:</span>
                  <span className="tabular-nums">
                    ${total.toLocaleString('es-CO')} COP
                  </span>
                </div>

                {/* Amount to pay today highlight */}
                <div className="bg-white/10 rounded-xl p-3.5 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-300 font-semibold block">
                      {paymentType === 'deposit_50' ? 'Monto a pagar hoy (50%):' : 'Monto total a pagar hoy:'}
                    </span>
                    <span className="text-2xl font-black text-white tabular-nums">
                      ${(paymentType === 'deposit_50' ? depositAmount : total).toLocaleString('es-CO')} COP
                    </span>
                  </div>
                  {paymentType === 'deposit_50' && (
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 border border-amber-800 px-2 py-1 rounded">
                      Saldo al recibir: ${balanceDue.toLocaleString('es-CO')}
                    </span>
                  )}
                </div>
              </div>

              {/* Final Confirm CTA Button */}
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full py-4 bg-white hover:bg-stone-100 text-stone-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Confirmar Pedido vía WhatsApp / Pasarela</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-stone-400">
                Al confirmar, se abrirá el resumen oficial para enviar a nuestro WhatsApp de atención en Cartagena.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ORDER SUMMARY CONFIRMATION MODAL */}
      {completedOrder && (
        <OrderSummaryModal
          order={completedOrder}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
};
