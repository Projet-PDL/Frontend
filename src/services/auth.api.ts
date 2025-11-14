import http from './http';

export type LoginDTO = { email: string; password: string };
export type RegisterDTO = { email: string; password: string; name: string };

export async function apiLogin(dto: LoginDTO) {
  const { data } = await http.post('/auth/login', dto);
  return data;
}

export async function apiRegister(dto: RegisterDTO) {
  const { data } = await http.post('/auth/register', dto);
  return data;
}