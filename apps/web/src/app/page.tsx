'use client'

export default function Home() {
  return (
    <div>
      <img src="landing-page-bg.png" className="w-full h-[225px] mb-16"/>
      <h1 className="font-semibold text-3xl text-center">Selamat Datang di</h1>
      <img src="logo.png" className="mx-auto w-72 -mt-6 mb-6"/>
      <div className="flex flex-col items-center">
      <button
        className="bg-[#EDCD50] border-[1px] border-[#1E1E1E] shadow-[0.5px_1.5px_0_rgba(30,30,30,1)] 
        rounded-lg px-6 py-2 mb-5 w-64 font-semibold 
        transform transition-transform duration-200 hover:scale-105"
      >
        Masuk
      </button>
      <button
        className="bg-[#B3EBCE] border-[1px] border-[#1E1E1E] shadow-[0.5px_1.5px_0_rgba(30,30,30,1)] 
        rounded-lg px-6 py-2 mb-5 w-64 font-semibold 
        transform transition-transform duration-200 hover:scale-105"
      >
        Daftar Akun</button>
      </div>
    </div>
  )
}