'use client'
import { useRouter } from 'next/navigation';
import Button from './_components/Button'; 

const Home = () => {
  const Router = useRouter();
  return (
    <div>
      <img src="landing-page-bg.png" className="w-full h-[225px] mb-16"/>
      <h1 className="font-semibold text-3xl text-center">Selamat Datang di</h1>
      <img src="logo.png" className="mx-auto w-72 -mt-6 mb-6"/>
      <div className="flex flex-col items-center gap-4">
        <Button bgColor="#EDCD50" onClick={() => Router.push("/login")} width="250px">Masuk</Button>
        <Button bgColor="#B3EBCE" width="250px">Daftar Akun</Button>
      </div>
    </div>
  )
}

export default Home;