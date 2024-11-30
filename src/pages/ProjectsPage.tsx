import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectGrid from '../components/projects/ProjectGrid';
import { Project } from '../types/project';

// Données de test - À remplacer par les données de l'API
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Projet Innovant Tech',
    description: 'Une description captivante du projet qui montre son potentiel et son innovation.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    goal: 50000,
    currentAmount: 35000,
    backers: 245,
    daysLeft: 15,
    creator: {
      name: 'Marie Laurent',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    category: 'tech',
    progress: 70,
  },
  {
    id: '2',
    title: 'Projet Artistique Créatif',
    description: 'Une nouvelle approche de l\'art contemporain qui repousse les limites.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
    goal: 25000,
    currentAmount: 18750,
    backers: 156,
    daysLeft: 21,
    creator: {
      name: 'Thomas Dubois',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    category: 'art',
    progress: 75,
  },
  {
    id: '3',
    title: 'Album Musical Indépendant',
    description: 'Un projet musical unique qui fusionne différents styles et cultures.',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    goal: 15000,
    currentAmount: 9000,
    backers: 120,
    daysLeft: 30,
    creator: {
      name: 'Sophie Martin',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    category: 'music',
    progress: 60,
  },
];

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  const handleSearch = (query: string) => {
    const filtered = mockProjects.filter((project) =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleCategoryChange = (category: string) => {
    if (!category) {
      setFilteredProjects(mockProjects);
      return;
    }
    const filtered = mockProjects.filter((project) => project.category === category);
    setFilteredProjects(filtered);
  };

  const handleSortChange = (sort: string) => {
    let sorted = [...filteredProjects];
    switch (sort) {
      case 'newest':
        // Simulation du tri par date
        sorted = sorted.reverse();
        break;
      case 'endingSoon':
        sorted = sorted.sort((a, b) => a.daysLeft - b.daysLeft);
        break;
      case 'mostFunded':
        sorted = sorted.sort((a, b) => b.progress - a.progress);
        break;
      default:
        // 'trending' - par défaut
        sorted = sorted.sort((a, b) => b.backers - a.backers);
    }
    setFilteredProjects(sorted);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{t('projects.title')}</h1>
        <p className="text-gray-600">{t('projects.subtitle')}</p>
      </div>

      <ProjectFilters
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      <ProjectGrid projects={filteredProjects} />
    </div>
  );
};

export default ProjectsPage;