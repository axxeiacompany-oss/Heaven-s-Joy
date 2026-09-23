import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onCustomize: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onCustomize,
}) => {
  const categoryLabelMap: Record<string, string> = {
    bubble_waffles: 'Bubble Waffle',
    waffles_tradicionais: 'Waffle Belga',
    crepes_franceses_doces: 'Crepe Francês Doce',
    crepes_franceses_salgados: 'Crepe Francês Salgado',
    crepes_suicos: 'Crepe Suíço',
    bebidas: 'Bebidas & Shakes',
    combos: 'Combo & Experiência',
  };

  const isCustomizable = product.isCustomizable || product.category === 'bubble_waffles';

  return (
    <div className="group bg-white rounded-2xl border border-[#EFE8DF] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#DFD2D7] transition-all duration-300">
      {/* Product Image slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F0]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle high-intent tag (max 1 tag, unboxed or clean minimal tag) */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-sm text-[#8D2B52] border border-[#EBE0E4] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
            {product.tags[0]}
          </div>
        )}
      </div>

      {/* Content slot */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Unboxed clean metadata kicker */}
          <div className="flex items-center gap-2 text-xs text-[#8A707A]">
            <span>{categoryLabelMap[product.category] || 'Especialidade'}</span>
            {product.isCustomizable && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#C97A96] font-medium">Personalizável</span>
              </>
            )}
          </div>

          <h3 className="text-base font-semibold text-[#2C1C24] group-hover:text-[#8D2B52] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#6F5B63] line-clamp-2 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Purchase Module: Price + Action */}
        <div className="pt-3 border-t border-[#F4EDE4] flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-[#8C767F] block">A partir de</span>
            <span className="text-base font-bold text-[#3A1F2D] tabular-nums">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {isCustomizable ? (
            <button
              onClick={() => onCustomize(product)}
              className="px-3.5 py-2 text-xs font-semibold text-[#8D2B52] bg-[#F9ECEF] hover:bg-[#8D2B52] hover:text-white rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalizar</span>
            </button>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#8D2B52] hover:bg-[#772144] rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
