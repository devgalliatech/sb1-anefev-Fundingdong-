import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">{t('auth.register.title')}</h1>
      {/* Le formulaire d'inscription sera ajouté ici */}
    </div>
  );
};

export default RegisterPage;