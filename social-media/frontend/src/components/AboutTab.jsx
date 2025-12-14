import React from 'react';
import { Briefcase, GraduationCap, MapPin, Heart, Home, Phone, Rss } from 'lucide-react';

export default function AboutTab() {
  // Categorias laterais (apenas visual)
  const categories = ["Visão geral", "Trabalho e educação", "Locais onde morou", "Informações básicas", "Família e relacionamentos", "Detalhes sobre você", "Acontecimentos"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[400px] flex flex-col md:flex-row overflow-hidden">
      
      {/* Menu Lateral do Sobre */}
      <div className="w-full md:w-1/3 border-r border-gray-200 p-2 md:p-4 border-b md:border-b-0">
        <h2 className="text-[20px] font-bold text-[#050505] mb-3 px-2">Sobre</h2>
        <ul className="space-y-1">
          {categories.map((cat, i) => (
            <li key={i} className={`px-3 py-2 rounded-md font-semibold text-[15px] cursor-pointer ${i === 0 ? 'bg-blue-50 text-[#1877F2]' : 'text-[#65676B] hover:bg-gray-100'}`}>
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Conteúdo da Direita */}
      <div className="w-full md:w-2/3 p-4 md:p-6 space-y-6">
        
        {/* Seção Trabalho */}
        <div>
           <h3 className="text-[17px] font-bold text-[#050505] mb-3">Trabalho e educação</h3>
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Briefcase className="text-[#8C939D]" size={24} />
                 <div>
                    <span className="text-[#050505] text-[15px]">Trabalha na empresa <strong className="cursor-pointer hover:underline">Autônomo</strong></span>
                    <div className="text-[12px] text-[#65676B]">Começou em 2018</div>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <GraduationCap className="text-[#8C939D]" size={24} />
                 <span className="text-[#050505] text-[15px]">Estudou na instituição <strong className="cursor-pointer hover:underline">Vida</strong></span>
              </div>
           </div>
        </div>

        {/* Seção Onde Mora */}
        <div>
           <h3 className="text-[17px] font-bold text-[#050505] mb-3">Locais onde morou</h3>
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Home className="text-[#8C939D]" size={24} />
                 <div>
                    <span className="text-[#050505] text-[15px]">Mora em <strong className="cursor-pointer hover:underline">Artur Nogueira</strong></span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <MapPin className="text-[#8C939D]" size={24} />
                 <div>
                    <span className="text-[#050505] text-[15px]">De <strong className="cursor-pointer hover:underline">Artur Nogueira</strong></span>
                 </div>
              </div>
           </div>
        </div>

        {/* Seção Info Básica */}
        <div>
           <h3 className="text-[17px] font-bold text-[#050505] mb-3">Informações básicas</h3>
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Phone className="text-[#8C939D]" size={24} />
                 <span className="text-[#050505] text-[15px]">+55 19 99999-9999</span>
                 <span className="text-xs bg-gray-200 px-1 rounded ml-2">Celular</span>
              </div>
              <div className="flex items-center gap-3">
                 <Heart className="text-[#8C939D]" size={24} />
                 <span className="text-[#050505] text-[15px]">Solteiro(a)</span>
              </div>
              <div className="flex items-center gap-3">
                 <Rss className="text-[#8C939D]" size={24} />
                 <span className="text-[#050505] text-[15px]">Seguido por <strong className="cursor-pointer hover:underline">850 pessoas</strong></span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}