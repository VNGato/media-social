import React from 'react';

export default function PhotosTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-bold text-[#050505]">Fotos</h2>
        <button className="text-[#1877F2] hover:bg-gray-100 px-3 py-1 rounded transition">Adicionar fotos</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* Gerando várias fotos aleatórias */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-100 rounded overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition">
            <img 
              src={`https://picsum.photos/400?random=${i + 50}`} 
              className="w-full h-full object-cover" 
              alt={`Foto ${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}