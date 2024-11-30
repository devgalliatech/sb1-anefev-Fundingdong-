import React from 'react';
import { useTranslation } from 'react-i18next';
import { TikTokVideo } from '../../types/tiktok';
import { Play, Heart, MessageCircle, Share } from 'lucide-react';

interface TikTokVideoGridProps {
  videos: TikTokVideo[];
}

const TikTokVideoGrid: React.FC<TikTokVideoGridProps> = ({ videos }) => {
  const { t } = useTranslation();

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="relative group overflow-hidden rounded-lg aspect-[9/16]"
        >
          <img
            src={video.coverUrl}
            alt={video.description}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <p className="text-white text-sm line-clamp-2 mb-2">
              {video.description}
            </p>
            <div className="flex items-center space-x-4 text-white text-sm">
              <div className="flex items-center">
                <Play className="w-4 h-4 mr-1" />
                {formatCount(video.viewCount)}
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {formatCount(video.likeCount)}
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {formatCount(video.commentCount)}
              </div>
              <div className="flex items-center">
                <Share className="w-4 h-4 mr-1" />
                {formatCount(video.shareCount)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TikTokVideoGrid;