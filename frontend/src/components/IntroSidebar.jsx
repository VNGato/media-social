import React from 'react';
import { Briefcase, GraduationCap, School, MapPin } from 'lucide-react';

// Agora recebemos 'userData' como propriedade
export default function IntroSidebar({ userData }) {
  
  // Se os dados ainda não carregaram, não mostra nada
  if (!userData) return null;

  return (
    <div className="w-[340px] shrink-0 space-y-3">
      
      {/* Card Sobre */}
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-[17px] font-bold text-[#050505] mb-3">Sobre</h2>
        
        <div className="space-y-3 text-[13px] text-[#050505]">
          {/* Trabalho (Vem do Banco) */}
          <div className="flex items-center gap-3">
            <Briefcase size={18} className="text-[#8C939D] fill-current opacity-60" />
            <span className="text-[#050505]">
              {userData.work ? `Trabalha como ${userData.work}` : "Nenhum trabalho informado"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap size={18} className="text-[#8C939D] fill-current opacity-60" />
            <span className="text-[#65676B]">Nenhuma instituição de ensino a ser exibida</span>
          </div>

          <div className="flex items-center gap-3">
            <School size={18} className="text-[#8C939D] fill-current opacity-60" />
            <div>
               <span className="text-[#65676B]">Frequentou </span>
               {/* Cidade (Usando como exemplo de escola/local) */}
               <strong className="hover:underline cursor-pointer text-[#050505]">{userData.city}</strong>
            </div>
          </div>

          {/* Cidade (Vem do Banco) */}
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-[#8C939D] fill-current opacity-60" />
            <div>
              <span className="text-[#65676B]">De </span>
              <strong className="hover:underline cursor-pointer text-[#050505]">{userData.city}</strong>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Fotos (Mantive fixo por enquanto para não quebrar o layout, mas podíamos usar userData.photos se tivéssemos essa relação) */}
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[17px] font-bold text-[#050505]">Fotos</h2>
          <a href="#" className="text-[#1877F2] text-[13px] hover:underline">Ver todas as fotos</a>
        </div>
        <div className="grid grid-cols-3 gap-1 rounded overflow-hidden">
          {[...Array(9)].map((_, i) => (
             <div key={i} className="aspect-square bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90">
               <img src={`https://picsum.photos/150?random=${i+10}`} className="w-full h-full object-cover" alt="" />
             </div>
          ))}
        </div>
      </div>
      
      {/* Footer Links */}
       <div className="text-[11px] text-[#65676B] px-1 space-x-1 leading-4">
        <a href="#" className="hover:underline">Privacidade</a> · 
        <a href="#" className="hover:underline">Termos</a> · 
        <a href="#" className="hover:underline">Publicidade</a> · 
        <span>Meta © 2025</span>
      </div>
    </div>
  );
}