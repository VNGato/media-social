import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function EditProfileModal({ isOpen, onClose, currentUser, onSave }) {
  // Estado local do formulário
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    bio: currentUser.bio || '',
    city: currentUser.city || '',
    work: currentUser.work || '',
    avatar_url: currentUser.avatar_url || '',
    cover_url: currentUser.cover_url || ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    // Fundo escuro transparente
    <div className="fixed inset-0 bg-black/60 z-[60] flex justify-center items-center p-4">
      
      {/* Caixa Branca */}
      <div className="bg-white w-full max-w-[600px] rounded-lg shadow-xl overflow-hidden">
        
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 relative">
          <h2 className="text-[20px] font-bold text-center w-full">Editar perfil</h2>
          <button onClick={onClose} className="absolute right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>

        {/* Corpo do Formulário (Com rolagem se precisar) */}
        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4">
          
          <div>
             <label className="block font-bold mb-1">Nome de exibição</label>
             <input name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded focus:border-blue-500 outline-none" />
          </div>

          <div>
             <label className="block font-bold mb-1">Biografia (Bio)</label>
             <input name="bio" value={formData.bio} onChange={handleChange} className="w-full border p-2 rounded focus:border-blue-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block font-bold mb-1">Cidade atual</label>
                <input name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded focus:border-blue-500 outline-none" />
             </div>
             <div>
                <label className="block font-bold mb-1">Trabalho</label>
                <input name="work" value={formData.work} onChange={handleChange} className="w-full border p-2 rounded focus:border-blue-500 outline-none" />
             </div>
          </div>

          <div>
             <label className="block font-bold mb-1">URL da Foto de Perfil</label>
             <input name="avatar_url" value={formData.avatar_url} onChange={handleChange} className="w-full border p-2 rounded focus:border-blue-500 outline-none text-xs text-gray-600" />
             <p className="text-[11px] text-gray-400 mt-1">Cole um link de imagem (ex: https://site.com/foto.jpg)</p>
          </div>

          <div>
             <label className="block font-bold mb-1">URL da Capa</label>
             <input name="cover_url" value={formData.cover_url} onChange={handleChange} className="w-full border p-2 rounded focus:border-blue-500 outline-none text-xs text-gray-600" />
          </div>

        </div>

        {/* Rodapé com Botão Salvar */}
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-blue-600 font-bold hover:bg-gray-100 rounded mr-2">Cancelar</button>
          <button onClick={handleSubmit} className="px-8 py-2 bg-[#1877F2] text-white font-bold rounded hover:bg-[#166fe5]">Salvar</button>
        </div>

      </div>
    </div>
  );
}