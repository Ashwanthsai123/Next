import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MinusCircle, Github, Linkedin, Twitter } from 'lucide-react';
import type { UserDetails } from '../types';

export default function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    title: '',
    email: '',
    about: '',
    skills: [''],
    projects: [{ title: '', description: '' }],
    socialLinks: {}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('portfolioUsers') || '[]');
    users.push(formData);
    localStorage.setItem('portfolioUsers', JSON.stringify(users));
    navigate(`/portfolio/${formData.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '' }]
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Professional Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">About</label>
          <textarea
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            value={formData.about}
            onChange={e => setFormData(prev => ({ ...prev, about: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              required
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={skill}
              onChange={e => {
                const newSkills = [...formData.skills];
                newSkills[index] = e.target.value;
                setFormData(prev => ({ ...prev, skills: newSkills }));
              }}
            />
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-red-500"
            >
              <MinusCircle size={24} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 text-blue-500"
        >
          <PlusCircle size={24} /> Add Skill
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        {formData.projects.map((project, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={project.title}
                onChange={e => {
                  const newProjects = [...formData.projects];
                  newProjects[index] = { ...project, title: e.target.value };
                  setFormData(prev => ({ ...prev, projects: newProjects }));
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={2}
                value={project.description}
                onChange={e => {
                  const newProjects = [...formData.projects];
                  newProjects[index] = { ...project, description: e.target.value };
                  setFormData(prev => ({ ...prev, projects: newProjects }));
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Link (optional)</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={project.link || ''}
                onChange={e => {
                  const newProjects = [...formData.projects];
                  newProjects[index] = { ...project, link: e.target.value };
                  setFormData(prev => ({ ...prev, projects: newProjects }));
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-red-500 flex items-center gap-2"
            >
              <MinusCircle size={20} /> Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 text-blue-500"
        >
          <PlusCircle size={24} /> Add Project
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Github size={20} />
            <input
              type="url"
              placeholder="GitHub Profile URL"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.socialLinks.github || ''}
              onChange={e => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, github: e.target.value }
              }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <Linkedin size={20} />
            <input
              type="url"
              placeholder="LinkedIn Profile URL"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.socialLinks.linkedin || ''}
              onChange={e => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
              }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <Twitter size={20} />
            <input
              type="url"
              placeholder="Twitter Profile URL"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.socialLinks.twitter || ''}
              onChange={e => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, twitter: e.target.value }
              }))}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Generate Portfolio
      </button>
    </form>
  );
}