import http from './http';

// Types pour les langues
export type LanguageDTO = {
  languageName: string;
  proficiencyLevel: string;
  position: number;
};


// GET - Récupérer toutes les langues d'un CV
export async function apiGetLanguages(cvId: string) {
  const { data } = await http.get(`/cvs/${cvId}/language/`);
  return data;
}

// POST - Ajouter une nouvelle langue à un CV
export async function apiCreateLanguage(cvId: string, dto: LanguageDTO) {
  const { data } = await http.post(`/cvs/${cvId}/language/`, dto);
  return data;
}

// PUT - Modifier une langue existante
export async function apiUpdateLanguage(
  cvId: string,
  languageId: string,
  dto: LanguageDTO
) {
  const { data } = await http.put(`/cvs/${cvId}/language/${languageId}`, dto);
  return data;
}

// DELETE - Supprimer une langue
export async function apiDeleteLanguage(cvId: string, languageId: string) {
  const { data } = await http.delete(`/cvs/${cvId}/language/${languageId}`);
  return data;
}