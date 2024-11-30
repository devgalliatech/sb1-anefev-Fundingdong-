import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTikTokStore } from '../../stores/tiktokStore';

const TikTokConnect: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useTikTokStore();

  const handleConnect = () => {
    // Cette fonction sera implémentée une fois que nous aurons les clés d'API TikTok
    console.log('Connexion TikTok');
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
        <img
          src={user.avatarUrl}
          alt={user.displayName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{user.displayName}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
        <button
          onClick={logout}
          className="ml-auto px-4 py-2 text-red-600 hover:text-red-700"
        >
          {t('tiktok.disconnect')}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
    >
      <span className="font-bold">TikTok</span>
      <span>{t('tiktok.connect')}</span>
    </button>
  );
};

export default TikTokConnect;