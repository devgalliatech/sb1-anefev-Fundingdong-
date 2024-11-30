import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { getCookieConsent, setCookieConsent, type CookieConsent } from '../utils/cookieManager';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(!getCookieConsent());
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  if (!isOpen) return null;

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setCookieConsent(consent);
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    setCookieConsent({ ...preferences, necessary: true });
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setCookieConsent(consent);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-8">
            <h3 className="text-lg font-semibold mb-2">{t('cookies.title')}</h3>
            <p className="text-gray-600 mb-4">{t('cookies.description')}</p>
            
            {showDetails && (
              <div className="mb-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="rounded border-gray-300"
                    />
                    <span>{t('cookies.necessary')}</span>
                  </label>
                  <span className="text-sm text-gray-500">{t('cookies.required')}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span>{t('cookies.analytics')}</span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span>{t('cookies.marketing')}</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-end space-x-4 mt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-purple-600 hover:text-purple-700"
          >
            {showDetails ? t('cookies.hidePreferences') : t('cookies.showPreferences')}
          </button>
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            {t('cookies.rejectAll')}
          </button>
          {showDetails ? (
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              {t('cookies.savePreferences')}
            </button>
          ) : (
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              {t('cookies.acceptAll')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;