import React, { useState } from 'react';
import { Video, Image, Smile } from 'lucide-react';

export default function CreatePost({ onPost }) {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      onPost(text); // Envia o texto para o pai (App.jsx)
      setText('');  // Limpa o campo
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4">
      <div className="flex gap-3 mb-3">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=VilsonC&backgroundColor=e6e6e6" 
          alt="Perfil" 
          className="w-10 h-10 rounded-full border border-gray-200"
        />
        <div className="flex-1 bg-[#F0F2F5] rounded-full flex items-center px-4 hover:bg-[#E4E6EB] transition focus-within:bg-gray-200 focus-within:ring-1 focus-within:ring-blue-200">
          <input 
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="No que você está pensando, Vilson?"
            className="bg-transparent w-full h-full py-2 outline-none text-[#050505] placeholder-gray-500"
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-2 flex justify-between px-4">
        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg flex-1 justify-center transition">
          <Video className="text-red-500" size={24} />
          <span className="text-[#65676B] font-semibold text-[14px] hidden sm:inline">Vídeo ao vivo</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg flex-1 justify-center transition">
          <Image className="text-green-500" size={24} />
          <span className="text-[#65676B] font-semibold text-[14px] hidden sm:inline">Foto/vídeo</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg flex-1 justify-center transition">
          <Smile className="text-yellow-500" size={24} />
          <span className="text-[#65676B] font-semibold text-[14px] hidden sm:inline">Sentimento</span>
        </button>
      </div>
    </div>
  );
}