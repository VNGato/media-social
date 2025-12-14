import React, { useState } from 'react';
import { MoreHorizontal, Globe, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

export default function Post({ text, image, time }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      {/* Header do Post */}
      <div className="p-3 flex items-center gap-2">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=VilsonC&backgroundColor=e6e6e6" 
          alt="Avatar" 
          className="w-10 h-10 rounded-full border border-gray-200"
        />
        <div className="flex-1">
          <h3 className="font-bold text-[#050505] text-[15px] leading-tight hover:underline cursor-pointer">Vilson de Carvalho</h3>
          <div className="flex items-center gap-1 text-[#65676B] text-[13px]">
            <span>{time}</span>
            <span>·</span>
            <Globe size={12} />
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full text-[#65676B]">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Conteúdo (Texto e Imagem) */}
      <div className="pb-2">
        {text && <p className="px-3 pb-2 text-[15px] text-[#050505]">{text}</p>}
        {image && (
          <div className="w-full bg-gray-100 cursor-pointer">
            <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}
      </div>

      {/* Footer (Likes e Botões) */}
      <div className="px-3">
        {/* Contagem de Likes */}
        <div className="flex items-center justify-between py-2 border-b border-gray-200 text-[13px] text-[#65676B]">
            <div className="flex items-center gap-1">
                <div className="bg-blue-500 rounded-full p-1"><ThumbsUp size={10} className="text-white fill-white" /></div>
                <span>{liked ? 'Você e outras 42 pessoas' : '42 pessoas'}</span>
            </div>
            <div className="flex gap-3">
                <span>8 comentários</span>
                <span>2 compartilhamentos</span>
            </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center py-1">
            <button 
              onClick={() => setLiked(!liked)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100 font-semibold text-[14px] transition ${liked ? 'text-blue-500' : 'text-[#65676B]'}`}
            >
                <ThumbsUp size={18} className={liked ? "fill-current" : ""} />
                <span>Curtir</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100 text-[#65676B] font-semibold text-[14px]">
                <MessageCircle size={18} />
                <span>Comentar</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100 text-[#65676B] font-semibold text-[14px]">
                <Share2 size={18} />
                <span>Compartilhar</span>
            </button>
        </div>
      </div>
    </div>
  );
}