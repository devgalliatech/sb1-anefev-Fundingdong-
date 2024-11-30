export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  currentAmount: number;
  backers: number;
  daysLeft: number;
  creator: {
    name: string;
    avatarUrl: string;
  };
  category: string;
  progress: number;
  content: string;
  rewards: Reward[];
  duration: number;
  tiktokIntegration?: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  amount: number;
  maxBackers?: number;
  estimatedDelivery: string;
  items: string[];
}

export interface ProjectFormData {
  title: string;
  category: string;
  description: string;
  content: string;
  goal: number;
  duration: number;
  imageUrl: string;
  rewards: Reward[];
  tiktokIntegration: boolean;
}