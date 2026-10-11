import React, { useState } from 'react';
import { Order } from '../types';
import { WolfLogo } from './WolfLogo';
import { CheckCircle2, MessageCircle, Copy, Check, Download, X, AlertCircle } from 'lucide-react';

interface OrderSummaryModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format WhatsApp message text
  const formatWhatsAppMessage = () => {
    let msg = `🐺 *NUEVO PEDIDO WOLF RF - IDEAS QUE SE IMPRIMEN*\n`;
    msg += `📋 *Orden:* #${order.orderId}\n`;
    msg += `👤 *Cliente:* ${order.customer.fullName}\n`;
    msg += `📱 *WhatsApp:* ${order.customer.phone}\n`;
    msg += `📍 *Dirección:* ${order.customer.address}, ${order.customer.neighborhood} (${order.customer.city})\n`;
    msg += `📅 *Fecha Deseada:* ${order.customer.desiredDeliveryDate}\n\n`;

    msg += `📦 *DETALLE DE ARTÍCULOS:*\n`;
    order.items.forEach((item, idx) => {
      if (item.isCombo) {
        msg += `• *${item.comboTitle}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CO')} COP\n`;
        item.customizations.forEach((c, cIdx) => {
          msg += `   - Pieza ${cIdx + 1} (${c.productType}): Color ${c.baseColorName} | Texto: "${c.customText || 'N/A'}"\n`;
        });
        if (item.giftPackaging) {
          msg += `   - Empaque: ${item.giftPackaging.name}\n`;
          if (item.giftCardMessage) {
            msg += `   - Mensaje Tarjeta: "${item.giftCardMessage}"\n`;
          }
        }
      } else {
        msg += `• *${item.productTitle}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CO')} COP\n`;
        if (item.customizations[0]) {
          const c = item.customizations[0];
          msg += `   - Color: ${c.baseColorName} | Talla: ${c.sizeSelected || 'Estándar'} | Texto: "${c.customText || 'N/A'}"\n`;
        }
      }
    });

    msg += `\n💵 *CONDICIONES FINANCIERAS:*\n`;
    msg += `• Subtotal: $${order.subtotal.toLocaleString('es-CO')} COP\n`;
    msg += `• Envío: ${order.shipping === 0 ? 'GRATIS' : `$${order.shipping.toLocaleString('es-CO')} COP`}\n`;
    msg += `• Total Pedido: $${order.total.toLocaleString('es-CO')} COP\n`;
    if (order.isDeposit) {
      msg += `✨ *MODALIDAD:* ANTICIPO DEL 50%\n`;
      msg += `👉 *Abono Inicial Hoy:* $${order.depositAmount.toLocaleString('es-CO')} COP\n`;
      msg += `⏳ *Saldo Pendiente Contra Entrega:* $${order.balanceDue.toLocaleString('es-CO')} COP\n`;
    } else {
      msg += `✨ *MODALIDAD:* PAGO TOTAL 100% ($${order.total.toLocaleString('es-CO')} COP)\n`;
    }
    msg += `💳 *Método Seleccionado:* ${order.customer.paymentMethod.toUpperCase()}\n`;
    msg += `\n_Hola equipo de WOLF, acabo de realizar este pedido en la web y adjunto mi soporte de anticipo para iniciar elaboración._`;

    return msg;
  };

  const whatsAppText = formatWhatsAppMessage();
  const whatsappUrl = `https://wa.me/573008924156?text=${encodeURIComponent(whatsAppText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsAppText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#E8DFD8] my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Voucher */}
        <div className="text-center space-y-3 pb-6 border-b border-[#E8DFD8]">
          <div className="flex justify-center">
            <WolfLogo size="md" theme="light" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>¡Pedido Registrado con Éxito!</span>
          </div>
          <div className="text-xs text-stone-500">
            Número de Orden: <strong className="text-stone-900">#{order.orderId}</strong> · Cartagena de Indias
          </div>
        </div>

        {/* Deposit Summary Box */}
        <div className="py-5 space-y-4">
          <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E8DFD8] space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 uppercase tracking-wider">
              <span>Desglose de Pago</span>
              <span className="text-stone-950">{order.customer.paymentMethod.toUpperCase()}</span>
            </div>

            <div className="space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>Valor Total de la Orden:</span>
                <span className="font-bold tabular-nums">${order.total.toLocaleString('es-CO')} COP</span>
              </div>

              {order.isDeposit ? (
                <>
                  <div className="flex justify-between text-sm font-extrabold text-stone-950 pt-1 border-t border-[#E8DFD8]">
                    <span>Anticipo Hoy (50%):</span>
                    <span className="text-emerald-800 tabular-nums">${order.depositAmount.toLocaleString('es-CO')} COP</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Saldo restante contra entrega:</span>
                    <span className="font-medium tabular-nums">${order.balanceDue.toLocaleString('es-CO')} COP</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-sm font-extrabold text-stone-950 pt-1 border-t border-[#E8DFD8]">
                  <span>Total Pagado Hoy (100%):</span>
                  <span className="text-emerald-800 tabular-nums">${order.total.toLocaleString('es-CO')} COP</span>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
            <div><strong>Destinatario:</strong> {order.customer.fullName} ({order.customer.phone})</div>
            <div><strong>Dirección:</strong> {order.customer.address}, {order.customer.neighborhood} ({order.customer.city})</div>
            <div><strong>Fecha estimada de entrega:</strong> {order.customer.desiredDeliveryDate}</div>
          </div>

          {/* WhatsApp Action Callout */}
          <div className="p-3.5 bg-[#F5F0EB] rounded-xl border border-[#E8DFD8] flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-700 leading-relaxed">
              Para validar tu anticipo y comenzar inmediatamente la impresión de tus piezas, pulsa el botón a continuación para enviar los detalles directamente al WhatsApp oficial de WOLF.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.99]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar Pedido vía WhatsApp</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-xl border border-[#E8DFD8] transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Texto para WhatsApp'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-1.5 py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-xl border border-[#E8DFD8] transition-all"
              title="Imprimir resumen o guardar en PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
