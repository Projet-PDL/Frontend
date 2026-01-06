import http from './http';

// Types pour les compétences
export type SkillItem = {
  skillName: string;
  position: number;
};

export type SkillDTO = {
  items: SkillItem[];
};

export type SkillResponse = {
  id: string;
  skillName: string;
  position: number;
  cvId: string;
};

export async function apiCreateSkills(cvId: string, dto: SkillDTO) {
  const { data } = await http.post(`/cvs/${cvId}/skill/`, dto);
  return data;
}

export async function apiDeleteSkill(cvId: string, skillId: string) {
  const { data } = await http.delete(`/cvs/${cvId}/skill/${skillId}`);
  return data;
}