import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import type { UserDetails } from '../types';

export default function Portfolio() {
  const { name } = useParams();
  const users = JSON.parse(localStorage.getItem('portfolioUsers') || '[]');
  const user = users.find((u: UserDetails) => 
    u.name.toLowerCase().replace(/\s+/g, '-') === name
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Portfolio not found</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
          <p className="text-xl mb-6">{user.title}</p>
          <div className="flex justify-center space-x-4">
            {user.socialLinks.github && (
              <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
                <Github size={24} />
              </a>
            )}
            {user.socialLinks.linkedin && (
              <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
                <Linkedin size={24} />
              </a>
            )}
            {user.socialLinks.twitter && (
              <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
                <Twitter size={24} />
              </a>
            )}
            <a href={`mailto:${user.email}`} className="hover:text-blue-200">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Me</h2>
        <p className="text-gray-600 leading-relaxed">{user.about}</p>
      </div>

      {/* Skills Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {user.projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-1"
                >
                  View Project <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} {user.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}