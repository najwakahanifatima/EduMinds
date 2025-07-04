'use client'
import { useRouter } from 'next/navigation';
import Button from '../_components/Button';

const SignUp = () => {
  const Router = useRouter();
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="font-semibold text-3xl text-center mb-12 text-[#1E1E1E]">
        Daftar sebagai <span className="text-[#2A3AA9]">Pelajar</span> atau <span className="text-[#2A3AA9]">Supervisor</span>?
      </h1>
     
      <div className="flex gap-8 items-center justify-center max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="bg-[rgba(179,235,206,0.7)] border rounded-2xl w-80 h-80 p-8 flex flex-col items-center justify-center text-center mb-6">
            <img src="pelajar-icon.png" className="mb-4" alt="Pelajar Icon"/>
            <h2 className="text-[#2A3AA9] font-bold text-xl mb-4">Pelajar</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Belajar dan berlatih untuk siap kerja sesuai jalur karier pilihanmu
            </p>
          </div>
          <Button width="320px" fontWeight="font-medium" onClick={() => Router.push("/signup/signup-student")}>
            Daftar sebagai Pelajar
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-[rgba(179,235,206,0.7)] border rounded-2xl w-80 h-80 p-8 flex flex-col items-center justify-center text-center mb-6">
            <img src="supervisor-icon.png" className="mb-4" alt="Supervisor Icon"/>
            <h2 className="text-[#2A3AA9] font-bold text-xl mb-4">Supervisor</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Mendampingi pelajar dengan bimbingan dan mentoring untuk bantu mereka siap kerja.
            </p>
          </div>
          <Button width="320px" fontWeight="font-medium">
            Daftar sebagai Supervisor
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUp;