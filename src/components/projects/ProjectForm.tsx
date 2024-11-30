import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Upload } from 'lucide-react';
import { ProjectFormData, Reward } from '../../types/project';
import TikTokConnect from '../tiktok/TikTokConnect';
import { useTikTokStore } from '../../stores/tiktokStore';

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { isAuthenticated: isTikTokConnected } = useTikTokStore();
  
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    category: '',
    description: '',
    content: '',
    goal: 0,
    duration: 30,
    imageUrl: '',
    rewards: [],
    tiktokIntegration: false,
  });

  const [currentReward, setCurrentReward] = useState<Reward>({
    id: '',
    title: '',
    description: '',
    amount: 0,
    maxBackers: undefined,
    estimatedDelivery: '',
    items: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'goal' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentReward((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'maxBackers' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddReward = () => {
    if (currentReward.title && currentReward.amount > 0) {
      setFormData((prev) => ({
        ...prev,
        rewards: [...prev.rewards, { ...currentReward, id: crypto.randomUUID() }],
      }));
      setCurrentReward({
        id: '',
        title: '',
        description: '',
        amount: 0,
        maxBackers: undefined,
        estimatedDelivery: '',
        items: [],
      });
    }
  };

  const handleRemoveReward = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      rewards: prev.rewards.filter((reward) => reward.id !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informations de base */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('create.basicInfo')}</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('create.title')}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('create.category')}
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">{t('create.selectCategory')}</option>
            <option value="tech">{t('projects.categories.tech')}</option>
            <option value="art">{t('projects.categories.art')}</option>
            <option value="music">{t('projects.categories.music')}</option>
            <option value="games">{t('projects.categories.games')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('create.description')}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('create.content')}
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Objectifs et durée */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('create.funding')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('create.goal')}
            </label>
            <div className="relative">
              <input
                type="number"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                required
                min="0"
                step="100"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('create.duration')}
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="15">15 {t('create.days')}</option>
              <option value="30">30 {t('create.days')}</option>
              <option value="45">45 {t('create.days')}</option>
              <option value="60">60 {t('create.days')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Image du projet */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('create.image')}</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder={t('create.imageUrlPlaceholder')}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-500">{t('create.imageHelp')}</p>
        </div>
      </div>

      {/* Récompenses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('create.rewards')}</h2>
        
        {formData.rewards.map((reward) => (
          <div key={reward.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{reward.title}</h3>
                <p className="text-gray-600">{reward.description}</p>
                <p className="text-purple-600 font-medium mt-2">{reward.amount}€</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveReward(reward.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('create.rewardTitle')}
            </label>
            <input
              type="text"
              name="title"
              value={currentReward.title}
              onChange={handleRewardChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('create.rewardDescription')}
            </label>
            <textarea
              name="description"
              value={currentReward.description}
              onChange={handleRewardChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('create.rewardAmount')}
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="amount"
                  value={currentReward.amount}
                  onChange={handleRewardChange}
                  min="0"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('create.rewardMaxBackers')}
              </label>
              <input
                type="number"
                name="maxBackers"
                value={currentReward.maxBackers || ''}
                onChange={handleRewardChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('create.rewardDelivery')}
            </label>
            <input
              type="month"
              name="estimatedDelivery"
              value={currentReward.estimatedDelivery}
              onChange={handleRewardChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            type="button"
            onClick={handleAddReward}
            className="w-full px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t('create.addReward')}</span>
          </button>
        </div>
      </div>

      {/* Intégration TikTok */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('create.tiktok')}</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="tiktokIntegration"
                  checked={formData.tiktokIntegration}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    tiktokIntegration: e.target.checked,
                  }))}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {t('create.enableTikTok')}
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500">{t('create.tiktokHelp')}</p>
            </div>
            {formData.tiktokIntegration && !isTikTokConnected && (
              <TikTokConnect />
            )}
          </div>
        </div>
      </div>

      {/* Bouton de soumission */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
        >
          {t('create.submit')}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;