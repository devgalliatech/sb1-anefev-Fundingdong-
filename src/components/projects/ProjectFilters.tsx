import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface ProjectFiltersProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  onSearch,
  onCategoryChange,
  onSortChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={t('projects.searchPlaceholder')}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex space-x-4">
        <select
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">{t('projects.allCategories')}</option>
          <option value="tech">{t('projects.categories.tech')}</option>
          <option value="art">{t('projects.categories.art')}</option>
          <option value="music">{t('projects.categories.music')}</option>
          <option value="games">{t('projects.categories.games')}</option>
        </select>
        
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="trending">{t('projects.sort.trending')}</option>
          <option value="newest">{t('projects.sort.newest')}</option>
          <option value="endingSoon">{t('projects.sort.endingSoon')}</option>
          <option value="mostFunded">{t('projects.sort.mostFunded')}</option>
        </select>
      </div>
    </div>
  );
};

export default ProjectFilters;