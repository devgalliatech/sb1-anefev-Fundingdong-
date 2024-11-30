import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';
import { Project } from '../../types/project';
import ProjectProgress from './ProjectProgress';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]">
      <Link to={`/projects/${project.id}`}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
            {project.category}
          </span>
        </div>
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-purple-600">
            {project.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <ProjectProgress
          currentAmount={project.currentAmount}
          goal={project.goal}
          progress={project.progress}
        />
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{project.backers} {t('projects.backers')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{project.daysLeft} {t('projects.daysLeft')}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center space-x-3">
          <img
            src={project.creator.avatarUrl}
            alt={project.creator.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-600">
            {t('projects.by')} <span className="font-medium">{project.creator.name}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;