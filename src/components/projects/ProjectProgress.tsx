import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectProgressProps {
  currentAmount: number;
  goal: number;
  progress: number;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({
  currentAmount,
  goal,
  progress,
}) => {
  const { t } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-purple-600">
          {formatCurrency(currentAmount)}
        </span>
        <span className="text-gray-500">
          {t('projects.goal', { amount: formatCurrency(goal) })}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="text-right text-sm text-gray-500">
        {progress}% {t('projects.funded')}
      </div>
    </div>
  );
};

export default ProjectProgress;