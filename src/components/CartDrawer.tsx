import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, MapPin, Store, CreditCard, Banknote, QrCode } from 'lucide-react';
import { CartItem, OrderType, PaymentMethod, CustomerOrderDetails } from '../types';
import { storeInfo } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderCompleted: (orderDetails: CustomerOrderDetails, totalAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [cashChangeFor, setCashChangeFor] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = orderType === 'delivery' ? 5.0 : 0.0;
  const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const finalTotal = itemsSubtotal + (itemsSubtotal > 0 ? deliveryFee : 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.name = 'Informe seu nome';
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Informe seu WhatsApp para contato';
    }

    if (orderType === 'delivery') {
      if (!street.trim()) newErrors.street = 'Informe a rua';
      if (!number.trim()) newErrors.number = 'Informe o número';
      if (!neighborhood.trim()) newErrors.neighborhood = 'Informe o bairro em Ibaiti';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderDetails: CustomerOrderDetails = {
      name: customerName,
      phone: customerPhone,
      orderType,
      street,
      number,
      neighborhood,
      complement,
      paymentMethod,
      cashChangeFor: paymentMethod === 'dinheiro' ? cashChangeFor : undefined,
      notes: generalNotes,
    };

    onOrderCompleted(orderDetails, finalTotal);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#EFE8DF] overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#FAF7F2] border-b border-[#EADFCF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8D2B52]" />
            <div>
              <h3 className="text-base font-serif font-semibold text-[#3A1F2D]">Sua Sacola</h3>
              <p className="text-[11px] text-[#7A636C]">
                {cartItems.length} {cartItems.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A636C] hover:text-[#3A1F2D] hover:bg-[#EFE8DF] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F5E6EB] text-[#8D2B52] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h4 className="text-base font-semibold text-[#3A1F2D]">Sua sacola está vazia</h4>
              <p className="text-xs text-[#7A636C] max-w-xs mx-auto">
                Explore nosso cardápio de waffles crocantes, crepes e taças especiais e monte seu pedido!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 text-xs font-semibold text-white bg-[#8D2B52] hover:bg-[#772144] rounded-full transition-colors cursor-pointer"
              >
                Explorar Cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Itemized list */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 bg-white rounded-2xl border border-[#EFE8DF] flex gap-3 items-start relative group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-[#3A1F2D] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#9C8A92] hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization pills/details */}
                      {item.customizations && item.customizations.length > 0 && (
                        <div className="text-[11px] text-[#7A636C] space-y-0.5 bg-[#FAF7F2] p-2 rounded-lg border border-[#F2ECE6]">
                          {item.customizations.map((c) => (
                            <div key={c.stepId} className="leading-tight">
                              <span className="font-semibold text-[#57404A]">{c.stepTitle.replace(/^\d+\.\s*/, '')}: </span>
                              <span>{c.selectedOptions.map((o) => o.label).join(', ')}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.notes && (
                        <p className="text-[10px] text-[#78646C] italic">Obs: {item.notes}</p>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E8DFD7] rounded-full px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-4 h-4 flex items-center justify-center text-[#553E47] hover:text-[#8D2B52] cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold text-[#3A1F2D] tabular-nums min-w-3 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-4 h-4 flex items-center justify-center text-[#553E47] hover:text-[#8D2B52] cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#8D2B52] tabular-nums">
                          R$ {item.itemTotalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Type Toggle: Delivery vs Takeaway */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-[#3A1F2D] block">
                  Como deseja receber seu pedido?
                </label>
                <div className="grid grid-cols-2 gap-2 bg-white p-1 rounded-2xl border border-[#E8DFD7]">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#8D2B52] text-white shadow-xs'
                        : 'text-[#674F58] hover:bg-[#FAF0F3]'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Entrega (Ibaiti)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'bg-[#8D2B52] text-white shadow-xs'
                        : 'text-[#674F58] hover:bg-[#FAF0F3]'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Retirada no Balcão</span>
                  </button>
                </div>
                {orderType === 'takeaway' && (
                  <p className="text-[11px] text-[#7A636C] bg-[#FAF3EC] p-2 rounded-xl border border-[#ECE0D5]">
                    📍 Retirar na <strong>{storeInfo.address}</strong> (pronto em aprox. 20-30 min).
                  </p>
                )}
              </div>

              {/* Customer Delivery Details Form */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold text-[#3A1F2D] uppercase tracking-wider">
                  Dados para o Pedido
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Seu nome completo *"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      className={`w-full text-xs p-2.5 rounded-xl bg-white border ${
                        errors.name ? 'border-red-400' : 'border-[#E8DFD7]'
                      } text-[#3A1F2D] focus:outline-none focus:border-[#8D2B52]`}
                    />
                    {errors.name && <span className="text-[10px] text-red-600 block mt-0.5">{errors.name}</span>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp (DDD + Número) *"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      className={`w-full text-xs p-2.5 rounded-xl bg-white border ${
                        errors.phone ? 'border-red-400' : 'border-[#E8DFD7]'
                      } text-[#3A1F2D] focus:outline-none focus:border-[#8D2B52]`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-600 block mt-0.5">{errors.phone}</span>}
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="Rua / Avenida *"
                          value={street}
                          onChange={(e) => {
                            setStreet(e.target.value);
                            if (errors.street) setErrors((prev) => ({ ...prev, street: '' }));
                          }}
                          className={`w-full text-xs p-2.5 rounded-xl bg-white border ${
                            errors.street ? 'border-red-400' : 'border-[#E8DFD7]'
                          } text-[#3A1F2D] focus:outline-none focus:border-[#8D2B52]`}
                        />
                        {errors.street && <span className="text-[10px] text-red-600 block mt-0.5">{errors.street}</span>}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Número *"
                          value={number}
                          onChange={(e) => {
                            setNumber(e.target.value);
                            if (errors.number) setErrors((prev) => ({ ...prev, number: '' }));
                          }}
                          className={`w-full text-xs p-2.5 rounded-xl bg-white border ${
                            errors.number ? 'border-red-400' : 'border-[#E8DFD7]'
                          } text-[#3A1F2D] focus:outline-none focus:border-[#8D2B52]`}
                        />
                        {errors.number && <span className="text-[10px] text-red-600 block mt-0.5">{errors.number}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Bairro em Ibaiti *"
                          value={neighborhood}
                          onChange={(e) => {
                            setNeighborhood(e.target.value);
                            if (errors.neighborhood) setErrors((prev) => ({ ...prev, neighborhood: '' }));
                          }}
                          className={`w-full text-xs p-2.5 rounded-xl bg-white border ${
                            errors.neighborhood ? 'border-red-400' : 'border-[#E8DFD7]'
                          } text-[#3A1F2D] focus:outline-none focus:border-[#8D2B52]`}
                        />
                        {errors.neighborhood && (
                          <span className="text-[10px] text-red-600 block mt-0.5">{errors.neighborhood}</span>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Complemento / Ref."
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#E8DFD7] text-[#3A1F2D] focus:outline-none focus:border-[#8D2B52]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Forma de Pagamento */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-[#3A1F2D] block">
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-2 text-[11px] font-medium rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                        paymentMethod === 'pix'
                          ? 'bg-[#F9ECEF] border-[#8D2B52] text-[#8D2B52]'
                          : 'bg-white border-[#E8DFD7] text-[#674F58]'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Pix (Chave)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cartao_entrega')}
                      className={`p-2 text-[11px] font-medium rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                        paymentMethod === 'cartao_entrega'
                          ? 'bg-[#F9ECEF] border-[#8D2B52] text-[#8D2B52]'
                          : 'bg-white border-[#E8DFD7] text-[#674F58]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Cartão</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('dinheiro')}
                      className={`p-2 text-[11px] font-medium rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                        paymentMethod === 'dinheiro'
                          ? 'bg-[#F9ECEF] border-[#8D2B52] text-[#8D2B52]'
                          : 'bg-white border-[#E8DFD7] text-[#674F58]'
                      }`}
                    >
                      <Banknote className="w-4 h-4" />
                      <span>Dinheiro</span>
                    </button>
                  </div>

                  {paymentMethod === 'dinheiro' && (
                    <input
                      type="text"
                      placeholder="Precisa de troco para quanto? (Ex: R$ 50,00)"
                      value={cashChangeFor}
                      onChange={(e) => setCashChangeFor(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#E8DFD7] text-[#3A1F2D] mt-2 focus:outline-none focus:border-[#8D2B52]"
                    />
                  )}
                </div>

                {/* Observações gerais */}
                <div className="pt-1">
                  <input
                    type="text"
                    placeholder="Observação geral para o entregador / restaurante"
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#E8DFD7] text-[#3A1F2D] focus:outline-none focus:border-[#8D2B52]"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer with Summary & Checkout Trigger */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EFE8DF] space-y-3">
            <div className="space-y-1.5 text-xs text-[#6F5B63]">
              <div className="flex justify-between">
                <span>Subtotal dos itens</span>
                <span className="tabular-nums font-semibold text-[#3A1F2D]">
                  R$ {itemsSubtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de {orderType === 'delivery' ? 'entrega (Ibaiti)' : 'retirada'}</span>
                <span className="tabular-nums font-semibold text-[#3A1F2D]">
                  {orderType === 'delivery' ? `R$ ${deliveryFee.toFixed(2).replace('.', ',')}` : 'Grátis'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2C1822] pt-2 border-t border-[#F2ECE6]">
                <span>Total a pagar</span>
                <span className="tabular-nums text-[#8D2B52] text-base">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#8D2B52] hover:bg-[#772144] rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Concluir e Enviar Pedido</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
