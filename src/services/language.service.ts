import http from './http';

// Types pour les langues
export type LanguageDTO = {
  languageName: string;
  proficiencyLevel: string;
  position: number;
};


// GET - Récupérer toutes les langues d'un CV
export async function apiGetLanguages(cvId: number) {
  const { data } = await http.get(`/cvs/${cvId}/language/`);
  return data;
}

// POST - Ajouter une nouvelle langue à un CV
export async function apiCreateLanguage(cvId: number, dto: LanguageDTO) {
  const { data } = await http.post(`/cvs/${cvId}/language/`, dto);
  return data;
}

// PUT - Modifier une langue existante
export async function apiUpdateLanguage(
  cvId: number,
  languageId: number,
  dto: LanguageDTO
) {
  const { data } = await http.put(`/cvs/${cvId}/language/${languageId}`, dto);
  return data;
}

// DELETE - Supprimer une langue
export async function apiDeleteLanguage(cvId: number, languageId: number) {
  const { data } = await http.delete(`/cvs/${cvId}/language/${languageId}`);
  return data;
}