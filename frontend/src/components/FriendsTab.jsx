import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

export default function FriendsTab() {
  const friends = [
    "Maria Silva", "João Souza", "Ana Oliveira", "Pedro Santos", 
    "Lucas Lima", "Carla Dias", "Marcos Rocha", "Fernanda Costa"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Topo da Aba */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-[20px] font-bold text-[#050505] w-full md:w-auto">Amigos</h2>
        
        <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <input type="text" placeholder="Pesquisar" className="bg-[#F0F2F5] rounded-full pl-8 pr-4 py-1.5 text-sm focus:outline-none w-full" />
            </div>
            <button className="text-[#1877F2] font-semibold hover:bg-gray-100 px-3 py-1.5 rounded transition text-sm">Solicitações de amizade</button>
            <button className="text-[#1877F2] font-semibold hover:bg-gray-100 px-3 py-1.5 rounded transition text-sm">Encontrar amigos</button>
        </div>
      </div>

      {/* Menu de Filtros */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-4">
          <button className="px-4 py-2 font-semibold text-[#1877F2] border-b-[3px] border-[#1877F2]">Todos os amigos</button>
          <button className="px-4 py-2 font-semibold text-[#65676B] hover:bg-gray-100 rounded">Cidade atual</button>
          <button className="px-4 py-2 font-semibold text-[#65676B] hover:bg-gray-100 rounded">Trabalho</button>
          <button className="px-4 py-2 font-semibold text-[#65676B] hover:bg-gray-100 rounded">Faculdade</button>
      </div>

      {/* Grid de Amigos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
             <img 
               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friends[i] || i}&backgroundColor=c0aede`} 
               className="w-[80px] h-[80px] rounded-lg border border-gray-100 bg-white" 
               alt="Amigo"
             />
             <div className="flex-1">
                <div className="font-semibold text-[#050505] text-[17px]">{friends[i] || `Amigo ${i+1}`}</div>
                <div className="text-[13px] text-[#65676B] hover:underline">45 amigos em comum</div>
             </div>
             <button className="p-2 hover:bg-gray-200 rounded-full text-[#65676B]">
                 <MoreHorizontal size={20} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}