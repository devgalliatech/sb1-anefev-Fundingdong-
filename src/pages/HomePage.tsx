import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('common.welcome')}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('common.description')}
        </p>
        <Link
          to="/projects"
          className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg"
        >
          {t('common.explore')}
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('home.feature1.title')}</h3>
          <p className="text-gray-600">{t('home.feature1.description')}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <Users className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('home.feature2.title')}</h3>
          <p className="text-gray-600">{t('home.feature2.description')}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <Shield className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('home.feature3.title')}</h3>
          <p className="text-gray-600">{t('home.feature3.description')}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;