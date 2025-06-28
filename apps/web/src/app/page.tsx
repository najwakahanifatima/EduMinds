'use client'
import Button from './_components/Button'; 

export default function Home() {
  return (
    <div>
      <img src="landing-page-bg.png" className="w-full h-[225px] mb-16"/>
      <h1 className="font-semibold text-3xl text-center">Selamat Datang di</h1>
      <img src="logo.png" className="mx-auto w-72 -mt-6 mb-6"/>
      <div className="flex flex-col items-center gap-4">
        <Button bgColor="#EDCD50">Masuk</Button>
        <Button bgColor="#B3EBCE">Daftar Akun</Button>
      </div>
    </div>
  )
}