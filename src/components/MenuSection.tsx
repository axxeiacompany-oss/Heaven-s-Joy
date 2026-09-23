import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { categories, productsData } from '../data/products';
import { ProductCard } from './ProductCard';

interface MenuSectionProps {
  onAddToCart: (product: Product) => void;
  onCustomize: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, onCustomize }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return productsData.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ? true : item.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === ''
          ? true
          : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="cardapio" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8D2B52]">
          <span>Cardápio Artesanal</span>
          <span aria-hidden="true">·</span>
          <span>Feito na Hora</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#2B1720]">
          Nossas Criações Exclusivas
        </h2>

        <p className="text-sm sm:text-base text-[#6E5761] font-light">
          Massa leve, crocância incomparável e recheios nobres preparados com os melhores ingredientes do mundo da confeitaria.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 mb-10">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#8C767F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por crepe, waffle, gelato, Nutella..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E8DFD7] rounded-full focus:outline-none focus:border-[#8D2B52] focus:ring-1 focus:ring-[#8D2B52] text-[#3A1F2D] placeholder-[#9D8B93] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C767F] hover:text-[#3A1F2D] cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Interactive Category Segmented Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none px-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#8D2B52] text-white shadow-sm'
                    : 'bg-white text-[#644D56] hover:bg-[#FAF0F3] hover:text-[#8D2B52] border border-[#EAE1D7]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Interactive Banner for Customizer */}
      <div className="mb-12 bg-gradient-to-r from-[#FAF2F5] via-[#FBF5ED] to-[#F5ECEE] border border-[#ECD9E0] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8D2B52]">
            <Sparkles className="w-3.5 h-3.5 text-[#C97A96]" />
            <span>Experiência Interativa</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#2C1822]">
            Quer criar sua própria combinação de Bubble Waffle?
          </h3>
          <p className="text-xs sm:text-sm text-[#6C5660] max-w-xl font-light">
            Selecione a massa, o recheio farto, 2 bolas de gelato artesanal, confeitos especiais (Kinder, KitKat, castanhas) e frutas frescas.
          </p>
        </div>

        <button
          onClick={() => {
            const bwProduct = productsData.find((p) => p.id === 'bw-tradicional');
            if (bwProduct) onCustomize(bwProduct);
          }}
          className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#8D2B52] hover:bg-[#772144] rounded-full shadow-md hover:shadow-lg transition-all duration-200 shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#FFD6E2]" />
          <span>Montar Meu Waffle Agora</span>
        </button>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onCustomize={onCustomize}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EFE8DF] p-8 max-w-md mx-auto space-y-3">
          <p className="text-base font-semibold text-[#3A1F2D]">Nenhum item encontrado</p>
          <p className="text-xs text-[#7B666F]">
            Não encontramos nenhum produto com o termo "{searchQuery}". Tente buscar por outros ingredientes ou limpe a busca.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 text-xs font-medium text-[#8D2B52] bg-[#FCECEF] hover:bg-[#F7D8E0] rounded-full transition-colors cursor-pointer"
          >
            Ver cardápio completo
          </button>
        </div>
      )}
    </section>
  );
};
