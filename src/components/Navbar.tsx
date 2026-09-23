import React from 'react';
import { ShoppingBag, Sparkles, Clock, Menu, X, MapPin } from 'lucide-react';
import { storeInfo } from '../data/products';

interface NavbarProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenCustomizer: () => void;
  isOpenNow: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  onOpenCustomizer,
  isOpenNow,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EFE8DF] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 text-2xl sm:text-3xl font-serif tracking-tight text-[#3A1F2D] hover:opacity-90 transition-opacity">
          <span>Heaven's Joy</span>
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#644D56]">
          <a href="#cardapio" className="hover:text-[#8D2B52] transition-colors">
            Cardápio
          </a>
          <button
            onClick={onOpenCustomizer}
            className="hover:text-[#8D2B52] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C97A96]" />
            <span>Monte seu Waffle</span>
          </button>
          <a href="#boutique" className="hover:text-[#8D2B52] transition-colors">
            A Boutique
          </a>
          <a href="#avaliacoes" className="hover:text-[#8D2B52] transition-colors">
            Depoimentos
          </a>
          <a href="#localizacao" className="hover:text-[#8D2B52] transition-colors">
            Localização
          </a>
        </nav>

        {/* Zone 3: Primary actions (Status & Shopping Bag) */}
        <div className="flex items-center gap-3">
          {/* Subtle Live Store Status */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#644D56] bg-white/80 border border-[#EFE8DF] px-3 py-1.5 rounded-full">
            <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{isOpenNow ? 'Aberto até às 23h' : 'Abre às 16h'}</span>
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir sacola de compras"
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-white bg-[#8D2B52] hover:bg-[#782445] rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Sacola</span>
            {cartItemCount > 0 ? (
              <span className="bg-[#FAF7F2] text-[#8D2B52] text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {cartItemCount} · R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            ) : (
              <span className="text-[11px] text-[#F3DCE4]">(0)</span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="md:hidden p-2 text-[#4A323D] hover:bg-[#EFE8DF]/60 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EFE8DF] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#644D56] py-1 border-b border-[#EFE8DF]">
            <Clock className="w-3.5 h-3.5 text-[#C97A96]" />
            <span>{storeInfo.openingHours}</span>
            <span aria-hidden="true">·</span>
            <span className={isOpenNow ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
              {isOpenNow ? 'Aberto agora' : 'Fechado agora (abre às 16h)'}
            </span>
          </div>
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-[#4A323D]">
            <a
              href="#cardapio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-white/60"
            >
              Cardápio Completo
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="flex items-center gap-2 text-left py-1.5 px-2 rounded-lg text-[#8D2B52] font-semibold hover:bg-white/60"
            >
              <Sparkles className="w-4 h-4" />
              Monte seu Bubble Waffle
            </button>
            <a
              href="#boutique"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-white/60"
            >
              A Boutique & História
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-white/60"
            >
              Avaliações & Clientes
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-white/60"
            >
              Localização & Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
