import React from 'react';
import { UserPlus, Check } from 'lucide-react';

/* 
  Agora este componente recebe:
  - suggestions: A lista real do banco
  - onAddFriend: A função para chamar a API
*/
export default function FriendList({ suggestions, onAddFriend }) {
  
  if (!suggestions) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-100">
         <h2 className="text-[17px] font-bold text-[#050505]">Outras pessoas chamadas Vilson de Carvalho</h2>
      </div>
      
      <div>
        {suggestions.map((person) => (
           <div key={person.id} className="flex items-center gap-3 px-4 py-2 hover:bg-[#F0F2F5] transition cursor-pointer border-b border-gray-100 last:border-0">
             <img 
                src={person.avatar_url} 
                className="w-[40px] h-[40px] rounded-full border border-gray-200 bg-white"
                alt={person.name}
             />
             
             <div className="flex-1">
               <p className="font-semibold text-[15px] text-[#050505] leading-tight hover:underline">{person.name}</p>
               <p className="text-[11px] text-gray-500 mt-0.5">{person.mutual_friends}</p>
               {person.status === 'sent' && <p className="text-[11px] text-[#1877F2] font-medium">Solicitação pendente</p>}
             </div>
             
             <button 
               onClick={() => onAddFriend(person.id)}
               className={`
                 font-semibold px-3 py-1.5 rounded-[6px] transition text-[13px] flex items-center gap-1
                 ${person.status === 'add' 
                   ? 'bg-[#E4E6EB] hover:bg-[#d8dadf] text-[#050505]' 
                   : 'bg-[#E7F3FF] text-[#1877F2] hover:bg-[#DBEBFF]'
                 }
               `}
             >
                {person.status === 'add' ? (
                  <>
                    <UserPlus size={16} />
                    <span className="hidden sm:inline">Adicionar</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span className="hidden sm:inline">Enviada</span>
                  </>
                )}
             </button>
           </div>
        ))}
      </div>
      
      <button className="block w-full text-center py-2 bg-gray-50 hover:bg-gray-100 text-[#050505] font-semibold text-[14px] border-t border-gray-200">
          Ver mais pessoas com o mesmo nome
      </button>
    </div>
  );
}