import React from 'react';

export default function PhotosTab({ photos }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-bold text-[#050505]">Fotos</h2>
        <button className="text-[#1877F2] hover:bg-gray-100 px-3 py-1 rounded transition">Adicionar fotos</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* Se não tiver fotos, mostra aviso */}
        {photos && photos.length > 0 ? (
            photos.map((photo) => (
            <div key={photo.id} className="aspect-square bg-gray-100 rounded overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition">
                <img 
                src={photo.url} 
                className="w-full h-full object-cover" 
                alt="Galeria"
                />
            </div>
            ))
        ) : (
            <p className="text-gray-500">Nenhuma foto encontrada.</p>
        )}
      </div>
    </div>
  );
}