const BASE_URL = 'http://localhost:4000';

/* LOGIN API */
export async function loginRequest(role: 'user' | 'supervisor', email: string, password: string) {
  console.log('DEBUG: Requesting API Login Request for ', email, password, role)
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });

  if (!response.ok) {
    throw new Error('Login gagal: Email atau kata sandi salah');
  }

  return response.json(); // return { access_token }
}


/* REGISTER USER (student) */
export async function registerUser(data: { name: string; email: string; password: string; birthdate: string; }) {
  console.log('DEBUG: Requesting API Register Request for ', data.name, data.email, data.password, data.birthdate);
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error('Gagal mendaftar');
  return res.json();
}

/* CAREER RECOMMENDATION */
export async function getCareerRecommendation(preference: {
  Tanaman: number;
  Interaksi: number;
  Masak: number;
  Kebersihan: number;
  Uang: number;
  Tenang: number;
}) {
  console.log('DEBUG: Requesting API Career Recommendation Request for ', preference.Tanaman, preference.Interaksi, preference.Masak, preference.Kebersihan, preference.Uang, preference.Tenang);
  try {
    const res = await fetch(`${BASE_URL}/career/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preference),
    });

    if (!res.ok) throw new Error("Gagal fetch karier");

    const data = await res.json();
    console.log('DEBUG: result career recommendation ', data)
    return {
      career: data.career,
      image: data.image,
    };
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}


/* GET SUPERVISORS */
export interface Supervisor {
  id: number;
  name: string;
  gender: string;
  age: number;
  experience: string;
  avatar: string;
}

export async function getSupervisors(): Promise<Supervisor[]> {
  console.log('DEBUG: Requesting API Get Supervisors Request')
  const res = await fetch(`${BASE_URL}/supervisors`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error('Gagal memuat supervisor');
  }

  return res.json();
}

/* ASSIGN SUPERVISOR */
export async function assignSupervisor(userId: number, supervisorId: number) {
  console.log('DEBUG: Requesting API Assigning Supervisor Request for ', userId, supervisorId);
  try {
    const response = await fetch(`${BASE_URL}/supervisors/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, supervisorId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Gagal menyimpan supervisor');
    }

    return await response.json(); // { success: true }
  } catch (error) {
    console.error('Error saat assign supervisor:', error);
    throw error;
  }
}

/* Chatbot with OpenAI */
export async function sendMessageToAI(message: string) {
  console.log('DEBUG: Requesting API Send Message to AI Request for ', message);
  try {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "AI Server Error");
    }

    const data = await res.json();
    console.log('DEBUG: reply response ', data);
    return data.reply;
  } catch (err) {
    console.error("AI Error:", err);
    throw new Error("Terjadi kesalahan saat menghubungi AI.");
  }
}

/* GET JOBS */
export async function getJobs(title?: string, location?: string) {
  console.log('DEBUG: Requesting API Get Jobs Request');
  
  const params = new URLSearchParams();
  if (title) {
    params.append("title", title);
  }
  if (location && location !== 'Semua Lokasi') {
    params.append("location", location);
  }

  const res = await fetch(`${BASE_URL}/jobs?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error('Gagal memuat daftar pekerjaan');
  }

  return res.json();
}

export async function getJobById(id: string | number) {
  console.log(`DEBUG: Requesting API Get Job By ID for ${id}`);
  
  const res = await fetch(`${BASE_URL}/jobs/${id}`);

  if (!res.ok) {
    throw new Error('Gagal memuat detail pekerjaan');
  }

  return res.json();
}