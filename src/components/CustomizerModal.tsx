import React, { useState, useMemo } from 'react';
import { X, Check, Plus, Minus, Sparkles, AlertCircle } from 'lucide-react';
import { Product, CustomizationStep, CartItem } from '../types';

interface CustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmAddToCart: (cartItem: CartItem) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirmAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const steps = product.customizationSteps || [];

  // State: stepId -> array of selected option IDs
  const [selections, setSelections] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    steps.forEach((step) => {
      // Default to first option for required single-choice steps
      if (step.required && step.maxSelections === 1 && step.options.length > 0) {
        initial[step.id] = [step.options[0].id];
      } else {
        initial[step.id] = [];
      }
    });
    return initial;
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  const toggleOption = (step: CustomizationStep, optionId: string) => {
    setSelections((prev) => {
      const current = prev[step.id] || [];
      const alreadySelected = current.includes(optionId);

      if (step.maxSelections === 1) {
        // Radio style: toggle or switch
        if (alreadySelected && !step.required) {
          return { ...prev, [step.id]: [] };
        }
        return { ...prev, [step.id]: [optionId] };
      } else {
        // Multi-select style up to maxSelections
        if (alreadySelected) {
          return { ...prev, [step.id]: current.filter((id) => id !== optionId) };
        } else {
          if (current.length < step.maxSelections) {
            return { ...prev, [step.id]: [...current, optionId] };
          }
          return prev;
        }
      }
    });
  };

  // Calculate total price with extras
  const unitPrice = useMemo(() => {
    let price = product.price;
    steps.forEach((step) => {
      const selectedIds = selections[step.id] || [];
      selectedIds.forEach((optId) => {
        const option = step.options.find((o) => o.id === optId);
        if (option && option.extraPrice) {
          price += option.extraPrice;
        }
      });
    });
    return price;
  }, [product, steps, selections]);

  const totalPrice = unitPrice * quantity;

  // Validation: are all required steps satisfied?
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    steps.forEach((step) => {
      if (step.required) {
        const selCount = (selections[step.id] || []).length;
        if (selCount === 0) {
          errors.push(`Selecione ${step.title}`);
        } else if (step.maxSelections > 1 && selCount < step.maxSelections) {
          errors.push(`${step.title}: escolha ${step.maxSelections} opções (você escolheu ${selCount})`);
        }
      }
    });
    return errors;
  }, [steps, selections]);

  const isValid = validationErrors.length === 0;

  const handleAddToCart = () => {
    if (!isValid) return;

    const formattedCustomizations = steps
      .map((step) => {
        const selectedIds = selections[step.id] || [];
        const selectedOptions = selectedIds
          .map((id) => {
            const opt = step.options.find((o) => o.id === id);
            return opt ? { id: opt.id, label: opt.label, extraPrice: opt.extraPrice } : null;
          })
          .filter(Boolean) as { id: string; label: string; extraPrice?: number }[];

        return {
          stepId: step.id,
          stepTitle: step.title,
          selectedOptions,
        };
      })
      .filter((c) => c.selectedOptions.length > 0);

    const cartItem: CartItem = {
      cartItemId: `${product.id}-${Date.now()}`,
      product,
      quantity,
      customizations: formattedCustomizations,
      notes: notes.trim(),
      itemTotalPrice: totalPrice,
    };

    onConfirmAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EFE8DF] my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADFCF] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8D2B52]" />
            <div>
              <h3 className="text-lg font-serif font-semibold text-[#3A1F2D]">
                Personalizar {product.name}
              </h3>
              <p className="text-xs text-[#7A636C]">Monte cada detalhe do seu pedido</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A636C] hover:text-[#3A1F2D] hover:bg-[#EFE8DF] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Item Preview Card */}
          <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-[#EFE8DF]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[#2C1C24]">{product.name}</h4>
              <p className="text-xs text-[#6F5B63] line-clamp-2">{product.description}</p>
              <p className="text-xs font-bold text-[#8D2B52] tabular-nums">
                Base: R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>

          {/* Steps */}
          {steps.map((step) => {
            const currentSelected = selections[step.id] || [];
            return (
              <div key={step.id} className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#3A1F2D]">{step.title}</h4>
                    <p className="text-xs text-[#7A636C]">{step.subtitle}</p>
                  </div>
                  <span className="text-[11px] font-medium text-[#8D2B52]">
                    {step.required ? 'Obrigatório' : 'Opcional'} (
                    {currentSelected.length}/{step.maxSelections})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {step.options.map((option) => {
                    const isSelected = currentSelected.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleOption(step, option.id)}
                        className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#F9ECEF] border-[#8D2B52] text-[#3A1F2D] shadow-xs'
                            : 'bg-white border-[#E8DFD7] text-[#553E47] hover:border-[#D5BAC3]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold leading-tight">{option.label}</p>
                          {option.description && (
                            <p className="text-[11px] text-[#866F78]">{option.description}</p>
                          )}
                          {option.extraPrice && option.extraPrice > 0 ? (
                            <p className="text-[11px] font-semibold text-[#8D2B52] tabular-nums">
                              + R$ {option.extraPrice.toFixed(2).replace('.', ',')}
                            </p>
                          ) : (
                            <p className="text-[11px] text-[#9D8B93]">Incluso</p>
                          )}
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                            isSelected
                              ? 'bg-[#8D2B52] border-[#8D2B52] text-white'
                              : 'border-[#D0C2CA] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Observations */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#3A1F2D] block">
              Observações do preparo (opcional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Calda à parte, sem canela, bem dourado..."
              className="w-full text-xs p-3 rounded-xl bg-white border border-[#E8DFD7] text-[#3A1F2D] focus:outline-none focus:border-[#8D2B52] placeholder-[#A4949C]"
            />
          </div>
        </div>

        {/* Footer: Quantity + Price + Add to Cart */}
        <div className="bg-white border-t border-[#EFE8DF] px-6 py-4 space-y-3">
          {validationErrors.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validationErrors[0]}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E8DFD7] rounded-full px-3 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center text-[#553E47] hover:text-[#8D2B52] cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-[#3A1F2D] tabular-nums min-w-4 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center text-[#553E47] hover:text-[#8D2B52] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Total & Submit button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!isValid}
              className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                isValid
                  ? 'bg-[#8D2B52] text-white hover:bg-[#772144] shadow-md hover:shadow-lg'
                  : 'bg-[#DFD5D9] text-[#86757D] cursor-not-allowed'
              }`}
            >
              <span>Adicionar à Sacola</span>
              <span className="tabular-nums font-bold">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
