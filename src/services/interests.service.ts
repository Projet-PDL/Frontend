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
  id: number;
  name: string;
  category: string;
  source: string;
  position: number;
  cvId: string;
};

export async function apiCreateInterests(cvId: number, dto: InterestDTO) {
  const { data } = await http.post(`/cvs/${cvId}/interest/interests`, dto);
  return data;
}

export async function apiUpdateInterests(cvId: number, dto: InterestDTO) {
  const { data } = await http.put(`/cvs/${cvId}/interest/interests`, dto);
  return data;
}

export async function apiDeleteInterest(cvId: number, interestId: number) {
  const { data } = await http.delete(`/cvs/${cvId}/interest/${interestId}`)
  return data
}