import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTikTokStore } from '../stores/tiktokStore';

const TikTokCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { authenticate, loading, error } = useTikTokStore();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      authenticate(code).then(() => {
        navigate('/profile');
      });
    }
  }, [searchParams, authenticate, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return null;
};

export default TikTokCallbackPage;