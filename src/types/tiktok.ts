export interface TikTokUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
  likesCount: number;
  verified: boolean;
}

export interface TikTokVideo {
  id: string;
  description: string;
  createTime: string;
  videoUrl: string;
  coverUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  width: number;
  height: number;
  duration: number;
}

export interface TikTokAuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  scope: string[];
  userId: string;
}