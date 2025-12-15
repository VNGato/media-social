import React from 'react';
import { MoreHorizontal, Pencil } from 'lucide-react';

// Recebemos 'onEditClick' agora
export default function ProfileHeader({ activeTab, setActiveTab, userData, onEditClick }) {
  
  const getTabClass = (tabName) => {
    const isActive = activeTab === tabName;
    return `px-4 h-full flex items-center transition cursor-pointer border-b-[3px] ${isActive ? 'text-[#1877F2] border-[#1877F2]' : 'text-[#65676B] border-transparent hover:bg-gray-100'}`;
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-300 relative mb-3">
      <div className="h-[315px] bg-gradient-to-t from-black via-[#001f3f] to-[#001f3f] relative overflow-hidden">
         <img src={userData.cover_url} className="w-full h-full object-cover opacity-80" alt="Capa" />
         <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
      </div>
      <div className="px-8 pb-0 relative">
        <div className="flex flex-col md:flex-row items-end -mt-[30px] relative z-10 mb-4">
          
          {/* Avatar */}
          <div className="w-[160px] h-[160px] rounded-full border-[4px] border-white bg-white overflow-hidden shadow-sm relative -top-6 mx-auto md:mx-0">
            <img src={userData.avatar_url} alt="Perfil" className="w-full h-full object-cover"/>
          </div>
          
          {/* Nome e Botão Editar */}
          <div className="md:ml-5 mb-6 flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full mt-[-40px] md:mt-0">
            <div className="text-center md:text-left">
               <h1 className="text-[30px] font-bold text-[#1c1e21] leading-tight">{userData.name}</h1>
               <p className="text-[#65676B] font-semibold text-[15px]">{userData.bio}</p>
            </div>

            {/* BOTÃO EDITAR PERFIL */}
            <button 
              onClick={onEditClick}
              className="mt-4 md:mt-0 bg-[#E4E6EB] hover:bg-[#d8dadf] text-[#050505] px-3 py-1.5 rounded-[6px] font-semibold text-[15px] flex items-center gap-2 transition"
            >
              <Pencil size={16} />
              <span>Editar perfil</span>
            </button>
          </div>
        </div>

        <div className="border-t border-gray-300"></div>
        
        {/* Menu */}
        <div className="flex items-center h-[50px] text-[14px] font-semibold text-[#65676B] overflow-x-auto">
          <div className="flex h-full">
            <button onClick={() => setActiveTab('posts')} className={getTabClass('posts')}>Posts</button>
            <button onClick={() => setActiveTab('about')} className={getTabClass('about')}>Sobre</button>
            <button onClick={() => setActiveTab('friends')} className={getTabClass('friends')}>Amigos</button>
            <button onClick={() => setActiveTab('photos')} className={getTabClass('photos')}>Fotos</button>
          </div>
        </div>
      </div>
    </div>
  );
}