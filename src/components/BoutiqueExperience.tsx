import React from 'react';
import { Heart, Sparkles, Award, ShieldCheck, Instagram, MapPin } from 'lucide-react';
import interiorImg from '../assets/images/boutique_interior_ambiance_1790166351275.jpg';
import crepeFrancesImg from '../assets/images/crepe_frances_gourmet_1790166331970.jpg';
import crepeSuicoImg from '../assets/images/crepe_suico_crocante_1790166341716.jpg';
import { storeInfo } from '../data/products';

export const BoutiqueExperience: React.FC = () => {
  return (
    <section id="boutique" className="py-20 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border-t border-b border-[#EFE8DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8D2B52]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nossa Essência & Paixão</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#2B1720] [text-wrap:balance]">
              Um refúgio acolhedor onde cada crepe conta uma história.
            </h2>
          </div>
          <div className="lg:col-span-4 text-xs sm:text-sm text-[#6C5660] font-light leading-relaxed">
            Fundada pelas chefs <strong className="font-semibold text-[#3A1F2D]">{storeInfo.founders}</strong>, a Heaven's Joy nasceu com o propósito de transformar os melhores momentos do seu dia em memórias doces, unindo a clássica confeitaria europeia ao calor e carinho de Ibaiti.
          </div>
        </div>

        {/* 3 Pillar Bento Grid with Restraint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EAE0D8] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FCECEF] text-[#8D2B52] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-[#2C1822]">
              Ingredientes Nobres & Selecionados
            </h3>
            <p className="text-xs sm:text-sm text-[#6C5761] leading-relaxed font-light">
              Não abrimos mão da qualidade: usamos Nutella original Ferrero, chocolate belga, puro Catupiry cremoso, doce de leite artesanal e frutas frescas selecionadas diariamente.
            </p>
          </div>

          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EAE0D8] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FCECEF] text-[#8D2B52] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-[#2C1822]">
              Massa Assada no Momento
            </h3>
            <p className="text-xs sm:text-sm text-[#6C5761] leading-relaxed font-light">
              Nossos waffles de bolha, crepes franceses em renda e suíços no palito são assados exclusivamente quando você faz o pedido, garantindo aroma irresistível e crocância ímpar.
            </p>
          </div>

          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EAE0D8] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FCECEF] text-[#8D2B52] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-[#2C1822]">
              Ambiente Afetuoso & Instagramável
            </h3>
            <p className="text-xs sm:text-sm text-[#6C5761] leading-relaxed font-light">
              Cada canto da nossa boutique física em Ibaiti foi pensado para encantar os olhos e o paladar: tons pastéis, lavandas suaves, iluminação calorosa e hospitalidade genuína.
            </p>
          </div>
        </div>

        {/* Boutique Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-[#EFE8DF] aspect-[16/10] relative group">
            <img
              src={interiorImg}
              alt="Interior acolhedor da Heaven's Joy Creperia em Ibaiti"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <p className="text-xs uppercase tracking-wider text-[#FFD6E2] font-semibold">
                Nossa Casa em Ibaiti
              </p>
              <h4 className="text-lg sm:text-xl font-serif font-bold">
                {storeInfo.address}
              </h4>
              <p className="text-xs text-white/90">
                Venha nos visitar para uma tarde doce inesquecível ou peça no conforto do seu lar.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="rounded-3xl overflow-hidden shadow-md border border-[#EFE8DF] aspect-[16/9] relative group">
              <img
                src={crepeFrancesImg}
                alt="Crepe Francês La Vie En Rose com chocolate belga e morangos"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[11px] uppercase tracking-wider text-[#FFD6E2] font-semibold">
                  Receita Tradicional
                </p>
                <h4 className="text-sm font-serif font-semibold">
                  Crepes Franceses Doces e Salgados
                </h4>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-md border border-[#EFE8DF] aspect-[16/9] relative group">
              <img
                src={crepeSuicoImg}
                alt="Crepe Suíço Crocante no Palito com recheio de queijo derretido"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[11px] uppercase tracking-wider text-[#FFD6E2] font-semibold">
                  Crocância e Sabor
                </p>
                <h4 className="text-sm font-serif font-semibold">
                  Crepes Suíços Recheados no Palito
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Community Connect Bar */}
        <div className="bg-[#FAF4EC] rounded-3xl p-6 sm:p-8 border border-[#E9DACF] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8D2B52] to-[#C97A96] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-serif font-semibold text-[#2E1923]">
                Acompanhe a @creperia_e_doceria
              </h4>
              <p className="text-xs text-[#705A64]">
                Mais de {storeInfo.instagramFollowers} apaixonados acompanhando nossos bastidores e fornadas diárias no Instagram.
              </p>
            </div>
          </div>

          <a
            href={storeInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#8D2B52] hover:bg-[#772144] rounded-full shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Seguir no Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
