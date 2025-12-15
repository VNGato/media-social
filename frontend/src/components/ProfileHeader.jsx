import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function ProfileHeader({ activeTab, setActiveTab, userData }) {
  
  const getTabClass = (tabName) => {
    const isActive = activeTab === tabName;
    return `px-4 h-full flex items-center transition cursor-pointer border-b-[3px] ${isActive ? 'text-[#1877F2] border-[#1877F2]' : 'text-[#65676B] border-transparent hover:bg-gray-100'}`;
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-300 relative mb-3">
      {/* CAPA DINÂMICA */}
      <div className="h-[315px] bg-gradient-to-t from-black via-[#001f3f] to-[#001f3f] relative overflow-hidden">
         <img src={userData.cover_url} className="w-full h-full object-cover opacity-80" alt="Capa" />
         <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
      </div>
      <div className="px-8 pb-0 relative">
        <div className="flex items-end -mt-[30px] relative z-10 mb-4">
          {/* FOTO DE PERFIL DINÂMICA */}
          <div className="w-[160px] h-[160px] rounded-full border-[4px] border-white bg-white overflow-hidden shadow-sm relative -top-6">
            <img src={userData.avatar_url} alt="Perfil" className="w-full h-full object-cover"/>
          </div>
          <div className="ml-5 mb-6 flex-1">
            {/* NOME E BIO DINÂMICOS */}
            <h1 className="text-[30px] font-bold text-[#1c1e21] leading-tight">{userData.name}</h1>
            <p className="text-[#65676B] font-semibold text-[15px]">{userData.bio}</p>
          </div>
        </div>
        <div className="border-t border-gray-300"></div>
        <div className="flex items-center h-[50px] text-[14px] font-semibold text-[#65676B]">
          <div className="flex h-full">
            <button onClick={() => setActiveTab('posts')} className={getTabClass('posts')}>Posts</button>
            <button onClick={() => setActiveTab('about')} className={getTabClass('about')}>Sobre</button>
            <button onClick={() => setActiveTab('friends')} className={getTabClass('friends')}>Amigos</button>
            <button onClick={() => setActiveTab('photos')} className={getTabClass('photos')}>Fotos</button>
          </div>
          <div className="flex-1"></div>
          <button className="bg-[#E4E6EB] px-3 py-1.5 rounded-[6px] hover:bg-[#d8dadf] transition mr-2 text-black"><MoreHorizontal size={16} /></button>
        </div>
      </div>
    </div>
  );
}