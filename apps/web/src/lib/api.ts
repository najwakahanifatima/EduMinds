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
