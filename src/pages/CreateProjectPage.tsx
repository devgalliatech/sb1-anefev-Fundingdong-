import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/projects/ProjectForm';
import type { ProjectFormData } from '../types/project';

const CreateProjectPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      // TODO: Implémenter l'appel API pour créer le projet
      console.log('Données du projet:', data);
      // Rediriger vers la page du projet après création
      navigate('/projects');
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t('create.title')}</h1>
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateProjectPage;