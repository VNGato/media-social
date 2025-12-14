import React, { useState } from 'react';
import { UserPlus, Check } from 'lucide-react';

const FriendRow = ({ name, img, sub }) => {
  const [status, setStatus] = useState('add');
  
  return (
    <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#F0F2F5] transition cursor-pointer border-b border-gray-100 last:border-0">
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}${img}`} className="w-[40px] h-[40px] rounded-full border border-gray-200 bg-white" alt={name} />
      <div className="flex-1">
        <p className="font-semibold text-[15px] text-[#050505] leading-tight hover:underline">{name}</p>
        {sub && <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>}
        {status === 'sent' && <p className="text-[11px] text-[#1877F2] font-medium">Solicitação pendente</p>}
      </div>
      <button onClick={() => setStatus(status === 'add' ? 'sent' : 'add')} className={`font-semibold px-3 py-1.5 rounded-[6px] transition text-[13px] flex items-center gap-1 ${status === 'add' ? 'bg-[#E4E6EB] hover:bg-[#d8dadf] text-[#050505]' : 'bg-[#E7F3FF] text-[#1877F2] hover:bg-[#DBEBFF]'}`}>
         {status === 'add' ? (<><UserPlus size={16} /><span className="hidden sm:inline">Adicionar</span></>) : (<><Check size={16} /><span className="hidden sm:inline">Enviada</span></>)}
      </button>
    </div>
  );
};

export default function FriendList() {
  const peopleList = [
    { name: "Vilson De Carvalho", img: "1" },
    { name: "Vilson Carvalho de Souza", img: "2" },
    { name: "Vilson Gonçalves de Carvalho", img: "3" },
    { name: "Vilson de Carvalho", img: "4" },
    { name: "Miguel Pereira de Carvalho", img: "5" },
    { name: "Vilson De Carvalho", img: "6" },
    { name: "Vilson Carvalho de Araujo", img: "7" },
    { name: "Vilson Gomes De Carvalho", sub: "Feliz", img: "8" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-100">
         <h2 className="text-[17px] font-bold text-[#050505]">Outras pessoas chamadas Vilson de Carvalho</h2>
      </div>
      <div>
        {peopleList.map((person, i) => (
          <FriendRow key={i} {...person} />
        ))}
      </div>
      <button className="block w-full text-center py-2 bg-gray-50 hover:bg-gray-100 text-[#050505] font-semibold text-[14px] border-t border-gray-200">
          Ver mais pessoas com o mesmo nome
      </button>
    </div>
  );
}