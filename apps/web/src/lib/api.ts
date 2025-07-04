const BASE_URL = 'http://localhost:4000';

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
