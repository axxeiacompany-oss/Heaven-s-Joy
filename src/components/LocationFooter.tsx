import React from 'react';
import { MapPin, Clock, Phone, Instagram, Navigation, Heart, ExternalLink } from 'lucide-react';
import { storeInfo } from '../data/products';

export const LocationFooter: React.FC = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Avenida Governador Paulo Cruz Pimentel 445 Ibaiti PR'
  )}`;

  return (
    <footer id="localizacao" className="bg-[#26171E] text-[#EFE8DF] pt-16 pb-12 border-t border-[#38232D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-white">
              Heaven's Joy
            </h3>
            <p className="text-xs sm:text-sm text-[#CDBEC5] leading-relaxed font-light">
              Boutique gastronômica especializada em crepes franceses aveludados, crepes suíços crocantes e bubble waffles artesanais com gelatos finos.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={storeInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8D2B52] transition-colors flex items-center justify-center text-white cursor-pointer"
                title="Siga nosso Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] transition-colors flex items-center justify-center text-white cursor-pointer"
                title="Fale no WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={storeInfo.anotaAiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8D2B52] transition-colors flex items-center justify-center text-white cursor-pointer"
                title="Link Anota AI Original"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#E5B5C4]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#CDBEC5]">
              <li>
                <a href="#cardapio" className="hover:text-white transition-colors">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-white transition-colors">
                  Bubble Waffles
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-white transition-colors">
                  Crepes Franceses
                </a>
              </li>
              <li>
                <a href="#boutique" className="hover:text-white transition-colors">
                  A Boutique
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-white transition-colors">
                  Avaliações
                </a>
              </li>
            </ul>
          </div>

          {/* Operation Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#E5B5C4]">
              Horário & Funcionamento
            </h4>
            <div className="space-y-2 text-xs text-[#CDBEC5]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E5B5C4] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Terça a Domingo</p>
                  <p>16:00 às 23:00</p>
                </div>
              </div>
              <p className="text-[11px] text-[#A6949C] pt-1">
                Pedidos aceitos para consumo no local, retirada balcão e delivery para todo o município de Ibaiti - PR.
              </p>
            </div>
          </div>

          {/* Physical Address & Directions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#E5B5C4]">
              Localização Física
            </h4>
            <div className="space-y-2 text-xs text-[#CDBEC5]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E5B5C4] shrink-0 mt-0.5" />
                <p className="leading-snug">{storeInfo.address}</p>
              </div>
              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Traçar Rota no Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#38232D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A6949C]">
          <p>© {new Date().getFullYear()} Heaven's Joy — Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Criado com carinho pelas chefs {storeInfo.founders}</span>
            <Heart className="w-3 h-3 text-[#E5B5C4] fill-[#E5B5C4]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
