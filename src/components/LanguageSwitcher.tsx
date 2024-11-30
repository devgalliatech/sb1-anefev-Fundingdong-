import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
        <Globe className="w-5 h-5" />
        <span className="text-sm">{i18n.language.toUpperCase()}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
        <div className="py-1">
          <button
            onClick={() => changeLanguage('fr')}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Français
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Español
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;