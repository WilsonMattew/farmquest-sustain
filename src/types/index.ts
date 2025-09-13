export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  district: string;
  village: string;
  farmSize: number; // in acres
  primaryCrops: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  language: 'English' | 'Hindi' | 'Malayalam' | 'Tamil' | 'Telugu';
  sustainabilityScore: number;
  totalPoints: number;
  level: string;
  rank: number;
  joinedDate: string;
  achievements: string[];
  questsCompleted: number;
  activeQuests: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'Water Conservation' | 'Organic Farming' | 'Soil Health' | 'Crop Rotation' | 'Waste Management' | 'Biodiversity' | 'Carbon Reduction';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  estimatedTime: string; // e.g., "7 days", "2 weeks"
  steps: QuestStep[];
  requirements: string[];
  tips: string[];
  image?: string;
  icon: string;
  isActive?: boolean;
  isCompleted?: boolean;
  progress?: number;
  startDate?: string;
  completedDate?: string;
  photos?: string[];
}

export interface QuestStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  verificationRequired?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlockedDate?: string;
  isUnlocked: boolean;
  requirements: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface LeaderboardEntry {
  rank: number;
  user: Pick<User, 'id' | 'name' | 'avatar' | 'district' | 'village' | 'level'>;
  points: number;
  questsCompleted: number;
  sustainabilityScore: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  tags: string[];
  likes: number;
  isBookmarked?: boolean;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  rainfall: number;
  uvIndex: number;
  recommendation: string;
}

export interface FarmingTip {
  id: string;
  title: string;
  content: string;
  category: string;
  season: 'Summer' | 'Monsoon' | 'Winter' | 'All';
  applicableRegions: string[];
  image?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface AdminStats {
  totalFarmers: number;
  activeQuests: number;
  completedQuests: number;
  totalSustainabilityScore: number;
  newUsersThisMonth: number;
  questCompletionRate: number;
  topPerformingDistricts: string[];
}