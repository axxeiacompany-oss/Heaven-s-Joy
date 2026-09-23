import React from 'react';
import { Clock, ShoppingBag, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { storeInfo } from '../data/products';

interface StoreStatusBannerProps {
  isOpenNow: boolean;
  onExploreMenu: () => void;
}

export const StoreStatusBanner: React.FC<StoreStatusBannerProps> = ({ isOpenNow, onExploreMenu }) => {
  return (
    <div className="bg-[#FAF4EC] border-b border-[#EADFCF] py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5D464F]">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-[#3A1F2D] font-semibold">
              {isOpenNow ? 'Estamos Abertos agora!' : 'Horário de Funcionamento:'}
            </span>
            <span>{storeInfo.openingHours}</span>
          </div>
          <span className="hidden md:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1 text-emerald-800 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sem pedido mínimo</span>
          </div>
          <span className="hidden md:inline" aria-hidden="true">·</span>
          <span className="text-[#765D66]">Entrega rápida para toda Ibaiti & Retirada no balcão</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent('Olá Heaven\'s Joy! Gostaria de tirar uma dúvida sobre o cardápio.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8D2B52] hover:text-[#671A37] font-semibold transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
