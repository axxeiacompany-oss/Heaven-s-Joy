import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';
import { storeInfo } from '../data/products';

interface Review {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  highlight: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Carolina Mendes',
    role: 'Cliente Frequente em Ibaiti',
    comment:
      'O Bubble Waffle com gelato e Nutella é de outro mundo! A massa vem crocante por fora e super macia por dentro, quentinha com o sorvete gelado. Sem falar no atendimento impecável das meninas!',
    rating: 5,
    highlight: 'Melhor Bubble Waffle do Paraná',
  },
  {
    id: '2',
    name: 'Guilherme Siqueira',
    role: 'Pedido via Delivery',
    comment:
      'Pedi o Crepe Francês de Filé Mignon ao Quatro Queijos e veio fumegando na embalagem térmica, queijo puxando e carne muito macia. Chegou em menos de 30 minutos. Virei fã número um.',
    rating: 5,
    highlight: 'Entrega rápida e sabor impecável',
  },
  {
    id: '3',
    name: 'Juliana P. Castro',
    role: 'Visitante de Japira / Ibaiti',
    comment:
      'O espaço físico é um encanto à parte, parece uma doceria de Paris! O crepe suíço de frango com catupiry crocante e o waffle com morangos frescos são paradas obrigatórias toda semana.',
    rating: 5,
    highlight: 'Ambiente lindo e acolhedor',
  },
];

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#8D2B52]">
          <Star className="w-3.5 h-3.5 fill-[#C97A96] text-[#C97A96]" />
          <span>Experiências Reais</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#2C1822]">
          O que dizem os apaixonados pela Heaven's Joy
        </h2>

        <div className="flex items-center justify-center gap-2 text-xs text-[#6F5B63]">
          <span className="font-bold text-[#3A1F2D] text-sm tabular-nums">{storeInfo.rating}</span>
          <div className="flex text-[#C97A96]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#C97A96]" />
            ))}
          </div>
          <span aria-hidden="true">·</span>
          <span>Mais de {storeInfo.reviewsCount} pedidos avaliados na região de Ibaiti</span>
        </div>
      </div>

      {/* Testimonials 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8DF] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-[#C97A96]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C97A96]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#EADFCF]" />
              </div>

              <p className="text-xs font-semibold text-[#8D2B52]">"{rev.highlight}"</p>

              <p className="text-xs sm:text-sm text-[#5C454F] leading-relaxed font-light">
                {rev.comment}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F4ECE5] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF0F3] text-[#8D2B52] flex items-center justify-center font-serif font-bold text-xs">
                {rev.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#3A1F2D]">{rev.name}</p>
                <p className="text-[11px] text-[#8C767F]">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
