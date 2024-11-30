import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t('about.title')}</h1>
      <div className="prose prose-purple">
        <p className="text-lg text-gray-600 mb-6">{t('about.description')}</p>
        <h2 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h2>
        <p className="mb-6">{t('about.mission.description')}</p>
        <h2 className="text-2xl font-semibold mb-4">{t('about.values.title')}</h2>
        <ul className="list-disc pl-6 mb-6">
          {['transparency', 'innovation', 'community'].map((value) => (
            <li key={value} className="mb-2">
              {t(`about.values.${value}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;