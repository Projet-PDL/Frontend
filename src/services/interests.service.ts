import http from './http';

export type InterestItem = {
  name: string;
  category: string;
  source: string;
  position: number;
};

export type InterestDTO = {
  items: InterestItem[];
};

export type InterestResponse = {
  id: string;
  name: string;
  category: string;
  source: string;
  position: number;
  cvId: string;
};

export async function apiCreateInterests(cvId: string, dto: InterestDTO) {
  const { data } = await http.post(`/cvs/${cvId}/interest/interests`, dto);
  return data;
}

export async function apiUpdateInterests(cvId: string, dto: InterestDTO) {
  const { data } = await http.put(`/cvs/${cvId}/interest/interests`, dto);
  return data;
}