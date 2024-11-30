import { TikTokAuthResponse, TikTokUser, TikTokVideo } from '../types/tiktok';

const TIKTOK_API_KEY = import.meta.env.VITE_TIKTOK_API_KEY;
const TIKTOK_API_SECRET = import.meta.env.VITE_TIKTOK_API_SECRET;
const REDIRECT_URI = import.meta.env.VITE_TIKTOK_REDIRECT_URI;

export class TikTokService {
  private static instance: TikTokService;
  private accessToken: string | null = null;

  private constructor() {}

  static getInstance(): TikTokService {
    if (!TikTokService.instance) {
      TikTokService.instance = new TikTokService();
    }
    return TikTokService.instance;
  }

  getAuthUrl(): string {
    const scope = 'user.info.basic,video.list';
    return `https://www.tiktok.com/auth/authorize?client_key=${TIKTOK_API_KEY}&scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${this.generateState()}`;
  }

  private generateState(): string {
    return Math.random().toString(36).substring(7);
  }

  async handleAuthCallback(code: string): Promise<TikTokAuthResponse> {
    try {
      const response = await fetch('https://open-api.tiktok.com/oauth/access_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_key: TIKTOK_API_KEY,
          client_secret: TIKTOK_API_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URI,
        }),
      });

      const data = await response.json();
      this.accessToken = data.access_token;
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'authentification TikTok:', error);
      throw error;
    }
  }

  async getUserInfo(): Promise<TikTokUser> {
    if (!this.accessToken) {
      throw new Error('Non authentifié');
    }

    try {
      const response = await fetch('https://open-api.tiktok.com/user/info/', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      throw error;
    }
  }

  async getUserVideos(cursor = 0): Promise<{ videos: TikTokVideo[]; hasMore: boolean; cursor: number }> {
    if (!this.accessToken) {
      throw new Error('Non authentifié');
    }

    try {
      const response = await fetch(`https://open-api.tiktok.com/video/list/?cursor=${cursor}&max_count=20`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      const data = await response.json();
      return {
        videos: data.videos,
        hasMore: data.has_more,
        cursor: data.cursor,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des vidéos:', error);
      throw error;
    }
  }

  async shareProjectUpdate(projectId: string, message: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Non authentifié');
    }

    // Implémentation de la publication sur TikTok
    // Note: L'API TikTok actuelle ne permet pas de publier directement,
    // cette fonctionnalité sera mise à jour lorsque disponible
  }
}

export const tiktokService = TikTokService.getInstance();