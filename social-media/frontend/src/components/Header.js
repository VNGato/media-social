import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 h-[48px] flex items-center justify-between px-[15%]">
      <div className="flex items-center">
        <h1 className="text-[#1877F2] text-[28px] font-bold tracking-tighter cursor-pointer mt-[-4px]">facebook</h1>
      </div>
      <div className="flex items-center gap-3">
          <div className="flex gap-2 items-center">
              <input type="text" placeholder="Email ou telefone" className="border border-gray-300 px-2 py-1 text-[12px] h-[26px] w-[150px] focus:border-blue-500 outline-none" />
              <input type="password" placeholder="Senha" className="border border-gray-300 px-2 py-1 text-[12px] h-[26px] w-[150px] focus:border-blue-500 outline-none" />
              <button className="bg-[#1877F2] text-white px-2 font-bold text-[12px] h-[26px] hover:bg-[#166fe5] border border-[#1877F2]">Entrar</button>
          </div>
          <a href="#" className="text-[#1877F2] hover:underline text-[11px] whitespace-nowrap">Esqueceu a conta?</a>
      </div>
    </header>
  );
}