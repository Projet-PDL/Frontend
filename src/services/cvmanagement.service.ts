import http from './http';

/* =======================
   Types
======================= */

export type GenerateFromLinkedInDTO = {
  linkedinUrl: string;
};

export type CvProfileInfo = {
  fullName: string;
  headline: string;
  summary: string;
};

export type CvSkillItem = {
  name: string;
  source: string;   // linkedin | manual
  position: number;
};

export type CvLanguageItem = {
  name: string;
  level: string;
  source: string;
  position: number;
};

export type CvResponse = {
  id: string;
  profileInfo: CvProfileInfo;
  skills: CvSkillItem[];
  languages: CvLanguageItem[];
  education: any[];
  experience: any[];
};

/* =======================
   API calls
======================= */

/**
 * Create empty CV
 */
export async function apiCreateCv() {
  const { data } = await http.post('/cvs/');
  return data;
}

/**
 * Get CV by id
 */
export async function apiGetCv(cvId: string) {
  const { data } = await http.get<CvResponse>(`/cvs/${cvId}`);
  return data;
}

/**
 * Delete CV
 */
export async function apiDeleteCv(cvId: string) {
  const { data } = await http.delete(`/cvs/${cvId}`);
  return data;
}

/**
 * Generate CV from LinkedIn URL
 */
export async function apiGenerateCvFromLinkedIn(
  cvId: string,
  dto: GenerateFromLinkedInDTO
) {
  const { data } = await http.post<CvResponse>(
    `/cvs/${cvId}/generate-from-linkedin`,
    dto
  );
  return data;
}
