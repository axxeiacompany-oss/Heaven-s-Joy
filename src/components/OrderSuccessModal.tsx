import React, { useState, useEffect } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, Clock, MapPin, Sparkles, ChefHat, Bike } from 'lucide-react';
import { CustomerOrderDetails, CartItem } from '../types';
import { storeInfo } from '../data/products';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: CustomerOrderDetails | null;
  cartItems: CartItem[];
  totalAmount: number;
  orderNumber: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
  cartItems,
  totalAmount,
  orderNumber,
}) => {
  if (!isOpen || !orderDetails) return null;

  const [copied, setCopied] = useState(false);
  const [trackerStep, setTrackerStep] = useState(1);

  useEffect(() => {
    // Simulate progression to "Em preparo" after 3 seconds
    const timer = setTimeout(() => {
      setTrackerStep(2);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const formatWhatsAppMessage = () => {
    const lines: string[] = [];
    lines.push(`*NOVO PEDIDO - HEAVEN'S JOY* ✨`);
    lines.push(`*Pedido:* #${orderNumber}`);
    lines.push(`*Cliente:* ${orderDetails.name}`);
    lines.push(`*Contato:* ${orderDetails.phone}`);
    lines.push(
      `*Modalidade:* ${
        orderDetails.orderType === 'delivery'
          ? `🛵 Entrega em Ibaiti`
          : `📍 Retirada no Balcão (${storeInfo.shortAddress})`
      }`
    );

    if (orderDetails.orderType === 'delivery') {
      lines.push(
        `*Endereço:* ${orderDetails.street}, nº ${orderDetails.number} - Bairro: ${orderDetails.neighborhood}${
          orderDetails.complement ? ` (${orderDetails.complement})` : ''
        }`
      );
    }

    lines.push(`\n*ITENS DO PEDIDO:*`);
    cartItems.forEach((item, idx) => {
      lines.push(`\n${idx + 1}. *${item.quantity}x ${item.product.name}* — R$ ${item.itemTotalPrice.toFixed(2).replace('.', ',')}`);
      if (item.customizations && item.customizations.length > 0) {
        item.customizations.forEach((c) => {
          lines.push(`   • ${c.stepTitle.replace(/^\d+\.\s*/, '')}: ${c.selectedOptions.map((o) => o.label).join(', ')}`);
        });
      }
      if (item.notes) {
        lines.push(`   • Obs: ${item.notes}`);
      }
    });

    const paymentLabel =
      orderDetails.paymentMethod === 'pix'
        ? 'Pix'
        : orderDetails.paymentMethod === 'cartao_entrega'
        ? 'Cartão'
        : `Dinheiro${orderDetails.cashChangeFor ? ` (Troco para ${orderDetails.cashChangeFor})` : ''}`;

    lines.push(`\n*Forma de Pagamento:* ${paymentLabel}`);
    if (orderDetails.notes) {
      lines.push(`*Observação Geral:* ${orderDetails.notes}`);
    }
    lines.push(`\n*VALOR TOTAL:* R$ ${totalAmount.toFixed(2).replace('.', ',')}`);
    lines.push(`\nMuito obrigado! Aguardo a confirmação da doceria.`);

    return lines.join('\n');
  };

  const fullMessage = formatWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#EFE8DF] my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FAF0F3] to-[#FCECEF] p-6 text-center border-b border-[#EADFCF] space-y-2">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1822]">
            Pedido Registrado com Sucesso!
          </h3>
          <p className="text-xs text-[#6F5B63]">
            Pedido <strong className="text-[#8D2B52] font-semibold">#{orderNumber}</strong> pronto para envio direto à Heaven's Joy
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Simulated Live Tracker */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFE8DF] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#3A1F2D]">
              <span>Status do seu pedido</span>
              <span className="text-[#8D2B52] font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Tempo estimado: 25-40 min
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px]">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <p className="font-semibold text-emerald-800">1. Registrado</p>
                <p className="text-[10px] text-[#866F78]">Recebido na loja</p>
              </div>

              <div className="space-y-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto shadow-xs transition-colors ${
                    trackerStep >= 2
                      ? 'bg-[#8D2B52] text-white animate-pulse'
                      : 'bg-[#F0E6EA] text-[#A28A94]'
                  }`}
                >
                  <ChefHat className="w-4 h-4" />
                </div>
                <p className={`font-semibold ${trackerStep >= 2 ? 'text-[#8D2B52]' : 'text-[#866F78]'}`}>
                  2. Em Preparo
                </p>
                <p className="text-[10px] text-[#866F78]">Massa na chapa</p>
              </div>

              <div className="space-y-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto shadow-xs transition-colors ${
                    trackerStep >= 3
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#F0E6EA] text-[#A28A94]'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                </div>
                <p className="font-semibold text-[#866F78]">3. Entrega</p>
                <p className="text-[10px] text-[#866F78]">Rota / Balcão</p>
              </div>
            </div>
          </div>

          {/* Primary Action: Send to WhatsApp */}
          <div className="space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BE5A] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Confirmar no WhatsApp Oficial</span>
            </a>
            <p className="text-[11px] text-[#7A636C] text-center">
              Clique acima para enviar os detalhes diretamente para o atendente da Heaven's Joy.
            </p>
          </div>

          {/* Receipt overview */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFE8DF] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-[#3A1F2D] uppercase tracking-wider">
                Resumo do Pedido
              </h4>
              <button
                onClick={handleCopy}
                className="text-[11px] font-medium text-[#8D2B52] hover:text-[#701E3E] flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar dados'}</span>
              </button>
            </div>

            <div className="text-xs text-[#5D464F] space-y-1.5 divide-y divide-[#F6EFEA]">
              <div className="pb-1.5 space-y-1">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium tabular-nums text-[#3A1F2D]">
                      R$ {item.itemTotalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between font-bold text-sm text-[#2C1822]">
                <span>Total com Entrega</span>
                <span className="text-[#8D2B52] tabular-nums">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-[#EFE8DF] p-4 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 text-xs font-semibold text-[#6C545E] hover:text-[#3A1F2D] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
          >
            Fechar e Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};
