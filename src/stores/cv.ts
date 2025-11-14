import { defineStore } from "pinia";
import { ref } from "vue";

export interface Profile {
  first_name: string;
  last_name: string;
  headline: string;
  email: string;
  birth_date: string;
  phone: string;
  street: string;
  city: string;
  postal_code: string;
  region: string;
  country: string;
  website_url: string;
  availability: string;
}

export interface User {
  profile_picture: string;
}

export interface Summary {
    professional_summary: string;
}

export interface EducationItem{
  degree: string;
  school: string;
  start_date: string;
  end_date: string;
  description: string;
  position: number;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  position: number;
}

export interface LanguageItem {
  language_name: string;
  proficiency_level: string;
  position: number;
}

export interface SkillItem {
  skill_name: string;
  skill_description: string;
  position: number;
}

export interface SocialNetworkItem {
  platform: string;
  username: string;
  position: number;
}

export interface InterestItem {
  name: string;
  position: number;
}

export const useCvStore = defineStore("cv", () => {
  const profile = ref<Profile>({
    first_name: "",
    last_name: "",
    headline: "",
    email: "",
    birth_date: "",
    phone: "",
    street: "",
    city: "",
    postal_code: "",
    region: "",
    country: "",
    website_url: "",
    availability: "",
  });

  const user = ref<User>({
    profile_picture: "",
  });

  const summary = ref<Summary>({
    professional_summary: "",
  });
  
  const educations = ref<EducationItem[]>([]);

  const experiences = ref<ExperienceItem[]>([]);

  const languages = ref<LanguageItem[]>([]);
  
  const skills = ref<SkillItem[]>([]);

  const socialNetworks = ref<SocialNetworkItem[]>([]);

  const interests = ref<InterestItem[]>([]);

  return {
    profile,
    user,
    summary,
    educations,
    experiences,
    languages,
    skills,
    socialNetworks,
    interests,
  };
});
