export interface UserDetails {
  name: string;
  title: string;
  email: string;
  about: string;
  skills: string[];
  projects: {
    title: string;
    description: string;
    link?: string;
  }[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}