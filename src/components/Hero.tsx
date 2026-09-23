import React from 'react';
import { Sparkles, ArrowRight, Star, Clock, MapPin, Heart } from 'lucide-react';
import heroImg from '../assets/images/hero_bubble_waffle_boutique_1790166311611.jpg';
import { storeInfo } from '../data/products';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCustomizer: () => void;
  isOpenNow: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenCustomizer, isOpenNow }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FDFBF7] to-[#FAF7F2] py-12 md:py-20 border-b border-[#EFE8DF]">
      {/* Delicate background ambient glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3D7DF]/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-72 h-72 bg-[#E9DACF]/30 rounded-full blur-2xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial & Brand Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Clean unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#8D2B52]">
              <span>Creperia & Doceria Boutique</span>
              <span aria-hidden="true">·</span>
              <span>Ibaiti, PR</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-[#8D2B52]">
                <Star className="w-3.5 h-3.5 fill-[#C97A96] text-[#C97A96]" />
                {storeInfo.rating} ({storeInfo.reviewsCount} pedidos avaliados)
              </span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#2B1720] leading-[1.12] [text-wrap:balance]">
              Onde o sabor encontra o requinte em cada detalhe.
            </h1>

            {/* Prose description */}
            <p className="text-base sm:text-lg text-[#614952] leading-relaxed max-w-2xl font-light">
              Desfrute da mais autêntica experiência de crepes franceses aveludados, crepes suíços crocantes e o nosso consagrado <strong className="font-semibold text-[#3A1F2D]">Bubble Waffle</strong> com gelato artesanal, frutas frescas e puro chocolate belga.
            </p>

            {/* Operational indicators bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#735A64] pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8D2B52]" />
                <span>Atendimento diário: 16h às 23h</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8D2B52]" />
                <span>Av. Gov. Paulo Cruz Pimentel, 445</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 font-medium text-[#2E6B47]">
                <span>Sem pedido mínimo</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreMenu}
                className="px-7 py-3.5 text-sm font-semibold text-white bg-[#8D2B52] hover:bg-[#762043] rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>Fazer Pedido Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenCustomizer}
                className="px-6 py-3.5 text-sm font-semibold text-[#8D2B52] bg-white border border-[#E9D5DC] hover:border-[#8D2B52] hover:bg-[#FAF4F6] rounded-full shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C97A96]" />
                <span>Monte seu Bubble Waffle</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EFE8DF] max-w-xl">
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#3A1F2D] tabular-nums">100%</p>
                <p className="text-xs text-[#7A636C]">Massa assada na hora</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#3A1F2D] tabular-nums">Pura</p>
                <p className="text-xs text-[#7A636C]">Nutella & Frutas Frescas</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#3A1F2D] tabular-nums">Express</p>
                <p className="text-xs text-[#7A636C]">Delivery & Retirada</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative arched frame with subtle shadow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5] object-cover">
                <img
                  src={heroImg}
                  alt="Bubble Waffle Artesanal Heaven's Joy com gelato e morangos frescos"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Floating caption card inside the image scrim */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFD6E2]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Destaque da Confeitaria</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold leading-tight text-white">
                    Bubble Waffles com Gelato Artesanal
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/90 pt-1">
                    <span>A partir de <strong className="text-white text-sm tabular-nums">R$ 25,00</strong></span>
                    <button
                      onClick={onOpenCustomizer}
                      className="px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-xs font-medium text-white transition-colors cursor-pointer"
                    >
                      Personalizar agora →
                    </button>
                  </div>
                </div>
              </div>

              {/* Little floating social trust badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#EFE8DF] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FCECEF] flex items-center justify-center text-[#8D2B52]">
                  <Heart className="w-5 h-5 fill-[#8D2B52]" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#3A1F2D]">+2.100 Clientes</p>
                  <p className="text-[11px] text-[#7A636C]">Apaixonados em Ibaiti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
